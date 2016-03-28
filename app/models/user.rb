class User < ActiveRecord::Base
  include Authentication

  validates :password, length: { in: 6..25 }
  validates :uuid, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true , email: true
end
