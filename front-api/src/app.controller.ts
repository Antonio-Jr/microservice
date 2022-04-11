import { Body, Controller, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaMessage } from 'kafkajs';
// import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller('recommendations')
export class AppController {
  private topic: string;
  constructor(private readonly appService: AppService) {
    this.topic = 'get-recommendations';
  }

  @Post()
  async GetRecommendation(@Body() data) {
    await this.appService.GetRecommendation(this.topic, data);
    return {
      status: 'ok',
      message: 'Sua solicitação foi enviada para processamento',
    };
  }

  @MessagePattern('processed-recommendations')
  ReadMessage(@Payload() data: KafkaMessage) {
    console.log(data.value);
  }
}
