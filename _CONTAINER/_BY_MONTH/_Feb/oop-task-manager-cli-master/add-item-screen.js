// IMPORTANT! IMPORTANT!
// ---------------------------------------------------------------------
// ALL SCREEN CLASSES HAVE A this.state INSTANCE VARIABLE THAT HOLDS THE
// APPLICATION STATE CREATED IN THE program.js. WHENEVER YOUR CODE NEEDS
// TO INTERACT WITH THE STATE IN ONE OF THE FOLLOWING CLASSES, DO IT
// THROUGH THE this.state INSTANCE VARIABLE.

class AddItemScreen {
  constructor(rl, state) {
    this.rl = rl;
    this.state = state;
  }

  printChoiceUi() {
    console.clear();
    console.log("********************************************");
    console.log("* CREATE AN ITEM                (c) 1987   *");
    console.log("********************************************");
    console.log();
    console.log("What kind of to-do item do you want to");
    console.log("create?");
    console.log();
    console.log("1. Note");
    console.log("2. Task");
    console.log();
    console.log("Type the number and hit \"Enter\".");
    console.log();
  }

  printNoteUi() {
    console.clear();
    console.log("********************************************");
    console.log("* CREATE A NOTE                 (c) 1987   *");
    console.log("********************************************");
    console.log();
    console.log("(Type your text and hit \"Enter\" to return to");
    console.log("the to-do list screen, 300 characters max.)");
    console.log();
    console.log("What is the note?");
    console.log();
  }

  printTaskUi1() {
    console.clear();
    console.log("********************************************");
    console.log("* CREATE A TASK                 (c) 1987   *");
    console.log("********************************************");
    console.log();
    console.log("What is the title?");
    console.log();
  }

  printTaskUi2(title) {
    console.clear();
    console.log("********************************************");
    console.log("* CREATE A TASK                 (c) 1987   *");
    console.log("********************************************");
    console.log();
    console.log(`TITLE: ${title}`);
    console.log();
    console.log("What is the category?");
    console.log();

    // TODO: Print all five category names with a one-based index
    //       like in the screen mockup in the project description.

    console.log();
  }

  printTaskUi3(title, categoryName) {
    console.clear();
    console.log("********************************************");
    console.log("* CREATE A TASK                 (c) 1987   *");
    console.log("********************************************");
    console.log();
    console.log(`TITLE: ${title}`);
    console.log(`CATEGORY: ${categoryName}`);
    console.log();
    console.log("(Type your text and hit \"Enter\" to return to");
    console.log("the to-do list screen, 300 characters max.)");
    console.log();
    console.log("What is the description?");
    console.log();
  }

  show() {
    this.printChoiceUi();
    this.rl.question("> ", answer => {
      if (answer === "1") {
        this.printNoteUi();
        this.rl.question("> ", note => {
          // TODO: Add a note to-do item to your state
          //       using the variable note
          // TODO: Save the state
          const newNote = new Note(note);
          this.state.items.push(newNote);
          const screen = new ManageTasksScreen(this.rl, this.state);
          screen.show();
        });
      } else if (answer === "2") {
        this.printTaskUi1();
        this.rl.question("> ", title => {
          this.printTaskUi2(title);
          this.rl.question("> ", categoryIndex => {
            categoryIndex = Number.parseInt(categoryIndex) - 1;
            // TODO: Use the value categoryIndex to get the
            //       name of the category and set the following
            //       value to the category name
            const categoryName = this.state.categories[categoryIndex];
            this.printTaskUi3(title, categoryName);
            this.rl.question("> ", description => {
              const newTask = new Task(title, categoryName, description);
              this.state.items.push(newTask);
              // TODO: Add a task to-do item to your state
              //       using the variables title, categoryIndex,
              //       and description
              // TODO: Save the state

              const screen = new ManageTasksScreen(this.rl, this.state);
              screen.show();
            });
          });
        })
      } else {
        this.show();
      }
    })
  }
}

exports.AddItemScreen = AddItemScreen;

// Requires at bottom to prevent circular dependencies problems in node
const { ManageTasksScreen } = require('./manage-task-screen');
const { Note, Task } = require('./application');
