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
    const user = await User.findOne({email: req.body.email});
    
    if (!user) {
      await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        profilePicture: 'empty',
        coverPicture: 'empty',
        gender: 'M/F',

      });
      res.json({ status: "userRegistered" });
    } else {
      console.log("Email exists:");
      res.send({ status: "emailExists" });
    }
  } catch (error) {
    console.log(error);
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
    res.json({ status: "ok", token: token, firstName: user.firstName,lastName: user.lastName, profilePicture: user.profilePicture,email:user.email,createdAt:user.createdAt });
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
    var nameElement = {},
    namesCart = [];
    var pictureElement = {},
    pictureCart = [];  
    
    const user = await Post.find().sort({ _id: -1 })
    for (let index = 0; index < user.length; index++) {
      const owner = await User.findOne({
        email: user[index].email,
      });
      nameElement.name = owner?.firstName + " " + owner?.lastName;
      namesCart.push(nameElement.name);

      pictureElement.profilePicture = owner?.profilePicture;
      pictureCart.push(pictureElement.profilePicture);
      
    }
    return await res.json({
      status: "ok",
      posts: user,
      names: namesCart,
      profilePicture:pictureCart,

    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

app.post("/api/likePost", async (req, res) => {
  const token = req.body.token;
  const likeCount = req.body.likeCount;
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const post = await Post.findOne({ _id: req.body._id });

    if (likeCount - post.likeCount == 1) await post.updateOne({ $push: { likedBy: email } });
    else await post.updateOne({ $pull: { likedBy: email } });

    await post.updateOne({ likeCount: likeCount });
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

app.get("/api/getAllProfiles", async (req, res) => {
  const requesterToken = req.headers["x-access-token"];
  let friendStatus = [];
  let dummyUser;
  try {
    const decoded = jwt.verify(requesterToken, "secret123");
    const email = decoded.email;

    const requester=await User.findOne({email:email});

      
      //hard coded for now
      dummyUser = await User.find({ email: { $nin: [email,requester.friendRequests[0],requester.friendRequests[1],requester.friendRequests[2],requester.friendRequests[3] ] } }); 
      const user =dummyUser

      for (let index = 0; index < user.length; index++) {
      const currentUser=await User.findOne({ email:user[index].email });
      for(let i = 0; i <currentUser.friendRequests.length; i++){
        if(requester.friends[i]==email) friendStatus.push('Friends');
        else if(currentUser.friendRequests[i]==currentUser.email) {friendStatus.push('Requested');}
        else {friendStatus.push('Add Friend');}
      }
      
      if(currentUser.friendRequests.length==0){
        if(requester.friends[index]==currentUser.email) friendStatus.push('Friends');
        else
        friendStatus.push('Add Friend');
      }  
    }
    return await res.json({
      status: "ok",
      profiles: user,
      friendStatus: friendStatus,
      requester:requester,

    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});


app.post("/api/addFriend", async (req, res) => {
  const sendertoken = req.body.sendertoken;
  const recevierEmail = req.body.recevierEmail;
  try {
    const decoded = jwt.verify(sendertoken, "secret123");
    const senderEmail = decoded.email;
    const recevier = await User.findOne({ email: recevierEmail });
    
    await recevier.updateOne({ $push: { friendRequests: senderEmail } });

    //to add data in Requested array
    const requester=await User.findOne({ email: senderEmail });
    await requester.updateOne({ $push: { friendRequested: recevierEmail } });

    res.json({ status: "Request Sent" });
  } catch (error) {
    res.json({ status: "Error", error });
  }
});


app.post("/api/cancelRequest", async (req, res) => {
  const sendertoken = req.body.sendertoken;
  const recevierEmail = req.body.recevierEmail;
  try {
    const decoded = jwt.verify(sendertoken, "secret123");
    const senderEmail = decoded.email;
    const recevier = await User.findOne({ email: recevierEmail });
    
    const request=await recevier.updateOne({ $pull: { friendRequests: senderEmail } });
    //to add data in Requested array
    const requester=await User.findOne({ email: senderEmail });
    await requester.updateOne({ $pull: { friendRequested: recevierEmail } });
    res.json({ status: "Request canceled" });
  } catch (error) {
    res.json({ status: "Error", error });
  }
});

app.post("/api/confirmRequest", async (req, res) => {
  const sendertoken = req.body.sendertoken;
  const recevierEmail = req.body.recevierEmail;
  try {
    const decoded = jwt.verify(sendertoken, "secret123");
    const senderEmail = decoded.email;

    const recevier = await User.findOne({ email: recevierEmail });
    const sender = await User.findOne({ email: senderEmail });
    
    await recevier.updateOne({ $push: { friends: senderEmail } });
    await sender.updateOne({ $push: { friends: recevierEmail } });

    //to add data in Requested array
    await recevier.updateOne({ $pull: { friendRequested: senderEmail,friendRequests: recevierEmail } });
    await sender.updateOne({ $pull: { friendRequested: senderEmail,friendRequests: recevierEmail } });

    res.json({ status: "Request Sent" });
  } catch (error) {
    res.json({ status: "Error", error });
  }
});


app.post("/api/deleteRequest", async (req, res) => {
  const sendertoken = req.body.sendertoken;
  const recevierEmail = req.body.recevierEmail;
  try {
    const decoded = jwt.verify(sendertoken, "secret123");
    const senderEmail = decoded.email;

    const recevier = await User.findOne({ email: recevierEmail });
    const sender = await User.findOne({ email: senderEmail });
    
    // await recevier.updateOne({ $push: { friends: senderEmail } });
    // await sender.updateOne({ $push: { friends: recevierEmail } });

    //to add data in Requested array
    await recevier.updateOne({ $pull: { friendRequested: senderEmail,friendRequests: recevierEmail } });
    await sender.updateOne({ $pull: { friendRequested: senderEmail,friendRequests: recevierEmail } });

    res.json({ status: "Request Deleted" });
  } catch (error) {
    res.json({ status: "Error", error });
  }
});

app.post("/api/removeFriend", async (req, res) => {
  const sendertoken = req.body.sendertoken;
  const recevierEmail = req.body.recevierEmail;
  try {
    const decoded = jwt.verify(sendertoken, "secret123");
    const senderEmail = decoded.email;

    const recevier = await User.findOne({ email: recevierEmail });
    const sender = await User.findOne({ email: senderEmail });
    
    await recevier.updateOne({ $pull: { friends: senderEmail } });
    await sender.updateOne({ $pull: { friends: recevierEmail } });

    res.json({ status: "Request Sent" });
  } catch (error) {
    res.json({ status: "Error", error });
  }
});


app.get("/api/getAllRequests", async (req, res) => {
  const requesterToken = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(requesterToken, "secret123");
    const email = decoded.email;

    // const user = await User.find({ email: { $nin: [email] } });
    const user = await User.findOne({ email: email });
    // console.log(user.friendRequests);
    let requesterProfile = [];
    for (let index = 0;  index < user.friendRequests.length; index++) {
      
      if(user.friendRequests[index]!=email){
      const profile = await User.findOne({email: user.friendRequests[index]});
      requesterProfile.push(profile);
      }

    }
    // console.log(requesterProfile);

    return await res.json({
      status: "ok",
      friendRequesters: user.friendRequests,
      requesterProfile: requesterProfile,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});




app.listen(1337, () => {
  console.log("Server is Running at:");
  console.log("http://localhost:1337/");
});
