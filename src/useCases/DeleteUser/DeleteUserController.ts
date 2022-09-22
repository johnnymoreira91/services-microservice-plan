import { Request, Response } from 'express'
import { DeleteUserUseCase } from './DeleteUserUseCase'

class DeleteUserController {
  constructor (
    private deleteUserUseCase: DeleteUserUseCase
  ) {}

  async handle (req: Request<{id: string}, {}, {
  }>, res: Response): Promise<Response> {
    const { id } = req.params
    try {
      if (!id) {
        return res.status(400).json({
          message: 'Id cannot be null'
        })
      }

      await this.deleteUserUseCase.execute({ id })

      return res.status(201).send()
    } catch (error) {
      return res.status(500).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}

export { DeleteUserController }
