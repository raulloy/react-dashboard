import express from 'express';
import path from 'path';

const app = express();

app.get('/api', (req, res) => {
  res.send([{ message: 'Hello World!' }]);
});

const PORT = 5000;

// Body Parser Middleware
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, 'client/build')));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
