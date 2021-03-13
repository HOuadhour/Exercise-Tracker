const router = require("express").Router();
const { getUsers } = require("../schemas/User");

module.exports = params => {
  router.get("/", (req, res) => {
    getUsers()
      .then(doc => {
        res.json(doc);
      })
      .catch(err => {
        res.json({ error: "Problem in fetching data." });
      });
  });

  return router;
};
