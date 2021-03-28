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

  printResultsUi(term, matchingEntries) {
    console.clear();
    console.log("********************************************");
    console.log("* SEARCH RESULTS                (c) 1987   *");
    console.log("********************************************");
    console.log(); // search > to-do items text-values (both notes and task items), compare to term // if blah blah more than one, worry later // category items shouldnt be 'test fields'
    console.log("Your search matches");
    console.log("Your search word is " + term)
    console.log();
    console.log(matchingEntries.join('\n'));
    console.log();
  }

  // let toDoEntries = ["go get milk", "something", "grab food"]
  compareSearchWords(term, toDoEntries) {
// data => array of strings, each string one entry?
    let onlyMatchingEntries = toDoEntries.filter(function (todoEntry) { // TODO BOTTOM if todo-item has 'more than one text field', search then
      if (todoEntry.includes(term)) {
        return true;
      };
    });
    // Filter to make an array of only item titles
    return onlyMatchingEntries; // These are the item TITLES, not contents**
  };
//  Create note page - user inputs text value, this is saved => compare to 'term' search value

    // TODO: Search the items as described in the requirements with
    //       the value stored in term. Print all of the matching
    //       items, complete and incomplete alike.


  show() {
    this.printUi();
    this.rl.question("> ", term => {
      let matchingEntries = this.compareSearchWords(term, ["go get milk", "something", "milk", "grab food"]); //TODO connect to State**
      this.printResultsUi(term, matchingEntries);
      this.rl.question("Enter to return to the main screen. ", () => {
        const screen = new MainScreen(this.rl, this.state);
        screen.show();
      });
    });
  }
}

exports.SearchScreen = SearchScreen;

const { MainScreen } = require('./main-screen');
