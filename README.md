# MyIreland

## Try It Out
Check out the deployment of this app [HERE](https://myireland.herokuapp.com/)

## Set up Locally

* ```git clone https://github.com/kriscfoster/MyIreland.git```
* ```cd MyIreland```
* ```npm install``` (This installs all npm libraries required for MyIreland)
* Populate environment variables
* ```npm start```
* Go to [http://localhost:3000/](http://localhost:3000/)

<img width="70%" alt="MyIreland" src="https://user-images.githubusercontent.com/17026751/35802937-ebcc8230-0a69-11e8-978c-c08c95bc70db.png">

## Project Specification
### General Information:

Tourists visiting Ireland are often overwhelmed by information on where to go and what to see. Some are interested in sites of historic significance, while others are more inclined to attend events and festivals. Locating information about a place which combines both static and relevant temporal material can be difficult. Even when available, the content is often difficult for non-native speakers of English to read.

This project aims to provide a solution to this problem through an interactive map of Ireland (using e.g. three.js). Upon clicking on a location, users will be presented with an easy-to-digest summary of the area (history, people of significance etc.), followed by more specific information about upcoming events. It is important that this is presented in comprehendable English, and that users are able to quickly and easily traverse the map to gain the information they require.
 
You will use NLTK/Python to parse and clean tourist, event and/or information websites which provide data of interest to foreign visitors regarding places in Ireland. The information may be personalised to account for different levels of language proficiency for the non-native user. 
 
This project is a design and implementation project and does not require any prior knowledge of language technology or linguistics. It is envisaged that MyIreland will be integrated with an ongoing research project at UCD which is developing an e-learning environment for second language learners. 

### Core:
* Design an interactive map of Ireland;
* Include information on places and events in easy-to-understand English;
* Create a web interface which is easy and enjoyable to use.

### Advanced:
* Personalisation of information in accordance with the language proficiency of the user;
* Automation of event detection and information inclusion on map allowing for future events to appear as they are announced.
