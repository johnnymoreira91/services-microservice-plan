import { UsersRepository } from '@repositories/implementations/UsersRepository'
import { EditUserController } from './EditUserController'
import { EditUserUseCase } from './EditUserUseCase'

const usersRepository = new UsersRepository()

const editUserUseCase = new EditUserUseCase(
  usersRepository
)

const editUserController = new EditUserController(
  editUserUseCase
)

export {
  editUserController,
  editUserUseCase
}
