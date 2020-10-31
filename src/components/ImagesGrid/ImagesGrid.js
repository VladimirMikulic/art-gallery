import React from 'react';
import Spinner from '../Spinner/Spinner';
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
    <section className="container mx-auto my-16">
      {imagesLoaded ? null : <Spinner width="3rem" height="3rem" />}

      <div
        className="images-grid"
        style={{ display: imagesLoaded ? null : 'none' }}
      >
        {images.map(image => {
          return (
            <figure
              className="images-grid-item cursor-pointer rounded-lg"
              key={image.tokenId}
              onClick={() => onImageClick(image)}
            >
              <img
                src={`https://res.cloudinary.com/asynchronous-art-inc/image/upload/${image.imagePath}`}
                className="rounded-lg"
                alt={image.title}
                onLoad={handleImageLoad}
              />
            </figure>
          );
        })}
      </div>
    </section>
  );
};

export default ImagesGrid;
