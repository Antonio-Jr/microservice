import { Inject, Injectable } from '@nestjs/common';
import { Producer } from 'kafkajs';

@Injectable()
export class AppService {
  constructor(
    @Inject('KAFKA_FRONT_PRODUCER') private kafkaProducer: Producer,
  ) {}

  async GetRecommendation(topic, data) {
    await this.kafkaProducer.send({
      topic: topic,
      messages: [{ key: `${Date.now}`, value: JSON.stringify(data) }],
    });
  }
}
