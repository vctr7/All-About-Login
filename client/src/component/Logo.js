import React, { useEffect } from 'react';
import './Logo.css';

import { useState } from 'react';
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

import NaverLogin from 'react-login-by-naver';
import KakaoLogin from 'react-kakao-login';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import TwitterLogin from 'react-twitter-login';
import GithubLogin from 'react-github-login';
import LinkedinLogin from 'react-linkedin-login-oauth2';
import MicrosoftLogin from 'react-microsoft-login';
import SpotifyLogin from 'react-spotify-login';

import * as config from '../config';

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
            // case 2:
            //     // https://gist.github.com/iamssen/5402578
            //     return (
            //         <GithubLogin
            //             clientId={githubId}
            //             render={(props) => (
            //                 <img
            //                     onClick={props.onClick}
            //                     className="Image"
            //                     src={logo}
            //                     alt="logo"
            //                 />
            //             )}
            //             onSuccess={(res) => console.log(res)}
            //             onFailure={(res) => console.error(res)}
            //         />
            //     );
            case 5:
                return (
                    <FacebookLogin
                        appId={config.FACEBOOK_ID}
                        autoLoad={false}
                        fields="name,first_name,last_name,email"
                        callback={(res) => console.log(res)}
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
            case 6:
                return (
                    // https://github.com/nvh95/react-linkedin-login-oauth2
                    <LinkedinLogin
                        clientId={config.LINKEDIN_ID}
                        onFailure={(res) => console.log(res)}
                        onSuccess={(res) => console.log(res)}
                        redirectUri="http://localhost:3000"
                        renderElement={({ onClick, disabled }) => (
                            <img
                                onClick={onClick}
                                disabled={disabled}
                                className="Image"
                                src={logo}
                                alt="logo"
                            />
                        )}
                    ></LinkedinLogin>
                );
            case 7:
                return (
                    <MicrosoftLogin
                        clientId={config.MICROSOFT_ID}
                        authCallback={authHandler}
                        withUserData={true}
                    >
                        <img className="Image" src={logo} alt="logo" />
                    </MicrosoftLogin>
                );
            case 8:
                return (
                    <TwitterLogin
                        authCallback={(res) => console.log(res)}
                        consumerKey={config.TWITTER_ID}
                        consumerSecret={
                            'VFGiQEYKvtHVGCVvd9enpGTgKu2MYu0yUqngf09mPhFvChYcSx'
                        }
                    >
                        <img
                            // onClick={props.onClick}
                            className="Image"
                            src={logo}
                            alt="logo"
                        />
                    </TwitterLogin>
                );

            case 9:
                return (
                    <SpotifyLogin
                        clientId={config.SPOTIFY_ID}
                        redirectUri='http://localhost:3000'
                        onSuccess={(res) => console.log(res)}
                        onFailure={(res) => console.log(res)}
                    >
                        <img
                            // onClick={props.onClick}
                            className="Image"
                            src={logo}
                            alt="logo"
                        />
                    </SpotifyLogin>
                );
            case 10:
                return (
                    <NaverLogin
                        clientId={config.NAVER_ID}
                        callbackUrl="http://127.0.0.1:3000"
                        render={(props) => (
                            <img
                                onClick={props.onClick}
                                className="Image"
                                src={logo}
                                alt="logo"
                            />
                        )}
                        onSuccess={(naverUser) => console.log(naverUser)}
                        onFailure={(e) => console.error(e)}
                    />
                );
            case 12:
                if (isLogin.loginState === true) {
                    return (
                        <img
                            onClick={logoutWithKakao}
                            className="Image"
                            src={logo}
                            alt="logo"
                        />
                    );
                } else {
                    return (
                        <img
                            onClick={loginWithKakao}
                            className="Image"
                            src={logo}
                            alt="logo"
                        />
                    );
                }
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
                return (
                    <GoogleLogin
                        clientId={config.GOOGLE_ID}
                        render={(props) => (
                            <img
                                onClick={props.onClick}
                                className="Image"
                                src={logo}
                                alt="logo"
                            />
                        )}
                        onSuccess={(result) => console.log(result)}
                        onFailure={(result) => console.log(result)}
                        cookiePolicy={'single_host_origin'}
                    />
                );

            default:
                return (
                    <img
                        // onClick={() => login(i)}
                        className="Image"
                        src={logo}
                        alt="logo"
                    />
                );
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
