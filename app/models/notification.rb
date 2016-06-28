class Notification
  attr_reader :user
  attr_accessor :storage

  def initialize(user)
    @user = user
  end

  def get_unread_messages
    storage.retrieve(user.id).map do |message|
      username, user_id, post_id, reply_id = message.split('#')
      { username: username, user_id: user_id, post_id: post_id, reply_id: reply_id }
    end
  end

  def push_unread_message(comment)
    data = [
      user.author_name, user.id,
      comment.topic_id, comment.id
    ].join('#')

    storage.push(user.id, data)
  end

  def storage
    @storage ||= Notification::Storage.new
  end

  class Storage
    KEY_PREFIX = 'chahayo:unread_messages'

    def retrieve(identifier)
      $redis.lrange _key(identifier), 0, -1
    end

    def push(identifier, message)
      $redis.rpush _key(identifier), message
    end

    private

    def _key(identifier)
      "#{KEY_PREFIX}:#{identifier}"
    end
  end
end
