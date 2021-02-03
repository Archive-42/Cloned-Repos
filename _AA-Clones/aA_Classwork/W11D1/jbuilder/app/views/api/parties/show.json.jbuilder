json.extract! @party, :name, :location 

json.invitations @party.invitations

json.guests @party.guests do |guest|
  json.name guest.name
  json.gifts guest.gifts, :title, :description, :guest_id
end