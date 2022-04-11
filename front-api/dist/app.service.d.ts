import { Producer } from 'kafkajs';
export declare class AppService {
    private kafkaProducer;
    constructor(kafkaProducer: Producer);
    GetRecommendation(topic: any, data: any): Promise<void>;
}
