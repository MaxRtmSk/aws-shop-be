import 'source-map-support/register';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';
import * as csvParser from 'csv-parser'


const importFileParser = async (event) => {
  console.info(`Lambda — importFileParser: ${JSON.stringify(event)}`);
  try {
    const s3 = new AWS.S3({ region: 'eu-west-1' });
    const rows = [];

    console.log(csvParser)
    
    const params = {
      Bucket: process.env.BUCKET
    }

    return formatJSONResponse({
      message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
      event,
    });
    
  } catch (error) {
    return {
      body: error.message ? JSON.stringify({"message": error.message}) : JSON.stringify({"message":'error'}),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      statusCode: 500
    }
  } 
}
export const main = middyfy(importFileParser);
