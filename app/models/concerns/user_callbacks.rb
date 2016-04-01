module UserCallbacks
  extend ActiveSupport::Concern

  included do
    attr_writer :uuid_generator
    before_create :generate_uuid
  end

  private

  def uuid_generator
    @uuid_generator ||= SecureRandom
  end

  def generate_uuid
    while !uuid.present? || self.class.exists?(uuid: uuid)
      self.uuid = uuid_generator.uuid
    end
  end
end
