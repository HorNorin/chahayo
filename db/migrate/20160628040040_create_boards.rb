class CreateBoards < ActiveRecord::Migration
  def change
    create_table :boards do |t|
      t.string :name
      t.integer :kind

      t.timestamps null: false
    end
    add_index :boards, :name, unique: true
  end
end
