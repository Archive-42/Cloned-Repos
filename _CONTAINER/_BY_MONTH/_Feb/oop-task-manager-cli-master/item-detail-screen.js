// IMPORTANT! IMPORTANT!
// ---------------------------------------------------------------------
// ALL SCREEN CLASSES HAVE A this.state INSTANCE VARIABLE THAT HOLDS THE
// APPLICATION STATE CREATED IN THE program.js. WHENEVER YOUR CODE NEEDS
// TO INTERACT WITH THE STATE IN ONE OF THE FOLLOWING CLASSES, DO IT
// THROUGH THE this.state INSTANCE VARIABLE.

class ItemDetailScreen {
  constructor(rl, state, index) {
    this.rl = rl;
    this.state = state;
    this.index = index;
  }

  printNoteUi(text) {
    console.clear();
    console.log("********************************************");
    console.log("* TO-DO ITEM (NOTE)             (c) 1987   *");
    console.log("********************************************");
    console.log();
    console.log(text);
    console.log();
  }

  printTaskUi(title, description, categoryName) {
    console.clear();
    console.log("********************************************");
    console.log("* TO-DO ITEM (TASK)             (c) 1987   *");
    console.log("********************************************");
    console.log();
    console.log(`TITLE: ${title}`);
    console.log(`CATEGORY: ${categoryName}`);
    console.log("DESCRIPTION");
    console.log(description);
    console.log();
  }

  show() {
    // const item = this.state.(this.index);
    // TODO: Determine what kind of item is in the state and
    //       referenced by the value in this.index.
    // TODO: If there is not item referenced by this.index,
    //       then do whatever kind of error handling you'd
    //       like, just don't let the program crash.
    // TODO: If it is a Note, then get the text from the note
    //       and call the this.printNoteUi(text) method.
    // TODO: If it is a Task, then get the title, description,
    //       and category index, translate the category index
    //       into a category name from the note and call the
    //       this.printTaskUi(title, description, categoryName)
    //       method.

    console.log("Type \"C\" and hit \"Enter\" to complete this");
    console.log("task and return to the list screen. Just");
    console.log("hit \"Enter\" to return to the list screen.");
    this.rl.question("> ", answer => {
      if (answer === "C") {
        this.completed = "C"

      }
      const screen = new ManageTasksScreen(this.rl, this.state);
      screen.show();
    });
  }
}

exports.ItemDetailScreen = ItemDetailScreen;

// Requires at bottom to prevent circular dependencies problems in node
const { ManageTasksScreen } = require('./manage-task-screen');
