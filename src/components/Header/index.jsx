import React from 'react'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { Menu, Button } from '../index'

import './Header.scss'

export default function Header() {
    const history = useHistory();
    function logOut(e) {
        e.preventDefault();
        sessionStorage.removeItem('x-auth-token');
        history.push('/');
    }

    return (
        <div className="header">
            <div className="header__container">
                <div className="header__logo">
                    <Link to="/">Strings</Link>
                </div>
                <div className="header__right-block">
                    <div className="header__actions">
                        {sessionStorage.getItem('x-auth-token') ?
                            <Button href='' text='Log Out' type='button' onClick={logOut} subClass='header-action'/> :
                            <Button href='/signIn' text='Sign In' type='button' subClass='header-action'/>
                        }
                    </div>
                    <Menu></Menu>
                </div>
            </div>
        </div>
    )
}