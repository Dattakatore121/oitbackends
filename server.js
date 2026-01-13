const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// Routes
const adminRoutes = require("./routes/admin.routes");
const enquiryRoutes = require("./routes/enquiry.routes");
const contactInfoRoutes = require("./routes/contactInfo.routes");
const blogRoutes = require("./routes/blog.routes");
const batchRoutes = require("./routes/newBatch.routes");
const placementRoutes = require("./routes/placement.routes");
const careerRoutes = require("./routes/career.routes");
const appliedRoutes = require("./routes/applied.routes");
const textReviewRoutes = require("./routes/TextReviews.routes");



const videoReviewRoutes = require("./routes/VideoReviews.routes");


const app = express();

// ✅ Increase payload size for large Base64 images
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// ✅ Enable CORS
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/contact-info", contactInfoRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/placements", placementRoutes);
app.use("/api/batches", batchRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/applied", appliedRoutes);

app.use("/api/video-reviews", videoReviewRoutes);
app.use("/api/text-reviews", textReviewRoutes);




// Base route
app.get("/", (req, res) => {
  res.send("🚀 API is running successfully...");
});

// Error handler (optional, helps debug)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});
