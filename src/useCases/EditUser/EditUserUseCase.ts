import { User } from '@entities/User'
import { IUsersRepository } from '@repositories/IUsersRepository'
import { IEditUserRequestDTO } from './EditUserDTO'

class EditUserUseCase {
  constructor (
    private usersRepository: IUsersRepository
  ) {}

  async execute (data: IEditUserRequestDTO): Promise<User> {
    const findUser = await this.usersRepository.findByEmail(data.email)

    if (!findUser) {
      throw new Error('User not found')
    }

    const userData = await this.usersRepository.update(findUser.id, data)
    return userData
  }
}

export { EditUserUseCase }
