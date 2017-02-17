import config from './config';
import express from 'express';
export const app = express();

app.listen(config.PORT, ()=> {
  console.log(`express server listening on port ${config.PORT}`);
});