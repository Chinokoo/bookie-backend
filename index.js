//importing our installed modules.
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();

//middleware functions.
app.use(express.json());
app.use(cors());

//conneting to the mongodb database.
mongoose
  .connect("mongodb://localhost:27017/Books")
  .then(() => console.log("connection to the database is successfull."))
  .catch((err) => console.log("connection to the database failed.", err));

//Book Schema.
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 45,
    minlength: 0,
  },
  desc: {
    type: String,
    maxlength: 255,
    minlength: 0,
  },
  cover: {
    type: String,
    maxlength: 45,
  },
});

//Book model
const Book = mongoose.model("Book", bookSchema);

//api routes
//api for get request... getting books
app.get("/api/books", async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

//api for post request..creating a book
app.post("/api/books", async (req, res) => {
  let book = new Book({
    title: req.body.title,
    desc: req.body.desc,
    cover: req.body.cover,
  });
  await book.save();
  res.send(book);
});
//api for delete request... deleting a book
app.delete("/api/books/:id", async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  res.send(book);
});
//api for updating a book... updating a book.
app.put("/api/books/:id", async (req, res) => {
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      desc: req.body.desc,
      cover: req.body.cover,
    },
    { new: true }
  );
  res.send(book);
});

//starting the server...
const port = process.env.port || 8080;
app.listen(port, () => console.log(`server started at ${port}`));
