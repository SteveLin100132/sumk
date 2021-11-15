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
/**
 * API 配置
 */
export declare const SWAGGER_DOC: {
    openapi: string;
    info: {
        description: string;
        version: string;
        title: string;
        contact: {
            email: string;
        };
        license: {
            name: string;
        };
    };
    basePath: string;
    tags: {
        name: string;
        description: string;
    }[];
    schemes: string[];
    paths: {
        '/send/yesterday': {
            post: {
                tags: string[];
                summary: string;
                description: string;
                operationId: string;
                consumes: string[];
                produces: string[];
                responses: {
                    200: {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    type: string;
                                };
                            };
                        };
                    };
                    400: {
                        description: string;
                    };
                };
            };
        };
        '/send/at': {
            post: {
                tags: string[];
                summary: string;
                description: string;
                operationId: string;
                consumes: string[];
                produces: string[];
                parameters: {
                    name: string;
                    in: string;
                    description: string;
                    required: boolean;
                    type: string;
                }[];
                responses: {
                    200: {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    type: string;
                                };
                            };
                        };
                    };
                    400: {
                        description: string;
                    };
                };
            };
        };
        '/send/between': {
            post: {
                tags: string[];
                summary: string;
                description: string;
                operationId: string;
                consumes: string[];
                produces: string[];
                parameters: {
                    name: string;
                    in: string;
                    description: string;
                    required: boolean;
                    type: string;
                }[];
                responses: {
                    200: {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    type: string;
                                };
                            };
                        };
                    };
                    400: {
                        description: string;
                    };
                };
            };
        };
        '/send/plant/yesterday': {
            post: {
                tags: string[];
                summary: string;
                description: string;
                operationId: string;
                consumes: string[];
                produces: string[];
                parameters: {
                    name: string;
                    in: string;
                    description: string;
                    required: boolean;
                    type: string;
                }[];
                responses: {
                    200: {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    type: string;
                                };
                            };
                        };
                    };
                    400: {
                        description: string;
                    };
                };
            };
        };
        '/send/plant/at': {
            post: {
                tags: string[];
                summary: string;
                description: string;
                operationId: string;
                consumes: string[];
                produces: string[];
                parameters: {
                    name: string;
                    in: string;
                    description: string;
                    required: boolean;
                    type: string;
                }[];
                responses: {
                    200: {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    type: string;
                                };
                            };
                        };
                    };
                    400: {
                        description: string;
                    };
                };
            };
        };
        '/send/plant/between': {
            post: {
                tags: string[];
                summary: string;
                description: string;
                operationId: string;
                consumes: string[];
                produces: string[];
                parameters: {
                    name: string;
                    in: string;
                    description: string;
                    required: boolean;
                    type: string;
                }[];
                responses: {
                    200: {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    type: string;
                                };
                            };
                        };
                    };
                    400: {
                        description: string;
                    };
                };
            };
        };
    };
    securityDefinitions: {};
    definitions: {
        ApiResponse: {
            type: string;
            properties: {
                code: {
                    type: string;
                    format: string;
                };
                type: {
                    type: string;
                };
                message: {
                    type: string;
                };
            };
        };
    };
};
