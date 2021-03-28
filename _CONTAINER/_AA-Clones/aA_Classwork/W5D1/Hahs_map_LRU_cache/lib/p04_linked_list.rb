class Node
  attr_reader :key
  attr_accessor :val, :next, :prev

  def initialize(key = nil, val = nil)
    @key = key
    @val = val
    @next = nil
    @prev = nil
  end

  def to_s
    "#{@key}: #{@val}"
  end

  def remove
    # optional but useful, connects previous link to next link
    # and removes self from list.
  end
end

class LinkedList 
  include Enumerable
  def initialize
    @head = Node.new
    @tail = Node.new
    @head.next = @tail
    @tail.prev = @head
  end

  def [](i)
    each_with_index { |link, j| return link if i == j }
    nil
  end

  def first
    @head.next
  end

  def last
    @tail.prev
  end

  def empty?
    @head.next == @tail
  end

  def get(key)

  end

  def include?(key)
    return true if @head.key == key
    
    cur_node = @head.next
    until cur_node == nil
      return true if cur_node.key == key
      cur_node = cur_node.next
    end
    false
  end

  def append(key, val)
    new_node = Node.new(key, val)
    prev_node = @tail.prev 
    prev_node.next = new_node
    @tail.prev = new_node
    new_node.prev = prev_node
    new_node.next = @tail
  end

  def update(key, val)
  end

  def remove(key)
  end

  def each    
    new_arr = []
    cur_node = @head.next
    until cur_node == @tail
      yield(cur_node)
      cur_node = cur_node.next
    end
  end

  # uncomment when you have `each` working and `Enumerable` included
  # def to_s
  #   inject([]) { |acc, link| acc << "[#{link.key}, #{link.val}]" }.join(", ")
  # end
end
