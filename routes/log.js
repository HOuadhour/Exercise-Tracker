const router = require("express").Router();
const { User } = require("./../schemas/User");
const { Exercise } = require("./../schemas/Exercise");

module.exports = params => {
  router.get("/", async (req, res) => {
    const { userId, from, to, limit } = req.query;
    try {
      const user = await User.findById(userId).exec();
      if (user) {
        let exercises = Exercise.find({ user }, "-_id -user -__v");

        if (from) exercises.find({ date: { $gte: new Date(from) } });
        if (to) exercises.find({ date: { $lt: new Date(to) } });
        if (limit) exercises.limit(parseInt(limit, 10));

        exercises = await exercises.exec();

        const rep = {
          _id: user._id,
          username: user.username,
          from: from
            ? new Date(from).toString().split(" ").splice(0, 4).join(" ")
            : undefined,
          to: to
            ? new Date(to).toString().split(" ").splice(0, 4).join(" ")
            : undefined,
          count: exercises.length,
          log: [],
        };
        exercises.forEach(d => {
          const date = d.date.toString().split(" ").splice(0, 4).join(" ");

          rep.log.push({
            description: d.description,
            duration: d.duration,
            date,
          });
        });
        res.json(rep);
      } else {
        res.json({ error: "User not found in our database." });
      }
    } catch (err) {
      res.json({ error: err.message });
    }
  });
  return router;
};
