package stacks.application

class BalanceStack {
    var arr = ArrayList<Char>()
    var topIndex = -1

    fun stackTopElement(): Char {
        return arr[topIndex]
    }

    fun isStackEmpty(): Boolean {
        return topIndex == -1
    }

    fun push(item: Char) {
        ++topIndex
        arr.add(topIndex, item)
    }

    fun pop(): Char = arr.removeAt(topIndex--)
}

fun testBalance(case: String): Boolean {

    val balanceStack = BalanceStack()

    val openings = listOf("(", "{", "[")
    val closings = listOf(")", "}", "]")

    for (i in case.indices) {
        if (case[i].toString() in openings) {
            balanceStack.push(case[i])
        } else if (case[i].toString() in closings) {
            when {
                balanceStack.isStackEmpty() -> return false
                closings.indexOf(case[i].toString()) == openings.indexOf(balanceStack.stackTopElement().toString()) -> balanceStack.pop()
                else -> return false
            }
        }
    }
    return balanceStack.isStackEmpty()
}

fun main() {
    println(testBalance("(a+b)"))
    println(testBalance("(a+b)+(a-b)"))
    println(testBalance("(a+b)}"))
    println(testBalance("}ab+c(a+b)"))
    println(testBalance("[a)b+a]"))
}