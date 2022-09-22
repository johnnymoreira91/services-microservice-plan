import { User } from '@entities/User'
import { IUsersRepository } from '@repositories/IUsersRepository'

class UsersRepository implements IUsersRepository {
  private users: User[] = []

  async list (): Promise<User[]> {
    return this.users
  }

  async findById (id: string): Promise<User> {
    return this.users.find(user => user.id === id)
  }

  async findByEmail (email: string): Promise<User> {
    return this.users.find(user => user.email === email)
  }

  async update (id: string, user: User): Promise<User> {
    const index = await this.users.findIndex(us => us.id === user.id)
    delete this.users[index]

    const dataUser = await this.save({
      id: id,
      email: user.email,
      name: user.name,
      password: user.password
    })

    return dataUser
  }

  async save (user: User): Promise<User> {
    this.users.push(user)
    return user
  }

  async deleteById (id: string): Promise<void> {
    const index = await this.users.findIndex(us => us.id === id)
    delete this.users[index]
  }
}

export { UsersRepository }
