const router = require("express").Router();
const { Post, Comment, User } = require("../models/");

// get all posts for homepage
router.get("/", async (req, res) => {
  try {
    // TODO: 1. Find all Posts and associated Users
    // TODO: 2. Serialize data (use .get() method, or use raw: true, nest: true in query options)
    // TODO: 3. Render the 'all-posts' template with the posts data
    const postData = await Post.findAll({
      include: [{ model: User }],
    });
    // const posts = [];
    // for(let i=0; i<postData.length; i++) {
    //   posts.push(postData[i].get({ plain: true }))
    // }
    const posts = postData.map(post => post.get({ plain: true }));
    res.render("all-posts", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single post
router.get("/post/:id", async (req, res) => {
  try {
    // TODO: 1. Find a single Post by primary key and include associated User and Comments (Comment will also need to include a User)
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });
    // TODO: 2. Serialize data (use .get() method, or use raw: true, nest: true in query options)
    const singlePost = postData.get({ plain: true });
    // TODO: 3. Render the 'single-post' template with the post data
    res.render("single-post", {
      singlePost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// localhost:3001/login
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    // redirect to localhost3001:/
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

module.exports = router;
