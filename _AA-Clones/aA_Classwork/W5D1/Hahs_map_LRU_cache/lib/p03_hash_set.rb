class HashSet
  attr_accessor :count, :store

  def initialize(num_buckets = 8)
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
    i = num.hash % num_buckets
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
