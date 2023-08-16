
router.post('/newPost', async function (req, res, next) {
    const { name_user, title, post, date } = req.body; // Obtener los datos del formulario
  
    try {
      // Crear un nuevo objeto de usuario y asignar los valores
      const newPost = new myPosts({
        name_user,
        title,
        post,
        date
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
  
  router.get('/initial_page', async function (req, res, next) {
    try {
      const posts = await myPosts.find(); // Obtener los datos de la base de datos
      console.log(posts); // Asegúrate de que obtienes los datos correctamente en la consola
      res.render('initial_page', { posts }); // Pasar los datos a la plantilla Pug
    } catch (error) {
      console.error(error);
      res.redirect('/initial_page'); // Redireccionar en caso de error
    }
  });
  
  module.exports = router;
  