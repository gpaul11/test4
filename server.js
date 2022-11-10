var express = require("express");

var app = express();

var data_prep = require("./data_prep.js");

var path = require("path");
const exphbs = require('express-handlebars');
app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");




app.use(express.json());

app.use(express.urlencoded({ extended: true }));



var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {

    console.log("Express http server listening on " + HTTP_PORT);

}



app.get("/", (req, res) => {


    res.render("home");

});



app.get("/BSD", (req, res) => {

    data_prep.bsd().then((data) => {

        res.json(data);

    }).catch((reason) => {

        res.json({ message: reason });

    });

});



app.get("/CPA", (req, res) => {

    data_prep.cpa().then((studata) => {

        res.render("srudent",{data:studata})

    }).catch((reason) => {

        res.json({ message: reason });

    });

});



app.get("/highGPA", (req, res) => {

    data_prep.highGPA().then((studata) => {

        res.render("srudent",{data:studata})

    });

});



app.get("/allStudents", (req, res) => {

    data_prep.allStudents().then((mydata) => {
            res.render("students",{data:mydata});
    }).catch((reason) => { res.json({ message: reason }) });

});



app.get("/addStudent", (req, res) => {

    res.sendFile(path.join(__dirname, "/test3_views/addStudent.html"));

});



app.post("/addStudent", (req, res) => {

    data_prep.addStudent(req.body).then(() => {

        res.render("student",{data:req.body})

    }).catch((reason) => res.json({ message: reason }));

});



app.get("/student/:studId", (req, res) => {

    data_prep.getStudent(req.params.studId).then((studata) => {
        res.render("srudent",{data:studata})

    }).catch((reason) => res.json({ message: reason }));

});



app.get("*", (req, res) => {

    res.status(404).send("Error 404: page not found.")

});



data_prep.prep().then((data) => {

    //console.log(data);

    app.listen(HTTP_PORT, onHttpStart);

}).catch((err) => {

    console.log(err);

});