# Project Two

## GameHOC Project:
* **Team: It Works on Local**
    - Joshua Hovis
    - David Oliveros
    - Sam Cowing

* **App Name**
    - GameHOC

* **Description**
    - A comprehensive database of games for users to browse by categories and learn more about selected games. Users can make collections and then save games to specific collections of their choice. Collections can be deleted or modified by the user.
    - Key to the game data is the RAWG.io API (GET https://api.rawg.io/api/).

    Site link: (https://gamehoc1.herokuapp.com/)

* **Screenshots**

    ![Insert Image here](https://i.imgur.com/mvJeIFZ.png)
    ![Insert Image here](https://i.imgur.com/241d65L.png)
    ![Insert Image here](https://i.imgur.com/mYkaUTD.png)
    ![Insert Image here](https://i.imgur.com/Ya2mZuo.png)
    ![Insert Image here](https://i.imgur.com/QSBToYC.png)

* **How to install**
    - Install For install, simply fork and clone the github repository https://github.com/samcowing/GameHOC. Once on your local, install the technologies used below (with the exception of bootstrap with is already included). 

* **Technologies Used**
    - bootstrap, node.js, ejs, node-fetch, express, express-sessions, b-crypt, moment

* **Key features**
    - Homepage of specific featured (new/trending) games
    - Categories page where you can view game by selecting categories in the nav
    - Game detail page where you can find info on a selected game
    - Collections page of all user made collections
    - Collection or list page that displays the contents of a given collection
    - User will have the ability to create, edit and modify their collections
    - User will be able to add games to a collection from any game category or detail page
    - Ability to login or create an account
    - Genre overview on specific genres page

* **Future features**
    - Parallel fetch request
    - Add to collections update from GET to POST
    - Login user notifications (especially for login-fail)
    - Search bar functionality
    - Adding review to game and viewing other reviews on game detail page
    - Related games (games in series or most matching genres
    - Update game rating based off of review rating
    - Added homepage features
    - Footer with API credit

* **ERD**

    ![Insert Image here](https://i.imgur.com/e80LqfM.png)

* **Routing Charts**

Home Routes

|#|Action|Functionality|URL|Method|Views|
|:---:|:---:|:---:|:---:|:---:|:---:|
|1| Index | Fetch new and highest rated games | / | GET | index.ejs |
|2| Index | Sign-up | /signup | GET | index.ejs |
|3| Index | Login-prompt | /prompt | GET | index.ejs |

Games Routes

|#|Action|Functionality|URL|Method|Views|
|:---:|:---:|:---:|:---:|:---:|:---:|
|1| Index | Display all games | /genres | GET | games/index.ejs |
|2| Index | Display all games in a given genre | /genres/:id | GET | games/index.ejs |
|3| Show | Display a single game | /games/:id | GET | games/show.ejs |
|4| Index | Add game to a collection | /collection-add/:gameId/:collectionId | GET | (last user location) |

Collection Routes

|#|Action|Functionality|URL|Method|Views|
|:---:|:---:|:---:|:---:|:---:|:---:|
|1| Index | Display all wishlists | /collections | GET | collection/index.ejs |
|2| Show | Display a single wishlist | /collections/:id | GET | redirect to /wishlist/:id
|3| New | Create a new wishlist | /collections/new | GET | collection/new.ejs
|4| Create | Add a new wishlist to the collections | /collections | POST | redirect to /collection
|5| Edit | Edit the wishlist name and description | /collections/:id | GET | collection/edit.ejs
|6| Update | Update a wishlist | /collections/:id | PUT | redirect to collection/index.ejs
|7| Destroy | Delete a wishlist | /collections/:id | DELETE | redirect to /collection
|8| Destroy | Delete a games from wishlist | /:id/:gameId | DELETE | redirect to /collection/:id
