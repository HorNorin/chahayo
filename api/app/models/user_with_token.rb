class UserWithToken < SimpleDelegator
  include ActiveModel::SerializerSupport

  attr_accessor :token

  def initialize(attributes = {})
    super(attributes[:user])
    @token = attributes[:token]
  end
end
