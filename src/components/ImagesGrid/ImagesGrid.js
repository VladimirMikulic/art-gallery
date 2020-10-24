import React from 'react';
import './ImagesGrid.css';

const ImageGrid = ({ images, onImageClick }) => {
  return (
    <div className="container mx-auto my-16">
      <div className="image-grid">
        {images.map(image => {
          return (
            <figure
              className="item cursor-pointer rounded-lg"
              key={image.tokenId}
              onClick={() => onImageClick(image)}
            >
              <img
                src={`https://res.cloudinary.com/asynchronous-art-inc/image/upload/${image.imagePath}`}
                className="rounded-lg"
                alt={image.title}
              />
            </figure>
          );
        })}
      </div>
    </div>
  );
};

export default ImageGrid;
