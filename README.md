# Gaming Forum Group Project

A gaming forum that allows everyone to view entries on their favorite videogames made by the community while allowing signed in users to create said posts to interact with a games community.


github: https://github.com/RGarrettLee/gaming-forum
Heroku: https://serene-reaches-32005.herokuapp.com/

Uses MVC structuring alongside mysql and sequelize to run the database. Node.JS and express.JS are used to create a REST compliant API.
The layout of the application was handled via templates ran with handlebars.js.
Uses GET and POST routes to show and update user forum content, alongside various DELETE routes to allow posts, genres and boards to be deleted by the creator.
We use a log in requirement for the POST route and thus employ use of sessions and cookies.
API/libraries used include slugify to modify the user URL for better user experience and bootstrap as styling.



User Story
AS A gamer who plays in a variety of genres
I WANT to visit a forum
SO THAT I can create and view discussion boards, posts, and comments about different games


deployed example:

![display](https://user-images.githubusercontent.com/104922988/177354530-3bd5566a-ce2e-4c6c-aa2e-fc9ec8ca3dca.PNG)




Layout wireframe:

![wireframe 1](https://user-images.githubusercontent.com/104922988/176238728-61029146-1a7d-494d-9e24-2daed25f67ba.PNG)
![wireframe 2](https://user-images.githubusercontent.com/104922988/176238757-dbc2a694-08cb-4ced-82c5-95c8f6c5f637.PNG)

