import React from 'react';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';
import './ImagesGrid.css';

const ImagesGrid = ({ images, onImageClick }) => {
  const [imagesLoaded, setImagesLoaded] = React.useState(false);

  const handleImageLoad = (() => {
    let loadedImagesCount = 0;

    return () => {
      loadedImagesCount++;

      if (loadedImagesCount === images.length) {
        setImagesLoaded(true);
      }
    };
  })();

  return (
    <>
      {imagesLoaded ? null : <Spinner width="3rem" height="3rem" />}
      <section
        className="images-grid"
        style={{ display: imagesLoaded ? null : 'none' }}
      >
        {images.map(image => {
          return (
            <article
              className="images-grid-item cursor-pointer rounded-lg bg-gray-100"
              key={image.tokenId}
              onClick={() => onImageClick(image)}
            >
              <img
                src={`https://res.cloudinary.com/asynchronous-art-inc/image/upload/w_500,h_500,c_thumb,q_70,f_auto/${image.imagePath}`}
                className="rounded-lg"
                alt={image.title}
                onLoad={handleImageLoad}
              />

              <div className="text-left mt-3">
                <p className="font-bold text-lg text-gray-800">{image.title}</p>
                <Link to={`/artist/${image.owner.username}`}>
                  <p className="inline-block text-sm text-gray-700 hover:underline">
                    by {image.owner.name || 'Unknown'}
                  </p>
                </Link>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default ImagesGrid;
