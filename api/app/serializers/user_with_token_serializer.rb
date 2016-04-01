class UserWithTokenSerializer < UserSerializer
  root 'user'
  attributes :token
end
