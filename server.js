import express from 'express';

const app = express();

app.get('/api', (req, res) => {
  res.send([{ message: 'Hello World!' }]);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
