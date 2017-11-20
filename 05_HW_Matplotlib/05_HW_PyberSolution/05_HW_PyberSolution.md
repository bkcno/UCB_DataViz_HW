
# Pyber Ride Sharing
- Observed Trend 1: As expected, most of the rides and drivers are concentrated in Urban cities.
- Observed Trend 2: The total fares are hence generated more in Urban cities, exceeding Suburban & Rural combined. 
- Observed Trend 3: However, average fare per ride is higher in Suburb and Rural cities than it is in Urban.


```python
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import os
```


```python
csvpath1 = os.path.join("raw_data", "city_data.csv")
csvpath2 = os.path.join("raw_data", "ride_data.csv")
pyber_df1 = pd.read_csv(csvpath1)
pyber_df2 = pd.read_csv(csvpath2)
mergedata_df = pd.merge(pyber_df1, pyber_df2, on="city")
mergedata_df
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
      <th>city</th>
      <th>driver_count</th>
      <th>type</th>
      <th>date</th>
      <th>fare</th>
      <th>ride_id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-08-19 04:27:52</td>
      <td>5.51</td>
      <td>6246006544795</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-04-17 06:59:50</td>
      <td>5.54</td>
      <td>7466473222333</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-05-04 15:06:07</td>
      <td>30.54</td>
      <td>2140501382736</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-01-25 20:44:56</td>
      <td>12.08</td>
      <td>1896987891309</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-08-09 18:19:47</td>
      <td>17.91</td>
      <td>8784212854829</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-10-24 15:15:46</td>
      <td>33.56</td>
      <td>4797969661996</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-06-06 13:54:23</td>
      <td>20.81</td>
      <td>9811478565448</td>
    </tr>
    <tr>
      <th>7</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-08-10 07:02:40</td>
      <td>44.53</td>
      <td>1563171128434</td>
    </tr>
    <tr>
      <th>8</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-07-05 17:37:13</td>
      <td>29.02</td>
      <td>6897992353955</td>
    </tr>
    <tr>
      <th>9</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-04-25 02:18:31</td>
      <td>20.05</td>
      <td>1148374505062</td>
    </tr>
    <tr>
      <th>10</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-01-25 08:47:09</td>
      <td>9.29</td>
      <td>213692794373</td>
    </tr>
    <tr>
      <th>11</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-11-10 01:57:14</td>
      <td>20.58</td>
      <td>3395682132130</td>
    </tr>
    <tr>
      <th>12</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-08-15 11:55:02</td>
      <td>27.45</td>
      <td>8456148871668</td>
    </tr>
    <tr>
      <th>13</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-08-01 10:51:49</td>
      <td>33.51</td>
      <td>6610565660737</td>
    </tr>
    <tr>
      <th>14</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-04-13 12:07:08</td>
      <td>6.56</td>
      <td>8101498434215</td>
    </tr>
    <tr>
      <th>15</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-01-12 22:51:21</td>
      <td>20.19</td>
      <td>3054122642867</td>
    </tr>
    <tr>
      <th>16</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-05-31 01:05:31</td>
      <td>35.22</td>
      <td>5946467060438</td>
    </tr>
    <tr>
      <th>17</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-07-13 16:53:07</td>
      <td>10.31</td>
      <td>2180910323678</td>
    </tr>
    <tr>
      <th>18</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-01-07 07:15:41</td>
      <td>11.45</td>
      <td>600800386573</td>
    </tr>
    <tr>
      <th>19</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-04-09 13:17:27</td>
      <td>27.85</td>
      <td>5748868894243</td>
    </tr>
    <tr>
      <th>20</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-06-30 01:59:04</td>
      <td>8.27</td>
      <td>4384089549855</td>
    </tr>
    <tr>
      <th>21</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-04-20 05:36:59</td>
      <td>31.67</td>
      <td>2865704421982</td>
    </tr>
    <tr>
      <th>22</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-05-02 05:55:28</td>
      <td>40.92</td>
      <td>2769007541388</td>
    </tr>
    <tr>
      <th>23</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-06-22 06:54:57</td>
      <td>12.58</td>
      <td>6629798205387</td>
    </tr>
    <tr>
      <th>24</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-06-18 06:03:03</td>
      <td>16.77</td>
      <td>7223504701591</td>
    </tr>
    <tr>
      <th>25</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-01-09 20:28:56</td>
      <td>27.21</td>
      <td>831362906446</td>
    </tr>
    <tr>
      <th>26</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-07-22 19:28:21</td>
      <td>35.71</td>
      <td>1234880130185</td>
    </tr>
    <tr>
      <th>27</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-11-26 02:34:57</td>
      <td>15.49</td>
      <td>5187807155760</td>
    </tr>
    <tr>
      <th>28</th>
      <td>Nguyenbury</td>
      <td>8</td>
      <td>Urban</td>
      <td>2016-07-09 04:42:44</td>
      <td>6.28</td>
      <td>1543057793673</td>
    </tr>
    <tr>
      <th>29</th>
      <td>Nguyenbury</td>
      <td>8</td>
      <td>Urban</td>
      <td>2016-11-08 19:22:04</td>
      <td>19.49</td>
      <td>1702803950740</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>2377</th>
      <td>East Leslie</td>
      <td>9</td>
      <td>Rural</td>
      <td>2016-04-13 04:30:56</td>
      <td>40.47</td>
      <td>7075058703398</td>
    </tr>
    <tr>
      <th>2378</th>
      <td>East Leslie</td>
      <td>9</td>
      <td>Rural</td>
      <td>2016-04-26 02:34:30</td>
      <td>45.80</td>
      <td>9402873395510</td>
    </tr>
    <tr>
      <th>2379</th>
      <td>East Leslie</td>
      <td>9</td>
      <td>Rural</td>
      <td>2016-04-05 18:53:16</td>
      <td>44.78</td>
      <td>6113138249150</td>
    </tr>
    <tr>
      <th>2380</th>
      <td>East Leslie</td>
      <td>9</td>
      <td>Rural</td>
      <td>2016-11-13 10:21:10</td>
      <td>15.71</td>
      <td>7275986542384</td>
    </tr>
    <tr>
      <th>2381</th>
      <td>East Leslie</td>
      <td>9</td>
      <td>Rural</td>
      <td>2016-03-06 06:10:40</td>
      <td>51.32</td>
      <td>6841691147797</td>
    </tr>
    <tr>
      <th>2382</th>
      <td>East Leslie</td>
      <td>9</td>
      <td>Rural</td>
      <td>2016-03-04 10:18:03</td>
      <td>13.43</td>
      <td>8814831098684</td>
    </tr>
    <tr>
      <th>2383</th>
      <td>East Leslie</td>
      <td>9</td>
      <td>Rural</td>
      <td>2016-11-28 09:09:15</td>
      <td>37.76</td>
      <td>804829686137</td>
    </tr>
    <tr>
      <th>2384</th>
      <td>East Leslie</td>
      <td>9</td>
      <td>Rural</td>
      <td>2016-09-08 19:19:38</td>
      <td>30.59</td>
      <td>8211833105097</td>
    </tr>
    <tr>
      <th>2385</th>
      <td>East Leslie</td>
      <td>9</td>
      <td>Rural</td>
      <td>2016-03-02 22:09:34</td>
      <td>36.61</td>
      <td>5500269118478</td>
    </tr>
    <tr>
      <th>2386</th>
      <td>East Leslie</td>
      <td>9</td>
      <td>Rural</td>
      <td>2016-06-22 07:45:30</td>
      <td>34.54</td>
      <td>684950063164</td>
    </tr>
    <tr>
      <th>2387</th>
      <td>Hernandezshire</td>
      <td>10</td>
      <td>Rural</td>
      <td>2016-02-20 08:17:32</td>
      <td>58.95</td>
      <td>3176534714830</td>
    </tr>
    <tr>
      <th>2388</th>
      <td>Hernandezshire</td>
      <td>10</td>
      <td>Rural</td>
      <td>2016-06-26 20:11:50</td>
      <td>28.78</td>
      <td>6382848462030</td>
    </tr>
    <tr>
      <th>2389</th>
      <td>Hernandezshire</td>
      <td>10</td>
      <td>Rural</td>
      <td>2016-01-24 00:21:35</td>
      <td>30.32</td>
      <td>7342649945759</td>
    </tr>
    <tr>
      <th>2390</th>
      <td>Hernandezshire</td>
      <td>10</td>
      <td>Rural</td>
      <td>2016-03-05 10:40:16</td>
      <td>23.35</td>
      <td>7443355895137</td>
    </tr>
    <tr>
      <th>2391</th>
      <td>Hernandezshire</td>
      <td>10</td>
      <td>Rural</td>
      <td>2016-04-11 04:44:50</td>
      <td>10.41</td>
      <td>9823290002445</td>
    </tr>
    <tr>
      <th>2392</th>
      <td>Hernandezshire</td>
      <td>10</td>
      <td>Rural</td>
      <td>2016-06-26 11:16:28</td>
      <td>26.29</td>
      <td>304182959218</td>
    </tr>
    <tr>
      <th>2393</th>
      <td>Hernandezshire</td>
      <td>10</td>
      <td>Rural</td>
      <td>2016-11-25 20:34:14</td>
      <td>38.45</td>
      <td>2898512024847</td>
    </tr>
    <tr>
      <th>2394</th>
      <td>Hernandezshire</td>
      <td>10</td>
      <td>Rural</td>
      <td>2016-11-20 17:32:37</td>
      <td>26.79</td>
      <td>3095402154397</td>
    </tr>
    <tr>
      <th>2395</th>
      <td>Hernandezshire</td>
      <td>10</td>
      <td>Rural</td>
      <td>2016-02-24 17:30:44</td>
      <td>44.68</td>
      <td>6389115653382</td>
    </tr>
    <tr>
      <th>2396</th>
      <td>Horneland</td>
      <td>8</td>
      <td>Rural</td>
      <td>2016-07-19 10:07:33</td>
      <td>12.63</td>
      <td>8214498891817</td>
    </tr>
    <tr>
      <th>2397</th>
      <td>Horneland</td>
      <td>8</td>
      <td>Rural</td>
      <td>2016-03-22 21:22:20</td>
      <td>31.53</td>
      <td>1797785685674</td>
    </tr>
    <tr>
      <th>2398</th>
      <td>Horneland</td>
      <td>8</td>
      <td>Rural</td>
      <td>2016-01-26 09:38:17</td>
      <td>21.73</td>
      <td>5665544449606</td>
    </tr>
    <tr>
      <th>2399</th>
      <td>Horneland</td>
      <td>8</td>
      <td>Rural</td>
      <td>2016-03-25 02:05:42</td>
      <td>20.04</td>
      <td>5729327140644</td>
    </tr>
    <tr>
      <th>2400</th>
      <td>West Kevintown</td>
      <td>5</td>
      <td>Rural</td>
      <td>2016-11-27 20:12:58</td>
      <td>12.92</td>
      <td>6460741616450</td>
    </tr>
    <tr>
      <th>2401</th>
      <td>West Kevintown</td>
      <td>5</td>
      <td>Rural</td>
      <td>2016-02-19 01:42:58</td>
      <td>11.15</td>
      <td>8622534016726</td>
    </tr>
    <tr>
      <th>2402</th>
      <td>West Kevintown</td>
      <td>5</td>
      <td>Rural</td>
      <td>2016-03-11 09:03:43</td>
      <td>42.13</td>
      <td>4568909568268</td>
    </tr>
    <tr>
      <th>2403</th>
      <td>West Kevintown</td>
      <td>5</td>
      <td>Rural</td>
      <td>2016-06-25 08:04:12</td>
      <td>24.53</td>
      <td>8188407925972</td>
    </tr>
    <tr>
      <th>2404</th>
      <td>West Kevintown</td>
      <td>5</td>
      <td>Rural</td>
      <td>2016-07-24 13:41:23</td>
      <td>11.78</td>
      <td>2001192693573</td>
    </tr>
    <tr>
      <th>2405</th>
      <td>West Kevintown</td>
      <td>5</td>
      <td>Rural</td>
      <td>2016-06-15 19:53:16</td>
      <td>13.50</td>
      <td>9577921579881</td>
    </tr>
    <tr>
      <th>2406</th>
      <td>West Kevintown</td>
      <td>5</td>
      <td>Rural</td>
      <td>2016-02-10 00:50:04</td>
      <td>34.69</td>
      <td>9595491362610</td>
    </tr>
  </tbody>
</table>
<p>2407 rows × 6 columns</p>
</div>



# Bubble Plot of Ride Sharing Data


```python
grouped_data = mergedata_df.groupby(["city"])
averagefare = grouped_data["fare"].mean().apply("{:,.2f}".format)
# print(type(averagefare))
totalrides = grouped_data["ride_id"].count()
# print(type(totalrides))
combined = pd.concat([averagefare, totalrides], axis=1)
combined = combined.rename(columns={"fare":"Average Fare", "ride_id": "Total Rides"})
pyber_df = pyber_df1.drop_duplicates()

```


```python

```

# Total Fares by City Type


```python
groupedbytype = mergedata_df.groupby(["type"])
totalfares = groupedbytype["fare"].sum()
totalfares_chart = totalfares.plot(kind='pie', colors=['gold','lightskyblue','lightcoral'], explode = [0.1, 0.1, 0],
                                   autopct="{0:1.1f}%".format, shadow=True, startangle=140, figsize=(9, 6))
plt.title("% of Total Fares by City Type")
plt.show()
```


![png](output_7_0.png)


# Total Rides by City Type


```python
groupedbytype = mergedata_df.groupby(["type"])
totalrides = groupedbytype["ride_id"].count()
totalrides_chart = totalrides.plot(kind='pie', colors=['gold','lightskyblue','lightcoral'], explode = [0.1, 0.1, 0],
                                   autopct="{0:1.1f}%".format, shadow=True, startangle=140, figsize=(9, 6))
plt.title("% of Total Rides by City Type")
plt.show()
```


![png](output_9_0.png)


# Total Drivers by City Type


```python
groupedbytype = mergedata_df.groupby(["type"])
totaldrivers = groupedbytype["driver_count"].sum()
totaldrivers_chart = totaldrivers.plot(kind='pie', colors=['gold','lightskyblue','lightcoral'], explode = [0.1, 0.1, 0],
                                   autopct="{0:1.1f}%".format, shadow=True, startangle=140, figsize=(9, 6))
plt.title("% of Total Drivers by City Type")
plt.show()
```


![png](output_11_0.png)



```python

```
