# Blog_API

# Tech

This API was developed on NodeJS. Using Postman as platform to test and iterate with the BlogAppAPI that storages the users info and blogs in a MongoDB database in the cloud.

Server: Node, Express

Database: MongoDB

Tools: Postman

# Environmental Variables

To run this project you will need to add the following variables to your .env file:

MONGODB_URI
PORT=
SECRET_KEY

# Instructions on Installing

npm install express --save

npm install morgan --save

npm install helmet --save

npm install mongoose --save

npm install express-validator --save

npm install jsonwebtoken --save

npm install dotenv --save

npm install bcrypt --save

# MiddleWare

Morgan - benefits:
It provides flexibility in defining the format of log messages
It allows you to overwrite the output destination for your logs

         - Reason for it: To pick up the request object and log whatever you need, like information such as the method used,
         the origin IP, the requested URL etc.

Helmet.js - fills in the gap between Node.js and Express.js by securing HTTP headers that are returned by your Express apps

JWT - defines a compact and self-contained way for securely transmitting information between parties
<img width="644" alt="Screen Shot 2022-06-21 at 10 07 57 AM" src="https://user-images.githubusercontent.com/103075446/174820531-eddcf1c0-3ed5-4ec6-9290-444e630a5a49.png">

# Schemas used

-User Schema - username: string, required - email: string, required - birthday: date, required - age: number - password: string, required

-Blog Schema - created_by: string, required - created_at: date, required - blog_title: string, required - blog_content: string, required - private: boolean, required
