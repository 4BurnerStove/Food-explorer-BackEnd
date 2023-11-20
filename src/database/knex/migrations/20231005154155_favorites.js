exports.up = knex => knex.schema.createTable('favorites', table => {
  table.increments('id')
  table.integer('user_id').unsigned()
  table.integer('dish_id').unsigned()
  table.foreign('user_id').references('id').inTable('users')
  table.foreign('dish_id').references('id').inTable('dishes')
})

exports.down = knex => knex.schema.dropTable('favorites')