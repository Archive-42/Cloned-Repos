class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }

    toString() {
        return `Node: (value: ${this.value}, next: ${this.next})`;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    toString() {
        return `Head: ${this.head} \n Length: ${this.length}`;
    }

    push(value) {
        let newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length += 1;
        return this.length;
    }

    pop() {
        if (this.head) {
            let current = this.head;
            let newTail = current;
            while (current.next) {
                newTail = current;
                current = current.next;
            }
            this.tail = newTail;
            this.tail.next = null;
            this.length -= 1;
            return current;
        } else {
            return undefined;
        }
    }

    shift() {
        if (this.head) {
            let oldHead = this.head;
            this.head = oldHead.next;
            this.length -= 1;
            return oldHead;
        } else {
            return null;
        }
    }

    unshift(value) {
        let newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length += 1;
        return this.length;
    }

    get(index) {
        if (index < 0 || index >= this.length) return undefined;
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    }

    set(index, value) {
        if (index < 0 || index >= this.length) return undefined;
        let node = this.get(index);
        if (node) {
            node.value = value;
            return node;
        }
    }

    insert(index, value) {
        if (index < 0 || index > this.length) return undefined;
        if (index === 0) return this.unshift(value);
        if (index === this.length) return this.push(value);
        let node = new Node(value);
        let prev = this.get(index - 1);
        node.next = prev.next;
        prev.next = node;
        return true;
    }

    remove(index) {
        if (index < 0 || index >= this.length) return undefined;
        if (index === this.length - 1) return this.pop();
        if (index === 0) return this.shift();
        let prev = this.get(index - 1);
        let removedNode = prev.next;
        prev.next = removedNode.next;
        this.length -= 1;
        return removedNode;
    }

    reverse() {
        let node = this.head;
        this.head = this.tail;
        this.tail = node;
        let next;
        let prev = null;
        for (let i = 0; i <= this.length; i++) {
            next = node.next;
            node.next = prev;
            prev = node;
            node = next;
        }
        return this;
    }
}

let list = new SinglyLinkedList();

list.push(1);
console.log(list);
list.push(2);
console.log(list);
list.unshift(0);
console.log(list);
list.insert(0, -1);
console.log(list);
list.insert(4, 4);
console.log(list);
list.insert(4, 3);

console.log(list);
console.log(list.reverse());
