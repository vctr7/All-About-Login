import React, { useEffect, useState } from 'react';
import './Logo.css';
import amazon from '../logo/amazon.png';
import apple from '../logo/apple.png';
import discord from '../logo/discord.png';
import facebook from '../logo/facebook.png';
import github from '../logo/github.png';
import google from '../logo/google.png';
import kakao from '../logo/kakao.png';
import line from '../logo/line.png';
import linkedin from '../logo/linkedin.png';
import microsoft from '../logo/microsoft.png';
import naver from '../logo/naver.png';
import spotify from '../logo/spotify.png';
import twitch from '../logo/twitch.png';
import twitter from '../logo/twitter.png';

// import NaverLogin from 'react-login-by-naver';
// import KakaoLogin from 'react-kakao-login';
import GoogleLogin from 'react-google-login';
// import GoogleLogin from './google/GoogleLogin';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
// import FacebookLogin from './facebook/FacebookLogin';
// import TwitterLogin from 'react-twitter-login';
import GithubLogin from './github/GithubLogin';
// import LinkedinLogin from 'react-linkedin-login-oauth2';
// import MicrosoftLogin from 'react-microsoft-login';
import SpotifyLogin from './spotify/SpotifyLogin';

import * as config from '../config';
import axios from 'axios';

const { Kakao } = window;

function Logo({ userState }) {
    const [isLogin, SetIsLogin] = useState({
        loginState: false,
        enterprise: '',
    });
    const logos = [
        amazon,
        apple,
        github,
        twitch,
        discord,
        facebook,
        linkedin,
        microsoft,
        twitter,
        spotify,
        naver,
        line,
        kakao,
        google,
    ];

    const redirectUri = 'http://localhost:8795/api/callback';

    const loginWithKakao = () => {
        try {
            return new Promise((resolve, reject) => {
                if (!Kakao) {
                    reject('Kakao 인스턴스 존재 x');
                }

                Kakao.Auth.login({
                    // redirectUri: 'http://localhost:3000'
                    scope: 'account_email',
                    success: (auth) => console.log('Kakao 로그인', auth),
                    fail: (err) => console.error(err),
                });
                SetIsLogin({ loginState: true, enterprise: 'Kakao' });
                // window.close()
            });
        } catch (err) {
            console.error(err);
        }
    };

    const logoutWithKakao = () => {
        if (Kakao.Auth.getAccessToken()) {
            console.log(
                '카카오 인증 액세스 토큰이 존재',
                Kakao.Auth.getAccessToken()
            );
            Kakao.Auth.logout(() => {
                console.log('로그아웃', Kakao.Auth.getAccessToken());
                SetIsLogin({ loginState: false, enterprise: '' });
            });
        }
    };

    const deg = 360 / logos.length;
    const authHandler = (err, data) => {
        console.log(data);
    };
    const logosStyle = (idx) => {
        return {
            backgroundColor: 'rgba(0,0,0,0)',
            position: 'absolute',
            transform: 'rotate(' + String(idx * deg) + 'deg)',
        };
    };

    const Login = (i, logo) => {
        switch (i) {
            case 2:
                return (
                    <GithubLogin
                        logo={logo}
                        clientId={config.GITHUB_ID}
                        redirectUri={redirectUri}
                    />
                );

            case 5:
                // return (<FacebookLogin logo={logo} clientId={config.FACEBOOK_ID} redirectUri={redirectUri} />);
                return (
                    <FacebookLogin
                        appId={config.FACEBOOK_ID}
                        autoLoad={false}
                        fields="name,first_name,last_name,email"
                        redirectUri={redirectUri + '/facebook'}
                        callback={(data) => {
                            // console.log(data.);
                            axios
                                .post('/api/callback/facebook', { data: data })
                                .then((res) => {
                                    if (res.status === 200) {
                                        console.log('success');
                                    } else {
                                        console.log('not error but problem');
                                    }
                                })
                                .catch((e) => console.log(e));
                        }}
                        render={(props) => (
                            <img
                                onClick={props.onClick}
                                className="Image"
                                src={logo}
                                alt="logo"
                            />
                        )}
                    />
                );
            // case 6:
            // return (
            //     <LinkedinLogin
            //         clientId={config.LINKEDIN_ID}
            //         onFailure={(res) => console.log(res)}
            //         onSuccess={(res) => console.log(res)}
            //         redirectUri="http://localhost:3000"
            //         renderElement={({ onClick, disabled }) => (
            //             <img
            //                 onClick={onClick}
            //                 disabled={disabled}
            //                 className="Image"
            //                 src={logo}
            //                 alt="logo"
            //             />
            //         )}
            //     ></LinkedinLogin>
            // );
            // case 7:
            //     return (
            //         <MicrosoftLogin
            //             clientId={config.MICROSOFT_ID}
            //             authCallback={authHandler}
            //             withUserData={true}
            //         >
            //             <img className="Image" src={logo} alt="logo" />
            //         </MicrosoftLogin>
            //     );
            // case 8:
            //     return (
            //         <TwitterLogin
            //             authCallback={(res) => console.log(res)}
            //             consumerKey={config.TWITTER_ID}
            //             consumerSecret={
            //                 'VFGiQEYKvtHVGCVvd9enpGTgKu2MYu0yUqngf09mPhFvChYcSx'
            //             }
            //         >
            //             <img
            //                 // onClick={props.onClick}
            //                 className="Image"
            //                 src={logo}
            //                 alt="logo"
            //             />
            //         </TwitterLogin>
            //     );

            case 9:
                return (
                    <SpotifyLogin
                        logo={logo}
                        clientId={config.SPOTIFY_ID}
                        redirectUri={redirectUri}
                    />
                );

            // case 10:
            // return (
            //     <NaverLogin
            //         clientId={config.NAVER_ID}
            //         callbackUrl="http://127.0.0.1:3000"
            //         render={(props) => (
            //             <img
            //                 onClick={props.onClick}
            //                 className="Image"
            //                 src={logo}
            //                 alt="logo"
            //             />
            //         )}
            //         onSuccess={(naverUser) => console.log(naverUser)}
            //         onFailure={(e) => console.error(e)}
            //     />
            // );
            // case 12:
            //     if (isLogin.loginState === true) {
            //         return (
            //             <img
            //                 onClick={logoutWithKakao}
            //                 className="Image"
            //                 src={logo}
            //                 alt="logo"
            //             />
            //         );
            //     } else {
            //         return (
            //             <img
            //                 onClick={loginWithKakao}
            //                 className="Image"
            //                 src={logo}
            //                 alt="logo"
            //             />
            //         );
            //     }
            // return (
            //     <KakaoLogin
            //         token={"33d825a70a8c7076c1fc3db49c7e8668"}
            //         onSuccess={(result) => console.log(result)}
            //         onFail={(err) => console.error(err)}
            //         onLogout={console.info}
            //         render={({ onClick }) => {
            //             return (
            //                 <img
            //                     onClick={(e) => {
            //                         e.preventDefault();
            //                         onClick();
            //                     }}
            //                     className="Image"
            //                     src={logo}
            //                     alt="logo"
            //                 />
            //             );
            //         }}
            //     />
            // );
            case 13:
                // return (<GoogleLogin logo={logo} clientId={config.GOOGLE_ID} redirectUri={redirectUri} />);
                return (
                    <GoogleLogin
                        clientId={config.GOOGLE_ID}
                        redirectUri={redirectUri + '/google'}
                        render={(props) => (
                            <img
                                onClick={props.onClick}
                                className="Image"
                                src={logo}
                                alt="logo"
                            />
                        )}
                        onSuccess={(data) =>
                            axios
                                .post('/api/callback/google', { data: data })
                                .then((res) => {
                                    if (res.status === 200) {
                                        console.log('success');
                                    } else {
                                        console.log('not error but problem');
                                    }
                                })
                                .catch((e) => console.log(e))
                        }
                        onFailure={(result) => console.log(result)}
                        cookiePolicy={'single_host_origin'}
                    />
                );

            default:
                return <img className="Image" src={logo} alt="logo" />;
        }
    };

    return (
        <div className="LogosWrapper">
            <div>
                {logos.map((logo, i) => (
                    <div key={i} className="logosStyle" style={logosStyle(i)}>
                        {Login(i, logo)}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Logo;
