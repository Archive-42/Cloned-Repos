require 'rails_helper'

RSpec.describe User, type: :model do
   
  it { should validate_presence_of(:username) }
  it { should validate_length_of(:password).is_at_least(6) }
  it { should validate_uniqueness_of(:username) }
   subject(:victoria) { User.create(username:'neilh8r', password: 'gym4life') }

  describe "session_token" do    
    it "assigns a session_token if none given" do   
      expect(FactoryBot.build(:user).session_token).to_not be_nil 
    end
  end

  describe "password encryption" do    
    it 'does not save passwords to the database' do   
      FactoryBot.create(:user, username: 'Harry Potter')
      user = User.find_by(username: 'Harry Potter')
      expect(user.password).not_to be('password')
    end

    it 'encrypts password using BCrypt' do
      expect(BCrypt::Password).to receive(:create).with('neil123')
      FactoryBot.build(:user, password: 'neil123')
    end
  end

  it { should have_many(:goals) }

  describe 'find_by_credentials' do
    it 'should find a user matching the given credentials' do
      FactoryBot.create(:harry_potter)
      expect(User.find_by_credentials('Harry Potter', 'Sirius')).to_not be_nil
    end
  end
end
