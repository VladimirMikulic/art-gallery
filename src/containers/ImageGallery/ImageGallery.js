import React, { Component } from 'react';
import Popup from '../../components/Popup/Popup';
import Spinner from '../../components/Spinner/Spinner';
import Navigation from '../../components/Navigation/Navigation';
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

  fetchAllArtImages = (() => {
    let cachedArtImages = null;

    return async () => {
      if (cachedArtImages) return cachedArtImages;

      const images = [];

      for (const artist of sampleArtists) {
        const artistImages = await this.fetchArtImagesOfArtist(artist);
        images.push(...artistImages);
      }

      images[0].isFirstImage = true;
      images[images.length - 1].isLastImage = true;

      if (!cachedArtImages) cachedArtImages = images;

      return images;
    };
  })();

  handleImageClick = image => {
    this.setState({ selectedImage: image });
  };

  handleModalCloseBtnClick = () => {
    this.setState({ selectedImage: null });
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

    this.setState({ selectedImage });
  }, 100);

  handleSearchSubmit = async username => {
    this.setState({ images: [] }, async () => {
      const artImages = await this.fetchArtImagesOfArtist(username);
      this.props.history.push(`/search/${username}`);
      this.setState({ images: artImages });
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
        <div className="mx-auto text-xl text-center mt-32">
          No images found for user {this.props.match.params.username}!
        </div>
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
        <header className="App-header">
          <Navigation onSearchSubmit={this.handleSearchSubmit} />
        </header>

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
    const { username } = this.props.match.params;

    if (!username) var artImages = await this.fetchAllArtImages();
    else var artImages = await this.fetchArtImagesOfArtist(username);

    this.setState({ images: artImages });

    // Image Modal keyboard navigation
    document.body.addEventListener('keydown', this.handleKeyDown);
    // Sync state if the user exits fullscreen by pressing Esc key
    this.fullScreenRef.current?.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        this.setState({ isImageInFullScreen: false });
      }
    });
  }

  async componentDidUpdate() {
    const isHomepage = this.props.location.pathname === '/';

    if (isHomepage && this.state.images === null) {
      this.setState({ images: [] }, async () => {
        const artImages = await this.fetchAllArtImages();
        this.setState({ images: artImages });
      });
    }
  }
}

export default ImageGallery;
