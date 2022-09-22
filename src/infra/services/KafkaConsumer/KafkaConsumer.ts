import { KafkaTopics } from '@shared/enum/KafkaConsumer'
import { Consumer, ConsumerSubscribeTopics, EachBatchPayload, Kafka, EachMessagePayload, KafkaMessage } from 'kafkajs'
import dotenv from 'dotenv'
dotenv.config()

class KafkaServiceConsumer {
  private kafkaConsumer: Consumer

  public constructor () {
    this.kafkaConsumer = this.createKafkaConsumer()
  }

  public async startConsumer (): Promise<Consumer> {
    return this.kafkaConsumer
  }

  public async startOneConsumer (kafkaTopic: KafkaTopics): Promise<void> {
    const red = '\u001b[31m'
    const topic: ConsumerSubscribeTopics = {
      topics: [`${kafkaTopic}`],
      fromBeginning: false
    }

    try {
      await this.kafkaConsumer.connect()
      await this.kafkaConsumer.subscribe(topic)

      await this.kafkaConsumer.run({
        eachMessage: async (messagePayload: EachMessagePayload) => {
          const { topic, partition, message } = messagePayload
          const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
          console.log(red + `- ${prefix} ${message.key}#${message.value}`)
        }
      })
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  public async startBatchConsumer (): Promise<void> {
    const topic: ConsumerSubscribeTopics = {
      topics: ['example-topic'],
      fromBeginning: false
    }

    try {
      await this.kafkaConsumer.connect()
      await this.kafkaConsumer.subscribe(topic)
      await this.kafkaConsumer.run({
        eachBatch: async (eachBatchPayload: EachBatchPayload) => {
          const { batch } = eachBatchPayload
          for (const message of batch.messages) {
            const prefix = `${batch.topic}[${batch.partition} | ${message.offset}] / ${message.timestamp}`
            console.log(`- ${prefix} ${message.key}#${message.value}`)
          }
        }
      })
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  public async shutdown (): Promise<void> {
    await this.kafkaConsumer.disconnect()
  }

  private createKafkaConsumer (): Consumer {
    const kafka = new Kafka({
      clientId: 'kafka-microServices',
      brokers: ['sharp-mantis-14081-us1-kafka.upstash.io:9092'],
      sasl: {
        mechanism: 'scram-sha-256',
        username: 'c2hhcnAtbWFudGlzLTE0MDgxJEYcgtOcDEcPedvSKMVkB6itseWMx1CrsjUJsQ8',
        password: `${process.env.KAFKA_PASS}`
      },
      ssl: true
    })
    const consumer = kafka.consumer({ groupId: 'consumer-group' })
    return consumer
  }
}

export { KafkaServiceConsumer }
