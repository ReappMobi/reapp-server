import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.get('/', (_: Request, res: Response) => {
  res.send('hello world! ');
});

app.listen(8080, () =>
  console.log('🚀 Server is running on http://localhost:8080'),
);
