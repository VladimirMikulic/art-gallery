import React from 'react';
import './ImageModal.css';

import { ReactComponent as CloseIcon } from '../../icons/close.svg';
import { ReactComponent as FullscreenIcon } from '../../icons/fullscreen.svg';
import { ReactComponent as FitToWidthIcon } from '../../icons/fit-to-width.svg';

import Spinner from '../Spinner/Spinner';

const ImageModal = ({
  image,
  isImageInFullScreen,
  onModalCloseBtnClick,
  onModalViewBtnClick,
  onModalNavBtnClick
}) => {
  const [isImageLoading, setImageLoading] = React.useState(true);

  return (
    <div className="image-modal-backdrop fixed w-screen h-screen bg-gray-900 z-10 top-0 text-white select-none">
      <div className="image-modal mx-auto flex flex-col justify-center h-full relative">
        {image.isFirstImage ? null : (
          <button
            className="modal-btn-left"
            onClick={() => onModalNavBtnClick('left', image.tokenId)}
          >
            ‹
          </button>
        )}

        <div className="toolbar flex justify-end pb-8 px-1">
          <button onClick={onModalViewBtnClick}>
            {isImageInFullScreen ? (
              <FitToWidthIcon />
            ) : (
              <FullscreenIcon className="btn-modal-svgicon" />
            )}
          </button>
          <button className="pl-4 text-5xl" onClick={onModalCloseBtnClick}>
            <CloseIcon />
          </button>
        </div>

        <figure>
          {isImageLoading ? <Spinner width="3rem" height="3rem" /> : null}
          <img
            src={`https://res.cloudinary.com/asynchronous-art-inc/image/upload/${image.imagePath}`}
            className="modal-image rounded-lg mx-auto mt-16"
            alt={image.title}
            onLoad={e => setImageLoading(false)}
            style={{ display: isImageLoading ? 'none' : 'block' }}
          />
          <figcaption className="text-gray-200 text-2xl font-bold text-center mt-6">
            {image.title}
          </figcaption>
        </figure>

        {image.isLastImage ? null : (
          <button
            className="modal-btn-right"
            onClick={() => onModalNavBtnClick('right', image.tokenId)}
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
