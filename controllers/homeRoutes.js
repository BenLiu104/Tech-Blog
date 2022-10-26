const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//find all blog posts and render to homepage
router.get('/', async (req, res) => {
  try {
    const projectData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const posts = projectData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//render specific post by post id
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const rawComments = await Comment.findAll({
      include: [{ model: User, attributes: ['name'] }],
      where: { post_id: req.params.id },
    });

    if (postData) {
      const post = postData.get({ plain: true });
      const comment = rawComments.map((cm) => cm.get({ plain: true }));
      res.render('post', {
        ...post,
        comment,
        logged_in: req.session.logged_in,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/update/:id', withAuth, async (req, res) => {
  // If the user is already logged in, redirect the request to another route
  const rawPost = await Post.findByPk(req.params.id);
  const post = rawPost.get({ plain: true });

  res.render('updatePost', { ...post, logged_in: true });
});

router.get('/newPost', withAuth, async (req, res) => {
  res.render('newPost', { logged_in: true });
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});
module.exports = router;
