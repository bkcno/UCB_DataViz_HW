## Belly Button Biodiversity

### Step 1 - Flask API
Use Flask to design an API for the belly button dataset and to serve the HTML and JavaScript required for the dashboard page by using the sqlite database. Then create the following routes for api:
@app.route("/")
@app.route('/names')
@app.route('/otu')
@app.route('/metadata/<sample>')
@app.route('/wfreq/<sample>')
@app.route('/samples/<sample>')

### Step 2 - Plotly.js
Use Plotly.js to build interactive charts for the dashboard.
