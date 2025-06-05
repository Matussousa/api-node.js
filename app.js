import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.json({ message: "Hello, CI/CD Node!" });
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
