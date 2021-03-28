require 'byebug'

class PolyTreeNode

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


    class Searchable
        # ['a','b','c','d','e','f'].dfs("target_value")
        def dfs(target_value)
            debugger
            root = self.first
            if root.value == target_value
                return root 
            else 
                root.children.each do |child|
                    child.dfs(target_value) 
                end
            end
            # debugger 
            return nil
            # debugger
        end
        
        searchable_object = new.Searchable
        searchable_object.dfs(5)
    
    end

end


# 0     1   2   3   4   5
# ['a','b','c','d','e','f']
#        0 'a' --> children [b,c] 1,2
#     1 'b' -->children[d,e] 3,4 'c'
# 3 'd'     'e'                'f'  'g'
# a --- 1,2

    