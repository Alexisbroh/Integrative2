var express = require('express');
var router = express.Router();
const passport = require('passport');
const myPosts = require('../models/myPosts');



/* GET home page. */

router.get('/', (req, res,) => { 
  res.render('index')
});
router.get('/initial_page',isAuthenticated, (req, res,) => { 
  res.render('initial_page');
});
router.get('/analytics',isAuthenticated, (req, res, ) => { 
  res.render('analytics');
}); 
//router.get('/landing', (req, res) => {
  //res.render('landing');
//});

router.get('/my_posts',isAuthenticated, (req, res) => {
  res.render('my_posts');
});

router.get('/routines',isAuthenticated, (req, res) => {
  res.render('routines');
});

router.get('/example',isAuthenticated, (req, res) => {
  res.render('example');
});

router.get('/newPost',isAuthenticated, (req, res) => {
  res.render('newPost');
});


//Render de la vista login
router.get('/login', (req, res) => {
  res.render('login');
});

//POST Login
router.post('/login', passport.authenticate('local-signin', {
  successRedirect: '/initial_page',
  failureRedirect: '/login',
  failureFlash: true
}));


//Renderiza form de Sign Up
router.get('/signUp', (req, res) => {
  res.render('signUp');
});


//POST Sign Up
router.post('/signUp', passport.authenticate('local-signup',{
  successRedirect: '/',
  failureRedirect: '/signUp',
  failureFlash: true
}));

router.get("/logout", (req, res) => {
  req.logout(req.user, err => {
    if(err) return next(err);
    res.redirect("/index");
  });
});

function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/index');
}



//POSTS BACKEND


router.post('/newPost', async function (req, res, next) {
  const { name_user, date, title, post } = req.body; // Obtener los datos del formulario

  try {

    // Crear un nuevo objeto de usuario y asignar los valores
    const newPost = new Posts({
      name_user,
      date,
      title,
      post
    });

    // Guardar el nuevo usuario en la base de datos
    await newPost.save();

    // Redirigir a la página de éxito o a otra ruta según sea necesario
    res.redirect('/initial_page');
  } catch (error) {
    // Manejar cualquier error que ocurra durante el proceso de registro
    console.error(error);
    res.redirect('/initial_page');
  }
});

router.get('/initial_page', async function(req, res, next) {
  try {
    const posts = await myPosts.find(); // Obtener los datos de la base de datos
    console.log(posts); // Asegúrate de que obtienes los datos correctamente en la consola
    res.render('initial_page', { post:newPost }); // Pasar los datos a la plantilla EJS
  } catch (error) {
    console.error(error);
    res.redirect('/initial_page'); // Redireccionar en caso de error
  }
});

 
module.exports = router;
