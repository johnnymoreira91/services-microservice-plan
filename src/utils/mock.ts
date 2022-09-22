import { UsersRepository } from '@repositories/implementations/UsersRepository'
import { CreateUserUseCase } from '@useCases/CreateUser/CreateUserUseCase'
import { User } from '@entities/User'

const userRepository = new UsersRepository()
const createUserUseCase = new CreateUserUseCase(userRepository)

const userTest = new User({
  name: 'test',
  email: 'test@test.com',
  password: 'test'
})
const userSuper = new User({
  name: 'super',
  email: 'super@super.com',
  password: 'super'
})
const userNormal = new User({
  name: 'normal',
  email: 'normal@normal.com',
  password: 'normal'
})

async function InsertMock () {
  const userArray: User[] = []
  // await createUserUseCase.execute(userTest)
  // await createUserUseCase.execute(userSuper)
  // await createUserUseCase.execute(userNormal)
  // const users = await userRepository.list()
  // return users
  await userArray.push(userTest)
  await userArray.push(userSuper)
  await userArray.push(userNormal)
  return userArray
}

export { InsertMock }
