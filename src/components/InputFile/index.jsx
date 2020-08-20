import React from 'react';

import './InputFile.scss';
import Camera from './camera.svg';

export default function InputFile({ input }) {
  const [value, setValue] = React.useState('');
  /* Попытка сделать динамический input file
    document.addEventListener("load", () => {
        const dropZone = document.querySelector("#upload-container");
        document.querySelector("#file-input").addEventListener("focus", () => {
            document.querySelector('label').classList.add('focus');
        })

        document.querySelector("#file-input").addEventListener("focusout", () => {
            document.querySelector('label').classList.remove('focus');
        })

        dropZone.addEventListener('drag dragstart dragend dragover dragenter dragleave drop', function(e){
            e.preventDefault();
            e.stopPropagation();
        });

        dropZone.addEventListener('dragover dragenter', function() {
            dropZone.classList.add('dragover');
        });

        dropZone.addEventListener('dragleave', function(e) {
            let dx = e.pageX - dropZone.offset().left;
            let dy = e.pageY - dropZone.offset().top;
            if ((dx < 0) || (dx > dropZone.width()) || (dy < 0) || (dy > dropZone.height())) {
                dropZone.removeClass('dragover');
            }
        });

        dropZone.addEventListener('drop', function(e) {
            dropZone.removeClass('dragover');
            let files = e.originalEvent.dataTransfer.files;
            sendFiles(files);
        });

        document.querySelector("#file-input").addEventListener("change", function() {
            let files = this.files;
            sendFiles(files);
        });

        function sendFiles(files) {
            let maxFileSize = 5242880;
            let Data = new FormData();
            files.forEach((index, file) => {
                if ((file.size <= maxFileSize) && ((file.type === 'image/png') || (file.type === 'image/jpeg'))) {
                    Data.append('images[]', file);
                }
            });
        }
    })*/

  return (
    <div className="file-input_block upload-container">
      <input type={input.type} id="file-input" name={input.name} />
      <label htmlFor="file-input">
        <div className="icon-block">
          <img src={Camera} alt="Icon" />
        </div>
      </label>
    </div>
  );
}
