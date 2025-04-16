module.exports = (app) => {
    app.get('/api/users', (req, res) => {
      res.json({ message: 'Users route is working' });
    });
  };
  