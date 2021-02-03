# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all
Artwork.destroy_all
ArtworkShare.destroy_all

snoopy = User.create(username: 'Snoopy')
woodstock = User.create(username: 'Woodstock')
charlie_brown = User.create(username: "Charlie Brown")
lucy = User.create(username: "Lucy")
linus = User.create(username: "Blanket")
pigpen = User.create(username: "Dirty")

doghouse = Artwork.create(title: 'The Doghouse', artist_id: snoopy.id, image_url: "example.com")
birdnest = Artwork.create(title: 'Resting While Flying', artist_id: woodstock.id, image_url: "example.com")
football = Artwork.create(title: 'Am I a Blockhead?', artist_id: charlie_brown.id, image_url: "example.com")
blanket = Artwork.create(title: 'Linus and his Blanket', artist_id: charlie_brown.id, image_url: "example.com")
airplane = Artwork.create(title: 'Flying Wild', artist_id: snoopy.id, image_url: "example.com")
xmas = Artwork.create(title: 'I Liked the Xmas Tree First', artist_id: charlie_brown.id, image_url: "example.com")
muddy = Artwork.create(title: 'Mud and my Life', artist_id: pigpen.id, image_url: "example.com")
muddy2 = Artwork.create(title: 'Mud and my Life...the Sequal...More Mud', artist_id: pigpen.id, image_url: "example.com")

ArtworkShare.create(viewer_id: lucy.id, artwork_id: football.id)
ArtworkShare.create(viewer_id: lucy.id, artwork_id: blanket.id)
ArtworkShare.create(viewer_id: lucy.id, artwork_id: doghouse.id)
ArtworkShare.create(viewer_id: lucy.id, artwork_id: xmas.id)