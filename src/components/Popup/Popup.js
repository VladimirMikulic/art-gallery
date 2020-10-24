import React from 'react';
import './Popup.css';

const Popup = ({ data }) => {
  const popupRef = React.useRef();

  React.useEffect(() => {
    // Animate popup from bottom left corner (slide)
    popupRef.current.style.transform = 'translate3d(-0px, 0px, 0)';
  }, []);

  return (
    <article
      ref={popupRef}
      className="fixed left-0 bottom-0 ml-8 mb-8 p-6 pr-12 pb-12 rounded-xl text-white popup"
    >
      <p className="flex items-center">
        <img
          src={data.artistProfilePhotoUrl}
          alt={`${data.artist} profile icon`}
          className="rounded-full w-8"
        />
        <span className="ml-4 font-bold">{data.artist}</span>
      </p>

      <div className="flex pl-8 pr-24 mt-6">
        <div className="flex items-center">
          <img
            src={data.imageUrl}
            alt={data.imageTitle}
            className="popup-image rounded-lg"
          />
        </div>

        <div className="ml-8 mr-4 rotate-90 border-indigo-600 rounded vertical-spacer"></div>

        <div>
          <p className="text-gray-400">Layer</p>
          <p className="font-bold text-xl">{data.layer}</p>

          <p className="mt-2 text-gray-400">Triggered by</p>
          <p className="font-bold text-xl">{data.triggeredBy}</p>

          <p className="mt-2 text-gray-400">Blockheight</p>
          <p className="font-bold text-xl">{data.blockheight}</p>
        </div>
      </div>
    </article>
  );
};

export default Popup;
