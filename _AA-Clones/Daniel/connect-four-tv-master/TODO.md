# Let's get started!

Rather than detailed instructions, today you will be receiving a list of TODO items, and you will work to complete our Connect Four Game!

## API definition

| method | path                                | body                    | notes                      |
|--------|-------------------------------------|-------------------------|----------------------------|
| POST   | /api/game                           | {'player1': <playerId>} | Create a new game          |
| POST   | /api/game/:id/player                | {'player2': <playerId>} | Add player2 to the game    |
| POST   | /api/game/:id/player/:playerId/move | {'column': <columnId> } | Make a move                |
| GET    | /api/game/:id                       |                         | Retrieve current game data |

## TODO:
1. Allow another player to join the game:
  - Create a "join game" form
  - Add a navigation link for your new component
  - The form should allow the user to specify which game they would like to join, as well as their player name
  - Upon submission of the form make a POST request.

```
POST /api/game/:id/player body: {"player2": <playerId} - add player2 to the game
```

  - After sucessfully joining the game, redirect the user to their game board.
  - Make sure to set the currentPlayer in localStorage

2. Allow players to make moves
  - in `gameApi` service file, add a new function to make a move, based on the API definition
  - add `onClick` handler to board cell squares
  - upon receiving a click, make a POST request.

```
POST /api/game/:id/player/:playerId/move data: {"column": <columnId>} - player moves to appropriate column
```
  - Make sure to display any errors received from the backend

3. Show Win condition when four in a row inserted
  - modify the `game` model in the flask app to include the current win state in it's `to_dict` JSON response
  - modify the `GameBoard` component to display this new information

4. Add styling
  - before we can send our new game to users, we need to style things to be much prettier!

BONUS TASKS:

  - Deploy to Heroku
    - a partial Dockerfile has been provided, complete the TODO's, and deploy to heroku
  - Add a loading screen to the GameBoard compnent, for better user experience
  - Fix the 2nd player overwrite bug
    - Once a 2nd player joins a game, subsequents requests to `/api/game/:id/player` should be rejected
  - Change the GameBoard component to use web sockets instead of polling
  - Allow users to register a game-token when they join the game and display it in all their played positions
    - [EXTRA] - create a players table, and allow users to save their tokens
  - Add background music
  - Scoreboard
    - record game winners in the game database
    - add a python endpoint that fetches all the matches and ranks them by winner
    - add a compopnent & navigation link to display game results
  - Replace the flask application with your own (without looking at the provided code) 
