class AuthenticationToken
  include Singleton

  attr_writer :store, :expire, :token_generator

  def generate(uuid)
    begin
      token = token_generator.uuid
      key   = token_key(token)
    end while store.exists(key)

    store.set(key, uuid)
    store.expire(key, expire)

    token
  end

  def uuid(token)
    store.get token_key(token)
  end

  def renew(token)
    key = token_key(token)
    store.expire(key, expire) if store.exists(key)
  end

  def revoke(token)
    key = token_key(token)
    store.del(key) if store.exists(key)
  end

  private

  def store
    @store ||= Redis.new(host: 'localhost')
  end

  def expire
    @expire ||= 24.hours
  end

  def token_generator
    @token_generator ||= SecureRandom
  end

  def token_key(token)
    "auth_token:#{token}"
  end
end
