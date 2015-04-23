/**
 * temperature.js
 * 
 * Copyright (c) 2015 Hugo Janssen
 * 
 * Renders the temperature chart and provides functions to highlight:
 * 
 * 1. summer days
 * 2. tropical days
 * 3. freezing days
 * 4. icy days
 * 5. all days (which basically resets the above filters) 
 * 
 * This module requires: 
 * 1. d3.js
 * 2. d3-tip.js
 * 3. moments.js
 */


var temperature = (function () {
    "use strict";

    var data,
        width,
        height,
        margin = {
            top : 25,
            bottom : 5,
            left : 10,
            right : 10
        },

        // the scales
        yearScale = d3.scale.linear(),
        dateScale = d3.scale.linear(),
        temperatureScale = d3.scale.quantize()
            .domain([-15, 35])
            .range(colorbrewer.RdBu[10].reverse()),

        // the tooltips
        tip = d3.tip()
            .attr("class", "d3-tip")
            .offset([-10, 0])
            .html(function(d) {
                return "<strong>" + d.dd.format("DD-MM-YYYY") + "</strong>" +
                    "<br><br>Min: " + d.min + "<br>Max: " + d.max + "<br>";
            });

    /**
     * Appends the axis to the specified element.
     */
    function appendAxis(elt, scale) {

        var xAxis = d3.svg.axis()
            .scale(scale)
            .orient("top")
            .ticks(10)
            .tickFormat(d3.format(".0f"));

        elt.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(4," + margin.top * 2 + ")")
            .call(xAxis);

        return xAxis;
    }

    /**
     * Appends the legend to the specified element.
     */
    function appendLegend(elt) {

        var legend = elt.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(" + (width - 100) / 2 + ",0)");

        legend.append("text")
            .attr("x", -28)
            .attr("y", 5)
            .attr("dy", ".25em")
            .text(temperatureScale.domain()[0] + "℃");

        legend.append("text")
            .attr("x", 105)
            .attr("y", 5)
            .attr("dy", ".25em")
            .text(temperatureScale.domain()[1] + "℃");

        var legenditems = legend.selectAll("g")
            .data(temperatureScale.range())
        .enter().append("g")
            .attr("transform", function(d, i) { return "translate(" + (i * 10) + ",0)"; });

        legenditems.append("rect")
            .attr("width", 8)
            .attr("height", 8)
            .style("fill", function(d) { return d; });

        return legend;
    }

    /**
     * Updates the graph with the data provided.
     */
    function update(data) {

        var layer = d3.selectAll(".temperature"),

            items = layer.selectAll("rect")
            .data(data, function(d) { return d.dd; });

        // update
        items.transition()
            .duration(500)
            .attr("fill", function(d) { return temperatureScale(d.max); });

        // create new elements as needed
        items.enter().append("rect")
            .attr("class", "temperature-marker")
            .attr("width", 10)
            .attr("height", 2)
            .attr("x", function(d) { return yearScale(d.year); })
            .attr("y", function(d) { return dateScale(d.doy); })
            .attr("fill", function(d) { return temperatureScale(d.max); })
            .on("mouseover", tip.show)
            .on("mouseout", tip.hide);

        // low-light old elements
        items.exit()
            .transition()
            .duration(500)
            .attr("fill", "#eee");

        return items;
    }    

    /**
     * Shows the temperature of all days.
     */
    function alldays() {
        update(data);
    }    

    /**
     * Highlights summer days. These are defined as days on which the maximum 
     * temperature rises to 25 degrees celcius or above. 
     */
    function summerdays() {
        update(data.filter(function(d) { return d.max >= 25.0; } ));
    }

    /**
     * Highlights tropical days. These are defined as days on which the maximum 
     * temperature rises to 30 degrees celcius or above. 
     */
    function tropicaldays() {
        update(data.filter(function(d) { return d.max >= 30.0; } ));
    }

    /**
     * Highlights freezing days. These are defined as days on which the minimum 
     * temperature falls below 0 degrees celsius.
     */
    function freezingdays() {
        update(data.filter(function(d) { return d.min < 0.0; } ));
    }

    /**
     * Highlights icy days. These are defined as days on which the maximum 
     * temperature does not rise above 0 degrees celcius.
     */
    function icydays() {
        update(data.filter(function(d) { return d.max < 0.0; } ));
    }    

    /**
     * Draws the graph
     */
    function draw(path, elemId, w, h) {

        // read data
        d3.csv(path, function(error, dx) {

            data = dx;
            width = w - margin.left - margin.right;
            height = h - margin.bottom - margin.top;

            data.forEach(function(d) {
                // parse dates
                d.dd = moment(d.YYYYMMDD, "YYYYMMDD");
                d.year = d.dd.year();
                d.doy = d.dd.dayOfYear();

                // correct alignment for leap years
                if (!d.dd.isLeapYear() && d.dd.month() >= 2) {
                    d.doy++;
                }

                // TX Maximum temperature (in 0.1 degrees Celsius)
                d.max = +d.TX / 10;

                // TN Minimum temperature (in 0.1 degrees Celsius)
                d.min = +d.TN / 10;
            });

            var svg = d3.select(elemId).append("svg")
                .attr("class", "canvas")
                .attr("width", w)
                .attr("height", h);

            // initialize tooltip
            svg.call(tip);

            // initialize scales
            yearScale.range([margin.left, width]).domain(d3.extent(data, function(d) { return d.year; }));
            dateScale.range([margin.top, height]).domain(d3.extent(data, function(d) { return d.doy; }));

            // initialize axis and legend
            appendAxis(svg, yearScale);
            appendLegend(svg);

            // append markers
            var layer = svg.append("g")
                .attr("class", "temperature")
                .attr("transform", "translate(0," + margin.top + ")");
            update(data);
        });
    }

    return {
        draw : draw,
        alldays : alldays,
        summerdays : summerdays,
        tropicaldays : tropicaldays,
        freezingdays : freezingdays,
        icydays : icydays
    };
})();
