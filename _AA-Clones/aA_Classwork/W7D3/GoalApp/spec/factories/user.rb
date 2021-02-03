FactoryBot.define do
  factory :user do
    username { Faker::Movies::HarryPotter.character }
    password { 'password' }
    
    factory :harry_potter do
      username { 'Harry Potter' }
      password { 'Sirius' }
    end
  end
end
