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

	isStackEmpty() {
		return this.top == -1 ? true : false
	}

	stackTopElement() {
		return this.elements[this.top]
	}
}



function balancedParenthesis(expression) {
	let S = new Stack()
	let openings = ['(', '{', '[']
	let closings = [')', '}', ']']


	for (let i = 0; i < expression.length; i++) {
		if (openings.includes(expression[i]))
			S.push(expression[i])

		else if (closings.includes(expression[i])) {
			if (S.isStackEmpty())
				return false
			else if(closings.indexOf(expression[i] === openings.indexOf(S.stackTopElement())))
				S.pop()
			else
				return false
		}
	}
	

	return S.isStackEmpty()
}



console.log(balancedParenthesis('(a+b)'))
console.log(balancedParenthesis('(a+b) + (a-b)'))
console.log(balancedParenthesis('(a+b)]'))
console.log(balancedParenthesis('}ab+c(a+b)'))
console.log(balancedParenthesis('[a)b+a]'))