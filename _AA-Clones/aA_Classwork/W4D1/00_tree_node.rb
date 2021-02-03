require 'byebug'

module Searchable
    # ['a','b','c','d','e','f'].dfs("target_value")
    def dfs(target_value = nil)
        #debugger
        return self if self.value == target_value && target_value != nil
        
        children.each do |child|
            result =  child.dfs(target_value) 
            return result until result.nil?
        end
        nil
    end

    def bfs(target_value = nil)
      queue = [self]
      until queue.empty?
        node = queue.shift
        return node if node.value == target_value
        queue += node.children
      end
       nil
    end
 

end

class PolyTreeNode
    include Searchable 
    attr_reader :parent, :children, :value
    def initialize(value)
        @value = value
        @parent = nil
        @children = []
    end

    def parent=(node)
        
        if @parent.is_a? PolyTreeNode
            @parent.children.delete(self)
        end  
      
        if node.is_a? PolyTreeNode       
            @parent = node
            if !@parent.children.include?self
                @parent.children << self
            end
        else
            @parent = nil if node == nil
        end
        
    end

    # A = PolyTreeNode.new("A")
    # B = PolyTreeNode.new("B")
    # B.parent=A
    # C = PolyTreeNode.new("C")
    # C.parent = A
    # C.parent = B

    def add_child(child)
        if !self.children.include?child
            self.children << child
            child.parent = self
        end
    end

    #child.parent = self
    # C.add_child(B)
    # c -- children[B]

    def remove_child(child)
        if !self.children.include?child
            raise "This is not your child!"
        else
            self.children.delete(child)
            child.parent = nil
        end
    end
end


# 0     1   2   3   4   5
# ['a','b','c','d','e','f']
#        0 'a' --> children [b,c] 1,2
#     1 'b' -->children[d,e] 3,4 'c'
# 3 'd'     'e'                'f'  'g'
# a --- 1,2

    