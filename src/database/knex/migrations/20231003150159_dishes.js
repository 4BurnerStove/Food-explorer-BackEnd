exports.up = knex =>
  knex.schema.createTable('dishes', table => {
    table.increments('id')
    table.text('title')
    table.text('description')
    table.decimal('price')
    table.text('image').defaultTo(null)
    table.integer('category_id').references('id').inTable('category').onDelete('CASCADE')
  })
exports.down = knex => knex.schema.dropTable('dishes')
