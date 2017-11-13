
# Heroes Of Pymoli Data Analysis
- Observed Trend 1: There are significantly more male players than females.
- Observed Trend 2: More than half of the players are under age 24. 
- Observed Trend 3: Players above age 35 spent more per person as indicated in normalized average.


```python
import pandas as pd 
import os 
hop_data = os.path.join('purchase_data2.json') 
hop_data_df = pd.read_json(hop_data, orient=None, typ='frame', dtype=True, convert_axes=True, convert_dates=True, keep_default_dates=True, numpy=False, precise_float=False, date_unit=None, encoding=None, lines=False) 
hop_data_df.head()
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
      <th>Age</th>
      <th>Gender</th>
      <th>Item ID</th>
      <th>Item Name</th>
      <th>Price</th>
      <th>SN</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>20</td>
      <td>Male</td>
      <td>93</td>
      <td>Apocalyptic Battlescythe</td>
      <td>4.49</td>
      <td>Iloni35</td>
    </tr>
    <tr>
      <th>1</th>
      <td>21</td>
      <td>Male</td>
      <td>12</td>
      <td>Dawne</td>
      <td>3.36</td>
      <td>Aidaira26</td>
    </tr>
    <tr>
      <th>2</th>
      <td>17</td>
      <td>Male</td>
      <td>5</td>
      <td>Putrid Fan</td>
      <td>2.63</td>
      <td>Irim47</td>
    </tr>
    <tr>
      <th>3</th>
      <td>17</td>
      <td>Male</td>
      <td>123</td>
      <td>Twilight's Carver</td>
      <td>2.55</td>
      <td>Irith83</td>
    </tr>
    <tr>
      <th>4</th>
      <td>22</td>
      <td>Male</td>
      <td>154</td>
      <td>Feral Katana</td>
      <td>4.11</td>
      <td>Philodil43</td>
    </tr>
  </tbody>
</table>
</div>



Player Count


```python
total_players = hop_data_df["SN"].nunique()
# print(unique_player)
# print(f" Total Players: {total_players}")
totalplayers = pd.DataFrame({"Total Players":[total_players]}) 
totalplayers
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
      <th>Total Players</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>74</td>
    </tr>
  </tbody>
</table>
</div>



Purchasing Analysis (Total)


```python

unique_item = hop_data_df["Item ID"].nunique()
# print(unique_item)
average_price = round(hop_data_df["Price"].mean(), 2)
# print(average_price)
number_purchase = hop_data_df["Item ID"].count()
# print(number_purchase)
total_revenue = round(hop_data_df["Price"].sum(), 2)
# print(total_revenue)
purchasing_analysis = pd.DataFrame({"Number of Unique Items":[unique_item],
                                    "Average Price":[average_price],
                                    "Number of Purchases": [number_purchase],
                                    "Total Revenue":[total_revenue]})
purchasing_analysis["Average Price"] = purchasing_analysis["Average Price"].map('${:,.2f}'.format)
purchasing_analysis["Total Revenue"] = purchasing_analysis["Total Revenue"].map('${:,.2f}'.format)
purchasing_analysis
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
      <th>Average Price</th>
      <th>Number of Purchases</th>
      <th>Number of Unique Items</th>
      <th>Total Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>$2.92</td>
      <td>78</td>
      <td>64</td>
      <td>$228.10</td>
    </tr>
  </tbody>
</table>
</div>



Gender Demographics


```python
gender_df = hop_data_df.iloc[:,[1,5]]
unique_df = gender_df.drop_duplicates()
total_gender = unique_df.groupby("Gender")
count = total_gender["Gender"].count()
percentage = round(count/count.sum()*100, 2)
gender_demo = pd.concat([percentage, count], axis=1)
gender_demo.columns = ["Percentage of Players", "Total Count"]
gender_demo
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
      <th>Percentage of Players</th>
      <th>Total Count</th>
    </tr>
    <tr>
      <th>Gender</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Female</th>
      <td>17.57</td>
      <td>13</td>
    </tr>
    <tr>
      <th>Male</th>
      <td>81.08</td>
      <td>60</td>
    </tr>
    <tr>
      <th>Other / Non-Disclosed</th>
      <td>1.35</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>



Purchasing Analysis (Gender)


```python
total_purchase = hop_data_df.groupby("Gender")
gender_purchase = total_purchase["Gender"].count()
gender_average = round(total_purchase["Price"].mean(), 2)
gender_revenue = round(total_purchase["Price"].sum(), 2)
normalized = round((gender_revenue / count), 2)
gender_buy_analysis = pd.concat([gender_purchase, gender_average, gender_revenue, normalized], axis=1)
gender_buy_analysis.columns = ["Purchase Count", "Average Purchase Price", "Total Revenue", "Normalized Average"]
gender_buy_analysis["Average Purchase Price"] = gender_buy_analysis["Average Purchase Price"].map('${:,.2f}'.format)
gender_buy_analysis["Total Revenue"] = gender_buy_analysis["Total Revenue"].map('${:,.2f}'.format)
gender_buy_analysis["Normalized Average"] = gender_buy_analysis["Normalized Average"].map('${:,.2f}'.format)
gender_buy_analysis
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
      <th>Purchase Count</th>
      <th>Average Purchase Price</th>
      <th>Total Revenue</th>
      <th>Normalized Average</th>
    </tr>
    <tr>
      <th>Gender</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Female</th>
      <td>13</td>
      <td>$3.18</td>
      <td>$41.38</td>
      <td>$3.18</td>
    </tr>
    <tr>
      <th>Male</th>
      <td>64</td>
      <td>$2.88</td>
      <td>$184.60</td>
      <td>$3.08</td>
    </tr>
    <tr>
      <th>Other / Non-Disclosed</th>
      <td>1</td>
      <td>$2.12</td>
      <td>$2.12</td>
      <td>$2.12</td>
    </tr>
  </tbody>
</table>
</div>



Age Demographics


```python
# print(hop_data_df["Age"].max())
# print(hop_data_df["Age"].min())
bins = [0,9,14,19,24,29,34,39,50]
age_label = ["<10", "10-14", "15-19", "20-24", "25-29", "30-34", "35-39", "40+"]
pd.cut(hop_data_df["Age"], bins, labels = age_label)
hop_data_df["Age Group"] = pd.cut(hop_data_df["Age"], bins, labels = age_label)
age_df = hop_data_df.iloc[:,[5,6]]
unique_player_df = age_df.drop_duplicates()
age_group = unique_player_df.groupby("Age Group")
# HOW TO sort to put age < 10 atop? 
age_count = age_group["Age Group"].count()
age_percentage = round(age_count/age_count.sum()*100, 2)
age_demo = pd.concat([age_percentage, age_count], axis=1)
age_demo.columns = ["Percentage of Players", "Total Count"]
age_demo
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
      <th>Percentage of Players</th>
      <th>Total Count</th>
    </tr>
    <tr>
      <th>Age Group</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>10-14</th>
      <td>4.05</td>
      <td>3</td>
    </tr>
    <tr>
      <th>15-19</th>
      <td>14.86</td>
      <td>11</td>
    </tr>
    <tr>
      <th>20-24</th>
      <td>45.95</td>
      <td>34</td>
    </tr>
    <tr>
      <th>25-29</th>
      <td>10.81</td>
      <td>8</td>
    </tr>
    <tr>
      <th>30-34</th>
      <td>8.11</td>
      <td>6</td>
    </tr>
    <tr>
      <th>35-39</th>
      <td>8.11</td>
      <td>6</td>
    </tr>
    <tr>
      <th>40+</th>
      <td>1.35</td>
      <td>1</td>
    </tr>
    <tr>
      <th>&lt;10</th>
      <td>6.76</td>
      <td>5</td>
    </tr>
  </tbody>
</table>
</div>



Purchasing Analysis (Age)


```python
age_analysis_df = hop_data_df.groupby("Age Group")
age_purchase = age_analysis_df["Age Group"].count()
age_average = round(age_analysis_df["Price"].mean(), 2)
age_revenue = round(age_analysis_df["Price"].sum(), 2)
age_normalized = round(age_revenue/age_count, 2)
age_buy_analysis = pd.concat([age_purchase, age_average, age_revenue, age_normalized], axis=1)
age_buy_analysis.columns = ["Purchase Count", "Average Purchase Price","Total Revenue","Normalized Average"] 
age_buy_analysis["Average Purchase Price"] = age_buy_analysis["Average Purchase Price"].map('${:,.2f}'.format)
age_buy_analysis["Total Revenue"] = age_buy_analysis["Total Revenue"].map('${:,.2f}'.format)
age_buy_analysis["Normalized Average"] = age_buy_analysis["Normalized Average"].map('${:,.2f}'.format)
age_buy_analysis
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
      <th>Purchase Count</th>
      <th>Average Purchase Price</th>
      <th>Total Revenue</th>
      <th>Normalized Average</th>
    </tr>
    <tr>
      <th>Age Group</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>10-14</th>
      <td>3</td>
      <td>$2.99</td>
      <td>$8.96</td>
      <td>$2.99</td>
    </tr>
    <tr>
      <th>15-19</th>
      <td>11</td>
      <td>$2.76</td>
      <td>$30.41</td>
      <td>$2.76</td>
    </tr>
    <tr>
      <th>20-24</th>
      <td>36</td>
      <td>$3.02</td>
      <td>$108.89</td>
      <td>$3.20</td>
    </tr>
    <tr>
      <th>25-29</th>
      <td>9</td>
      <td>$2.90</td>
      <td>$26.11</td>
      <td>$3.26</td>
    </tr>
    <tr>
      <th>30-34</th>
      <td>7</td>
      <td>$1.98</td>
      <td>$13.89</td>
      <td>$2.32</td>
    </tr>
    <tr>
      <th>35-39</th>
      <td>6</td>
      <td>$3.56</td>
      <td>$21.37</td>
      <td>$3.56</td>
    </tr>
    <tr>
      <th>40+</th>
      <td>1</td>
      <td>$4.65</td>
      <td>$4.65</td>
      <td>$4.65</td>
    </tr>
    <tr>
      <th>&lt;10</th>
      <td>5</td>
      <td>$2.76</td>
      <td>$13.82</td>
      <td>$2.76</td>
    </tr>
  </tbody>
</table>
</div>



Top Spenders


```python
top_spenders = hop_data_df.groupby("SN")
top_spender_total = top_spenders["Price"].sum()
top_spender_count = top_spenders["Item ID"].count()
top_spender_average = round(top_spender_total/top_spender_count, 2)
top5spenders = pd.concat([top_spender_count, top_spender_average,top_spender_total], axis=1).nlargest(5,"Price")
top5spenders.columns = ["Purchase Count", "Average Purchase Price", "Total Purchase Value"]
top5spenders["Average Purchase Price"] = top5spenders["Average Purchase Price"].map('${:,.2f}'.format)
top5spenders["Total Purchase Value"] = top5spenders["Total Purchase Value"].map('${:,.2f}'.format)
top5spenders
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
      <th>Purchase Count</th>
      <th>Average Purchase Price</th>
      <th>Total Purchase Value</th>
    </tr>
    <tr>
      <th>SN</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Sundaky74</th>
      <td>2</td>
      <td>$3.70</td>
      <td>$7.41</td>
    </tr>
    <tr>
      <th>Aidaira26</th>
      <td>2</td>
      <td>$2.56</td>
      <td>$5.13</td>
    </tr>
    <tr>
      <th>Eusty71</th>
      <td>1</td>
      <td>$4.81</td>
      <td>$4.81</td>
    </tr>
    <tr>
      <th>Chanirra64</th>
      <td>1</td>
      <td>$4.78</td>
      <td>$4.78</td>
    </tr>
    <tr>
      <th>Alarap40</th>
      <td>1</td>
      <td>$4.71</td>
      <td>$4.71</td>
    </tr>
  </tbody>
</table>
</div>



Most Popular Items


```python
popular_df = hop_data_df.loc[:,["Item ID", "Item Name","Price"]]
most_popular = popular_df.groupby("Item Name")
most_popular_count = most_popular["Item ID"].count()
most_popular_total = most_popular["Price"].sum()
most_popular_average = round(most_popular_total/most_popular_count, 2)
most_popular_table = pd.DataFrame({"Purchase Count": most_popular_count, 
                                   "Item Price": most_popular_average,
                                    "Total Purchase Value": most_popular_total}).nlargest(5, "Purchase Count")
most_popular_table["Total Purchase Value"]= most_popular_table["Total Purchase Value"].map('${:,.2f}'.format)
most_popular_table["Item Price"]= most_popular_table["Item Price"].map('${:,.2f}'.format)
most_popular_table
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
      <th>Item Price</th>
      <th>Purchase Count</th>
      <th>Total Purchase Value</th>
    </tr>
    <tr>
      <th>Item Name</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Mourning Blade</th>
      <td>$3.64</td>
      <td>3</td>
      <td>$10.92</td>
    </tr>
    <tr>
      <th>Apocalyptic Battlescythe</th>
      <td>$4.49</td>
      <td>2</td>
      <td>$8.98</td>
    </tr>
    <tr>
      <th>Betrayer</th>
      <td>$4.12</td>
      <td>2</td>
      <td>$8.24</td>
    </tr>
    <tr>
      <th>Crucifer</th>
      <td>$2.64</td>
      <td>2</td>
      <td>$5.29</td>
    </tr>
    <tr>
      <th>Deadline, Voice Of Subtlety</th>
      <td>$1.29</td>
      <td>2</td>
      <td>$2.58</td>
    </tr>
  </tbody>
</table>
</div>



Most Profitable Items


```python
most_profitable = popular_df.groupby("Item Name")
most_profitable_count = most_profitable["Item Name"].count()
most_profitable_total = most_profitable["Price"].sum()
most_profitable_average = round(most_profitable_total/most_profitable_count, 2)
most_profitable_table = pd.DataFrame({"Purchase Count": most_profitable_count, 
                                   "Item Price": most_profitable_average,
                                    "Total Purchase Value": most_profitable_total}).nlargest(5, "Total Purchase Value")
most_profitable_table["Total Purchase Value"]= most_profitable_table["Total Purchase Value"].map('${:,.2f}'.format)
most_profitable_table["Item Price"]= most_profitable_table["Item Price"].map('${:,.2f}'.format)
most_profitable_table
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
      <th>Item Price</th>
      <th>Purchase Count</th>
      <th>Total Purchase Value</th>
    </tr>
    <tr>
      <th>Item Name</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Mourning Blade</th>
      <td>$3.64</td>
      <td>3</td>
      <td>$10.92</td>
    </tr>
    <tr>
      <th>Heartstriker, Legacy of the Light</th>
      <td>$4.71</td>
      <td>2</td>
      <td>$9.42</td>
    </tr>
    <tr>
      <th>Apocalyptic Battlescythe</th>
      <td>$4.49</td>
      <td>2</td>
      <td>$8.98</td>
    </tr>
    <tr>
      <th>Betrayer</th>
      <td>$4.12</td>
      <td>2</td>
      <td>$8.24</td>
    </tr>
    <tr>
      <th>Feral Katana</th>
      <td>$4.11</td>
      <td>2</td>
      <td>$8.22</td>
    </tr>
  </tbody>
</table>
</div>




```python

```
