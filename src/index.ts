import express, { Express, Request, Response } from 'express';

const app: Express = express();

const PORT = process.env.PORT || 8080;

app.get('/', (_: Request, res: Response) => {
  res.send('hello world 2!');
});

app.listen(PORT, () =>
  console.log(`🚀 Server is running on http://localhost:${PORT}`),
);
