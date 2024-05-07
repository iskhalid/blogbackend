const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Post = require("./models/Post");
const app = express();
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
const uploadOnCloudinary = require("./cloudinary.js");
const Blog = require("./models/Blog");
const Scouting = require("./models/Scouting");
// const cors = require('cors')zzz
require("dotenv").config();

const port = process.env.PORT || 4000;

app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect(process.env.MONGODB_URL);

app.get("/",(req,res) => {
  res.json({message:"welcome"})
})

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  const response = await uploadOnCloudinary(newPath);
  const url = response.url;

  const { title, heading, content } = req.body;
  const postDoc = await Post.create({
    title,
    heading,
    content,
    imageUrl: url,
  });
  res.json(postDoc);
});

app.post("/blogs", uploadMiddleware.single("file"), async (req, res) => {
  console.log("inside blog");
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  const response = await uploadOnCloudinary(newPath);
  const url = response.url;

  const { title, heading, content } = req.body;
  const blogDoc = await Blog.create({
    title,
    heading,
    content,
    imageUrl: url,
  });
  res.json(blogDoc);
});

app.post("/scouting", uploadMiddleware.single("file"), async (req, res) => {
  console.log("inside scouting");
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  const response = await uploadOnCloudinary(newPath);
  const url = response.url;

  const { title } = req.body;
  const scoutingDoc = await Scouting.create({
    title,

    imageUrl: url,
  });
  res.json(scoutingDoc);
});

app.delete("/post/:id", async (req, res) => {
  console.log("Insdie delete ");
  const id = req.params.id;
  // console.log("inside delete")
  // const {_id} = req.body;

  try {
    // Use findOneAndDelete to find and delete the document by its ID
    const deletedDocument = await Post.findOneAndDelete({ _id: id });

    if (!deletedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }

    res
      .status(200)
      .json({ message: "Document deleted successfully", deletedDocument });
  } catch (err) {
    console.error("Error deleting document:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/blog/:id", async (req, res) => {
  console.log("Insdie delete ");
  const id = req.params.id;
  // console.log("inside delete")
  // const {_id} = req.body;

  try {
    // Use findOneAndDelete to find and delete the document by its ID
    const deletedDocument = await Blog.findOneAndDelete({ _id: id });

    if (!deletedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }

    res
      .status(200)
      .json({ message: "Document deleted successfully", deletedDocument });
  } catch (err) {
    console.error("Error deleting document:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/scouting/:id", async (req, res) => {
  console.log("Insdie delete ");
  const id = req.params.id;
  // console.log("inside delete")
  // const {_id} = req.body;

  try {
    // Use findOneAndDelete to find and delete the document by its ID
    const deletedDocument = await Scouting.findOneAndDelete({ _id: id });

    if (!deletedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }

    res
      .status(200)
      .json({ message: "Document deleted successfully", deletedDocument });
  } catch (err) {
    console.error("Error deleting document:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
//   let newPath = null;
//   if (req.file) {
//     const {originalname,path} = req.file;
//     const parts = originalname.split('.');
//     const ext = parts[parts.length - 1];
//     newPath = path+'.'+ext;
//     fs.renameSync(path, newPath);
//   }

//   const {token} = req.cookies;
//   jwt.verify(token, secret, {}, async (err,info) => {
//     if (err) throw err;
//     const {id,title,summary,content} = req.body;
//     const postDoc = await Post.findById(id);
//     const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
//     if (!isAuthor) {
//       return res.status(400).json('you are not the author');
//     }
//     await postDoc.update({
//       title,
//       summary,
//       content,
//       cover: newPath ? newPath : postDoc.cover,
//     });

//     res.json(postDoc);
//   });

// });

app.get("/news", async (req, res) => {
  console.log("inside post ");
  res.json(
    await Post.find()
    // .populate('author', ['username'])
    // .sort({createdAt: -1})
    // .limit(20)
  );
});

app.get("/blogs", async (req, res) => {
  console.log("inside get blog ");
  res.json(
    await Blog.find()
    // .populate('author', ['username'])
    // .sort({createdAt: -1})
    // .limit(20)
  );
});

app.get("/scouting", async (req, res) => {
  console.log("inside get scouting ");
  res.json(
    await Scouting.find()
    // .populate('author', ['username'])
    // .sort({createdAt: -1})
    // .limit(20)
  );
});

app.listen(port,()=>{
  console.log("server running at",port)
});
//
