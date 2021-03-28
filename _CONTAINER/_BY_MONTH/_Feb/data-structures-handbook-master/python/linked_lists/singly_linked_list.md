# Singly Linked Lists

-   Contains _head_, _tail_, and _length_ properties.
-   Consist of nodes, each _node_ has a _value_ and _pointer_ to another node or None.

## Time Complexity:

-   Push: O(1)
-   Pop: O(n)
-   Shift: O(1)
-   Unshift: O(1)
-   Get Index: O(n)
-   Set Index: O(n)
-   Insertion: If at head or tail - O(1) else - O(n)

## Singly Linked Lists vs Arrays

### Lists

-   Do not have indexes.
-   Connected via nodes with a _next_ pointer.
-   Random Access isn't allowed.

### Arrays

-   Indexed in order.
-   Insertion and deletion can be expensive.
-   Can quickly be accessed at a specific index.

## Singly Linked List methods

### Push (insert_at_tail)

Adding a new _node_ to the end of the Linked List!

#### Pseudocode

1. Create a new node with the value passed into the method as an argument upon invocation.
2. If the linked list that you are calling this method on has no head.
3. Make the head of the linked list the new node.
4. Make the tail of the linked list the new node.
5. Else
6. Make the next pointer of the linked list's tail point to the new node.
7. Make the tail of the linked list the new node.

#### Python implementation

```python

def push(self, value):
    new_node = node(value)
    if (self.head is None):
        self.head = new_node
        self.tail = new_node
    else:
        self.tail.next = new_node
        self.tail = new_node
    self.length += 1;
    return self.length;

```

### Pop (remove_from_tail)

Removing a _node_ from the end of the Linked List.

#### Pseudocode

1. Check if the linked list head is not None, else don't do anything
2. Create variable current that points to the linked list's head
3. Create a variable new_tail that points to current
4. While current has a next node
5. set new_tail to current
6. set current to current.next
7. Set the tail of the linked list to new_tail
8. Set the next pointer of the linked lists tail to none.
9. Decrement the length of the linked list by one.

#### Python implementation

```python

def pop(self):
    if self.head is not None:
        current = self.head
        new_tail = current
        while current.next is not None:
            new_tail = current
            current = current.next
        self.tail = new_tail
        self.tail.next = None
        self.length -= 1
        return current
```

### Shift

Removing a _node_ from the beginning of the linked list

#### Pseudocode

1. Check if the linked list's head exists, if it doesn't don't do anything
2. Create a variable current_head and set it equal to the linked list's head
3. Set the head of the linked list's head equal to current_head.next
4. Decrement length by one
5. return current_head

#### Python Implementation

```python

def shift(self):
    if self.head is not None:
        current_head = self.head
        self.head = current_head.next
        self.length -= 1
        return current_head


```

### Unshift

Adding a new _node_ to the beginning of the linked list.

#### Pseudocode

1. Create a new node with the value passed in as an argument to the method.
2. If the linked list has no head
3. Set the head of the linked list equal to the new node
4. Set the tail of the linked list equal to the new node
5. Else
6. set the next pointer of the new_node to the linked list's head
7. set the linked list's head to the new_node
8. Increment the length of the linked list by one.
9. Return the length of the linked list.

#### Python Implementation

```python

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


```

### Get Index

Retrieving a _node_ by it's position in the Linked List.

#### Pseudocode

1. Function takes a index as an argument.
2. Check if the index is within bounds (>=0 AND < self.length)
3. Create a variable current and set it to the linked list's head
4. Loop through the linked list till you hit the index
5. In every iteration change current to current.next
6. Return current

#### Python Implementation

```python

def get_index(self, index):
    if (index >= 0 and index < self.length):
        current = self.head
        for i in range(index):
            current = current.next
        return current
```

### Set Index

Changing the value of a _node_ based on it's position in the Linked List.

#### Pseudocode

1. Function takes an index and a value as arguments
2. Check if the index is within bounds
3. Use the get method and pass it in the index and save it to change_node
4. If change node exists
5. change the value of change_node to the value passed in as an argument
6. Return change_node

#### Python Implementation

```python

def set_index(self, index, value):
    if (index >= 0 and index < self.length ):
        node = self.get_index(index)
        if (node is not None):
            node.value = value
            return node

```

### Insert

Inserting a _node_ with specified _value_ based on it's position in the list.

#### Pseudocode

1. Function takes in an index and a value as arguments
2. Check if index is within bounds
3. If the index is the length of the linked list
4. Use the push method on the linked list passing in the value as an argument anr return true
5. If the index passed in is 0
6. Use the unshift method on the linked list passing in the value as an argument and return true
7. Else
8. Create a new_node variable passing in the value
9. Use the get method on the linked list passing in the index - 1 and save it to a new variable called prev
10. set the new_node next pointer to prev.next
11. set the prev next pointer to the new node
12. Increment the length
13. Return true

#### Python Implementation

```python
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
            prev = self.get(index - 1)
            new_node.next = prev.next
            prev.next = new_node
            self.length += 1
            return True
```

### Remove

Removing a _node_ based on it's position in the list

#### Pseudocode

1. If the index is in bounds (length < and >= 0)
2. If the index is 0
3. Shift the linked list
4. Else If the index is the linked list's length - 1
5. Pop the linked list
6. Else use the get method on the linked list passing in the index - 1 and save it to a new variable prev
7. Create variable removed_node and set it to prev.next
8. Set prev next pointer to removed_nodes next pointer
9. Decrement the linked list's length by one
10. Return removed_node

#### Python Implementation

```python
def remove(self, index):
    if (index >= 0 and index < self.length):
        if index == 0:
            return self.shift()
        elif index == self.length - 1:
            return self.pop()
        else:
            prev = self.get_index(index - 1)
            removed_node = prev.next
            prev.next = removed_node.next
            self.length -= 1
            return removed_node
```

### Reverse

Reversing the linked list _in place_!

#### Pseudocode

1. Create variable node and set it equal to the linked list's head
2. Set the head property to the linked list's tail property
3. Set the tail property to node
4. create variable next and set it equal to None
5. Creeate variable prev and set it equal to None
6. Iterate through the length of the linked list
7. set next equal to node.next
8. set node.next equal to prev
9. set prev equal to node
10. set node equal to next
11. Once done looping return self

#### Pyhthon Implementation

```python

def reverse(self):
    node = self.head
    self.head = self.tail
    self.tail = node
    prev = None
    next = None
    for i in range(self.length):
        next = node.next
        node.next = prev
        prev = node
        node = next
    return self


```
