"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendationsModule = void 0;
const common_1 = require("@nestjs/common");
const recommendations_service_1 = require("./recommendations.service");
const recommendations_controller_1 = require("./recommendations.controller");
const microservices_1 = require("@nestjs/microservices");
let RecommendationsModule = class RecommendationsModule {
};
RecommendationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'KAFKA_SERVICE',
                    transport: microservices_1.Transport.KAFKA,
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
        controllers: [recommendations_controller_1.RecommendationsController],
        providers: [
            recommendations_service_1.RecommendationsService,
            {
                provide: 'KAFKA_PRODUCER',
                useFactory: async (clientKafka) => {
                    return clientKafka.connect();
                },
                inject: ['KAFKA_SERVICE'],
            },
        ],
    })
], RecommendationsModule);
exports.RecommendationsModule = RecommendationsModule;
//# sourceMappingURL=recommendations.module.js.map