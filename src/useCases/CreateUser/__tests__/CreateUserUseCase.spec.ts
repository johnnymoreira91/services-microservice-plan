import { CreateUserUseCase } from '../CreateUserUseCase'
import { UsersRepository } from '@repositories/implementations/UsersRepository'
import { User } from '@entities/User'
import { InsertMock } from '@utils/mock'

describe('CreateUserUseCase test', () => {
  let createUserUseCase: CreateUserUseCase
  let userRepository: UsersRepository

  beforeAll(async () => {
    userRepository = new UsersRepository()
    createUserUseCase = new CreateUserUseCase(userRepository)
    const users = await InsertMock()
    for (const user of users) {
      await createUserUseCase.execute(user)
    }
  })

  test('It Should create one user', async () => {
    const user: Omit<User, 'id'> = {
      name: 'superTest',
      email: 'superTest@test.com',
      password: 'test'
    }

    const data = await createUserUseCase.execute(user)
    expect(data.name).toBe('superTest')
    expect(data.email).toBe('superTest@test.com')
  })

  // test('It Should give error to duplicate users', async () => {
  //   const user: Omit<User, 'id'> = {
  //     name: 'superTest',
  //     email: 'superTest@test.com',
  //     password: 'test'
  //   }

  //   const data = await createUserUseCase.execute(user)
  //   expect(data).toBeInstanceOf(Error)
  // })
})
