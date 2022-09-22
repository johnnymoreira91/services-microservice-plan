import { IMailProvider, IMessage } from '../IMailProvider'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

class MailTrapMailProvider implements IMailProvider {
  private transporter: Mail
  constructor () {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'c85a0d62adc03e',
        pass: 'fa67513e0f6bed'
      }
    })
  }

  async sendEmail (message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email
      },
      from: {
        name: message.from.name,
        address: message.from.email
      },
      subject: message.subject,
      html: message.body
    })
  }
}

export { MailTrapMailProvider }
