require("dotenv").config();

import axios from "axios";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";
import mongoose from "mongoose";
import api from "./api";
import jwtMiddleware from "./lib/jwtMiddleware";
import cors from "cors";
const router = new Router();
const app = new Koa();
const client = axios.create();
const { PORT, MONGO_URI } = process.env;
const port = PORT || 8888;

// Connect to MongoDB
const connect = () => mongoose
  .connect('mongodb://root:pass123@localhost:27017/admin', {
    dbName: "nodejs",
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.error(e);
  });
// app.use(cors);
connect();
mongoose.connection.on('disconnected', () => {
    console.error("reconnect to MongoDB");
    connect();
})

app.use(bodyParser());

// router.get("/user", (ctx) => {
//   ctx.body = {
//     data: [
//       { id: 1, username: "somebody" },
//       { id: 2, username: "somebody_else" },
//     ],
//   };
// });

router.use("/api", api.routes());
app.use(bodyParser());
app.use(jwtMiddleware);
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => console.log(`Listening on port ${port}`));
