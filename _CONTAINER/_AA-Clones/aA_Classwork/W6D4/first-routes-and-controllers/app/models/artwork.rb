class Artwork < ApplicationRecord
    # validates :title, :artist_id, :image_url, presence: true, uniqueness: true #validating all seperately

    #correct way
    # title needs to be unquie in the scope of the artist id. ie an artist can have many unique titles
    validates :title, uniqueness: {scope: :artist_id}

    belongs_to :artist,
    foreign_key: :artist_id,
    class_name: 'User'
    

    has_many :shares,
    foreign_key: :artwork_id,
    class_name: 'ArtworkShare',
    dependent: :destroy
    

    has_many :shared_viewers,
    through: :shares,
    source: :viewer
    

end