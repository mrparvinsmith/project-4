# Commutr Helpr
  
See the app on [Heroku](https://desolate-lowlands-14384.herokuapp.com/)  

This project will be a transportaion app for Santa Monica that shows the locations of nearby parking garages, trains, and buses. It also shows how many parking spaces are available in each garage.  

It will eventually include scheuled arrivals for each metro station and let users save their preferred garages, stations, and metro routes. Bike share stations will one day be included as well. 

I will be accessing [an api for parking](https://parking.api.smgov.net/) and [an api for the metro](http://developer.metro.net/). Possibly use [an api for a bikeshare](https://app.socialbicycles.com/developer/).

This app uses the following technologies:  
- Node.js v 5.7.1 for the run-time environment  
- MongoDB v 3.2.3 and Mongoose v 4.4.19 for the database (as well as Mongoose-BCrypt v 1.4.2 to encrypt user passwords)  
- Express v 4.13.4 to handle routing and back-end controllers  
- JSONWebToken v 7.0.0 to handle authentication  
- Body-Parser v 1.15.1, Cookie-Parser v 1.4.1, and Morgan v 1.7.0 to handle server requests  
- Path v 0.12.7 to handle file paths
- EJS v 2.4.1 and Angular v 1.5.5 to render the views  
- UI-Router v 0.3.0 to handle nested views  
- CSV-Parse v 1.1.0 to parse General Transit Feed Specification data obtained from the LA Metro  
- JQuery v 2.2.4 to handle the javascript on the station update page

![Screen Shot](https://github.com/mrparvinsmith/project-4/blobl/master/planning/App_Screen_Shot.png "Screen Shot")

---
###Planning Materials

[Trello Board](https://trello.com/b/VrvPHFuB/project-4#)

[ERD](https://github.com/mrparvinsmith/project-4/blob/master/planning/ERD.jpg)

[Wireframe](https://github.com/mrparvinsmith/project-4/blob/master/planning/Wireframe.jpg)


---
###Installation Instructions
* clone this repo onto your computer
* run npm install
* get `mongod` running in a tab in your terminal
* run `nodemon` from another tab in your terminal
* type `node seed.js` in yet another tab in your terminal
* in your browser go to [localhost:3000/update](http://localhost:3000/update)
* open up the dev tools window and go to the console panel
* click the edit button __AND DO NOTHING UNTIL THE NUMBER NEXT TO "success" STOPS GOING UP__ (it should be several thousand by the time it is done)
	* do this four times, waiting a couple minutes in between so you don't exceed the API request limit
* go back to [localhost:3000](http://localhost:3000/) and enjoy
