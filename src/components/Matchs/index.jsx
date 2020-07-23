import React, { useState } from 'react'
import { useEffect, useState } from 'react';

export default function Matchs({}) {
    const [users, setUsers] = useState({});
    const page = 1;

    useEffect(() => {
        fetch(`http://localhost:3000/matchs/users/${page}`)
        .then(res => res.json())
        .then(data => setUsers(data));
    }, [users]);
    return (
        <div className="matchs">
            <div className="inner">
                <div className="matchs__container">
                    <div className="matchs__item">
                        <div className="matchs__item_image">
                            <img src="" alt="Картинка"/>
                        </div>
                        <div className="matchs__item_bottom-area">
                            <div className="matchs__item_description"></div>
                            <div className="matchs__item_action"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}