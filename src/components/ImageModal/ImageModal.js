import React from 'react';
import './ImageModal.css';

const ImageModal = ({
  image,
  isImageInFullScreen,
  onModalCloseBtnClick,
  onModalViewBtnClick,
  onModalNavBtnClick
}) => {
  return (
    <div className="image-modal-backdrop fixed w-screen h-screen bg-gray-900 z-10 top-0 text-white">
      <div className="image-modal mx-auto flex flex-col justify-center h-full relative">
        {image.isFirstImage ? null : (
          <button
            className="modal-btn-left"
            onClick={() => onModalNavBtnClick('left', image.tokenId)}
          >
            ‹
          </button>
        )}

        <div className="flex justify-end pb-8 px-10 mr-24">
          <button
            className="text-2xl text-gray-600 mt-1"
            onClick={onModalViewBtnClick}
          >
            {isImageInFullScreen ? (
              <img
                src="https://img.icons8.com/windows/30/ffffff/normal-screen.png"
                alt="Fullscreen icon"
              />
            ) : (
              <img
                src="https://img.icons8.com/windows/30/ffffff/fit-to-width.png"
                alt="Fit-to-width icon"
              />
            )}
          </button>
          <button className="pl-4 text-5xl" onClick={onModalCloseBtnClick}>
            ×
          </button>
        </div>

        <figure>
          <img
            style={{ maxHeight: '70vh' }}
            src={`https://res.cloudinary.com/asynchronous-art-inc/image/upload/${image.imagePath}`}
            className="rounded-lg mx-auto"
            alt={image.title}
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
