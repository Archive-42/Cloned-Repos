require 'byebug'
require_relative '/skeleton/lib/00_tree_node'

class KnightPathFinder 
  
  
  def initialize(start_pos)
    @root_node = PolyTreeNode.new(start_pos)
    @considered_positions =[start_pos]
    build_move_tree(start_pos)

  end
  
  def build_move_tree(pos)
    queue = [@root_node]
    while !queue.empty?
      node = queue.shift
      
      queue += self.new_move_positions(node) 
      queue.each do |child|
         node.add_child(PolyTreeNode.new(child))
      end 
    end
  end
  
  def self.valid_moves(pos)
    
    debugger
    x,y = pos
    @test = "HI"
    all_valid_moves = [[x+1, y-2],[x+2, y-1],[x-2, y-1], [x+1, y+2],[x-1, y+2],[x-2, y+1], [x-2, y-1],[x-1, y-2]]

    # all_valid_moves << [x+1, y-2] if (0 <= (x + 1) <= 7) && (0 <= (y - 2) <= 7)
    # all_valid_moves << [x+2, y-1] if (0 <= (x + 2) <= 7) && (0 <= (y - 1) <= 7)
    # all_valid_moves << [x-2, y-1] if (0 <= (x - 2) <= 7) && (0 <= (y - 1) <= 7)
    # all_valid_moves << [x+1, y+2] if (0 <= (x + 1) <= 7) && (0 <= (y + 2) <= 7)
    # all_valid_moves << [x-1, y+2] if (0 <= (x - 1) <= 7) && (0 <= (y + 2) <= 7)
    # all_valid_moves << [x-2, y+1] if (0 <= (x - 2) <= 7) && (0 <= (y + 1) <= 7)
    # all_valid_moves << [x-2, y-1] if (0 <= (x - 2) <= 7) && (0 <= (y - 1) <= 7)
    # all_valid_moves << [x-1, y-2] if (0 <= (x - 1) <= 7) && (0 <= (y - 2) <= 7)


    all_valid_moves.select do |current_pos|
      x,y = current_pos
      (x >=0 && x <= 7) && (y >= 0 && y <= 7)
    end 

  end
  
  def new_move_positions(pos)
    all_possible_moves = KnightPathFinder.valid_moves(pos)
    all_possible_moves.each do |move|
      debugger
      @test
      if @considered_positions.include?(move)

        all_possible_moves.delete(move)
      end 
    end 
    @considered_positions = [pos]
    @considered_positions+= all_possible_moves
    all_possible_moves
  end 

  game = KnightPathFinder.new([2,2])

end 