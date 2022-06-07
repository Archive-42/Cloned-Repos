json.pokemon do
  json.extract! @poke, :id, :name, :attack, :defense, :moves, :poke_type, :item_ids
  # debugger
  json.image_url asset_path("pokemon_snaps/#{@poke.image_url}")
end

json.items do 
  @poke.items.each do |item|
    json.set! item.id do 
      json.extract! item, :id, :name, :pokemon_id, :price, :happiness
      json.image_url asset_path(item.image_url)
    end
  end
end
