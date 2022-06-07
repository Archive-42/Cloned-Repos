let term = "something"

let toDoEntries = ["go get milk", "something", "grab food"]

function compareSearchWords(term, toDoEntries) {
    // data => array of strings, each string one entry?
        let onlyMatchingEntries = toDoEntries.filter(function (todoEntry) { // TODO BOTTOM if todo-item has 'more than one text field', search then
          if (todoEntry.includes(term)) {
            return true;
          };
        });
        // Filter to make an array of only item titles
        return onlyMatchingEntries; // These are the item TITLES, not contents
};


console.log(compareSearchWords(term, toDoEntries))
