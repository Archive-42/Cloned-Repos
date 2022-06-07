# json.extract! guest, :name, :age, :favorite_color
# json.set! :gifts, guest.gifts

json.partial! 'api/guest/guest', guest: @guest