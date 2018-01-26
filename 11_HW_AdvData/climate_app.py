import os

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify

dbfile = 'hawaii.sqlite'
if not os.path.exists(dbfile):
    raise FileNotFoundError(f'The database file `{dbfile}` does not exist')
engine = create_engine(f"sqlite:///{dbfile}")


# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Measurements = Base.classes.measurements
Stations = Base.classes.stations

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs"
    )


@app.route("/api/v1.0/precipitation")
def precipitations():
  
    results = session.query(Measurements).all()

    # Create a dictionary from the row data and append to a list of
    # all_passengers
    all_precipitations = []
    for precipitation in results:
        precipitation_dict = {}
        precipitation_dict["date"] = measurements.date
        precipitation_dict["tobs"] = measurements.tobs
        all_precipitations.append(precipitation_dict)

    return jsonify(all_precipitations)


@app.route("/api/v1.0/stations")
def stations():
    
    results = session.query(Stations.station).all()
   
    # Convert list of tuples into normal list
    all_stations = [row[0] for row in results]

    return jsonify(all_stations)

@app.route("/api/v1.0/tobs")
def tobs():
    
    results = session.query(Measurements.tobs).all()
   
    # Convert list of tuples into normal list
    all_tobs = [row[0] for row in results]

    return jsonify(all_tobs)


if __name__ == '__main__':
    app.run(debug=True)
