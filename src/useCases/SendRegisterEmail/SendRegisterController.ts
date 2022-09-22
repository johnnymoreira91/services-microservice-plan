import { ISendRegisterEmailRequestDTO } from './SendRegisterEmailDTO'
import { SendRegisterEmailUseCase } from './SendRegisterEmailUseCase'

class SendRegisterEmailController {
  constructor (
    private sendRegisterEmailUseCase: SendRegisterEmailUseCase
  ) {}

  async handle (data: ISendRegisterEmailRequestDTO) {
    await this.sendRegisterEmailUseCase.execute(data)
  }
}

export { SendRegisterEmailController }
