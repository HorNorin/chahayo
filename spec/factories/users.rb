FactoryGirl.define do
  factory :user do
    uuid { SecureRandom.uuid }
    password 'secret'
    password_confirmation 'secret'
    sequence(:username) { |n| "user#{n+1}" }
    sequence(:email) { |n| "user#{n+1}@example.com" }
  end
end
