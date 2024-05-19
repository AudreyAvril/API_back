/* eslint-disable camelcase */
import client from '../helpers/pg.client.js';

export default {

  async findAll() {
    const result = await client.query('SELECT * FROM "delivery_place" ORDER BY "delivery_place"."name"');
    return result.rows;
  },

  async findByName(name) {
    const result = await client.query('SELECT "id" FROM "delivery_place" WHERE "name"=$1', [name]);
    return result.rows;
  },

  async findAllDatesByPlaces() {
    const result = await client.query(`
   SELECT "delivery_place"."id",
    "delivery_place"."name",
    array_agg("delivery_date"."date") AS "delivery_date"
   FROM "delivery_place"
   JOIN "place_has_date"
     ON "delivery_place"."id" = "place_has_date"."delivery_place_id"
   JOIN "delivery_date"
     ON "delivery_date"."id" = "place_has_date"."delivery_date_id"
   WHERE "delivery_date"."date" > now() + interval '52 hours'
   GROUP BY "delivery_place"."id", "delivery_place"."name"
   ORDER BY "delivery_place"."id"
      `);
    return result.rows;
  },

  async findByPk(id) {
    const result = await client.query('SELECT * FROM "delivery_place" WHERE "id" = $1', [id]);
    return result.rows[0];
  },

  async findDatesForOnePlace(id) {
    const result = await client.query(`
    SELECT "delivery_date"."date", "delivery_date"."id"
    FROM "place_has_date"
    JOIN "delivery_date"
     ON "delivery_date"."id" = "place_has_date"."delivery_date_id"
    WHERE "place_has_date"."delivery_place_id" = $1`, [id]);
    return result.rows;
  },

  async create(placesData) {
    const {
      name, adress, zip_code, city, information, status,
    } = placesData;
    const SQLquery = {
      text: `
          INSERT INTO "delivery_place" 
              ("name", "adress", "zip_code", "city", "information", "status") 
          VALUES 
              ($1, $2, $3, $4, $5, $6);`,
      values: [name, adress, zip_code, city, information, status],
    };
    const result = await client.query(SQLquery);
    return result.rowCount;
  },

  async update(id, placesData) {
    const {
      name, adress, zip_code, city, information, status, updatedAt,
    } = placesData;
    const SQLquery = {
      text: `
          UPDATE "delivery_place" 
          SET "name" = $1,
              "adress" = $2,
              "zip_code" = $3,
              "city" = $4,
              "information" = $5,
              "status" = $6,
              "updated_at" = $7
          WHERE "id" = $8
          RETURNING *;
      `,
      values: [name, adress, zip_code, city, information, status, updatedAt, id],
    };
    const result = await client.query(SQLquery);
    return result.rows[0];
  },

};
