class Post < ApplicationRecord
  validates :title, presence: true

  belongs_to :author,
  foreign_key: :author_id,
  class_name: 'User'

  belongs_to :sub,
  foreign_key: :sub_id,
  class_name: "Sub"
end
