class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor(head) {
    this.head = null;
  }

  displayList() {
    let tempPtr = this.head;
    let output = '';
    while (tempPtr !== null) {
      output += `${tempPtr.data} -> `;
      tempPtr = tempPtr.next;
    }
    output += 'Null';
    console.log(output);
  }

  addAtBeginning(data) {
    let newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  addAtEnd(data) {
    let newNode = new Node(data);
    let tempPtr = this.head;
    while (tempPtr.next) {
      tempPtr = tempPtr.next;
    }

    tempPtr.next = newNode;
  }

  addAtNthPosition(data, position) {
    let tempPtr = this.head;
    for (let i = 0; i < position - 1; i++) {
      tempPtr = tempPtr.next;
    }

    let newNode = new Node(data);
    newNode.next = tempPtr.next;
    tempPtr.next = newNode;
  }

  removeFromBeginning() {
    if (this.head.next) this.head = this.head.next;
    else console.log('Items unavailable');
  }

  removeFromEnd() {
    let tempPtr = this.head;
    while (tempPtr.next.next) {
      tempPtr = tempPtr.next;
    }

    tempPtr.next = null;
  }

  removeFromNthPosition(position) {
    let tempPtr = this.head;
    for (let i = 0; i < position - 1; i++) {
      tempPtr = tempPtr.next;
    }

    tempPtr.next = tempPtr.next.next;
  }
}

let list = new LinkedList();
list.addAtBeginning(10);
list.addAtBeginning(20);
list.addAtBeginning(30);
list.addAtNthPosition(200, 2);
list.addAtEnd(0);
list.addAtEnd(100);
list.displayList();

list.removeFromBeginning();
list.displayList();

list.removeFromEnd();
list.displayList();

list.removeFromNthPosition(2);
list.displayList();
