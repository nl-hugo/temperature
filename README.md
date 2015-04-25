Visualizing Dutch temperatures
==============================

[![nl-hugo.github.io/temperature](/media/temperature.png)](http://nl-hugo.github.io/temperature)

Visualizing Dutch temperatures shows the data behind the question why Dutch people like to talk about the weather so often.

Check it out: <http://nl-hugo.github.io/temperature>.

It is inspired by Giovanni Magni's 2080 weeks of weather in Milan. 


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

The raw data is available from the Royal Netherlands Meteorological Institute (KNMI). Daily weather data in txt format can be downloaded from:

<http://www.knmi.nl/climatology/daily_data/selection.cgi>

Make sure it includes the elements TX for the Maximum temperature and TN for the Minimum temperature. Raw data 
can be converted using knmi.convert.js on the [convert page](http://nl-hugo.github.io/temperature/convert.html)

NOTE: these data have not been corrected for inhomogeneities due to station relocations and changes in measurement procedures.
