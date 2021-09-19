import 'source-map-support/register';
import { middyfy } from '@libs/lambda';

import { createProductClient } from 'src/database';

const createProductHandler = async (e) => {
  console.info(`Lambda — create product: ${JSON.stringify(e)}`);
  const { title, description, price, count, imgsrc } = e.body;
  try{
    const product = await createProductClient({title, description, price, count, imgsrc})
    return {
      body: JSON.stringify({
        product
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      statusCode: 200,
    }
  } catch(e) {
    console.error(`Error in Lambda — create product`, e)
    return {
      body: e.message ? JSON.stringify({"message": e.message}) : JSON.stringify({"message": 'error'}),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      statusCode: 500
    }
  }
}

export const createProduct = middyfy(createProductHandler);
