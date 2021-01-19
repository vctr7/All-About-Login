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

// export const kakao = async (ctx) => {
//   console.log("callback by Kakao : receive data!", new Date());
//   ctx.body = "Kakao";
//   console.log(ctx.url);
//   // const code = ctx.url.split("=")[1];
//   // console.log(code);
// };
export const kakao = async (ctx) => {
  console.log("callback by Kakao : receive data!", new Date());
  // console.log(ctx.request.body);
  const access_token = ctx.request.body.data.access_token;
  console.log(access_token);
};

export const naver = async (ctx) => {
  console.log("callback by Naver : receive data!", new Date());
  // console.log(ctx.request.body);
  const access_token = ctx.request.body.data.accessToken.accessToken;
  console.log(access_token);
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

export const microsoft = async (ctx) => {
  console.log("callback by Microsoft : receive data!", new Date());
  // ctx.body = "Microsoft"
  const access_token = ctx.request.body.data.access_token;
  console.log(access_token);
};
export const linkedin = async (ctx) => {
  console.log("callback by Linkedin : receive data!", new Date());
  ctx.body = "Linkedin"
  const code = ctx.url.split("=")[1];
  console.log(code);
};
