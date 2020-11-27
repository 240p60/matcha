import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetPhotos, fetchAddPhoto, fetchDeletePhoto } from '../../store/actions';
import styled from 'styled-components';
import classNames from 'classnames';
import './PictureSlider.scss';
import Camera from './camera.svg';
import Arrow from './arrow.svg';

export default function PictureSlider({
  input,
  name,
  volatile = false,
  uid = false,
  height,
}) {
  const photos = useSelector((store) => store.photos);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState({});
  const [activeImage, setActiveImage] = React.useState(0);

  React.useEffect(() => {
    if (sessionStorage.getItem('x-auth-token') && uid)
      dispatch(fetchGetPhotos(uid));
  }, [uid, dispatch]);

  React.useEffect(() => {
    setValue(photos);
    setActiveImage(0);
  }, [photos]);

  function addPhotoPreview(e) {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        if (!value.length || !value[uid].includes(e.target.result)) {
          dispatch(fetchAddPhoto(uid, e.target.result));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  return (
    <UploadContainer
      height={height}
      className="file-input_block upload-container"
    >
      {volatile && (
        <>
          <input
            type={input.type}
            onChange={(e) => addPhotoPreview(e)}
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
        {!!value[uid] && !!value[uid].length &&
          value[uid].map((item, index) => {
            return (
              <div
                key={item.pid}
                className={classNames('image_block', {
                  active: index === activeImage,
                  prevImage: index < activeImage,
                  nextImage: index > activeImage,
                })}
              >
                <picture>
                  <source srcSet={item.src} alt="user" />
                  <img className="user__picture" src={item.src} alt="user" />
                </picture>
                {volatile &&
                  <div
                    className="image_block-delete"
                    onClick={() => dispatch(fetchDeletePhoto(uid, item.pid))}
                  >
                    Delete
                  </div>
                }
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
          {value[uid] && activeImage < value[uid].length - 1 && (
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
    </UploadContainer>
  );
}

const UploadContainer = styled.div`
  height: ${({ height }) => (height ? height : '400px')};
`;
