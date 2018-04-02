
### Trips Recorded:


```python
import glob

files = glob.glob("bike_trips_data/*.csv")

def file_len(filename):
    with open(filename) as f:
        for i, l in enumerate(f):
            pass
    return i + 1

csv_d = {f: file_len(f) for f in files}
```


```python
import json
print(json.dumps(csv_d, indent=4, sort_keys=True))
```

    {
        "bike_trips_data/2013-07 - Citi Bike trip data.csv": 843417,
        "bike_trips_data/2013-08 - Citi Bike trip data.csv": 1001959,
        "bike_trips_data/2013-09 - Citi Bike trip data.csv": 1034360,
        "bike_trips_data/2013-10 - Citi Bike trip data.csv": 1037713,
        "bike_trips_data/2013-11 - Citi Bike trip data.csv": 675775,
        "bike_trips_data/2013-12 - Citi Bike trip data.csv": 443967,
        "bike_trips_data/2014-01 - Citi Bike trip data.csv": 300401,
        "bike_trips_data/2014-02 - Citi Bike trip data.csv": 224737,
        "bike_trips_data/2014-03 - Citi Bike trip data.csv": 439118,
        "bike_trips_data/2014-04 - Citi Bike trip data.csv": 670781,
        "bike_trips_data/2014-05 - Citi Bike trip data.csv": 866118,
        "bike_trips_data/2014-06 - Citi Bike trip data.csv": 936881,
        "bike_trips_data/2014-07 - Citi Bike trip data.csv": 968843,
        "bike_trips_data/2014-08 - Citi Bike trip data.csv": 963490,
        "bike_trips_data/201409-citibike-tripdata.csv": 953888,
        "bike_trips_data/201410-citibike-tripdata.csv": 828712,
        "bike_trips_data/201411-citibike-tripdata.csv": 529189,
        "bike_trips_data/201412-citibike-tripdata.csv": 399070,
        "bike_trips_data/201501-citibike-tripdata.csv": 285553,
        "bike_trips_data/201502-citibike-tripdata.csv": 196931,
        "bike_trips_data/201503-citibike-tripdata.csv": 341827,
        "bike_trips_data/201504-citibike-tripdata.csv": 652391,
        "bike_trips_data/201505-citibike-tripdata.csv": 961987,
        "bike_trips_data/201506-citibike-tripdata.csv": 941220,
        "bike_trips_data/201507-citibike-tripdata.csv": 1085677,
        "bike_trips_data/201508-citibike-tripdata.csv": 1179045,
        "bike_trips_data/201509-citibike-tripdata.csv": 1289700,
        "bike_trips_data/201510-citibike-tripdata.csv": 1212278,
        "bike_trips_data/201511-citibike-tripdata.csv": 987246,
        "bike_trips_data/201512-citibike-tripdata.csv": 804126,
        "bike_trips_data/201601-citibike-tripdata.csv": 509479,
        "bike_trips_data/201602-citibike-tripdata.csv": 560875,
        "bike_trips_data/201603-citibike-tripdata.csv": 919922,
        "bike_trips_data/201604-citibike-tripdata.csv": 1013150,
        "bike_trips_data/201605-citibike-tripdata.csv": 1212281,
        "bike_trips_data/201606-citibike-tripdata.csv": 1460319,
        "bike_trips_data/201607-citibike-tripdata.csv": 1380111,
        "bike_trips_data/201608-citibike-tripdata.csv": 1557664,
        "bike_trips_data/201609-citibike-tripdata.csv": 1648857,
        "bike_trips_data/201610-citibike-tripdata.csv": 1573873,
        "bike_trips_data/201611-citibike-tripdata.csv": 1196943,
        "bike_trips_data/201612-citibike-tripdata.csv": 812193,
        "bike_trips_data/201701-citibike-tripdata.csv": 726677,
        "bike_trips_data/201702-citibike-tripdata.csv": 791648,
        "bike_trips_data/201703-citibike-tripdata.csv": 727666,
        "bike_trips_data/201704-citibike-tripdata.csv": 1315405,
        "bike_trips_data/201705-citibike-tripdata.csv": 1523269,
        "bike_trips_data/201706-citibike-tripdata.csv": 1731595,
        "bike_trips_data/201707-citibike-tripdata.csv": 1735600,
        "bike_trips_data/201708-citibike-tripdata.csv": 1816499,
        "bike_trips_data/201709-citibike-tripdata.csv": 1878099,
        "bike_trips_data/201710-citibike-tripdata.csv": 1897593,
        "bike_trips_data/201711-citibike-tripdata.csv": 1330650,
        "bike_trips_data/201712-citibike-tripdata.csv": 889968,
        "bike_trips_data/201801_citibikenyc_tripdata.csv": 718991,
        "bike_trips_data/201802_citibikenyc_tripdata.csv": 843105
    }



```python
total = sum(csv_d.values())
print("CHECKPOINT: The total trips have been recorded since the inception of data in 2013 for NYC: " "{0:,}".format(total))
```

    CHECKPOINT: The total trips have been recorded since the inception of data in 2013 for NYC: 54,828,832


### Rideship Change:


```python
import glob
import pandas as pd

files = glob.glob("riders_members_data/*.csv") 

header_saved = False
with open('merged_membership.csv','w') as f_out:
    for filename in files:
        with open(filename) as f_in:
            header = next(f_in)
            if not header_saved:
                f_out.write(header)
                header_saved = True
            for line in f_in:
                f_out.write(line)
```


```python
df = pd.read_csv('riders_members_data/merged_membership.csv', index_col="Date")
df.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Trips over the past 24-hours (midnight to 11:59pm)</th>
      <th>Cumulative trips (since launch):</th>
      <th>Miles traveled today (midnight to 11:59 pm)</th>
      <th>Miles traveled to date:</th>
      <th>Total Annual Members</th>
      <th>Annual Member Sign-Ups (midnight to 11:59 pm)</th>
      <th>24-Hour Passes Purchased (midnight to 11:59 pm)</th>
      <th>7-Day Passes Purchased (midnight to 11:59 pm)</th>
    </tr>
    <tr>
      <th>Date</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>5/27/13</th>
      <td>9767</td>
      <td>9767</td>
      <td>21.533</td>
      <td>21,533</td>
      <td>17216</td>
      <td>2043.0</td>
      <td>0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>5/28/13</th>
      <td>5215</td>
      <td>14982</td>
      <td>8.780</td>
      <td>30,313</td>
      <td>19816</td>
      <td>2598.0</td>
      <td>0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>5/29/13</th>
      <td>10981</td>
      <td>25963</td>
      <td>21.898</td>
      <td>52,211</td>
      <td>21986</td>
      <td>2167.0</td>
      <td>0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>5/30/13</th>
      <td>9850</td>
      <td>35813</td>
      <td>20.321</td>
      <td>72,532</td>
      <td>23985</td>
      <td>1998.0</td>
      <td>0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>5/31/13</th>
      <td>9253</td>
      <td>45066</td>
      <td>20.243</td>
      <td>92,775</td>
      <td>25615</td>
      <td>1630.0</td>
      <td>0</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
growth = (df['Total Annual Members'].iloc[-1] - df['Total Annual Members'].iloc[0])/df['Total Annual Members'].iloc[0]
print("CHECKPOINT: The total ridership (by total annual members) has grown since the launch in 2013 to 2016 by: " "{:.2%}".format(growth))
```

    CHECKPOINT: The total ridership (by total annual members) has grown since the launch in 2013 to 2016 by: 1099.96%


### Hours and Stations:


```python

```


```python

```
