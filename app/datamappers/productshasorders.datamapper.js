/* eslint-disable camelcase */
import client from '../helpers/pg.client.js';

export default {
  async findByPk(id) {
    const result = await client.query(`
        SELECT
            "order"."customer_id",
            "order"."creator_id",
            "user"."last_name",
            "user"."first_name",
            "user"."email",
            "delivery_place"."name" AS "delivery_place_name",
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
        WHERE "product_has_order"."id" = $1`, [id]);
    return result.rows[0];
  },

  async update(id, orderData) {
    const { quantity, updated_at } = orderData;
    const SQLquery = {
      text: `
          UPDATE "product_has_order" 
          SET "quantity" = $1,
              "updated_at" = $2
          WHERE "id" = $3
          RETURNING *;
      `,
      values: [quantity, updated_at, id],
    };
    const result = await client.query(SQLquery);
    return result.rows[0];
  },

  async delete(id) {
    const result = await client.query('DELETE FROM "product_has_order" WHERE "id" = $1', [id]);
    return result.rows[0];
  },

};
