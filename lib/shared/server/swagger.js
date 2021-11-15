"use strict";
/**
 * 專案名稱： wistroni40-sumk
 * 部門代號： MLD500
 * 檔案說明： API 配置
 * @CREATE Monday, 8th November 2021 6:36:32 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SWAGGER_DOC = void 0;
/**
 * API 配置
 */
exports.SWAGGER_DOC = {
    openapi: '3.0.0',
    info: {
        description: 'SUMK usage publish API',
        version: '1.0.0',
        title: 'API Explorer',
        contact: {
            email: 'wits.steveylin@wistron.com',
        },
        license: {
            name: 'Apache 2.0',
        },
    },
    basePath: '/',
    tags: [
        {
            name: 'sumk',
            description: 'SUMK for system',
        },
    ],
    schemes: ['http'],
    paths: {
        '/send/yesterday': {
            post: {
                tags: ['sumk'],
                summary: '重新上拋昨日的使用率',
                description: '重新上拋昨日的使用率',
                operationId: 'sendYesterday',
                consumes: ['application/json'],
                produces: ['application/json'],
                responses: {
                    200: {
                        description: 'successful operation',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'boolean',
                                },
                            },
                        },
                    },
                    400: {
                        description: 'Invalid status value',
                    },
                },
            },
        },
        '/send/at': {
            post: {
                tags: ['sumk'],
                summary: '重新上拋特定時間的使用率',
                description: '重新上拋特定時間的使用率',
                operationId: 'sendAt',
                consumes: ['application/json'],
                produces: ['application/json'],
                parameters: [
                    {
                        name: 'time',
                        in: 'query',
                        description: '重新上拋的時間',
                        required: true,
                        type: 'number',
                    },
                ],
                responses: {
                    200: {
                        description: 'successful operation',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'boolean',
                                },
                            },
                        },
                    },
                    400: {
                        description: 'Invalid status value',
                    },
                },
            },
        },
        '/send/between': {
            post: {
                tags: ['sumk'],
                summary: '重新上拋特定時間範圍的使用率',
                description: '重新上拋特定時間範圍的使用率',
                operationId: 'sendBetween',
                consumes: ['application/json'],
                produces: ['application/json'],
                parameters: [
                    {
                        name: 'start',
                        in: 'query',
                        description: '重新上拋的開始時間',
                        required: true,
                        type: 'number',
                    },
                    {
                        name: 'end',
                        in: 'query',
                        description: '重新上拋的結束時間',
                        required: true,
                        type: 'number',
                    },
                ],
                responses: {
                    200: {
                        description: 'successful operation',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'boolean',
                                },
                            },
                        },
                    },
                    400: {
                        description: 'Invalid status value',
                    },
                },
            },
        },
        '/send/plant/yesterday': {
            post: {
                tags: ['sumk'],
                summary: '重新上拋昨日特定廠別的使用率',
                description: '重新上拋昨日特定廠別的使用率',
                operationId: 'yesterdayPlant',
                consumes: ['application/json'],
                produces: ['application/json'],
                parameters: [
                    {
                        name: 'plant',
                        in: 'query',
                        description: '指定的廠別',
                        required: true,
                        type: 'string',
                    },
                ],
                responses: {
                    200: {
                        description: 'successful operation',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'boolean',
                                },
                            },
                        },
                    },
                    400: {
                        description: 'Invalid status value',
                    },
                },
            },
        },
        '/send/plant/at': {
            post: {
                tags: ['sumk'],
                summary: '重新上拋特定時間特定廠別的使用率',
                description: '重新上拋特定時間特定廠別的使用率',
                operationId: 'sendPlantAt',
                consumes: ['application/json'],
                produces: ['application/json'],
                parameters: [
                    {
                        name: 'time',
                        in: 'query',
                        description: '重新上拋的時間',
                        required: true,
                        type: 'number',
                    },
                    {
                        name: 'plant',
                        in: 'query',
                        description: '指定的廠別',
                        required: true,
                        type: 'string',
                    },
                ],
                responses: {
                    200: {
                        description: 'successful operation',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'boolean',
                                },
                            },
                        },
                    },
                    400: {
                        description: 'Invalid status value',
                    },
                },
            },
        },
        '/send/plant/between': {
            post: {
                tags: ['sumk'],
                summary: '重新上拋特定時間範圍特定廠別的使用率',
                description: '重新上拋特定時間範圍特定廠別的使用率',
                operationId: 'sendPlantBetween',
                consumes: ['application/json'],
                produces: ['application/json'],
                parameters: [
                    {
                        name: 'start',
                        in: 'query',
                        description: '重新上拋的開始時間',
                        required: true,
                        type: 'number',
                    },
                    {
                        name: 'end',
                        in: 'query',
                        description: '重新上拋的結束時間',
                        required: true,
                        type: 'number',
                    },
                    {
                        name: 'plant',
                        in: 'query',
                        description: '指定的廠別',
                        required: true,
                        type: 'string',
                    },
                ],
                responses: {
                    200: {
                        description: 'successful operation',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'boolean',
                                },
                            },
                        },
                    },
                    400: {
                        description: 'Invalid status value',
                    },
                },
            },
        },
    },
    securityDefinitions: {},
    definitions: {
        ApiResponse: {
            type: 'object',
            properties: {
                code: {
                    type: 'integer',
                    format: 'int32',
                },
                type: {
                    type: 'string',
                },
                message: {
                    type: 'string',
                },
            },
        },
    },
};
