const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userModel = require("./models/Usermodel");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", async (req, res) => {
  let { name, email, img } = req.body;
  let userCreated = await userModel.create({
    name,
    email,
    img,
  });

  res.redirect("/read");
});

app.get("/read", async (req, res) => {
  let allUsers = await userModel.find();
  res.render("read", { users: allUsers });
});

app.get("/delete/:id", async (req, res) => {
  let users = await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});

app.get("/edit/:userid", async (req, res) => {
  let user = await userModel.findOne({ _id: req.params.userid });
  res.render("edit", { user });
});

app.post("/update/:userid", async (req, res) => {
  let { name, email, img } = req.body;
  let user = await userModel.findOneAndUpdate(
    { _id: req.params.userid },
    { name, img, email },
    { new: true }
  );
  res.redirect("/read");
});

app.listen(3000);
