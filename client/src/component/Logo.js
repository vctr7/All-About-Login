import React from 'react';
import './Logo.css';

import amazon from '../logo/amazon.png';
import apple from '../logo/apple.png';
import discord from '../logo/discord.png';
import facebook from '../logo/facebook.png';
import github from '../logo/github.png';
import google from '../logo/google.png';
import instagram from '../logo/instagram.png';
import kakao from '../logo/kakao.png';
import line from '../logo/line.png';
import linkedin from '../logo/linkedin.png';
import microsoft from '../logo/microsoft.png';
import naver from '../logo/naver.png';
import spotify from '../logo/spotify.png';
import twitch from '../logo/twitch.png';
import twitter from '../logo/twitter.png';

function Logo({}) {
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
        instagram,
        google,
    ];

    const deg = 360 / logos.length;

    const logosStyle = (idx) => {
        return {
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0)',
            position: 'absolute',
            transform: 'rotate(' + String(idx * deg) + 'deg)',
        };
    };

    return (
        <div className="LogosWrapper">
            <div>
                {logos.map((logo, i) => (
                    <div key={i} className="logosStyle" style={logosStyle(i)}>
                        <img className="Image" src={logo} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Logo;
