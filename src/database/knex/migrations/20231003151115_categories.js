exports.up = knex => knex.schema.createTable('category', table => {
  table.increments('id')
  table.text('category')
})
.then(() => {
  return knex('category').insert([
      {category: 'Doces'},
      {category: 'Almoço'},
      {category: 'Janta'},
      {category: 'Lanche'},
      {category: 'Bebidas'},
      {category: 'Conveniência'}
  ])
})
exports.down = knex => knex.schema.dropTable('category')