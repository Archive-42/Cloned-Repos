class ArtworkShare < ApplicationRecord
    #order doesn't matter!
    validates :viewer_id, uniqueness: {scope: :artwork_id}

    belongs_to :viewer,
    foreign_key: :viewer_id,
    class_name: 'User'

    belongs_to :artwork,
    foreign_key: :artwork_id,
    class_name: 'Artwork'

end
