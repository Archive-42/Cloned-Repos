class Stack {
	constructor() {
		this.elements = []
		this.top = -1
	}

	push(item) {
		this.elements[++this.top] = item
	}

	pop() {
		if (top == -1)
			return 'Stack Underflow'

		return this.elements[this.top--]
	}

	printStack() {
		const { elements, top } = this
		for (let i = 0; i <= top; i++) {
			console.log(elements[i])
		}
	}
}


let s = new Stack()
s.push(5)
s.push(10)
s.printStack() // prints 5, 10

s.pop() // returns 10
s.printStack() // prints 5