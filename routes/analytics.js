router.get('/analytics', async (req, res) => {
    try {
      const timers = await Timer.find();
      console.log(timers); // Agrega esta línea para verificar los datos
      res.render('analytics', { timers });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching timers');
    }
  });