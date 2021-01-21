import axios from "axios";
import OAuth from "oauth-1.0a";
import crypto from "crypto";
import got from "got";
import * as config from "../../../../client/src/config";

export const github = async (ctx) => {
  console.log("callback by Github : receive data!", new Date());
  ctx.body = "Github";
  const code = ctx.url.split("=")[1];
  console.log(code);
};

export const vkontakte = async (ctx) => {
  console.log("callback by Vkontakte : receive data!", new Date());
  ctx.body = "Vkontakte";
  const code = ctx.url.split("=")[1];
  console.log(code);
};

export const dropbox = async (ctx) => {
  console.log("callback by Dropbox : receive data!", new Date());
  ctx.body = "Dropbox";
  const code = ctx.url.split("=")[1];
  console.log(code);
};
export const spotify = async (ctx) => {
  console.log("callback by Spotify : receive data!", new Date());
  ctx.body = "Spotify";
  const code = ctx.url.split("=")[1];
  console.log(code);
};

export const kakao = async (ctx) => {
  console.log("callback by Kakao : receive data!", new Date());
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
  ctx.body = "Linkedin";
  const code = ctx.url.split("=")[1];
  console.log(code);
};
export const discord = async (ctx) => {
  console.log("callback by Discord : receive data!", new Date());
  ctx.body = "Discord";
  const code = ctx.url.split("=")[1];
  console.log(code);
};
export const twitch = async (ctx) => {
  console.log("callback by Twitch : receive data!", new Date());
  const access_token = ctx.request.body.data.access_token;
  console.log(access_token);
};
export const line = async (ctx) => {
  console.log("callback by Line : receive data!", new Date());
  ctx.body = "LINE";
  const code = ctx.url.split("=")[1];
  console.log(code);
};

export const twitter = async (ctx) => {
  console.log("callback by Twitter : receive data!", new Date());
  ctx.body = "Twitter";

  const oauth = OAuth({
    consumer: {
      key: config.TWITTER_ID,
      secret: config.TWITTER_SECRET,
    },
    signature_method: "HMAC-SHA1",
    hash_function: (baseString, key) =>
      crypto.createHmac("sha1", key).update(baseString).digest("base64"),
  });

  const getRequest = async (oauth_token, oauth_token_secret, username) => {
    const token = {
      key: oauth_token,
      secret: oauth_token_secret,
    };
    const params =
      "user.fields=created_at,location,profile_image_url,verified,description&expansions=pinned_tweet_id"; // Edit optional query parameters here
    const endpointURL = `https://api.twitter.com/2/users/by?usernames=${username}&${params}`;
    const authHeader = oauth.toHeader(
      oauth.authorize({ url: endpointURL, method: "GET" }, token)
    );

    const req = await got(endpointURL, {
      headers: {
        Authorization: authHeader["Authorization"],
      },
    });

    if (req.body) {
      return JSON.parse(req.body);
    } else {
      throw new Error("Unsuccessful request");
    }
  };

  const parse = ctx.url.split("?")[1];
  const parse_res = parse.split("&");
  const oauth_t = parse_res[0].split("=")[1];
  const oauth_v = parse_res[1].split("=")[1];
  axios
    .post(
      `https://api.twitter.com/oauth/access_token?oauth_token=${oauth_t}&oauth_verifier=${oauth_v}`
    )
    .then((res) => {
      // console.log(res.data);
      const parse_res = res.data.split("&");
      const oauth_token = parse_res[0].split("=")[1];
      const oauth_token_secret = parse_res[1].split("=")[1];
      const username = parse_res[3].split("=")[1];

      (async () => {
        try {
          const response = await getRequest(
            oauth_token,
            oauth_token_secret,
            username
          );
          console.log(response);
        } catch (e) {
          console.log(e);
        }
        process.exit();
      })();
    });
};
