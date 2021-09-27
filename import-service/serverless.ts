import type { AWS } from '@serverless/typescript';
import * as dotenv from 'dotenv'
import { importFileParser, importProductsFile } from '@functions/index';

dotenv.config();

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '2',
  configValidationMode: 'off',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  useDotenv: true,
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: "eu-west-1",
    iamRoleStatements: [
      { Effect: "Allow", Action: "s3:ListBucket", Resource: "arn:aws:s3:::products-file-shop-app" },
      { Effect: "Allow", Action: "s3:*", Resource: "arn:aws:s3:::products-file-shop-app/*" }
    ],
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      BUCKET: 'products-file-shop-app',
    },
    lambdaHashingVersion: '20201221',
    httpApi: {
      cors: true
    },
  },
  resources: {
    Resources: {
      ShopProductsBucket: {
        Type: 'AWS::S3::Bucket',
        Properties: {
          AssumeRolePolicyDocument: {

          },
          BucketName: process.env.BUCKET,
          AccessControl: 'Private',
          CorsConfiguration: {
            CorsRules: [
              {
                AllowedHeaders: ['*'],
                AllowedMethods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'],
                AllowedOrigins: ['*'],
              },
            ],
          },
        },
      },
      ShopProductsBucketPolicy: {
        Type: 'AWS::S3::BucketPolicy',
        Properties: {
          Bucket: {
            Ref: 'ShopProductsBucket',
          },
          PolicyDocument: {
            Statement: {
              Sid: 'AllowPublicRead',
              Effect: 'Allow',
              Action: 's3:GetObject',
              Resource: `arn:aws:s3:::${process.env.BUCKET}/*`,
              Principal: {
                AWS: '*',
              },
            },
          },
        },
      },
    },
  },
  functions: { importProductsFile, importFileParser },
};

module.exports = serverlessConfiguration;
