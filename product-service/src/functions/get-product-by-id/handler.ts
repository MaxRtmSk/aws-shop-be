import 'source-map-support/register';
import { middyfy } from '@libs/lambda';

import { findProductById } from 'src/database';

const getById = async (e) => {
  console.info(`Lambda — getById: ${JSON.stringify(e)}`);
  const productId = e.pathParameters.productId;
  try{
    const product = await findProductById(productId)
    if(!product) throw new Error()
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
    console.error(`Error in Lambda — getById:`, e)
    return {
      body: JSON.stringify({"message": "Product not found"}),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      statusCode: 500
    }
  }
}

export const getProductById = middyfy(getById);
