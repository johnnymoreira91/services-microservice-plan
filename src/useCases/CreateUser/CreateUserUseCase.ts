import { User } from '@entities/User'
import { IUsersRepository } from '@repositories/IUsersRepository'
import { ICreateUserRequestDTO } from './CreateUserDTO'

class CreateUserUseCase {
  constructor (
    private usersRepository: IUsersRepository
  ) {}

  async execute (data: ICreateUserRequestDTO): Promise<User> {
    const userAlreadyExist = await this.usersRepository.findByEmail(data.email)

    if (userAlreadyExist) {
      throw new Error('User already exist')
    }

    const user = new User(data)
    return await this.usersRepository.save(user)
  }
}

export { CreateUserUseCase }
