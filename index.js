const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const handlebars = require("express-handlebars");
const members = require("./models/Members");

const app = express();

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine("handlebars", handlebars( { defaultLayout: "main" } ));
app.set("view engine", "handlebars");

app.get("/", (request, response) => response.render("index", { 
    title: "Members Application",
    members 
}));

app.get("/new-member", (request, response) => response.render("new-member", { 
    title: "Add a new member"
}));

app.use(express.static(path.join(__dirname, "public")));
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));