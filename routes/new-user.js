const router = require("express").Router();
const { addUser } = require("../schemas/User");

module.exports = params => {
  router.post("/", (req, res) => {
    addUser(req.body.username)
      .then(doc => {
        res.json({
          username: doc.username,
          _id: doc._id,
        });
      })
      .catch(err => {
        res.json({ error: "User already exists." });
      });
  });

  return router;
};
