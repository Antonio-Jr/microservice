import { KafkaMessage } from 'kafkajs';
import { RecommendationsService } from './recommendations.service';
export declare class RecommendationsController {
    private readonly recommendationsService;
    private readonly producer_ia_topic_request;
    private readonly producer_processed_topic;
    constructor(recommendationsService: RecommendationsService);
    GetRecommendation(data: KafkaMessage): Promise<void>;
    GetProcessedRecommendation(data: KafkaMessage): Promise<void>;
}
