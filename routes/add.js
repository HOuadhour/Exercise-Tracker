const router = require("express").Router();
const { addExercise } = require("../schemas/Exercise");

module.exports = params => {
  router.post("/", (req, res) => {
    const { userId, duration, description, date } = req.body;
    addExercise(userId, duration, description, date)
      .then(doc => {
        if (!doc) {
          res.json({ error: "User id is not recognized by the database." });
        } else {
          res.json({
            _id: doc.user._id,
            username: doc.user.username,
            date: doc.date.toString().split(" ").splice(0, 4).join(" "),
            duration: doc.duration,
            description: doc.description,
          });
        }
      })
      .catch(err => {
        res.json({ error: err.message });
      });
  });
  return router;
};
