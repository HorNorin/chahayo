class UserSerializer < ActiveModel::Serializer
  attributes :id, :uuid, :email, :username, :slug
end
