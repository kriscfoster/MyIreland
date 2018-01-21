# coding: utf-8
import json
from gensim.summarization import summarize
import pyrebase
import os

counties_info = json.load(open('../res/counties_info.json'))

counties = {
	"Cavan": {
		"link": counties_info["cavan"]["link"], 
		"summary": summarize(counties_info["cavan"]["text"], ratio = 0.7) 
	},
	"Monaghan": {
		"link": counties_info["monaghan"]["link"], 
		"summary": summarize(counties_info["monaghan"]["text"], ratio = 0.7) 
	},
	"Louth": {
		"link": counties_info["louth"]["link"], 
		"summary": summarize(counties_info["louth"]["text"], ratio = 0.7) 
	},
	"Meath": {
		"link": counties_info["meath"]["link"], 
		"summary": summarize(counties_info["meath"]["text"], ratio = 0.7) 
	},
	"Westmeath": {
		"link": counties_info["westmeath"]["link"], 
		"summary": summarize(counties_info["westmeath"]["text"], ratio = 0.7) 
	},
	"Donegal": {
		"link": counties_info["donegal"]["link"], 
		"summary": summarize(counties_info["donegal"]["text"], ratio = 0.7) 
	},
	"Leitrim": {
		"link": counties_info["leitrim"]["link"], 
		"summary": summarize(counties_info["leitrim"]["text"], ratio = 0.7) 
	},
	"Carlow": {
		"link": counties_info["carlow"]["link"], 
		"summary": summarize(counties_info["carlow"]["text"], ratio = 0.7) 
	},
	"Clare": {
		"link": counties_info["clare"]["link"], 
		"summary": summarize(counties_info["clare"]["text"], ratio = 0.7) 
	},
	"Cork": {
		"link": counties_info["cork"]["link"], 
		"summary": summarize(counties_info["cork"]["text"], ratio = 0.7) 
	},
	"Dublin": {
		"link": counties_info["cork"]["link"], 
		"summary": summarize(counties_info["dublin"]["text"], ratio = 0.7) 
	},
	"Galway": {
		"link": counties_info["galway"]["link"], 
		"summary": summarize(counties_info["galway"]["text"], ratio = 0.7) 
	},
	"Kerry": {
		"link": counties_info["kerry"]["link"], 
		"summary": summarize(counties_info["kerry"]["text"], ratio = 0.7) 
	},
	"Kildare": {
		"link": counties_info["kildare"]["link"], 
		"summary": summarize(counties_info["kildare"]["text"], ratio = 0.7) 
	},
	"Kilkenny": {
		"link": counties_info["kilkenny"]["link"], 
		"summary": summarize(counties_info["kilkenny"]["text"], ratio = 0.7) 
	},
	"Laois": {
		"link": counties_info["laois"]["link"], 
		"summary": summarize(counties_info["laois"]["text"], ratio = 0.7) 
	},
	"Limerick": {
		"link": counties_info["limerick"]["link"], 
		"summary": summarize(counties_info["limerick"]["text"], ratio = 0.7) 
	},
	"Longford": {
		"link": counties_info["longford"]["link"], 
		"summary": summarize(counties_info["longford"]["text"], ratio = 0.7) 
	},
	"Mayo": {
		"link": counties_info["mayo"]["link"], 
		"summary": summarize(counties_info["mayo"]["text"], ratio = 0.7) 
	},
	"Offaly": {
		"link": counties_info["offaly"]["link"], 
		"summary": summarize(counties_info["offaly"]["text"], ratio = 0.7) 
	},
	"Roscommon": {
		"link": counties_info["roscommon"]["link"], 
		"summary": summarize(counties_info["roscommon"]["text"], ratio = 0.7) 
	},
	"Sligo": {
		"link": counties_info["sligo"]["link"], 
		"summary": summarize(counties_info["sligo"]["text"], ratio = 0.7) 
	},
	"Tipperary": {
		"link": counties_info["tipperary"]["link"], 
		"summary": summarize(counties_info["tipperary"]["text"], ratio = 0.7) 
	},
	"Waterford": {
		"link": counties_info["waterford"]["link"], 
		"summary": summarize(counties_info["waterford"]["text"], ratio = 0.7) 
	},
	"Wexford": {
		"link": counties_info["wexford"]["link"], 
		"summary": summarize(counties_info["wexford"]["text"], ratio = 0.7) 
	},
	"Wicklow": {
		"link": counties_info["wicklow"]["link"], 
		"summary": summarize(counties_info["wicklow"]["text"], ratio = 0.7) 
	},
	"NorthernIreland": {
		"link": counties_info["northernIreland"]["link"], 
		"summary": summarize(counties_info["northernIreland"]["text"], ratio = 0.7) 
	},
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
