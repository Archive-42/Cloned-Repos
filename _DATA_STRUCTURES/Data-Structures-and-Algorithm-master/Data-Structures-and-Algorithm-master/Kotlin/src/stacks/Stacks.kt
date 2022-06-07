package stacks

class Stack {
    var arr = ArrayList<Int>()
    var topIndex = -1

    fun push(item: Int) {
        ++topIndex
        arr.add(topIndex, item)
    }

    fun pop(): Int = arr.removeAt(topIndex--)

    fun displayStack() {
        println("Stacks.Stack elements are: ")
        for (i in 0..topIndex) {
            println(arr[i])
        }
    }
}

fun main() {
    val stack = Stack()
    stack.push(5)
    stack.push(10)
    stack.push(9)
    stack.displayStack()
    val poppedItem = stack.pop()
    println("Popped element $poppedItem")
    stack.displayStack()
}