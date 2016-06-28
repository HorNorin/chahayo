class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :topic_id
      t.integer :user_id
      t.text :body

      t.timestamps null: false
    end
  end
end