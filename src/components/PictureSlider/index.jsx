import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetPhotos, fetchAddPhoto } from '../../store/actions';
import classNames from 'classnames';
import './PictureSlider.scss';
import Camera from './camera.svg';
import Arrow from './arrow.svg';

export default function PictureSlider({ input, name, volatile }) {
  const photos = useSelector((store) => store.photos);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState([]);
  const [activeImage, setActiveImage] = React.useState(0);

  React.useEffect(() => {
    if (sessionStorage.getItem('x-auth-token') && user.uid) {
      dispatch(fetchGetPhotos(user.uid));
    }
  }, [user.uid]);

  React.useEffect(() => {
    setValue(photos);
  }, [photos]);

  function addPhotoPreview(e) {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        if (!value.includes(e.target.result)) {
          setValue([...value, e.target.result]);
          dispatch(fetchAddPhoto(e.target.result));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  return (
    <div className="file-input_block upload-container">
      {volatile && (
        <>
          <input
            type={input.type}
            onChange={addPhotoPreview}
            id="file-input"
            name={name}
          />
          <label htmlFor="file-input">
            <div className="icon-block">
              <img src={Camera} alt="Icon" />
            </div>
          </label>
        </>
      )}
      <div className="image_slider">
        {!!value.length &&
          value.map((item, index) => {
            return (
              <div
                key={index}
                className={classNames('image_block', {
                  active: index === activeImage,
                  prevImage: index < activeImage,
                  nextImage: index > activeImage,
                })}
              >
                <picture>
                  <source srcSet={item} alt="user" />
                  <img className="user__picture" src={item} alt="user" />
                </picture>
              </div>
            );
          })}
        <div className="navigation">
          {!!activeImage && (
            <div
              className="prev-nav nav-action"
              onClick={() => setActiveImage(activeImage - 1)}
            >
              <img
                src={Arrow}
                style={{ transform: 'rotate(90deg)' }}
                alt="arrow"
              />
            </div>
          )}
          {activeImage < value.length - 1 && (
            <div
              className="next-nav nav-action"
              onClick={() => setActiveImage(activeImage + 1)}
            >
              <img
                src={Arrow}
                style={{ transform: 'rotate(-90deg)' }}
                alt="arrow"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
