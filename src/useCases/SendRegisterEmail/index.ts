import { SendRegisterEmailUseCase } from './SendRegisterEmailUseCase'
import { MailTrapMailProvider } from '@infra/providers/implementations/MailTrapMailProvider'
import { SendRegisterEmailController } from './SendRegisterController'
import { SendRegisterListenKafka } from './SendRegisterListenKafka'

const mailTrapMailProvider = new MailTrapMailProvider()

const sendRegisterEmailUseCase = new SendRegisterEmailUseCase(
  mailTrapMailProvider
)

const sendRegisterEmailController = new SendRegisterEmailController(
  sendRegisterEmailUseCase
)

const sendRegisterListenKafka = new SendRegisterListenKafka(sendRegisterEmailController)

export {
  sendRegisterListenKafka
}
