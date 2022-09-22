import { IMailProvider } from '@infra/providers/IMailProvider'
import { ISendRegisterEmailRequestDTO } from './SendRegisterEmailDTO'

class SendRegisterEmailUseCase {
  constructor (
    private mailProvider: IMailProvider
  ) { }

  async execute (data: ISendRegisterEmailRequestDTO): Promise<void> {
    await this.mailProvider.sendEmail({
      to: {
        name: data.name,
        email: data.email
      },
      from: {
        name: 'User-Management',
        email: 'suport@user-management.com'
      },
      subject: 'Welcame new user',
      body: `<h1> Welcame ${data.name} to our server </h1>`
    })
  }
}

export { SendRegisterEmailUseCase }
