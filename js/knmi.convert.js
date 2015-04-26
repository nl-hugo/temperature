/**
 * knmi.convert.js
 * 
 * Copyright (c) 2015 Hugo Janssen
 * 
 * Converts a raw KNMI data text file to proper csv format.
 */

function to_csv(data, callback) {
    "use strict";

    // clean the raw data
    var clean = data.split("\n")
        .filter(function(s) {
            // remove commented rows, except for the data headers
            return !s.startsWith("#") || s.startsWith("# STN,");
        })
        .map(function(s) {
            // remove white spaces and remaining #
            return s.replace(/\s+/g,"").replace("#","");
        }).join("\n");
    callback(clean);
}