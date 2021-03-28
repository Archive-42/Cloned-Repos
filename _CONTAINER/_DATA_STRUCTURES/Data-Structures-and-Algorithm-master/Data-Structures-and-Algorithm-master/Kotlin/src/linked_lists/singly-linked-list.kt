package linked_lists

data class Node(
    var data: Int,
    var next: Node? = null
)

data class LinkedList(var head: Node? = null) {
    fun displayList() {
        var tempPtr = head
        var output = ""
        while (tempPtr != null) {
            output += "${tempPtr.data} -> "
            tempPtr = tempPtr.next
        }
        output += "Null"
        println(output)
    }

    fun addAtBeginning(data: Int) {
        val newNode = Node(data)
        newNode.next = head
        head = newNode
    }

    fun addAtEnd(data: Int) {
        val newNode = Node(data)
        var tempPtr = head
        while (tempPtr!!.next != null) {
            tempPtr = tempPtr.next
        }
        tempPtr.next = newNode
    }

    fun addAtNthPosition(data: Int, position: Int) {
        var tempPtr = head
        for (i in 1 until position) {
            tempPtr = tempPtr!!.next
        }
        val newNode = Node(data)
        newNode.next = tempPtr!!.next
        tempPtr.next = newNode
    }

    fun removeFromBeginning() {
        if (head!!.next != null) head = head!!.next
        else println("Items unavailable")
    }

    fun removeFromEnd() {
        var tempPtr = head
        while (tempPtr!!.next!!.next != null) {
            tempPtr = tempPtr.next
        }
        tempPtr.next = null
    }

    fun removeFromNthPosition(position: Int) {
        var tempPtr = head
        for (i in 1 until position) {
            tempPtr = tempPtr!!.next
        }
        tempPtr!!.next = tempPtr.next!!.next
    }
}

fun main() {
    val list = LinkedList()
    list.addAtBeginning(10)
    list.addAtBeginning(20)
    list.addAtBeginning(30)
    list.addAtNthPosition(200, 2)
    list.addAtEnd(0)
    list.addAtEnd(100)
    list.displayList()
    list.removeFromBeginning()
    list.displayList()
    list.removeFromEnd()
    list.displayList()
    list.removeFromNthPosition(2)
    list.displayList()
}