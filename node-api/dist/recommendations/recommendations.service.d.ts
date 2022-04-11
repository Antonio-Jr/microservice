import { Producer } from '@nestjs/microservices/external/kafka.interface';
export declare class RecommendationsService {
    private kafkaProducer;
    constructor(kafkaProducer: Producer);
    sendMessage(topic: string, data: object): Promise<void>;
}
