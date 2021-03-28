# class Integer
#   # Integer#hash already implemented for you
# end

# class Array
#   def hash
#     base = 10000000000000000
#     str = ""
#     self.each do |char|
#       str += char.ord.to_s
#     end
#     base -= str.to_i
#     base
#   end
# end

# class String
#   def hash
#     base = 10000000000000000
#     str = ""
#     self.each_char do |char|
#       str += char.ord.to_s
#     end
#     base -= str.to_i
#     base
#   end
# end

# class Hash
#   # This returns 0 because rspec will break if it returns nil
#   # Make sure to implement an actual Hash#hash method
#   def hash
#     base = 10000000000000000
#     str = ""
#     self.sort.each do |k, v|
#       str += k.to_s.ord.to_s
#       str += v.to_s.ord.to_s
#     end
#     base -= str.to_i
#     base
#   end
# end
