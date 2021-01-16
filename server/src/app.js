require("dotenv").config();

import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";
import api from "./api";
import jwtMiddleware from "./lib/jwtMiddleware";
import * as mongodb from './mongodb/mongodb.js';

const router = new Router();
const app = new Koa();
const { PORT } = process.env;
const port = PORT || 8888;


mongodb.connect();

router.use("/api", api.routes());

app.use(bodyParser());
app.use(jwtMiddleware);
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => console.log(`Listening on port ${port}`));
