class MaxIntSet
  attr_reader :store
  def initialize(max)
    @store = Array.new(max)
  end

  def insert(num)
    raise "Out of bounds" if num > store.length - 1 || num < 0
    store[num] = true
  end

  def remove(num)
    store[num] = false
  end

  def include?(num)
    return false if !store[num]
    return true
  end

  private

  def is_valid?(num)
  end

  def validate!(num)
  end
end

class IntSet
  attr_reader :num_buckets, :store
  def initialize(num_buckets = 20)
    @store = Array.new(num_buckets) { Array.new }
    @num_buckets = num_buckets
  end

  def insert(num)
    i = num % num_buckets
    store[i] << num
  end

  def remove(num)
    if include?(num)
      i = num % num_buckets
      store[i].delete(num)
      return num
    end
    nil
  end

  def include?(num)
    i = num % num_buckets
    store[i].include?(num)
  end

  private

  def [](num)
    # optional but useful; return the bucket corresponding to `num`
  end

  def num_buckets
    @store.length
  end
end

class ResizingIntSet
  attr_accessor :count, :store

  def initialize(num_buckets = 20)
    @store = Array.new(num_buckets) { Array.new }
    @count = 0
  end

  def insert(num)
    resize! if count >= num_buckets

    if !include?(num)
      self[num] << num 
      self.count += 1
    end
  end

  def remove(num)
    if include?(num)
      self[num].delete(num) 
      self.count -= 1
    end
  end

  def include?(num)
    self[num].include?(num)
  end

  private

  def [](num)
    # optional but useful; return the bucket corresponding to `num`
    i = num % num_buckets
    store[i]
  end

  def num_buckets
    @store.length
  end

  def resize!
    new_store = Array.new(num_buckets * 2) { Array.new }
    store_dup = store
    self.count = 0
    self.store = new_store
    store_dup.each do |bucket|
      bucket.each do |el|
        self.insert(el)
      end
    end
  end
end
