const nanoid = require("nanoid");
const Url = require("../models/Url");
const validUrl = require("valid-url");

const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
// generate(alphabet, 8);

exports.shorten = async (req, res, next) => {
  // console.log(req.body);
  const { url } = req.body;
  if (validUrl.isUri(url)) {
    const shortId = nanoid.customAlphabet(alphabet, 8)();
    try {
      const doc = await Url.findOne({ longUrl: url });
      if (doc) {
        res.status(201).json({
          status: "sucess",
          data: {
            doc,
          },
        });
      } else {
        const doc = await Url.create({
          longUrl: url,
          shortId,
        });
        res.status(201).json({
          status: "sucess",
          data: {
            doc,
          },
        });
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  } else {
    res.status(400).json("Invalid Url! Please enter a valid url.");
  }
};
