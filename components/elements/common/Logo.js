import React from 'react';
import Link from 'next/link';

const Logo = ({ type }) => {
    let data = {
        url: '/',
        img: '/static/img/logo.png',
    };
    return (
        <Link href={data.url}>
            <a className="ps-logo">
                <img src={data.img} alt="" height='50' />
            </a>
        </Link>
    );
};

export default Logo;
