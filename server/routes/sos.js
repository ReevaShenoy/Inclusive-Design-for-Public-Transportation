module.exports = (app) => {
    app.get('/api/sos', (req, res) => {
      res.json({ message: 'SOS route is working' });
    });
  };
  