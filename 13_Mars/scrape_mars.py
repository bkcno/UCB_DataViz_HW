
# coding: utf-8
from bs4 import BeautifulSoup as bs
import pandas as pd
import requests
import re
from splinter import Browser

def scrape():
    mars_dicts = {}

# all mars data --- 
    url = 'https://mars.nasa.gov/news/'
    executable_path = {'executable_path': '/usr/local/bin/chromedriver'}
    browser = Browser('chrome', **executable_path)

    response = browser.visit(url)
    soup = bs(browser.html, 'html.parser')
    new_soup=soup.find('div', class_='grid_layout')


    # ### NASA Mars News
    title = new_soup.find('div',class_='content_title')
    news_title = title.text
    p = new_soup.find('div',class_='article_teaser_body')
    news_p = p.text


    # ### JPL Mars Space Image
    from selenium import webdriver

    driver = webdriver.Chrome()
    driver.get('https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars')

    for image in driver.find_elements_by_xpath('//img[@src]'):
        print(image.get_attribute('src'))

    driver.close()
    featured_image_url = 'https://www.jpl.nasa.gov/spaceimages/images/wallpaper/PIA22207-640x350.jpg'


    # ### Mars Weather
    browser = Browser('chrome', executable_path='chromedriver', headless=False)
    url = 'https://twitter.com/marswxreport?lang=en'
    browser.visit(url)

    soup1 = bs(browser.html, 'html.parser')
    new_soup1 = soup1.find('p', class_='TweetTextSize TweetTextSize--normal js-tweet-text tweet-text')

    mars_weather = new_soup1.text


    # ### Mars Facts
    import pandas as pd

    url = 'https://space-facts.com/mars/'
    tables = pd.read_html(url)
    tables

    df_mar = tables[0]
    df_mar.columns = ['description','value']

    # ### Mars Hemisperes

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
        possible_links = soup_2.find_all('a', href=lambda href: href and href.endswith("/full.jpg"))
        for link in possible_links:
            tif_link = link.attrs['href']
            img_urls.append(tif_link)

    hemisphere_image_urls = [{'title': title, 'img_url': img_url} for title, img_url in zip(titles,img_urls)]

    mars_dicts = {'news_title': news_title, 'news_p': news_p, 'featured_image_url': featured_image_url, 'mars_weather': mars_weather, 'mars_facts': df_mar, 'hemisphere_image_urls': hemisphere_image_urls}

    return mars_dicts

