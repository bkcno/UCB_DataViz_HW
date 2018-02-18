# Import dependencies
import os
import pandas as pd
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import Flask, render_template, jsonify
#################################################
# Database Setup
#################################################
dbpath = os.path.join('db', 'belly_button_biodiversity.sqlite')
engine = create_engine(f'sqlite:///{dbpath}')
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
# Save reference to the table
Samples = Base.classes.samples
OTU = Base.classes.otu
Samplemetadata = Base.classes.samples_metadata
# Create our session (link) from Python to the DB
session = Session(engine)
#################################################
# Flask Setup
#################################################
app = Flask(__name__)
#################################################
# Routes
#################################################
# Main route
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/names')
def names():
    all_samples = Samples.metadata.tables['samples'].columns.keys()[1:]
    return jsonify(all_samples)

@app.route('/otu')
def otu():
    all_otus = session.query(OTU.lowest_taxonomic_unit_found).all()

    return jsonify(all_otus)

@app.route('/metadata/<sample>')
def show_metadata(sample):
    
    sample = sample.replace("BB_","")
    samples = (session
               .query(Samplemetadata)
               .filter(Samplemetadata.SAMPLEID == sample)
               .all())
               
    for sample in samples:
        return jsonify(
            AGE=sample.AGE, 
            BBTYPE=sample.BBTYPE, 
            ETHNICITY=sample.ETHNICITY, 
            GENDER=sample.GENDER, 
            LOCATION=sample.LOCATION, 
            SAMPLEID=sample.SAMPLEID
        )

    error_dict = {"error": f"Sample not found."}
    return jsonify(error_dict), 404

@app.route('/wfreq/<sample>')
def wfreq(sample):

    sample = sample.replace("BB_","")
    samples = (session
               .query(Samplemetadata)
               .filter(Samplemetadata.SAMPLEID == sample)
               .all())
    for sample in samples:
        return jsonify(
            int(sample.WFREQ)
        )      

@app.route('/samples/<sample>')
def samples(sample):

    results =  (session.query(Samples.otu_id, getattr(Samples, sample)).all())
    results = sorted(results, key=lambda result: result[1], reverse=True)

    list_dict = {
        'otu_ids': [otuid[0] for otuid in results],
        'sample_values': [otuid[1] for otuid in results]
    }
    
    return jsonify([list_dict])


if __name__ == "__main__":
    app.run(debug=True)