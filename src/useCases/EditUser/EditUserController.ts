import { Request, Response } from 'express'
import { EditUserUseCase } from './EditUserUseCase'

class EditUserController {
  constructor (
    private editUserUseCase: EditUserUseCase
  ) {}

  async handle (req: Request<{id: string}, {}, {
    name: string, email: string, password: string
  }>, res: Response): Promise<Response> {
    const { id } = req.params
    const { name, email, password } = req.body
    try {
      if (!id) {
        return res.status(400).json({
          message: 'Id cannot be null'
        })
      }
      const data = await this.editUserUseCase.execute({
        id: id,
        email: email,
        name: name,
        password: password
      })
      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}

export { EditUserController }
