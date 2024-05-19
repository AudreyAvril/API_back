/* eslint-disable camelcase */
import client from '../helpers/pg.client.js';

export default {

  async findAll() {
    const result = await client.query('SELECT * FROM "user" ORDER BY "last_name";');
    return result.rows;
  },

  async findAllClients() {
    const result = await client.query(`
    SELECT "id",
      "last_name",
      "first_name",
      "email",
      "status"
    FROM "user" 
    WHERE "role" = 'client'
    ORDER BY "last_name", "first_name";`);
    return result.rows;
  },

  async findAllAdmins() {
    const result = await client.query(`
    SELECT "id",
      "last_name",
      "first_name",
      "status"
    FROM "user" 
    WHERE "role" = 'admin'
    ORDER BY "last_name", "first_name";`);
    return result.rows;
  },

  async findByPk(id) {
    const result = await client.query('SELECT * FROM "user" WHERE "id" = $1', [id]);
    return result.rows[0];
  },

  async findOneEmail(email) {
    const SQLquery = {
      text: 'SELECT * FROM "user" WHERE "email" = $1;',
      values: [email],
    };
    const result = await client.query(SQLquery);
    return result.rows[0];
  },

  async create(dataUser) {
    const {
      // eslint-disable-next-line max-len
      last_name, first_name, email, adress, password, phone, zip_code, city, status, role, agreement,

    } = dataUser;
    const SQLquery = {
      text: `
          INSERT INTO "user" 
              (last_name, first_name, email, password, adress, phone, zip_code, city, status, role, agreement) 
          VALUES 
              ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
      `,

      // eslint-disable-next-line max-len
      values: [last_name, first_name, email, password, adress, phone, zip_code, city, status, role, agreement],

    };
    const result = await client.query(SQLquery);
    return result.rowCount;
  },

  async update(id, userData) {
    const {
      // eslint-disable-next-line max-len
      last_name, first_name, email, password, phone, zip_code, city, status, role, agreement, adress, updated_at,
    } = userData;
    const SQLquery = {
      text: `
           UPDATE "user"
           SET
               "last_name" = $1,
                "first_name" = $2,
                "email" = $3,
                "password" = $4,
                "phone" = $5,
                "zip_code" = $6,
                "city" = $7,
                "status" = $8,
                "role" = $9,
                "agreement" = $10,
                "adress" = $11, 
                "updated_at"= $12
                WHERE "id" = $13
          RETURNING *;
       `,
      // eslint-disable-next-line max-len
      values: [last_name, first_name, email, password, phone, zip_code, city, status, role, agreement, adress, updated_at, id],
    };

    const result = await client.query(SQLquery);
    return result.rows[0];
  },

  async updateStatus(id, userData) {
    const { status, updated_at } = userData;
    const SQLquery = {
      text: `
           UPDATE "user"
           SET
                "status" = $1,
                "updated_at"= $2
                WHERE "id" = $3
          RETURNING "status";
       `,
      values: [status, updated_at, id],
    };

    const result = await client.query(SQLquery);
    return result.rows[0];
  },

  async delete(id) {
    const result = await client.query('DELETE FROM "user" WHERE "id" = $1', [id]);
    // 0 become false and 1 become true
    return !!result.rowCount;
  },

};
