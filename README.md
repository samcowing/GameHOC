## Your pitch must include:
* **A Project Repo**
  - Choose a git project owner who will create the git repo under their personal GitHub account
  - Project name must be unique and represent the app! Not "Project-2"
* **A `README.md`**
  - You can find a guide to how to use markdown syntax [here](https://guides.github.com/features/mastering-markdown/).
  - Your pitch README should include the following:
    - App name
    - Short app description
    - Basic low-fidelity wireframes
    - User stories
    - MVP goals list
    - Stretch goals list
    - Database ERD diagrams
    - RESTful routing chart for each database resource
  - Article: [How to Write a Good README File](https://www.freecodecamp.org/news/how-to-write-a-good-readme-file/)


------------------
## GameHOC Pitch:
* **App Name**
    - GameHOC

* **Description**
    - A comprehensive database of games for users to browse by categories and learn more about selected games. Users can make collections and then save games to specific collections of their choice. Collections can be deleted or modified by the user.
    - Key to the game data will be using the RAWR.io API (GET https://api.rawg.io/api/). The team has completed successful testing to ensure this will not be a potential blocker.

* **Wirefames**

    ![Insert Image here](https://i.imgur.com/znYoG7n.png)

    - Figma Link:

* **User Stories**
    - As a user I want to find games I'm interested in by navigating threw categories so that I can determine if there are games I would like to buy
    - As a uesr I want to be able to click on games I'm interested in so that I can learn more about them
    - As a user I want to save games I'm interested in so that I can view them later or compare
    - As a user I want to be able to create individual collections of games based on any criteria I determine 
    As a user I want to be able to add games to my collection lists
    - As a user I want to be abel to edit or delete any collections as needed

* **MVP Goals**
    - Homepage of specific featured (new/trending) games
    - Categories page where you can view game by selecting categories in the nav
    - Game detail page where you can find info on a selected game
    - Collections page of all user made collections
    - Collection or list page that displays the contents of a given collection
    - User will have the ability to create, edit and modify their collections
    - User will be able to add games to a collection from any game category or detail page

* **Stretch Goals**
    - Ability to login or create an account
    - Search bar functionality
    - Adding review to game and viewing other reviews on game detail page
    - Related games (games in series or most matching genres
    - Update game rating based off of review rating
    - Genre overview page with genre details

* **ERD**

    ![Insert Image here](https://i.imgur.com/oWl7SAt.png)

* **Routing Charts**
    - Home Routes
    |#|Action|Functionality|URL|Method|Views|
    |:---:|:---:|:---:|:---:|:---:|:---:|
    |1| Index | Display a handful of the trending games | / | GET | index.ejs |
    |2| Show |||||
    |3| New |||||
    |4| Create |||||
    |5| Edit |||||
    |6| Update |||||
    |7| Destroy ||||||

    - Categories Routes
    |#|Action|Functionality|URL|Method|Views|
    |:---:|:---:|:---:|:---:|:---:|:---:|
    |1| Index | Display all games in a given category | /categories | GET | index.ejs |
    |2| Show | Display a single game | /categories/:id | GET | show.ejs |
    |3| New |||||
    |4| Create |||||
    |5| Edit |||||
    |6| Update |||||
    |7| Destroy ||||||

    - Wishlist Routes
    |#|Action|Functionality|URL|Method|Views|
    |:---:|:---:|:---:|:---:|:---:|:---:|
    |1| Index | Display all user created collections | /collections | GET | collection/index.ejs |
    |2| Show | Display a single collection | /collection/:id | GET | /collection/show.ejs |
    |3| New | Create a new collection | /collection/new | GET | /collection/new.ejs |
    |4| Create | Add a new collection to collections list | /collection | POST | /collections.ejs |
    |5| Edit | Edit a collection | /collection/:id/edit | GET | /collection/edit.ejs |
    |6| Update | Update the edited collection | /collection/:id | PATCH/PUT | /collection/show.ejs |
    |7| Destroy | Delete a collection | /collection/:id | DELETE | /collections.ejs |

    