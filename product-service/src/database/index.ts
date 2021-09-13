import { Client, ClientConfig } from 'pg';

const config: ClientConfig = {
    host: process.env.PG_HOST,
    port: +process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    ssl: {
      rejectUnauthorized: false,
    },
    connectionTimeoutMillis: 10000,
};

const getClient: () => Promise<Client> = async() => {
  try {
    const client = new Client(config);
    await client.connect()
    return client;
  } catch (e) {
    throw e;
  } 
}

export const findAllPoductsList = async (): Promise<any> => { 
  const client = await getClient();
  let res;
  try {
    res = await client.query(
        `SELECT products.id, products.title, products.description, products.price, products.imgsrc, stocks.count
        FROM products 
        INNER JOIN stocks ON products.id = stocks.product_id`
    );
  } catch(e){
    throw e;
  } finally {
    client.end();
  }
  return res.rows;
}

export const findProductById = async (id: string): Promise<any | null> => {
  const client = await getClient();
  let res;
  try {
    res = await client.query(
        `SELECT products.id, products.title, products.description, products.price, products.imgsrc, stocks.count
        FROM products 
        INNER JOIN stocks ON products.id = stocks.product_id
        WHERE products.id='${id}'`
    );
  } catch(e) {
    throw e;
  } finally {
    client.end()
  }
  if (res.rows.length > 0) {
    return res.rows[0];
  }
  
  return null;
}

export const  createProductClient = async (productData: any): Promise<any> => {
  const {title, description, price, count, imgsrc} = productData
  if(title === undefined || description === undefined || price === undefined || count === undefined || imgsrc === undefined){
    throw new Error('Product data is invalid');
  }
  const client = await getClient();
  let res;
  await client.query('BEGIN');
  try {
      res = await client.query(
          'INSERT INTO products(title, description, price, imgsrc) values ($1, $2, $3, $4) returning *', [title, description, +price, imgsrc]
      );
      if (res.rows.length <= 0) {
          throw new Error('Error create product');
      }

      res = await client.query(
          `INSERT INTO stocks(product_id, count) values ($1, $2) returning *`,
          [res.rows[0].id, count]
      )
      if (res.rows.length <= 0) {
          throw new Error('Error create stocks');
      }
      await client.query('COMMIT');

      return { ...res.rows[0]};
  } catch (e) {
      await client.query('ROLLBACK');
      throw e;
  } finally {
      client.end()
  }
}