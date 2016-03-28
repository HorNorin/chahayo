class EmailValidator < ActiveModel::EachValidator
  attr_reader :message

  def initialize(options)
    super
    @message = 'is not a valid email address'
  end

  def validate_each(record, attribute, value)
    record.errors.add attribute, @message unless valid_email?(value)
  end

  private
  def valid_email?(email)
    email =~ email_format
  end

  def email_format
    common_exp = '[a-z0-9]+([\-\._]?[a-z0-9]+)*'
    /\A[^@\s\.\-_]?#{common_exp}@#{common_exp}\.[a-z]{2,}\z/i
  end
end
