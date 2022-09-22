import { Request, Response } from 'express'
import { ListUserUseCase } from './ListUserUseCase'

class ListUserController {
  constructor (
    private listUserUseCase: ListUserUseCase
  ) {}

  async handle (_req: Request<{}, {}, {}>, res: Response): Promise<Response> {
    try {
      const data = await this.listUserUseCase.execute()

      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}

export { ListUserController }
