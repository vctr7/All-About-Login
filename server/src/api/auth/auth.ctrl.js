import Joi from "joi";
import User from "../../models/user";
import open from "open";
import fetch from "node-fetch";
import axios from "axios";
import request from "request";
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

export const register = async (ctx) => {
  console.log("register : receive data!");
  const schema = Joi.object().keys({
    userId: Joi.string().required(),
    password: Joi.string().required(),
    userName: Joi.string().min(2).max(20).required(),
    emailAddress: Joi.string(),
    signBy: Joi.string().required(),
  });

  const result = schema.validate(ctx.request.body);
  // console.log(result);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { userId, password, userName, emailAddress, signBy } = ctx.request.body;

  try {
    const exists = await User.findByUserId(userId);
    if (exists) {
      ctx.status = 409;
      console.log("Already exist");
      return;
    }

    const user = new User({
      userId,
      userName,
      emailAddress,
      signBy,
    });

    await user.setPassword(password);
    await user.save();
    ctx.body = user.serialize();
    const token = user.generateToken();
    ctx.cookies.set("access_token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const login = async (ctx) => {
  console.log("login : receive data!");
  const { userId, password } = ctx.request.body;

  if (!userId || !password) {
    ctx.status = 401;
    return;
  }

  try {
    const user = await User.findByUserId(userId);
    if (!user) {
      ctx.status = 401;
      return;
    }
    const valid = await user.checkPassword(password);

    if (!valid) {
      ctx.status = 401;
      return;
    }

    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set("access_token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  } catch (e) {
    throw (500, e);
  }
};

export const check = async (ctx) => {
  console.log("check : receive data!");
  const { user } = ctx.state;
  if (!user) {
    ctx.status = 401;
    return;
  }
  const userinfo = await User.findByUserId(user.userId);
  ctx.body = userinfo;
};

export const logout = async (ctx) => {
  console.log("logout : receive data!");
  ctx.cookies.set("access_token");
  ctx.status = 204;
};

export const dropbox = async (ctx) => {
  ctx.body = " Dropbox ";
  const code = ctx.url.split("=")[1];
  // const { code } = ctx.request.body
  const myHeaders = new fetch.Headers();
  myHeaders.append(
    "Authorization",
    "Basic c3A0eG5na3Zzc3prZDhmOngwaWx0dDVvbTJnZjJzcg=="
  );
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("code", code);
  urlencoded.append("grant_type", "authorization_code");
  urlencoded.append("redirect_uri", "https://localhost:8795/api/auth/dropbox");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  fetch("https://www.dropbox.com/oauth2/token", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      //   console.log(JSON.parse(result));
      const res = JSON.parse(result);
      const access_token = res.access_token;
      const account_id = res.account_id;

      const options = {
        method: "POST",
        url: "https://api.dropboxapi.com/2/users/get_account",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
        body: `{\"account_id\" : \"${account_id}\"}`,
      };
      request(options, async function (error, response) {
        if (error) throw new Error(error);
        // console.log(response.body);
        const val = JSON.parse(response.body);
        console.log(val);

        const id = val.account_id;
        const password = id;

        const exists = await User.findByUserId(id);
        if (exists) {
          console.log("login");
          //login
          axios
          .post('https://localhost:8795/api/auth/login', {
              userId: id,
              password: password,
          })
          .then((res) => {
              if (res.status === 200) {
                  console.log('sign in');
              } else {
                  console.log(
                      'not error but problem'
                  );
              }
          })
          .catch((e) => console.log(e));


        } else {
          //register
          const username = val.name.display_name;
          const email = val.email;
          const signBy = "Dropbox";
          console.log("register");
          axios
            .post("https://localhost:8795/api/auth/register", {
              userId: id,
              password: password,
              userName: username,
              emailAddress: email,
              signBy: signBy,
            })
            .then((res) => {
              if (res.status === 200) {
                console.log("sign up and sign in");
              } else {
                console.log("not error but problem");
              }
            })
            .catch((e) => {
              axios
                .post("/api/auth/login", {
                  userId: id,
                  password: password,
                })
                .then((res) => {
                  if (res.status === 200) {
                    console.log("sign in");
                  } else {
                    console.log("not error but problem");
                  }
                })
                .catch((e) => console.log(e));
            });
        }
      });
    })
    .catch((error) => console.log("error", error));
};
