import { User } from '@entities/User'

export interface IUsersRepository {
  list(): Promise<User[]>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  update(id: string, user: User): Promise<User>;
  save(user: User): Promise<User>;
  deleteById(id: string): Promise<void>;
}
