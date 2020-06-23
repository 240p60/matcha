import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from '../index'

import './Header.scss'

export default function Header() {
    return (
        <div className="header">
            <div className="header__container">
                <div className="header__logo">
                    <Link to="/">Strings</Link>
                </div>
                <Menu></Menu>
            </div>
        </div>
    )
}