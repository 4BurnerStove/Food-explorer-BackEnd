const knex = require('../database/knex')
const DiskStorage = require('../providers/DiskStorage')

class DishesController {
  async create(req, res) {
    const { title, description, category_id, price, ingredients } = req.body
    const image = req.file.filename

    const diskStorage = new DiskStorage()

    const filename = await diskStorage.saveFile(image)

    const [dishes_id] = await knex('dishes').insert({
      title,
      description,
      price,
      category_id,
      image: filename
    })

    const ingredientInsert = ingredients.map(ingredient => {
      return {
        dishes_id,
        name: ingredient
      }
    })

    await knex('ingredients').insert(ingredientInsert)

    res.json()
  }

  async show(req, res) {
    const { id } = req.params

    const dishe = await knex('dishes').where({ id }).first()
    const ingredients = await knex('ingredients').where({dishes_id: id}).orderBy('name')

    return res.json({
      ...dishe,
      ingredients
    })
  }

  async delete(req, res) {
    const { id } = req.params

    await knex('dishes').where({ id }).delete()

    return res.json()
  }

  async update(req, res) {
    const { title, description, price, category_id, ingredients } = req.body
    const { id } = req.params

    await knex('dishes')
    .where('id', id)
    .update({
      title,
      description,
      price,
      category_id
    })

    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        name: ingredient,
        dishe_id,
      }
    })

    if(ingredientsInsert.length > 0){
      await knex('ingredients')
      .where('dishes_id', id)
      .del()

      await knex('ingredients').insert(ingredientsInsert)
    } else {
      throw new AppError('Adicione os ingredientes')
    }

    return res.json()
  }

  async index(req, res) {
    const { title, ingredients } = req.query

    let dishe

    if (!title || !ingredients) {
      dishe = await knex('dishes')
    }

    if (ingredients) {
      const filterIgredients = ingredients
        .split(',')
        .map(ingredient => ingredient.trim())

      dishe = await knex('ingredients')
        .select(['dishes.id', 'dishes.title'])
        .whereLike('dishes.title', `%${title}%`)
        .whereIn('ingredient', filterIgredients)
        .innerJoin('dishes', 'dishes.id', 'ingredients.dishes_id')
        .orderBy('dishes.title')
    } 

    const IngredientsForDishes = await knex('ingredients')

    const dishesWithIngredients = dishe.map(dishes => {
      const disheIngredient = IngredientsForDishes.filter(
        tag => tag.dishes_id === dishes.id
      )

      return {
        ...dishes,
        ingredient: disheIngredient
      }
    })

    return res.json(dishesWithIngredients)
  }
}

module.exports = DishesController
