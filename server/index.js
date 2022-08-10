import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Post from "./models/postMessage.js";
import User from "./models/user.modle.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use('/posts',postRoutes);
app.use(cors());
app.use(express.json());

// const CONNECTION_URL = 'mongodb+srv://hdrali036:abcde247@cluster0.0ye8u.mongodb.net/?retryWrites=true&w=majority';
// mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
// sudo systemctl start mongod (to start mongodb Server)
// sudo service mongod stop (to stop server)
// const PORT= process.env.PORT ||5000;
// mongoose.connect(CONNECTION_URL);
mongoose.connect("mongodb://localhost:27017/memories");

app.post("/api/register", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    console.log("Email exists:");
    if (!user) {
      await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        profilePicture:'empty',
        coverPicture:'empty',
        gender:'M',
      });
      res.json({ status: "userRegistered" });
    } else {
      res.send({ status: "emailExists" });
    }
  } catch (error) {
    res.json({ status: "Error", error });
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    const token = jwt.sign(
      {
        firstName: user.firstName,
        email: user.email,
      },
      "secret123"
    );
    res.json({ status: "ok", user: token });
  } else {
    res.json({ status: "error", user: false });
  }
});

app.get("/api/quote", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const user = await User.findOne({ email: email });

    return res.json({
      status: "ok",
      quote: user.quote,
      name: user.firstName + " " + user.lastName,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

app.post("/api/quote", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    await User.updateOne({ email: email }, { $set: { quote: req.body.quote } });

    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

app.post("/api/createPost", async (req, res) => {
  const token = req.body.token;
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    await Post.create({
      creator: req.body.postData.creator,
      title: req.body.postData.title,
      message: req.body.postData.message,
      tags: req.body.postData.tags,
      selectedFile: req.body.postData.selectedFile,
      createdAt: Date(),
      email: email,
    });
    res.json({ status: "Posted" });
  } catch (error) {
    res.json({ status: "Error", error });
  }
});

app.get("/api/getPosts", async (req, res) => {
  try {
    var element = {},
      cart = [];
    const user = await Post.find();
    for (let index = 0; index < user.length; index++) {
      const owner = await User.findOne({
        email: user[index].email,
      });
      element.name = owner.firstName + " " + owner.lastName;
      cart.push(element.name);
    }
    // console.log('posts',cart);
    return await res.json({
      status: "ok",
      posts: user,
      names: cart,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

app.post("/api/likePost", async (req, res) => {
  
  try {
    const user = await Post.findOne({ _id: req.body._id });
    await user.updateOne({ likeCount: req.body.likeCount });
    res.json({ status: "LikeCountIncreased" });
  } catch (error) {
    res.json({ status: "Error", error });
  }
});

app.post("/api/deletePost", async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.body._id });
    res.json({ status: "PostDeleted" });
  } catch (error) {
    res.json({ status: "Error", error });
  }
});

app.get("/api/getProfile", async (req, res) => {
  try {
    var element = {},
      cart = [];
    const id = req.headers["x-access-token"];

    const post = await Post.findOne({
      _id: id,
    });
    const posts = await Post.find({ email: post.email });

    const owner = await User.findOne({
      email: post.email,
    });

    return await res.json({
      status: "ok",
      posts: posts,
      profile: owner,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

app.post("/api/setProfilePicture", async (req, res) => {
  const token = req.body.token;
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const user = await User.findOne({ email: email });
    await user.updateOne({ profilePicture: req.body.pictureState });
    res.json({ status: "Profile Updated" });
  } catch (error) {
    res.json({ status: "Error", error });
  }
});


app.listen(1337, () => {
  console.log("Server is Running at:");
  console.log("http://localhost:1337/");
});
