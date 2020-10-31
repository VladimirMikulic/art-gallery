export const throttle = (func, delay) => {
  let inThrottle;

  return function () {
    const args = arguments;
    const context = this;

    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), delay);
    }
  };
};

export const samplePopupData = {
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