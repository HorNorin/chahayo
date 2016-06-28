class Board < ActiveRecord::Base
  enum kind: [:general, :anime_and_manga, :rule_and_guidelines]

  has_many :topics

  validates :kind, presence: true
  validates :name, presence: true, uniqueness: true
end
