import { Injectable, Inject } from '@nestjs/common';
import { Producer } from '@nestjs/microservices/external/kafka.interface';

@Injectable()
export class RecommendationsService {
  constructor(@Inject('KAFKA_PRODUCER') private kafkaProducer: Producer) {}

  async sendMessage(topic: string, data: object) {
    await this.kafkaProducer.send({
      topic: topic,
      messages: [{ key: `${Date.now}`, value: JSON.stringify(data) }],
    });
  }
}
