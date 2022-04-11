import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaMessage } from 'kafkajs';
import { RecommendationsService } from './recommendations.service';

interface GetRecommendationType {
  clientId: string;
  sku: number;
}

@Controller()
export class RecommendationsController {
  private readonly producer_ia_topic_request;
  private readonly producer_processed_topic;

  constructor(private readonly recommendationsService: RecommendationsService) {
    this.producer_ia_topic_request = 'ia-app';
    this.producer_processed_topic = 'processed-recommendations';
  }

  @MessagePattern('get-recommendations')
  async GetRecommendation(@Payload() data: KafkaMessage) {
    const value = (<unknown>data.value) as GetRecommendationType;
    console.log(value);

    await this.recommendationsService.sendMessage(
      this.producer_ia_topic_request,
      {
        clientId: value.clientId,
        sku: value.sku,
      },
    );
  }

  @MessagePattern('ia-response')
  async GetProcessedRecommendation(@Payload() data: KafkaMessage) {
    await this.recommendationsService.sendMessage(
      this.producer_processed_topic,
      {
        message: data.value,
      },
    );
  }
}
