/* eslint-disable camelcase */
import client from '../helpers/pg.client.js';

export default {

  async findAll() {
    const result = await client.query('SELECT * FROM "place_has_date"');
    return result.rows;
  },

  async findAllPlacesByDate(id) {
    const result = await client.query(`
      SELECT 
        "place_has_date"."id",
        "place_has_date"."delivery_place_id",
        "delivery_place"."name",
        "place_has_date"."delivery_date_id",
        "delivery_date"."date",
        "place_has_date"."status"
      FROM "place_has_date" 
      JOIN "delivery_place"
        ON "delivery_place"."id" = "delivery_place_id"
      JOIN "delivery_date"
        ON "delivery_date"."id" = "delivery_date_id"
      WHERE "delivery_date_id" = $1;`, [id]);
    return result.rows;
  },

  async findByPk(id) {
    const result = await client.query('SELECT * FROM "place_has_date" WHERE "id" = $1', [id]);
    return result.rows[0];
  },

  async create(datesAndPlacesdata) {
    const {
      delivery_date_id, delivery_place_id,
    } = datesAndPlacesdata;
    const SQLquery = {
      text: `
            INSERT INTO "place_has_date" 
                ("delivery_date_id", "delivery_place_id") 
            VALUES 
                ($1, $2);`,
      values: [delivery_date_id, delivery_place_id],
    };
    const result = await client.query(SQLquery);

    return result.rowCount;
  },

  async update(id, datesAndPlacesdata) {
    const { delivery_date_id, delivery_place_id, updated_at } = datesAndPlacesdata;
    const SQLquery = {
      text: `
          UPDATE "place_has_date" 
          SET "delivery_date_id" = $1,
              "delivery_place_id" = $2,
              "updated_at" = $3
          WHERE "id" = $4
          RETURNING *;
      `,
      values: [delivery_date_id, delivery_place_id, updated_at, id],
    };
    const result = await client.query(SQLquery);
    return result.rows[0];
  },

  async delete(id) {
    const result = await client.query('DELETE FROM "place_has_date" WHERE id = $1', [id]);
    return result.rowCount;
  },

};
