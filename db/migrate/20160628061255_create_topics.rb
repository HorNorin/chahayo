class CreateTopics < ActiveRecord::Migration
  def change
    create_table :topics do |t|
      t.integer :board_id
      t.integer :user_id
      t.string :title
      t.text :content

      t.timestamps null: false
    end
  end
end
