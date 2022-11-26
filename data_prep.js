const Sequelize = require("sequelize");
var sequelize = new Sequelize(
  "hwvlgbrd",
  "hwvlgbrd",
  "4849BbbgKNhRs96FitFyLDKo59-sFsul",
  {
    host: "heffalump.db.elephantsql.com",
    dialect: "postgres",
    port: 5432,
    dialectOptions: {
      ssl: { rejectUnauthorized: false },
    },
    query: { raw: true },
  }
);

var Student = sequelize.define("Student", {
  StudId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  program: Sequelize.STRING,
  gpa: Sequelize.FLOAT,
});

var fs = require("fs");

var students = [];

exports.prep = () => {
  return new Promise((resolve, reject) => {
    sequelize
      .sync()
      .then(function () {
        resolve();
      })
      .catch(function (params) {
        reject("unable to sync the database");
      });
  });
};

exports.addStudent = (stud) => {
  return new Promise((resolve, reject) => {
    Student.create(stud)
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject("unable to add the student");
      });
  });
};

exports.cpa = () => {
  return new Promise((resolve, reject) => {
    Student.findAll({ where: { program: "CPA" } })
      .then((data) => {
        resolve(data);
      }).catch(function () {
        
      reject("no results returned");
      })

  });
};

module.exports.highGPA = () => {
  return new Promise((resolve, reject) => {
    Student.findAll({
        where:{gpa:[sequelize.fn('max',sequelize.col('gpa'))]}
    }).then(function (data) {
resolve(data);
      }).catch(function () {
        reject("no results returned");
      });
  });
};
