import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Button } from '../index'

import './Header.scss'

export default function Header() {
    return (
        <div className="header">
            <div className="header__container">
                <div className="header__logo">
                    <Link to="/">Strings</Link>
                </div>
                <div className="header__right-block">
                    <div className="header__actions">
                        {sessionStorage.getItem('x-auth-token') ?
                            <Button text='Log Out' type='button' subClass='header-action'/> :
                            <Button text='Sign In' type='button' subClass='header-action'/>
                        }
                    </div>
                    <Menu></Menu>
                </div>
            </div>
        </div>
    )
}