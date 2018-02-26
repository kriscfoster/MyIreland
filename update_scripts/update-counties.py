# coding: utf-8
import json
from gensim.summarization import summarize
from nltk import sent_tokenize
import pyrebase
import os
from textstat.textstat import textstat

counties_info = json.load(open('../res/counties_info.json'))

def getInformationSummary(countyName) :
	finSentences = []
	sentences = sent_tokenize(summarize(counties_info[countyName]["text"], ratio = 0.8))
	
	for index in range(len(sentences)):
		sentence = {
			"text": sentences[index],
			"difficulty": textstat.flesch_reading_ease(sentences[index])
		}

		finSentences.append(sentence)
	
	return finSentences

counties = {
	"Cavan": {
		"link": counties_info["cavan"]["link"], 
		"summary": getInformationSummary("cavan") 
	},
	"Monaghan": {
		"link": counties_info["monaghan"]["link"], 
		"summary": getInformationSummary("monaghan")
	},
	"Louth": {
		"link": counties_info["louth"]["link"], 
		"summary": getInformationSummary("louth")
	},
	"Meath": {
		"link": counties_info["meath"]["link"], 
		"summary": getInformationSummary("meath")
	},
	"Westmeath": {
		"link": counties_info["westmeath"]["link"], 
		"summary": getInformationSummary("westmeath")
	},
	"Donegal": {
		"link": counties_info["donegal"]["link"], 
		"summary": getInformationSummary("donegal")
	},
	"Leitrim": {
		"link": counties_info["leitrim"]["link"], 
		"summary": getInformationSummary("leitrim")
	},
	"Carlow": {
		"link": counties_info["carlow"]["link"], 
		"summary": getInformationSummary("carlow")
	},
	"Clare": {
		"link": counties_info["clare"]["link"], 
		"summary": getInformationSummary("clare")
	},
	"Cork": {
		"link": counties_info["cork"]["link"], 
		"summary": getInformationSummary("cork")
	},
	"Dublin": {
		"link": counties_info["dublin"]["link"], 
		"summary": getInformationSummary("dublin")
	},
	"Galway": {
		"link": counties_info["galway"]["link"], 
		"summary": getInformationSummary("galway")
	},
	"Kerry": {
		"link": counties_info["kerry"]["link"], 
		"summary": getInformationSummary("kerry")
	},
	"Kildare": {
		"link": counties_info["kildare"]["link"], 
		"summary": getInformationSummary("kildare")
	},
	"Kilkenny": {
		"link": counties_info["kilkenny"]["link"], 
		"summary": getInformationSummary("kilkenny")
	},
	"Laois": {
		"link": counties_info["laois"]["link"], 
		"summary": getInformationSummary("laois")
	},
	"Limerick": {
		"link": counties_info["limerick"]["link"], 
		"summary": getInformationSummary("limerick")
	},
	"Longford": {
		"link": counties_info["longford"]["link"], 
		"summary": getInformationSummary("longford")
	},
	"Mayo": {
		"link": counties_info["mayo"]["link"], 
		"summary": getInformationSummary("mayo")
	},
	"Offaly": {
		"link": counties_info["offaly"]["link"], 
		"summary": getInformationSummary("offaly")
	},
	"Roscommon": {
		"link": counties_info["roscommon"]["link"], 
		"summary": getInformationSummary("roscommon")
	},
	"Sligo": {
		"link": counties_info["sligo"]["link"], 
		"summary": getInformationSummary("sligo")
	},
	"Tipperary": {
		"link": counties_info["tipperary"]["link"], 
		"summary": getInformationSummary("tipperary")
	},
	"Waterford": {
		"link": counties_info["waterford"]["link"], 
		"summary": getInformationSummary("waterford")
	},
	"Wexford": {
		"link": counties_info["wexford"]["link"], 
		"summary": getInformationSummary("wexford")
	},
	"Wicklow": {
		"link": counties_info["wicklow"]["link"], 
		"summary": getInformationSummary("wicklow")
	},
	"NorthernIreland": {
		"link": counties_info["northernIreland"]["link"], 
		"summary": getInformationSummary("northernIreland")
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
