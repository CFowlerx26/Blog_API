const express = require("express");
const blogModel = require("../model/blogSchema");
const middleware = require("../middleware/authmiddleware");

//Create a Router
const router = express.Router();

//* GET BLOG
router.get("/", middleware, async (req, res) => {
  try {
    const blogs = await blogModel.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
  }
});

//* CREATE BLOG
router.post("/", async (req, res) => {
  const blogData = req.body;

  try {
    const blogs = await blogModel.create(blogData);
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(400).json("Bad request!");
  }
});

router.get("/:id", middleware, async (req, res) => {
  const id = req.params.id;

  try {
    const blog = await blogModel.findById(id);
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
  }
});

//* UPDATE BLOG
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  try {
    const blog = await blogModel.findByIdAndUpdate(id, newData, { new: true });
    res.status(202).json(blog);
  } catch (error) {
    console.error(error);
  }
});

//* DELETE BLOG
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await blogModel.findByIdAndDelete(id);
    res.status(204).json(blog);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
