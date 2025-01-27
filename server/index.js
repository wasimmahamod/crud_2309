const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
//connect database
mongoose
  .connect(
    "mongodb+srv://mern2309:mern2309@cluster0.qa3ft.mongodb.net/mern2309?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("database is connected ");
  });

//   model

const todo = mongoose.model("Todo", {
  name: String,
  age: Number,
  email: String,
});

//  add task
app.post("/create", (req, res) => {
  console.log(req.body.name);

  const result = new todo({
    name: req.body.name,
  });

  result.save();
  res.status(201).send({ success: true, msg: "todo created successfull" });
});
// all todos get
app.get("/alltodos", async (req, res) => {
  let alltodos = await todo.find({});
  res.send(alltodos);
});

// delete todo

app.delete("/deletetodo/:id", async (req, res) => {
  let { id } = req.params;
  console.log(id);
  let deletetodo = await todo.findOneAndDelete({
    _id: id,
  });
  res
    .status(200)
    .send({ success: true, msg: "deleted successfull", data: deletetodo });
});

app.patch("/updatetodo/:id", async (req, res) => {
  let { id } = req.params;
  let { name } = req.body;

  let result = await todo.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true }
  );
  res.send(result);
});

app.listen(3000, () => {
  console.log("server is running ");
});
