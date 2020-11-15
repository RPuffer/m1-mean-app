# M1MeanApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.1.

## Requirements

- `Docker` is required to run the mongo instance
- `docker-compose` can be utilized to spin up the app and mongo instances all in containers


## Development

For development, pull down the repo and run:
```bash
npm install && npm run dev
```

This will spin up a mongo db instance using Docker while using `ng serve` to serve the angular front-end and `nodemon` to run the express back-end.  Both front-end and back-end code will hot reload on change.


## Using Docker Compose

With docker compose installed all you need to do is run:

```bash
docker-compose build && docker-compose up

# OR

npm run compose
```

This will build the application and spin up containers for both the application and the mongo db instance


## Overview

- The application displays cards face down in a matrix configuration with 4 rows and 13 columns.
- Clicking the DEAL! button will shuffle the deck and deal out random cards in said configuration.
- Any cards that have matching pairs (horizontally, vertically, or diagonally) will be highlighted in yellow
- Under the deal button, the percentage of the dealt configuration being correctly ordered is shown, along with the average percent correct for all decks
- All historical decks are displayed at the bottom of the page in a carousel along with their deck number and ordered percentage

Correct order is determined by a card being in the correctly suited row, or having a value in the correct column.  The "correct" row suits are:

| Suits |
|-- |
| ♠️ |
| ♦️ |
| ♥️ |
| ♣️ |


And the "correct" value orders are as you would expect:

[ A, 2, 3, 4, 5, 6, 7, 8, 9, T, J, Q, K ]
