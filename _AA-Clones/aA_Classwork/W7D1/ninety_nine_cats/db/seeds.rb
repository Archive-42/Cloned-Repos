# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


u1 = User.create(username: 'campbellsoup', password: 'hunter12')

c1 = Cat.create(birth_date: '12/01/1962', color: 'orange', sex: 'M', name: 'Bell', description: 'The sauciest cat', user_id: u1.id)
c2 = Cat.create(birth_date: '1/12/1962', color: 'brown', sex: 'M', name: 'Kernel', description: 'Luuuvs chicken', user_id: u1.id)
c3 = Cat.create(birth_date: '7/4/1776', color: 'white', sex: 'F', name: 'Ronaldia', description: 'Large and in charge. Thiccq++', user_id: u1.id)

