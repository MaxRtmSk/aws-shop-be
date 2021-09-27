import 'source-map-support/register';
import * as AWS from 'aws-sdk';

import { middyfy } from '@libs/lambda';


const importProductsFile = async (event) => {
  console.info(`Lambda — importProductsFile: ${JSON.stringify(event)}`);
  const { name } = event.queryStringParameters.name;
  try {
    if(!name) throw new Error()

    const s3 = new AWS.S3({ region: 'eu-west-1' });

    const path = `uploads/${name}`;

    const params = {
      Bucket: process.env.BUCKET,
      Key: path,
      ContentType: 'text/csv',
    };

    const url = await s3.getSignedUrlPromise('putObject', params);

    return {
      body: {url: JSON.stringify(url)},
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      statusCode: 200
    }
  } catch (error) {
    return {
      body: {message: JSON.stringify('error')},
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      statusCode: 500
    }
  }
  
}

export const main = middyfy(importProductsFile);
