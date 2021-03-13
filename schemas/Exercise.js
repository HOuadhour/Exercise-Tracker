const { Schema, model } = require("mongoose");
const { getUserByID, User } = require("./User");

const exerciceSchema = Schema({
  user: { type: Object, required: true },
  date: Date,
  duration: { type: Number, required: true },
  description: { type: String, required: true },
});

const Exercise = model("Exercise", exerciceSchema);

async function addExercise(id, duration, description, date) {
  try {
    const user = await User.findById(id).exec();
    if (user) {
      const exercise = new Exercise();
      exercise.user = user;
      exercise.duration = duration;
      exercise.description = description;
      exercise.date = date ? new Date(date) : new Date();
      return exercise.save();
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}

module.exports = { addExercise, Exercise };
