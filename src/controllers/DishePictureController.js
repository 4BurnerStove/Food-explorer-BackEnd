const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

class DishePictureController {
  async update(req, res) {
    const { id } = req.params
    const pictureFilename = req.file.filename

    const diskStorage = new DiskStorage()

    const dishe = await knex('dishes').where('id', id).first()

    if (!dishe) {
      throw new AppError(
        'Somente admins podem alterar ou adicionar imagens aos pratos',
        401
      )
    }

    if (dishe.imageFood) {
      await diskStorage.deletFile(dishe.imageFood)
    }

    const filename = await diskStorage.saveFile(pictureFilename)
    dishe.imageFood = filename

    await knex('dishes').update(dishe).where('id', id)

    return res.json(dishe)
  }
}

module.exports = DishePictureController
