class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :topic

  validates :user, presence: true
  validates :topic, presence: true
  validates :body, presence: true

  delegate :username, to: :user
  alias_method :author_name, :username
end
