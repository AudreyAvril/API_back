/* eslint-disable camelcase */
import client from '../helpers/pg.client.js';

export default {

  async findAll() {
    const result = await client.query('SELECT * FROM "product_category" ORDER BY "name"');
    return result.rows;
  },

  async findByPk(id) {
    const result = await client.query('SELECT * FROM "product_category" WHERE "id" = $1', [id]);
    return result.rows[0];
  },

  async findByName(name) {
    const result = await client.query('SELECT "id" FROM "product_category" WHERE "name" = $1', [name]);
    return result.rows[0];
  },

  async findProductsListFromOneCategory(id) {
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
    WHERE "product"."product_category_id" = $1
    ORDER BY "product_category_name",
    "product"."weight"`, [id]);
    return result.rows;
  },

  async create(productCategoriesData) {
    const {
      name, description, photo, status,
    } = productCategoriesData;
    const SQLquery = {
      text: `
          INSERT INTO "product_category" 
              (name, description, photo, status) 
          VALUES 
              ($1, $2, $3, $4);
      `,
      values: [name, description, photo, status],
    };
    const result = await client.query(SQLquery);
    return result.rowCount;
  },

  async update(id, productCategoriesData) {
    const {
      name, description, photo, status, updated_at,
    } = productCategoriesData;
    const SQLquery = {
      text: `
          UPDATE "product_category" 
          SET "name" = $1,
              "description" = $2,
              "photo" = $3,
              "status" = $4,
              "updated_at" = $5
          WHERE "id" = $6
          RETURNING *;
      `,
      values: [name, description, photo, status, updated_at, id],
    };
    const result = await client.query(SQLquery);
    return result.rows[0];
  },

  async delete(id) {
    const result = await client.query('DELETE FROM "product_category" WHERE "id" = $1', [id]);
    // 0 become false and 1 become true
    return !!result.rowCount;
  },

};
