
### Data Questions:


```python
import glob

files = glob.glob("*.csv")

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
        "2013-07 - Citi Bike trip data.csv": 843417,
        "2013-08 - Citi Bike trip data.csv": 1001959,
        "2013-09 - Citi Bike trip data.csv": 1034360,
        "2013-10 - Citi Bike trip data.csv": 1037713,
        "2013-11 - Citi Bike trip data.csv": 675775,
        "2013-12 - Citi Bike trip data.csv": 443967,
        "2014-01 - Citi Bike trip data.csv": 300401,
        "2014-02 - Citi Bike trip data.csv": 224737,
        "2014-03 - Citi Bike trip data.csv": 439118,
        "2014-04 - Citi Bike trip data.csv": 670781,
        "2014-05 - Citi Bike trip data.csv": 866118,
        "2014-06 - Citi Bike trip data.csv": 936881,
        "2014-07 - Citi Bike trip data.csv": 968843,
        "2014-08 - Citi Bike trip data.csv": 963490,
        "201409-citibike-tripdata.csv": 953888,
        "201410-citibike-tripdata.csv": 828712,
        "201411-citibike-tripdata.csv": 529189,
        "201412-citibike-tripdata.csv": 399070,
        "201501-citibike-tripdata.csv": 285553,
        "201502-citibike-tripdata.csv": 196931,
        "201503-citibike-tripdata.csv": 341827,
        "201504-citibike-tripdata.csv": 652391,
        "201505-citibike-tripdata.csv": 961987,
        "201506-citibike-tripdata.csv": 941220,
        "201507-citibike-tripdata.csv": 1085677,
        "201508-citibike-tripdata.csv": 1179045,
        "201509-citibike-tripdata.csv": 1289700,
        "201510-citibike-tripdata.csv": 1212278,
        "201511-citibike-tripdata.csv": 987246,
        "201512-citibike-tripdata.csv": 804126,
        "201601-citibike-tripdata.csv": 509479,
        "201602-citibike-tripdata.csv": 560875,
        "201603-citibike-tripdata.csv": 919922,
        "201604-citibike-tripdata.csv": 1013150,
        "201605-citibike-tripdata.csv": 1212281,
        "201606-citibike-tripdata.csv": 1460319,
        "201607-citibike-tripdata.csv": 1380111,
        "201608-citibike-tripdata.csv": 1557664,
        "201609-citibike-tripdata.csv": 1648857,
        "201610-citibike-tripdata.csv": 1573873,
        "201611-citibike-tripdata.csv": 1196943,
        "201612-citibike-tripdata.csv": 812193,
        "201701-citibike-tripdata.csv": 726677,
        "201702-citibike-tripdata.csv": 791648,
        "201703-citibike-tripdata.csv": 727666,
        "201704-citibike-tripdata.csv": 1315405,
        "201705-citibike-tripdata.csv": 1523269,
        "201706-citibike-tripdata.csv": 1731595,
        "201707-citibike-tripdata.csv": 1735600,
        "201708-citibike-tripdata.csv": 1816499,
        "201709-citibike-tripdata.csv": 1878099,
        "201710-citibike-tripdata.csv": 1897593,
        "201711-citibike-tripdata.csv": 1330650,
        "201712-citibike-tripdata.csv": 889968,
        "201801_citibikenyc_tripdata.csv": 718991,
        "201802_citibikenyc_tripdata.csv": 843105
    }



```python
total = sum(csv_d.values())
print("The total trips have been recorded since the inception of data in 2013 for NYC: " "{0:,}".format(total))
```

    The total trips have been recorded since the inception of data in 2013 for NYC: 54,828,832



```python
# import glob
# path = "2014data/*.csv"

# for filename in glob.glob(path):
#     row_count = sum(1 for row in open(filename))
#     print(row_count)
```
