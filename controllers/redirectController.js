const Url = require("../models/Url");

exports.redirect = (req, res, next) => {
  // console.log(req.params);
  const { shortId } = req.params;
  // console.log(shortId);
  Url.findOne({ shortId: shortId })
    .then((doc) => {
      if (doc) {
        const { longUrl } = doc;
        // console.log(longUrl);
        res.status(200).send({
          message: "success",
          longUrl: longUrl,
        });
      } else {
        res.status(400).json({ message: "The short url doesn't exists" });
      }
    })
    .catch((err) => res.send(er.message));
};
