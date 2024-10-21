// // Connecting to or creating a new SQLite database file
// const db = new sqlite3.Database("./yes.db", function (err: any) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("database has loaded");
//   }
// });
const db = require("better-sqlite3")("./yes.db");

export default db;
