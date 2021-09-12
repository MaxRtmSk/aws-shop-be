import 'source-map-support/register';
import { middyfy } from '@libs/lambda';

import products from '../../productList.json'


const getCardList = async () => {
  try{
    return {
      body: JSON.stringify({
        products
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      statusCode: 200,
    }
  } catch(e) {
    console.error(e)
  }
}

export const getProductsList = middyfy(getCardList);
