import React from 'react'

import "./InputFile.scss"

export default function InputFile() {
    document.addEventListener("load", () => {
        const dropZone = document.querySelector("#upload-container");
        document.querySelector("#file-input").addEventListener("focus", () => {
            document.querySelector('label').classList.add('focus');
        })
    })

    return (
        <div className="file-input_block" id="upload-container">
            <input type="file" id="file-input" name="file"/>
            <label htmlFor="file-input">
                <div className="icon-block">
                    <img src="" alt="Icon"/>
                </div>
            </label>
        </div>
    )
};
