/* eslint-disable camelcase */
import client from '../helpers/pg.client.js';

export default {

  async findAll() {
    const result = await client.query(`
  SELECT "product"."id", 
    "product"."weight",
    "product"."price",
    "product"."product_category_id",
    "product"."status",
    "product_category"."name" AS "product_category_name"
  FROM "product"
  JOIN "product_category"
    ON "product_category"."id" = "product"."product_category_id"
  ORDER BY "product_category_name",
  "product"."weight"`);
    return result.rows;
  },

  async findByPk(id) {
    const result = await client.query(`
    SELECT "product"."id", 
      "product"."weight",
      "product"."price",
      "product"."product_category_id",
      "product"."status",
      "product_category"."name" AS product_category_name
    FROM "product"
    JOIN "product_category"
      ON "product_category"."id" = "product"."product_category_id"
    WHERE "product"."id" = $1
    ORDER BY "product_category_name",
    "product"."weight"`, [id]);
    return result.rows[0];
  },

  async findOne(weight, product_category_id) {
    const result = await client.query(`
    SELECT "id"
    FROM "product"
    WHERE "weight" = $1
      AND "product_category_id" = $2`, [weight, product_category_id]);
    return result.rows[0];
  },

  async create(productsData) {
    const {
      weight, price, status, product_category_id,
    } = productsData;
    const SQLquery = {
      text: `
          INSERT INTO "product" 
              (weight, price, status, product_category_id) 
          VALUES 
              ($1, $2, $3, $4);
      `,
      values: [weight, price, status, product_category_id],
    };
    const result = await client.query(SQLquery);
    return result.rowCount;
  },

  async update(id, productsData) {
    const {
      weight, price, status, product_category_id, updated_at,
    } = productsData;
    const SQLquery = {
      text: `
          UPDATE "product"
          SET "weight" = $1,
              "price" = $2,
              "status" = $3,
              "product_category_id" = $4,
              "updated_at" = $5
          WHERE "id" = $6
          RETURNING *;
      `,
      values: [weight, price, status, product_category_id, updated_at, id],
    };
    const result = await client.query(SQLquery);
    return result.rows[0];
  },

};
