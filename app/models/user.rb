class User < ActiveRecord::Base
  include UserCallbacks
  include Authentication

  extend FriendlyId

  friendly_id :username, use: :slugged

  validates :uuid, uniqueness: true
  validates :password, length: { in: 6..25 }
  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true , email: true
end
