const client = require("./database");

const dataMapper = {
  /**
   * Retrieve all figurines with notes
   * @returns {promise}
   */
  async getAllFigurines() {
    const sql = `SELECT f.*, ROUND(AVG(r.note)) AS note
                 FROM figurine f
                 JOIN review r ON r.figurine_id = f.id
                 GROUP BY f.id`;
    const results = await client.query(sql);
    return results.rows;
  },

  /**
   * Retrieve one figurine with its note by its PK
   * @param {Number} id figurine PK
   * @returns {promise}
   */
  async getOneFigurine(id) {
    const sql = `SELECT f.*, ROUND(AVG(r.note)) AS note
                 FROM figurine f
                 JOIN review r ON r.figurine_id = f.id
                 WHERE f.id = $1
                 GROUP BY f.id`;
    const results = await client.query(sql, [id]);
    return results.rows[0];
  },

  /**
   * Reterieve all reviews for a figurine
   * @param {Number} id figurine PK
   * @returns {promise}
   */
  async getReviews(id) {
    const sql = {
      text: "SELECT * FROM review WHERE figurine_id = $1",
      values: [id],
    };
    const results = await client.query(sql);
    return results.rows;
  },

  /**
   * Retrieve quantity of figurines by category
   * @returns {promise}
   */
  async getFigurineQuantityByCategory() {
    const sql = `SELECT category, COUNT(name) as quantity
                 FROM figurine
                 GROUP BY category`;
    const results = await client.query(sql);
    return results.rows;
  },

  /**
   * Retrieve all figurines, with note, of a specidif category
   * @param {String} category category name
   * @returns {promise}
   */
  async getFigurineByCategory(category) {
    const sql = {
      text: `SELECT f.*, ROUND(AVG(r.note)) AS note
             FROM figurine f
             JOIN review r ON r.figurine_id = f.id
             WHERE f.category = $1
             GROUP BY f.id`,
      values: [category],
    };
    const results = await client.query(sql);
    return results.rows;
  },
};

module.exports = dataMapper;
