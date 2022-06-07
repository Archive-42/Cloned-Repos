// This is the State class that should manage the
// entire state of your application.

class State {
  // Called from program.js to create an instance
  // of the application state.
  constructor(filePath) {
    this.filePath = filePath;


    // TODO: Any other initialization that you need.
  }

  // Called from program.js if there is JSON saved
  // in the file pointed to by the value in
  // this.filePath.
  loadFromJson(data) {
    // TODO: Load this object from the data

  }

  // TODO: Your code, here, to manage the state
}

// TODO: All of your other classes, here.


// TODO: Export your classes, here, if necessary.
module.exports = {
  State
};
