# import necessary libraries
from flask import Flask, render_template, redirect
import pymongo
import scrape_mars

# create instance of Flask app
app = Flask(__name__)

conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)
db = client.marsDB


# create route that renders index.html template
@app.route("/")
def index():
    mars_dicts = db.mars.find()
    return render_template("index.html", text="Mission to Mars!", text_1="Scrape New Data", mars_dicts=mars_dicts,
                            news_title='Mount Sharp \'Photobombs\' Mars Curiosity Rover',
                            news_p='A new self-portrait of NASA\'s Curiosity Mars rover shows the vehicle on Vera Rubin Ridge',
                            featured_image_url="https://www.jpl.nasa.gov/spaceimages/images/wallpaper/PIA22207-640x350.jpg",
                            img_url1='http://astropedia.astrogeology.usgs.gov/download/Mars/Viking/cerberus_enhanced.tif/full.jpg',
                            img_url2='http://astropedia.astrogeology.usgs.gov/download/Mars/Viking/schiaparelli_enhanced.tif/full.jpg',
                            img_url3='http://astropedia.astrogeology.usgs.gov/download/Mars/Viking/syrtis_major_enhanced.tif/full.jpg',
                            img_url4='http://astropedia.astrogeology.usgs.gov/download/Mars/Viking/valles_marineris_enhanced.tif/full.jpg')

@app.route("/scrape")
def scrape():
    mars_dicts = scrape_mars.scrape()
    db.mars.update(
        {},
        mars_dicts,
        upsert=True
    )
    return redirect("http://localhost:5000/", code=302)


if __name__ == "__main__":
    app.run(debug=True)










