<h1>TrEx - Your Travel Buddy</h1>

New to the city?
Bringing the world together through live experiences
TrEx is a global platform for live experiences that allows anyone to share, find and attend events that fuel their passions and enrich their lives.
From music festivals, marathons, conferences, community rallies, and fundraisers, to gaming competitions and air guitar contests. 
Our mission is to bring the world together through live experiences.
TrEx is a complete web application that allows you to search, view and book ticket for places of recreation and experiences around you .
<hr>
<h2>Overview of the application</h2>
<ul>
<li>This web application allows user to sign up/login. Error handling has been done for the login/register use case.</li>
<li>Incorrect username/password won't allow the user to login.</li>
<li>On successful registration, email is sent to the registered email address of the user.</li>
<li>User can view top places to hang around and experiences, can view all events and search for events and book tickets.</li>
<li>User can also download a pdf copy of his/her ticket and can view order history.</li>
</ul>

<h2>Features/functionalities</h2>
<ul>
<li>CRUD Operations performed by user on MyBookings and User Details</li>
<li>Authentication/Authorisation using jwt</li>
<li>Connect Group Chat to allow access to user to communicate iwth each other</li>
<ii>Implemented TELEGRAM integration to send queries to Admin User via Channel</li>
<li>Implemented NGX Share feature to share the video and other data which is relevant to a entity</li>
<li>Performed search, sorting, filtering & pagination on the list of events</li>
<li>Detailed view of every event</li>
<li>Implemented a circular navigation bar</li>
<li>Sent mail upon successful booking using nodemailer</li>
<li>Generated a QR Code for attached it with the mail using qrcode API</li>
<li>Password encryption</li>
<li>Marked event location on Maps using Angular8-google maps</li>
<li>Upon successful booking of order, users can download pdf copy of their ticket</li>
</ul>

<h3>Steps to Setup and Run the Application</h3>

<b>Installation and Running</b>
1. You need to have **angular cli**, **node.js** and **npm** installed on your machine. Once installed, you can check the versions using the below commands

```sh
node -v
npm -v
```
Links for reference:
* [install node.js](https://nodejs.org/en/download/)
* [install angular-cli](https://github.com/angular/angular-cli)

2. Clone the project from GitHub Repository and Install all the necessary packages
```sh
git clone https://github.com/SuhasChandrashekar/TrEx.git
cd final-project-cruisers
npm install
```
3. Start node.js server
```sh
node server.js
```

4. Start angular server
```
ng serve
```

5. Start Mongo server
    1. In one shell run
        ```
        mongod.exe
        ```
    2. In another shell run
        ```
        mongo
        ```

6. Open your browser and go to [http://localhost:4200/](http://localhost:4200/)

Technologies Used

* Node.js
* Angular 8
* Mongo DB
* Express JS
* REST API
* Nodemailer
* ngx-sharebuttons
* YouTube API
* Reframejs
* pdfjs
* JWT
* Google maps API
* SCSS
* ParticleJS

