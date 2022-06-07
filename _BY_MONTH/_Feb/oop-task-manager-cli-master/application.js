// This is the State class that should manage the
// entire state of your application.

class State {
  // Called from program.js to create an instance
  // of the application state.
  constructor(filePath) {
    this.filePath = filePath;
    this.items = [];
    this.categories = [`Category 1`,
                       `Category 2`,
                       `Category 3`,
                       `Category 4`,
                       `Category 5`,
    ];

    // TODO: Any other initialization that you need.
  }
  printItems() {
    this.items.forEach((item, index) => { // [Object]
      // console.log(`${index + 1}. ${note}`);
      if (item.completed === 'N') {
        if (item.type === 'Note') {
          console.log(`${index + 1}. ${item.text}`);
        } else {
        console.log(`${index + 1}. ${item.title}: ${item.category} : ${item.description}`);
        }
      }
    });
  }

  printCategories() {
    this.categories.forEach((category, index) => { // [Object]
      console.log(`${index + 1}. ${category}`);
    });
  }

  // Called from program.js if there is JSON saved
  // in the file pointed to by the value in
  // this.filePath.
  loadFromJson(data) {
    // TODO: Load this object from the data

  }

  // TODO: Your code, here, to manage the state
}

class Note {
  constructor(text) {
    this.text = text;
    this.type = 'Note';
    this.completed = 'N';
  }

}

class Task {
  constructor(title, category, description) {
    this.title = title;
    this.category = category;
    this.description = description;
    this.type = 'Task';
    this.completed = 'N';
  }
}

class Category {
  constructor(name) {
    this.name = name;
  }
}
// TODO: All of your other classes, here.


// TODO: Export your classes, here, if necessary.
module.exports = {
  State, Note, Task, Category
};
