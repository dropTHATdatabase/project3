
### Project #3: Citydipity
GA-Bowie Group Project

#![](http://salidarec.com/wp-content/uploads/2014/07/scavenger-hunt.gif)

### Mission Statement
Fun way of exploring the areas around you with your friends

### Introduction
This application will allow you to make **scavenger hunts** while exploring the places around you and share the hunt with your friends or participate in scavenger-hunts created by your friends. You can create your own scavenger-hunt with clues leading to particular locations which will point to the next clue. You must be physically at the location in order to check-in.The last person to complete all the clues looses.

---

### Technologies Used(To be updated):
* HTML/CSS
* JavaScript
* Node.js
* Express.js
* Postgres/SQL
* node modules -brcrypt,pg,body-parser,dotenv,morgan,express-session,pg-promise,path
* React

---

### Installation Instructions(To be Added):

---

### User Stories version 1:
#### Authentication
* As a guest, there should be a landing page that allows me to sign up/login for the application
* As a guest, I should be able to sign up for the application
* As a member, I should be able to log in if i already have an account
* As a member, after I log-in, the page should be welcoming and it should let me complete most of the application functions from this page
* As a member, my homepage should let me create new hunts
* As a member, my homepage should let me see the hunts that I am a part of
* As a member, I should be able to log out of the application

#### Creating a New Scavenger Hunt
* As a member, I should be able make a new scavenger hunt
* As a creator, I should be able to add clues to the scavenger hunt that I have created
* As a creator, I should be able to add location and text associated to a clue
* As a creator, I should be able to set the end time for the hunt
* As a creator, I should be able to share my scavenger hunt with other users/friends

#### Tracking Progress of Scavenger-hunts I created
* As a creator, I should be able to see the scavenger hunts that I have created
* As a creator, I should be able to track the progress of all the people participating in the hunt
* As a creator, I should be able to see the time left until the end of the hunt
* As a creator, I should be able to see all the clues associated with the hunt
* As a creator, I should be able to delete clues
* As a creator, I should be able to edit the clues
* As a creator, I should be able to deactivate/end the hunt

#### Tracking Progress of Scavenger-hunts I am a member of
* As a player, I should be able to see all the hunts that I have completed
* As a player, I should be able to see the clues that I have completed in a hunt
* As a player, I should be able to see the hunt I am currently participating in
* As a player, I should be able to see the hunt I am currently participating in
* As a player, I should be able to see the progress of all the players in the hunt
* As a player, I should be able to check-in to the location associated with a particular clue
* As a player, I should be able to see the time left until the end of the hunt
* As a player when I check-in to a location, I should know if it is right location associated with that particular clue
* As a player when I complete the hunt, I should get a notification saying that I finished the hunt

---

### DataBase Design:
#### Entity Relationship Diagram version 1:
#![](scavenger_erd.png)


### Wireframes version 1(To be Added):

#### Sign in | Log in Page
#![](./images/signin_login.png)

#### Member Home Page
#![](./images/member_homepage.png)

#### Creating New Scavenger Hunt & Clues Page
#![](./images/hunt_form.png)

#### Creator Game View Page
#![](./images/creator_game_view.png)

#### Player Game View Page
#![](./images/player_game_view.png)

---

### Views Used:
* index.html - Renders the signup page/login page, with data dynamically rendering on the client-side

---

### RESTful Routes(To be Updated):
|Description| Method | Route Name| View rendered|

---

### Future Implementations(To be Added):
