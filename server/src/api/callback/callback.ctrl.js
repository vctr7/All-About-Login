// import axios from 'axios';

export const github = async (ctx) => {
  console.log("callback by Github : receive data!", new Date());
  ctx.body = "Github";
  const code = ctx.url.split("=")[1];
  console.log(code);
};

export const spotify = async (ctx) => {
  console.log("callback by Spotify : receive data!", new Date());
  ctx.body = "Spotify";
  const code = ctx.url.split("=")[1];
  console.log(code);
};
export const google = async (ctx) => {
  console.log("callback by Google : receive data!", new Date());

  const access_token = ctx.request.body.data.Bc.access_token;
  console.log(access_token);
};
export const facebook = async (ctx) => {
  console.log("callback by Facebook : receive data!", new Date());

  const access_token = ctx.request.body.data.accessToken;
  console.log(access_token);
};
export const amazon = async (ctx) => {
  console.log("callback by Amazon : receive data!", new Date());

  const access_token = ctx.request.body.data.access_token;
  console.log(access_token);
};
