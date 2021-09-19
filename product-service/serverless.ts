import type { AWS } from '@serverless/typescript';

import { getProductById, getProductsList, createProduct } from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack', 'serverless-dotenv-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: "eu-west-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      PG_HOST: 'lesson4-instance.ciwmkhhx73uz.eu-west-1.rds.amazonaws.com',
      PG_DATABASE: 'lesson4_1',
      PG_PORT: '5432',
      PG_USER: 'postgres',
      PG_PASSWORD: 'HJs84ByFcxcY1t2oZ1xq', 
    },
    lambdaHashingVersion: '20201221',
    httpApi: {
      cors: true
    }
  },
  useDotenv: true,
  functions: { getProductsList, getProductById, createProduct },
};

module.exports = serverlessConfiguration;
