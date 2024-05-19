/* eslint-disable camelcase */
import client from '../helpers/pg.client.js';

export default {

  async findAll() {
    const result = await client.query('SELECT * FROM "delivery_date" ORDER BY "date"');
    return result.rows;
  },

  async findByPk(id) {
    const result = await client.query('SELECT * FROM "delivery_date" WHERE "id" = $1', [id]);
    return result.rows[0];
  },

  async findByDate(date) {
    const result = await client.query('SELECT * FROM "delivery_date" WHERE "date" = $1', [date]);
    return result.rows[0];
  },

  async create(dateData) {
    const { date, status } = dateData;
    const SQLquery = {
      text: `
          INSERT INTO "delivery_date" 
              ("date", "status") 
          VALUES 
              ($1, $2);`,
      values: [date, status],
    };
    const result = await client.query(SQLquery);
    return result.rowCount;
  },

  async update(id, dateData) {
    const { date, status, updated_at } = dateData;

    const SQLquery = {
      text: `
          UPDATE "delivery_date" 
          SET "date" = $1,
              "status"= $2,
              "updated_at" = $3
          WHERE "id" = $4
          RETURNING *;
      `,
      values: [date, status, updated_at, id],
    };
    const result = await client.query(SQLquery);
    return result.rows[0];
  },

};
