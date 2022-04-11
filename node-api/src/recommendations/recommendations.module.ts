import { Module } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { RecommendationsController } from './recommendations.controller';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['host.docker.internal:9094'],
          },
          consumer: {
            groupId: 'node-api',
          },
        },
      },
    ]),
  ],
  controllers: [RecommendationsController],
  providers: [
    RecommendationsService,
    {
      provide: 'KAFKA_PRODUCER',
      useFactory: async (clientKafka: ClientKafka) => {
        // clientKafka.subscribeToResponseOf('ia-app');
        return clientKafka.connect();
      },
      inject: ['KAFKA_SERVICE'],
    },
  ],
})
export class RecommendationsModule {}
