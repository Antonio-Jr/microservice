import { KafkaMessage } from 'kafkajs';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    private topic;
    constructor(appService: AppService);
    GetRecommendation(data: any): Promise<{
        status: string;
        message: string;
    }>;
    ReadMessage(data: KafkaMessage): void;
}
