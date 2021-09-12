import 'source-map-support/register';
import { middyfy } from '@libs/lambda';

import products from '../../productList.json'

const findProduct = async(productId: string) => {
  console.log('productId', productId, typeof productId)
  return await products.find((product)=> product.id === productId)
};

const getById = async (e) => {
  const productId = e.pathParameters.productId;
  try{
    const product = await findProduct(productId)
    console.log('product', product)
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
    console.error(e)
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
