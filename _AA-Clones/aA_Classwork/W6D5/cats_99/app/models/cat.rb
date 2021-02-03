# == Schema Information
#
# Table name: cats
#
#  id          :bigint           not null, primary key
#  birth_date  :date             not null
#  color       :string           not null
#  name        :string           not null
#  sex         :string(1)        not null
#  description :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Cat < ApplicationRecord

COLORS = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']

  include ActionView::Helpers::DateHelper

  validates :birth_date, :color, :name, :sex, :description, presence: true
  validate :gender
  validate :colors

  def age
    age = Date.today.year - self.birth_date.year
    age -= 1 if Date.today < self.birth_date + age.years
  end

  private
  def gender
    if self.sex.upcase != 'M' && self.sex.upcase != 'F'
      errors[:sex] << "Not a valid gender"
    end
  end

  def colors
    if !COLORS.include?(self.color)
      errors[:color] << "Not a valid color"
    end
  end
end

