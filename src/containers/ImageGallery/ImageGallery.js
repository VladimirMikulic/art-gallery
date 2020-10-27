import React, { Component } from 'react';
import ImageModal from '../../components/ImageModal/ImageModal';
import ImagesGrid from '../../components/ImagesGrid/ImagesGrid';
import Popup from '../../components/Popup/Popup';
import { throttle } from './utils';

class ImageGallery extends Component {
  state = {
    images: [],
    selectedImage: null,
    isImageInFullScreen: false,
    popupData: null
  };

  fullScreenRef = React.createRef();

  samplePopupData = {
    artist: 'Layer Change',
    artistProfilePhotoUrl:
      'https://res.cloudinary.com/asynchronous-art-inc/image/upload/v1580411554/users/anonymous_atliv6',
    imageUrl:
      'https://res.cloudinary.com/asynchronous-art-inc/image/upload/art/CIVIT/QmNjxnGDTo1H3BusePsNq9vYe83k53C7mJKDXRJnVLE87J.jpg',
    imageTitle: 'Dark sky by Vladimir',
    layer: 'Participant 6',
    triggeredBy: 'MOCA',
    blockheight: '#10201800'
  };

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

  handleKeyDown = e => {
    const { selectedImage } = this.state;

    if (e.keyCode === 32) {
      // Space key to show modal from the bottom left corner
      e.preventDefault();
      // Optional data fetching for popup can be performed here...
      this.setState({ popupData: this.samplePopupData });
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

  render() {
    if (this.state.images.length === 0) {
      return (
        <div className="mx-auto text-xl text-center mt-16">Loading...</div>
      );
    }

    return (
      <section>
        <div ref={this.fullScreenRef} className="fullscreen-container">
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
        </div>

        <ImagesGrid
          images={this.state.images}
          onImageClick={this.handleImageClick}
        />
      </section>
    );
  }

  async componentDidMount() {
    const response = await fetch(
      'https://async-2-staging.appspot.com/users/cloud-strife/arts?rel=artist&type=masters&page=1&count=100&sortBy=reservePrice&sortDirection=-1',
      {
        mode: 'cors'
      }
    );
    const parsedResponse = await response.json();

    parsedResponse.arts[0].isFirstImage = true;
    parsedResponse.arts[parsedResponse.arts.length - 1].isLastImage = true;

    this.setState({ images: parsedResponse.arts });

    // Image Modal keyboard navigation
    document.body.addEventListener('keydown', this.handleKeyDown);
    // Sync state if the user exits fullscreen by pressing Esc key
    this.fullScreenRef.current.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        this.setState({ isImageInFullScreen: false });
      }
    });
  }
}

export default ImageGallery;
