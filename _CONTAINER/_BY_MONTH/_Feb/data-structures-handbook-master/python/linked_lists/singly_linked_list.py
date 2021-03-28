class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

    def __repr__(self):
        return f"(Node: value: {self.value} next: {self.next})"


class SinglyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.length = 0

    def __repr__(self):
        return f"Head: {self.head} \n Length: {self.length}\n"

    # PUSH
    def push(self, value):
        new_node = Node(value)
        if(self.head is None):
            self.head = new_node
            self.tail = self.head
        else:
            self.tail.next = new_node
            self.tail = new_node
        self.length += 1
        return self.length

    # POP
    def pop(self):
        if (self.head is not None):
            current = self.head
            new_tail = current
            while current.next is not None:
                new_tail = current
                current = current.next
            self.tail = new_tail
            self.tail.next = None
            self.length -= 1
            return current

    # SHIFT
    def shift(self):
        # If the linked list is not empty
        if (self.head is not None):
            # crreate a variable current_head and set it to the linked list's head
            current_head = self.head
            # set the head of the linked list to current_heads next pointer
            self.head = current_head.next
            # decrement the length by 1
            self.length -= 1
            # return current_head
            return current_head

    # UNSHIFT
    def unshift(self, value):
        new_node = Node(value)
        if (self.head is None):
            self.head = new_node
            self.tail = new_node
        else:
            new_node.next = self.head
            self.head = new_node
        self.length += 1
        return self.length

    def get_index(self, index):
        if (index >= 0 and index < self.length):
            current = self.head
            for i in range(index):
                current = current.next
            return current

    def set_index(self, index, value):
        if (index >= 0 and index < self.length):
            node = self.get_index(index)
            if (node is not None):
                node.value = value
                return node

    def insert(self, index, value):
        if (index >= 0 and index <= self.length):
            if (index == 0):
                self.unshift(value)
                return True
            elif index == self.length:
                self.push(value)
                return True
            else:
                new_node = Node(value)
                prev = self.get_index(index - 1)
                if prev is not None:
                    new_node.next = prev.next
                    prev.next = new_node
                    self.length += 1
                    return True

    def remove(self, index):
        if (index >= 0 and index < self.length):
            if (index == self.length - 1):
                return self.pop()
            elif (index == 0):
                return self.shift()
            else:
                prev = self.get_index(index - 1)
                removed_node = prev.next
                prev.next = removed_node.next
                self.length -= 1
                return removed_node

    def reverse(self):
        node = self.head
        self.head = self.tail
        self.tail = node
        next = None
        prev = None
        for i in range(self.length):
            next = node.next
            node.next = prev
            prev = node
            node = next
        return self


singly = SinglyLinkedList()


singly.push(1)
# print("PUSH  \n", singly)
singly.push(2)
# print("PUSH \n", singly)
# singly.pop()
# print("POP \n", singly)
singly.unshift(0)
# print("UNSHIFT \n", singly)
# singly.shift()
# print("SHIFT \n", singly)
# print(singly.get(0))
# print(singly.get(1))
# print(singly.get(2))

print(singly.insert(0, -1))
print(singly.insert(4, 4))
print(singly.insert(4, 3))

print(singly)
print(singly.reverse())
