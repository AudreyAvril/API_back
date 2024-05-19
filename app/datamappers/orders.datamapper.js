/* eslint-disable camelcase */
import client from '../helpers/pg.client.js';

export default {

  async findAll() {
    const result = await client.query(
      `SELECT DISTINCT
        "order"."id",
        "order"."customer_id",
        "order"."creator_id",
        "user"."last_name" ,
        "user"."first_name",
        "delivery_place"."name" AS "delivery_place_name",
        "delivery_date"."date" AS "delivery_date_name",
        "product_category"."name",
        "product"."weight",
        "product_has_order"."quantity",
        "product_has_order"."price",
        "product_has_order"."id" AS "product_has_order_id"      
        FROM "order"
        JOIN "user"
          ON "user"."id" = "order"."customer_id"
        JOIN "delivery_place"
          ON "delivery_place"."id" = "delivery_place_id"
        JOIN "delivery_date"
          ON "delivery_date"."id" = "delivery_date_id"
        JOIN "product_has_order" 
          ON "order"."id" = "product_has_order"."order_id" 
        JOIN "product"
          ON "product"."id" = "product_has_order"."product_id"
        JOIN "product_category"
          ON "product_category"."id" = "product"."product_category_id"
        ORDER BY "delivery_date"."date"`,
    );
    return result.rows;
  },

  async findByPk(id) {
    const result = await client.query(`
      SELECT DISTINCT
        "order"."customer_id",
        "order"."creator_id",
        "user"."last_name",
        "user"."first_name",
        "delivery_place"."name" AS "delivery_place_name",
        "delivery_place"."information",
        "delivery_place"."adress",
        "delivery_place"."zip_code",
        "delivery_place"."city",
        "delivery_date"."date",
        "product_category"."name",
        "product"."weight",
        "product_has_order"."quantity",
        "product_has_order"."price"
      FROM "order"
      JOIN "user"
        ON "user"."id" = "order"."customer_id"
      JOIN "delivery_place"
        ON "delivery_place"."id" = "delivery_place_id"
      JOIN "delivery_date"
        ON "delivery_date"."id" = "delivery_date_id"
      JOIN "product_has_order"
        ON "order"."id" = "product_has_order"."order_id"
      JOIN "product"
        ON "product"."id" = "product_has_order"."product_id"
      JOIN "product_category"
        ON "product_category"."id" = "product"."product_category_id"
      WHERE "order"."id" = $1
      ORDER BY "delivery_date"."date"`, [id]);
    return result.rows[0];
  },

  async findOrdersListByUserPk(id) {
    const result = await client.query(
      `SELECT "delivery_date"."date",
        "delivery_place"."name" AS "delivery_place_name",
        "product_category"."name",
        "product"."weight",
        "product_has_order"."price",
        "product_has_order"."quantity"
      FROM "order" 
      JOIN "product_has_order" 
          ON "order"."id" = "product_has_order"."order_id" 
      JOIN "product"
          ON "product"."id" = "product_has_order"."product_id"
      JOIN "delivery_date"
          ON "delivery_date"."id" = "order"."delivery_date_id"
      JOIN "delivery_place"
          ON "delivery_place"."id" = "order"."delivery_place_id"
      JOIN "product_category"
          ON "product_category"."id" = "product"."product_category_id"
      WHERE "customer_id" = $1
      ORDER BY "delivery_date"."date","product_category"."name"`,
      [id],
    );

    return result.rows;
  },

  async create(orderData) {
    const {
      creator_id, customer_id, delivery_place_id, delivery_date_id,
    } = orderData;
    const SQLquery = {
      text: `
          INSERT INTO "order" 
              (creator_id, customer_id, delivery_place_id, delivery_date_id) 
          VALUES 
              ($1, $2, $3, $4)
          RETURNING "id";`,
      values: [creator_id, customer_id, delivery_place_id, delivery_date_id],
    };
    const result = await client.query(SQLquery);
    return result.rows[0];
  },

  async createProductHasOrder(OrderId, orderData) {
    const { product_id, quantity, price } = orderData;

    const SQLquery = {
      text: `
          INSERT INTO "product_has_order" 
              ("product_id", "order_id", "quantity", "price") 
          VALUES 
              ($1, $2, $3, $4);`,
      values: [product_id, OrderId, quantity, price],
    };
    const result = await client.query(SQLquery);

    return result.rowCount;
  },

  async updateOrder(id, orderData) {
    const {
      // eslint-disable-next-line max-len
      creator_id, customer_id, delivery_place_id, delivery_date_id, updated_at,
    } = orderData;
    const SQLquery = {
      text: `
          UPDATE "order" 
          SET "creator_id" = $1,
              "customer_id" = $2,
              "delivery_place_id" = $3,
              "delivery_date_id" = $4,
              "updated_at" = $5
          WHERE "id" = $6
          RETURNING *;
      `,
      values: [creator_id, customer_id, delivery_place_id, delivery_date_id, updated_at, id],
    };

    const result = await client.query(SQLquery);

    return result.rows[0];
  },

  async updateProductHasOrder(id, orderData) {
    const {
      // eslint-disable-next-line max-len
      product_id, quantity, price, updated_at,
    } = orderData;
    const SQLquery = {
      text: `
          UPDATE "product_has_order" 
          SET "quantity" = $1,
              "price" = $2,
              "updated_at" = $3
          WHERE "order_id" = $4 
          AND "product_id"=$5
          RETURNING *;
      `,
      values: [quantity, price, updated_at, id, product_id],
    };
    const result = await client.query(SQLquery);
    return result.rows[0];
  },

  async delete(id) {
    const result = await client.query('DELETE FROM "order" WHERE "id" = $1', [id]);
    // 0 become false and 1 become true
    return !!result.rowCount;
  },

};
