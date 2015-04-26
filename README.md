Visualizing Dutch temperatures
==============================

[![nl-hugo.github.io/temperature](/media/temperature.png)](http://nl-hugo.github.io/temperature)

Visualizing Dutch temperatures shows the data behind the question why Dutch people like to talk about the weather so often.

Check it out: <http://nl-hugo.github.io/temperature>.

It is inspired by Giovanni Magni's [2080 weeks of weather in Milan](http://www.gmagni.com/labs/weather/). 


## Source Code Layout

    css\                CSS stylesheets
    data\               raw and post-processed visualization data
    js\                 JavaScript files for the visualization and the website
    media\				media files
    convert.html        page for converting raw KNMI data files
    favicon.ico			the icon for the web page
    index.html          landing page
    README.md           README file that appears on the website's github page


## Raw Data

The raw data is available from the Royal Netherlands Meteorological Institute (KNMI). Numerous daily measurements 
are available for download at:

<http://www.knmi.nl/climatology/daily_data/selection.cgi>

The Dutch temperatures visualisation uses the following measurements:

```
TN	Minimum temperature (in 0.1 degrees Celsius)
TX	Maximum temperature (in 0.1 degrees Celsius)
```

The station Id and the date of measurement are selectable and are provided in each data set. For this visualisation 
I choose to select a period of 15 years, between January 1, 2000 and December 31 2014. Feel free to experiment with 
broader date ranges, but be aware that the responsiveness of the visualization filters might decrease due to the 
number of data points.

Also, note that the visualization requires data to be in csv format, while the KNMI download page lets you download 
its raw data in txt format. To convert between the two, I created a small data conversion tool that can be accessed
at the [conversion page](http://nl-hugo.github.io/temperature/convert.html).

NOTE: these data have not been corrected for inhomogeneities due to station relocations and changes in measurement procedures.

