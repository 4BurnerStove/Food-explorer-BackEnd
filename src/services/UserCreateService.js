const AppError = require('../utils/AppError')
const {hash} = require('bcryptjs')

class userCreateService{
  constructor(userRepository){
    this.userRepository = userRepository
  }

  async execute({name, email, password}){
    const checkUserEmailExists = await this.userRepository.findByEmail(email)

    if(checkUserEmailExists){
      throw new AppError("Este e-mail já está em uso.")
    }

   

    if(!name || !email || !password) {
      throw new AppError("Preencha todos os campos.")
    }

    const hashedPassword = await hash(password, 8)

    const userCreated = await this.userRepository.create({name, email, password: hashedPassword})

    return userCreated
  }
}

module.exports = userCreateService