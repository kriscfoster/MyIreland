# coding: utf-8
import json
from gensim.summarization import summarize
import pyrebase
import os

counties_info = json.load(open('../res/counties_info.json'))

counties = {
	"cavan": {
		"link": counties_info["cavan"]["link"], 
		"summary": summarize(counties_info["cavan"]["text"], ratio = 0.5) 
	},
	"monaghan": {
		"link": counties_info["monaghan"]["link"], 
		"summary": summarize(counties_info["monaghan"]["text"], ratio = 0.5) 
	},
	"louth": {
		"link": counties_info["louth"]["link"], 
		"summary": summarize(counties_info["louth"]["text"], ratio = 0.5) 
	},
	"meath": {
		"link": counties_info["meath"]["link"], 
		"summary": summarize(counties_info["meath"]["text"], ratio = 0.5) 
	},
	"westmeath": {
		"link": counties_info["westmeath"]["link"], 
		"summary": summarize(counties_info["westmeath"]["text"], ratio = 0.5) 
	},
	"donegal": {
		"link": counties_info["donegal"]["link"], 
		"summary": summarize(counties_info["donegal"]["text"], ratio = 0.5) 
	},
	"leitrim": {
		"link": counties_info["leitrim"]["link"], 
		"summary": summarize(counties_info["leitrim"]["text"], ratio = 0.5) 
	}
}

config = {
  "apiKey": os.environ['FB_API_KEY'],
  "authDomain": os.environ['FB_AUTH_DOMAIN'],
  "databaseURL": os.environ['FB_DATABASE_URL'],
  "storageBucket": os.environ['FB_STORAGE_BUCKET']
 }

firebase = pyrebase.initialize_app(config)
db = firebase.database()


db.child("counties").set(counties)



