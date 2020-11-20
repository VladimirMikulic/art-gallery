import React from 'react';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';
import './ImagesGrid.css';
import { usernameToName } from '../../utils';

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
                <Link to={`/artist/${image.artists[0].username}`}>
                  <p className="inline-block text-sm text-gray-700 hover:underline">
                    by&nbsp;
                    {image.artists[0].name ||
                      usernameToName(image.artists[0].username)}
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
