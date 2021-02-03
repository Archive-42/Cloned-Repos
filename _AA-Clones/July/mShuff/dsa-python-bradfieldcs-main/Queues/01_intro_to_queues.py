# Queue Examples - Any line you wait in, print queues

# A queue is structured as an ordered collection of items which are added at one end, called
# the “rear,” and removed from the other end, called the “front.” The queue operations are:
#  - Queue() creates a new queue that is empty. It needs no parameters and returns an empty queue.
#  - enqueue(item) adds a new item to the rear of the queue. It needs the item and returns nothing.
#  - dequeue() removes the front item from the queue. It needs no parameters and returns the item. The queue is modified.
#  - is_empty() tests to see whether the queue is empty. It needs no parameters and returns a boolean value.
#  - size() returns the number of items in the queue. It needs no parameters and returns an integer.

# ---- EXAMPLE ----
# Queue Operation	  Queue Contents	    Return Value
# q.is_empty()          []	                  True
# q.enqueue(4)          [4]
# q.enqueue('dog')      ['dog', 4]
# q.enqueue(True)       [True, 'dog', 4]
# q.size()              [True, 'dog', 4]	    3
# q.is_empty()          [True, 'dog', 4]	  False
# q.enqueue(8.4)       [8.4, True, 'dog', 4]
# q.dequeue()           [8.4, True, 'dog']	    4
# q.dequeue()           [8.4, True]	          'dog'
# q.size()              [8.4, True]	            2
