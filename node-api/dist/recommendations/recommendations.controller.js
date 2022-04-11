"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendationsController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const recommendations_service_1 = require("./recommendations.service");
let RecommendationsController = class RecommendationsController {
    constructor(recommendationsService) {
        this.recommendationsService = recommendationsService;
        this.producer_ia_topic_request = 'ia-app';
        this.producer_processed_topic = 'processed-recommendations';
    }
    async GetRecommendation(data) {
        const value = data.value;
        console.log(value);
        await this.recommendationsService.sendMessage(this.producer_ia_topic_request, {
            clientId: value.clientId,
            sku: value.sku,
        });
    }
    async GetProcessedRecommendation(data) {
        await this.recommendationsService.sendMessage(this.producer_processed_topic, {
            message: data.value,
        });
    }
};
__decorate([
    (0, microservices_1.MessagePattern)('get-recommendations'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecommendationsController.prototype, "GetRecommendation", null);
__decorate([
    (0, microservices_1.MessagePattern)('ia-response'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecommendationsController.prototype, "GetProcessedRecommendation", null);
RecommendationsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [recommendations_service_1.RecommendationsService])
], RecommendationsController);
exports.RecommendationsController = RecommendationsController;
//# sourceMappingURL=recommendations.controller.js.map