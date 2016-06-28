class Topic < ActiveRecord::Base
  belongs_to :user
  belongs_to :board
  has_many :replies, class_name: 'Comment'

  validates :user, presence: true
  validates :board, presence: true
  validates :title, presence: true
  validates :content, presence: true
end
