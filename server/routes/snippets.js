const router = require("express").Router();
const Snippet = require("../models/snippetModel");
const auth = require("../middleware/auth");

router.get("/snippets", auth, async (req, res) => {
  try {
    const snippets = await Snippet.find({ user: req.user });
    return res.status(200).json({
      success: true,
      snippets,
    });
  } catch (error) {
    if (error) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }
});

router.post("/snippets", auth, async (req, res) => {
  try {
    const { title, description, code } = req.body;

    if (!description && !code) {
      return res.status(400).json({
        success: false,
        message: "Enter at least a description or add code",
      });
    }

    const newSnippet = new Snippet({
      title,
      description,
      code,
      user: req.user,
    });

    const savedSnippet = await newSnippet.save();
    return res.status(200).json({
      success: true,
      message: "Snippet created",
      savedSnippet,
    });
  } catch (error) {
    if (error) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }
});

router.put("/snippets/:id", auth, async (req, res) => {
  try {
    const snippetId = req.params.id;
    const { title, code, description } = req.body;

    // if (!description && !code) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Enter at least a description or add code"
    //   })
    // }

    if (!snippetId)
      return res.status(400).json({
        success: false,
        message: "No Snippet ID supplied",
      });

    const originalSnippet = await Snippet.findById(snippetId);

    if (!originalSnippet)
      return res.status(400).json({
        success: false,
        message: "No Snippet with supplied ID is found",
      });

    if (originalSnippet.user.toString() !== req.user)
      return res.status(401).json({ message: "Unauthorized" });

    if (title) originalSnippet.title = title;
    if (description) originalSnippet.description = description;
    if (code) originalSnippet.code = code;

    const savedSnippet = await originalSnippet.save();

    return res.json({
      status: "success",
      savedSnippet,
    });
  } catch (error) {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }
});

router.delete("/snippets/:id", auth, async (req, res) => {
  try {
    const snippetId = req.params.id;

    if (!snippetId)
      return res.status(400).json({
        success: false,
        message: "No Snippet ID supplied",
      });

    const existingSnippet = await Snippet.findById(snippetId);

    if (!existingSnippet)
      return res.status(400).json({
        success: false,
        message: "No Snippet with supplied ID is found",
      });

    if (existingSnippet.user.toString() !== req.user)
      return res.status(401).json({ message: "Unauthorized" });

    await existingSnippet.delete();

    return res.status(200).json({
      status: "success",
      existingSnippet,
    });
  } catch (error) {
    if (error) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }
});

module.exports = router;
