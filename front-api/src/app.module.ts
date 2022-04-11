import { Module } from '@nestjs/common';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_FRONT_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['host.docker.internal:9094'],
          },
          consumer: {
            groupId: 'frontend-api',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'KAFKA_FRONT_PRODUCER',
      useFactory: async (clientKafka: ClientKafka) => {
        return clientKafka.connect();
      },
      inject: ['KAFKA_FRONT_SERVICE'],
    },
  ],
})
export class AppModule {}
