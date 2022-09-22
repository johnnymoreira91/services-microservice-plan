import { KafkaServiceConsumer } from '@infra/services/KafkaConsumer/KafkaConsumer'
import { KafkaTopics } from '@shared/enum/KafkaConsumer'
import { KafkaMessage, ConsumerSubscribeTopics, EachMessagePayload } from 'kafkajs'
import { SendRegisterEmailController } from './SendRegisterController'
import { ISendRegisterEmailRequestDTO } from './SendRegisterEmailDTO'

interface IMessagePayload {
  message: {
    value: {
      email: string,
      name: string
    }
  }
}

class SendRegisterListenKafka extends KafkaServiceConsumer {
  constructor (
    private sendRegisterEmailController: SendRegisterEmailController
  ) {
    super()
  }

  public async returnConsumer (kafkaTopic: KafkaTopics): Promise<void> {
    const topic: ConsumerSubscribeTopics = {
      topics: [`${kafkaTopic}`],
      fromBeginning: false
    }
    const dataKafka = await this.startConsumer()
    await dataKafka.connect()
    await dataKafka.subscribe(topic)

    try {
      await dataKafka.run({
        eachMessage: async (messagePayload: EachMessagePayload & IMessagePayload) => {
          const received = messagePayload.message.value.toString()
          const data: {
            email: string,
            name: string
          } = JSON.parse(received)
          await this.sendRegisterEmailController.handle({
            email: data.email,
            name: data.name
          })
        }
      })
    } catch (error) {
      console.log('Error: ', error)
    }
  }
}

export { SendRegisterListenKafka }
