import React, { Component } from 'react';
import Popup from '../../components/Popup/Popup';
import Spinner from '../../components/Spinner/Spinner';
import ImageModal from '../../components/ImageModal/ImageModal';
import ImagesGrid from '../../components/ImagesGrid/ImagesGrid';

import { throttle, samplePopupData, sampleArtists } from '../../utils';

class ImageGallery extends Component {
  state = {
    images: [],
    selectedImage: null,
    isImageInFullScreen: false,
    popupData: null
  };

  fullScreenRef = React.createRef();

  async fetchArtImagesOfArtist(username) {
    const response = await fetch(
      `https://async-2-staging.appspot.com/users/${username}/arts?rel=artist&type=masters&page=1&count=100&sortBy=reservePrice&sortDirection=-1`,
      {
        mode: 'cors'
      }
    );
    console.clear(); // Prevent Chrome "spamming" console with 404 request notices

    if (!response.ok) return null;
    const parsedResponse = await response.json();

    const artImages =
      parsedResponse.arts.length > 0 ? parsedResponse.arts : null;

    return artImages;
  }

  async fetchAllArtImages() {
    const requests = sampleArtists.map(artist =>
      this.fetchArtImagesOfArtist(artist)
    );
    // Executes multiple requests in parallel
    const responses = await Promise.all(requests);
    const images = responses.reduce((acc, res) => [...acc, ...res], []);

    images[0].isFirstImage = true;
    images[images.length - 1].isLastImage = true;

    return images;
  }

  async getArtImages() {
    if (this.props.images) {
      const artImages = this.props.images.map(img => ({ ...img }));
      artImages[0].isFirstImage = true;
      artImages[artImages.length - 1].isLastImage = true;
      return artImages;
    }

    const { username } = this.props.match.params;
    let artImages = JSON.parse(localStorage.getItem(window.location.pathname));

    if (artImages) return artImages;

    if (!username) artImages = await this.fetchAllArtImages();
    else artImages = await this.fetchArtImagesOfArtist(username);

    localStorage.setItem(window.location.pathname, JSON.stringify(artImages));

    return artImages;
  }

  handleImageClick = image => {
    const imageIndex = this.state.images.indexOf(image);
    this.setState({ selectedImage: image }, () => {
      setTimeout(() => this.cacheImages(imageIndex), 2000);
    });
  };

  handleModalCloseBtnClick = () => {
    this.setState({ selectedImage: null });
  };

  handleFullScreenChange = () => {
    if (!document.fullscreenElement) {
      this.setState({ isImageInFullScreen: false });
    }
  };

  handleModalViewChange = e => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      this.setState({ isImageInFullScreen: false });
    } else {
      e.target.closest('.fullscreen-container').requestFullscreen();
      this.setState({ isImageInFullScreen: true });
    }
  };

  handleModalNavBtnClick = throttle((direction, currentImageId) => {
    const indexOfCurrentImage = this.state.images.findIndex(
      image => image.tokenId === currentImageId
    );
    const selectedImage =
      direction === 'left'
        ? this.state.images[indexOfCurrentImage - 1]
        : this.state.images[indexOfCurrentImage + 1];

    if (selectedImage === undefined) return;

    this.setState({ selectedImage }, () => {
      setTimeout(() => this.cacheImages(indexOfCurrentImage), 2000);
    });
  }, 50);

  // Caches the next/previous 2 images while the user
  // is in modal view for better UX
  cacheImages = imageIndex => {
    const imagesToPreload = this.state.images.slice(
      imageIndex - 2,
      imageIndex + 3
    );

    imagesToPreload.forEach((image, index) => {
      const delay = (index + 1) * 150;
      setTimeout(() => {
        // Prevents objects from being garbage collected
        if (!window.cachedImages) {
          window.cachedImages = {};
        }

        const img = new Image();
        img.src = `https://res.cloudinary.com/asynchronous-art-inc/image/upload/${image.imagePath}`;
        window.cachedImages[image.tokenId] = img;
      }, delay);
    });
  };

  handleKeyDown = e => {
    const { selectedImage } = this.state;

    if (e.keyCode === 32) {
      // Space key to show modal from the bottom left corner
      e.preventDefault();
      this.setState({ popupData: samplePopupData });
    } else if (e.keyCode === 27 && selectedImage) {
      // ESC key to close the image modal
      this.setState({ selectedImage: null });
    } else if (e.keyCode === 27 && this.state.popupData) {
      // ESC key to close the popup
      this.setState({ popupData: null });
    } else if (e.keyCode === 37 && selectedImage !== null) {
      this.handleModalNavBtnClick('left', selectedImage.tokenId);
    } else if (e.keyCode === 39 && selectedImage !== null) {
      this.handleModalNavBtnClick('right', selectedImage.tokenId);
    }
  };

  getImagesContent() {
    if (this.state.images === null) {
      return (
        <p className="mx-auto text-xl text-center mt-32">
          No images found for user {this.props.match.params.username}!
        </p>
      );
    }

    if (this.state.images.length === 0) {
      return (
        <div className="mx-auto text-xl text-center mt-18">
          <Spinner width="3rem" height="3rem" />
        </div>
      );
    }

    return (
      <ImagesGrid
        images={this.state.images}
        onImageClick={this.handleImageClick}
      />
    );
  }

  render() {
    return (
      <>
        <section ref={this.fullScreenRef} className="fullscreen-container">
          {this.state.selectedImage ? (
            <ImageModal
              image={this.state.selectedImage}
              isImageInFullScreen={this.state.isImageInFullScreen}
              onModalCloseBtnClick={this.handleModalCloseBtnClick}
              onModalViewBtnClick={this.handleModalViewChange}
              onModalNavBtnClick={this.handleModalNavBtnClick}
            />
          ) : null}

          {this.state.popupData ? <Popup data={this.state.popupData} /> : null}
        </section>

        {this.getImagesContent()}
      </>
    );
  }

  async componentDidMount() {
    const artImages = await this.getArtImages();
    this.setState({ images: artImages });

    // Image Modal keyboard navigation
    document.body.addEventListener('keydown', this.handleKeyDown);
    // Sync state if the user exits fullscreen by pressing Esc key
    this.fullScreenRef.current?.addEventListener(
      'fullscreenchange',
      this.handleFullScreenChange
    );
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeyDown);
    this.fullScreenRef.current.removeEventListener(
      'fullscreenchange',
      this.handleFullScreenChange
    );
  }
}

export default React.memo(ImageGallery);
