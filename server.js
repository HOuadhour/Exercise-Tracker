require("dotenv").config();
require("./db");
const app = require("./middleware");

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
