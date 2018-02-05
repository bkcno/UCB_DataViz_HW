
# coding: utf-8

# # Mission to Mars - Scraping, Mongoing, and Flasking

# In[1]:

from bs4 import BeautifulSoup as bs
# !pip install -r requirements.txt
import pandas as pd
import requests
from splinter import Browser


# In[2]:

url = 'https://mars.nasa.gov/news/'

executable_path = {'executable_path': '/usr/local/bin/chromedriver'}
browser = Browser('chrome', **executable_path)


# In[3]:

# response = requests.get(url)
response = browser.visit(url)
# soup = bs(response.text, 'html.parser') 
soup = bs(browser.html, 'html.parser')
new_soup=soup.find('div', class_='grid_layout')
print(new_soup.prettify())


# ### NASA Mars News

# In[4]:

title = new_soup.find('div',class_='content_title')
news_title = title.text
print(news_title)


# In[5]:

p = new_soup.find('div',class_='article_teaser_body')
news_p = p.text
print(news_p)


# ### JPL Mars Space Image

# In[6]:

from selenium import webdriver

driver = webdriver.Chrome()
driver.get('https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars')

for image in driver.find_elements_by_xpath('//img[@src]'):
    print(image.get_attribute('src'))

driver.close()


# In[7]:

featured_image_url = 'https://www.jpl.nasa.gov/spaceimages/images/wallpaper/PIA22207-640x350.jpg'


# ### Mars Weather

# In[11]:

browser = Browser('chrome', executable_path='chromedriver', headless=False)
url = 'https://twitter.com/marswxreport?lang=en'
browser.visit(url)

soup1 = bs(browser.html, 'html.parser')
new_soup1 = soup1.find('p', class_='TweetTextSize TweetTextSize--normal js-tweet-text tweet-text')
print(new_soup1.prettify())


# In[12]:

mars_weather = new_soup1.text
print(mars_weather)


# ### Mars Facts

# In[13]:

import pandas as pd


# In[14]:

url = 'https://space-facts.com/mars/'

tables = pd.read_html(url)
tables


# In[15]:

df_mar = tables[0]
df_mar.columns = ['description','value']


# In[16]:

df_mar.to_html('table.html', index=False)


# In[17]:

get_ipython().system('open table.html')


# ### Mars Hemisperes

# In[92]:

browser = Browser('chrome', executable_path='chromedriver', headless=False)

urls = ['https://astrogeology.usgs.gov/search/map/Mars/Viking/cerberus_enhanced', 
        'https://astrogeology.usgs.gov/search/map/Mars/Viking/schiaparelli_enhanced', 
        'https://astrogeology.usgs.gov/search/map/Mars/Viking/syrtis_major_enhanced', 
        'https://astrogeology.usgs.gov/search/map/Mars/Viking/valles_marineris_enhanced']


titles = []
img_urls= []

for url in urls:
    browser.visit(url)
    soup = bs(browser.html, 'html.parser')
    soup_1 = soup.find('section', class_="block metadata")
    h2 = soup_1.find('h2', class_='title')
    title_h2 = h2.get_text().strip("Enhanced")
    titles.append(title_h2)

    soup_2 = soup.find('div', class_="downloads")
    possible_links = soup_2.find_all('a')
    for link in possible_links:
        tif_link = link.attrs['href']
        img_urls.append(tif_link)


# In[97]:

# viewing the lists:  
print(titles)
print(img_urls)


# In[102]:

# for i, j in titles, img_urls:
#     if "jpg" in j:
#         dictionary = {"title": i, "img_url": j}
#         print(dictionary)


# In[ ]:



