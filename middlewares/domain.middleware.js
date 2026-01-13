module.exports = (req, res, next) => {
  const domain = req.headers["x-domain"];

  if (!domain) {
    return res.status(400).json({ message: "Domain header missing" });
  }

  req.domain = domain;
  next();
};


 