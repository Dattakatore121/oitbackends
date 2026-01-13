const express = require("express");
const router = express.Router();
const Blog = require("../models/blog.model");
const sharp = require("sharp");

// 🔐 Domain Middleware
const domainMiddleware = (req, res, next) => {
  const domain = req.headers["x-domain"];
  if (!domain) return res.status(400).json({ message: "Domain missing" });
  req.domain = domain;
  next();
};

// 🔥 Helper to resize Base64 image
async function resizeBase64(base64String) {
  if (!base64String) return "";
  const buffer = Buffer.from(
    base64String.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const resizedBuffer = await sharp(buffer)
    .resize(500, 300) // adjust size as needed
    .jpeg({ quality: 70 })
    .toBuffer();
  return `data:image/jpeg;base64,${resizedBuffer.toString("base64")}`;
}

// ================= GET =================
router.get("/", domainMiddleware, async (req, res) => {
  try {
    const blogs = await Blog.find({ instituteDomain: req.domain });
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ================= POST =================
router.post("/", domainMiddleware, async (req, res) => {
  try {
    const { title, author, paragraphs, publishedAt, imageBase64 } = req.body;

    const image = imageBase64 ? await resizeBase64(imageBase64) : "";

    const blog = new Blog({
      title,
      author,
      paragraphs,
      publishedAt,
      image,
      instituteDomain: req.domain,
    });

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// ================= PUT =================
router.put("/:id", domainMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findOne({
      _id: req.params.id,
      instituteDomain: req.domain,
    });

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const { title, author, paragraphs, publishedAt, imageBase64 } = req.body;

    blog.title = title || blog.title;
    blog.author = author || blog.author;
    blog.paragraphs = paragraphs || blog.paragraphs;
    blog.publishedAt = publishedAt || blog.publishedAt;

    if (imageBase64) {
      blog.image = await resizeBase64(imageBase64);
    }

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// ================= DELETE =================
router.delete("/:id", domainMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findOne({
      _id: req.params.id,
      instituteDomain: req.domain,
    });

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    await blog.deleteOne();
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
