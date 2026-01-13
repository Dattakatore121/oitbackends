const Blog = require("../models/blog.model");

// GET blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ blogs });
  } catch (err) {
    console.error("Get blogs error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// CREATE blog
exports.createBlog = async (req, res) => {
  try {
    const { title, author, paragraphs, publishedAt, image } = req.body;

    if (!title || !author || !paragraphs || !publishedAt) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const blog = new Blog({
      title,
      author,
      paragraphs,
      publishedAt,
      image, // Base64 string
    });

    await blog.save();
    res.status(201).json({ message: "Blog created", blog });
  } catch (err) {
    console.error("Create blog error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// UPDATE blog
exports.updateBlog = async (req, res) => {
  try {
    const { title, author, paragraphs, publishedAt, image } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.title = title || blog.title;
    blog.author = author || blog.author;
    blog.paragraphs = paragraphs || blog.paragraphs;
    blog.publishedAt = publishedAt || blog.publishedAt;
    blog.image = image || blog.image;

    await blog.save();
    res.json({ message: "Blog updated", blog });
  } catch (err) {
    console.error("Update blog error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// DELETE blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json({ message: "Blog deleted" });
  } catch (err) {
    console.error("Delete blog error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
