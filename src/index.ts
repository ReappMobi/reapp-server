import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.get('/', (_: Request, res: Response) => {
  res.send('hello world!');
});

app.listen(3000, () => console.log('Listening on port 3000!'));
