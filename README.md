# F1-champions

Angular 4 SPA to visualize F1 champions data fetched from ergast.com API

### Functionality

The App shows a list of F1 champions of the years 2005-2015. Clicking on a champions name will show a list of races results for that season with the winner of the race, round and the race name. If the winner of the race won the championship that season his name will be hightlighted. The list of season results is paginated and allows the user to control the amount of results on the list.

All results shown on the page are fetched from ergast.com API.

### Architecture

The app is a SPA built with Angular 4. It has a main AppComponent which controls the data shown on the page and two presentational components ChampionsListComponent and SeasonResultsComponent that display their corresponding data. Two services were implemented to fetch and filter the data obtainer from the backend, APIService and DataFiltersService.

The data flows from the main component to it's children, presentational components send events through their outputs to notify the parent that data updates are required.

All the components on the application have corresponding unit tests that were implemented using the Jasmine and Karma frameworks to ensure reusability and scalability.

Environment variables were set to control presets values for pagination and champions list results size and offset.

### How to run

* Install Nodejs and Angular-CLI if they aren't installed already in your system

 * Run de development server with `ng serve`

* Access the app by opening localhost:4200 in your browser

### Tests

Tests can be run with `ng test`