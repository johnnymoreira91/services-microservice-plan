import { IMailProvider, IMessage } from '../IMailProvider'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import ejs from 'ejs'

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
    const emailTemplate = await ejs.renderFile('src/infra/views/emailTemplate.ejs', {
      title: '@user-management',
      name: message.to.name,
      email: message.to.email
    })
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
      html: emailTemplate
    })
  }
}

export { MailTrapMailProvider }
