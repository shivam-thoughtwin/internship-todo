const { connect } = require("mongoose");

const {
  db: { mongoUri, useNewUrlParser, useUnifiedTopology },
} = require(".");

console.log("mongoUri---", mongoUri);

const database = {
  authenticate: () =>
    connect(mongoUri, {
      useNewUrlParser,
      useUnifiedTopology,
    }),
};

module.exports = { database };
