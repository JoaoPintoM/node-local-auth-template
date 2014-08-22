node-local-auth-template // starter kit
========================

Reference Article : http://fullstackguy.azurewebsites.net/nodejs-local-authentification-starter-kit/

It's a simple node.js starter kit with basic authentification forms. It uses **express.js**,  **MongoDB** / **mongoose** for the database side , **passport** to help on the authentification strategy and **jade** as view rendering platform. Of course everything can be change and adapted as you desire. 

Its the basics for **Local accounts** and I’ll improve this solution in the future to met other types of identifications such as *Facebook*, *Twitter*, *bearer token* based for API, etc…

This example is pretty straightforward, the goal is to protect some ressources.

# Getting Started

### The Installation

I’m assuming that you already have installed node.js on your computer.

	$ git clone https://github.com/JoaoPintoM/node-local-auth-template.git
    $ cd node-local-auth-template
    $ npm install
   
### MongoDB setup

Again I'm assuming you have already installed **mongoDB** on your computer. If not please refer to the official documentation: http://docs.mongodb.org/manual/installation/

###### For Mac or Linux users:
You need to setup your database folder; If mongoDB is already installed on your machine just use the command mongod providing the folder path you wanna use to store your data. For example I always create a **« data »** folder at the root of my node.js project

	$ mongod --dbpath /Users/me/myFolder/node-local-auth-template/data

###### For Windows users:
On a windows machine locate the mongod.exe file from the MongoDB download and run it to start the server daemon.

Once you’ve install the project and configure your mongo database, you be able to run it.

	$ npm start

Navigate to the following URL : **http://localhost:3000/** and play with da project. If you have some basics with HTTP Requests and know how the WEB works, you shouldn't have any problem to understand globally the source code.
