// IMPORTANT! IMPORTANT!
// ---------------------------------------------------------------------
// ALL SCREEN CLASSES HAVE A this.state INSTANCE VARIABLE THAT HOLDS THE
// APPLICATION STATE CREATED IN THE program.js. WHENEVER YOUR CODE NEEDS
// TO INTERACT WITH THE STATE IN ONE OF THE FOLLOWING CLASSES, DO IT
// THROUGH THE this.state INSTANCE VARIABLE.

class SearchScreen {
  constructor(rl, state) {
    this.rl = rl;
    this.state = state;
  }

  printUi() {
    console.clear();
    console.log("********************************************");
    console.log("* SEARCH ITEMS                  (c) 1987   *");
    console.log("********************************************");
    console.log();
    console.log("Please type your search term and hit Enter.");
    console.log();
  }

  printResultsUi(term) {
    console.clear();
    console.log("********************************************");
    console.log("* SEARCH RESULTS                (c) 1987   *");
    console.log("********************************************");
    console.log();
    console.log("Your search matches");
    console.log();

    // TODO: Search the items as described in the requirements with
    //       the value stored in term. Print all of the matching
    //       items, complete and incomplete alike.

    console.log();
  }

  show() {
    this.printUi();
    this.rl.question("> ", term => {
      this.printResultsUi(term);
      this.rl.question("Enter to return to the main screen. ", () => {
        const screen = new MainScreen(this.rl, this.state);
        screen.show();
      });
    });
  }
}

exports.SearchScreen = SearchScreen;

const { MainScreen } = require('./main-screen');
