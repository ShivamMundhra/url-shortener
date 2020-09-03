const nanoid = require("nanoid");
const Url = require("../models/Url");
const validUrl = require("valid-url");
const User = require("../models/User");

const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
// generate(alphabet, 8);

exports.shorten = async (req, res, next) => {
  let userId;
  if (req.user) {
    userId = req.user._id;
  }
  // console.log(req.user);
  // console.log(req.body);
  const { url } = req.body;
  if (validUrl.isUri(url)) {
    const shortId = nanoid.customAlphabet(alphabet, 8)();
    try {
      let doc = await Url.findOne({ longUrl: url });
      if (!doc) {
        doc = await Url.create({
          longUrl: url,
          shortId,
        });
      }
      if (userId) {
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $push: { urls: { url: doc._id, date: Date.now() } } },
          { new: true }
        );
        // console.log(updatedUser);
      }
      return res.status(201).json({
        status: "sucess",
        data: {
          doc,
        },
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  } else {
    return res.status(400).json("Invalid Url! Please enter a valid url.");
  }
};

exports.getHistory = async (req, res, next) => {
  if (!req.user) {
    return res.status(400).json({ message: "Please Login To history" });
  }
  // const { urls } = req.user;

  try {
    const user = await User.findById(req.user._id).populate({
      path: "urls",
      populate: { path: "url" },
    });
    const { urls } = user;
    return res.status(200).json({
      status: "success",
      data: {
        urls,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: "try again" });
  }
};
