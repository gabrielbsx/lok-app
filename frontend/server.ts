import express, { Request, Response } from 'express';
import { readFileSync } from 'fs';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/*', (request: Request, response: Response) => {
    const html =  readFileSync(path.join(__dirname, 'index.html'));

    response.send(html);
});

app.listen(9000);
