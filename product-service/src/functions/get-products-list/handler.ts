import 'source-map-support/register';
import { middyfy } from '@libs/lambda';

import { findAllPoductsList } from 'src/database';


const getCardList = async (e) => {
  console.info(`Lambda — getCardList: ${JSON.stringify(e)}`);
  try{
    const products = await findAllPoductsList()
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
    console.error(`Error in Lambda — getCardList:`, e)
    console.error(e)
  }
}

export const getProductsList = middyfy(getCardList);
