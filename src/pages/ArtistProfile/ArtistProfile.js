import React from 'react';
import Spinner from '../../components/Spinner/Spinner';
import ImageGallery from '../ImageGallery/ImageGallery';
import { usernameToName } from '../../utils';

const ArtistProfile = props => {
  const [artistData, setArtistData] = React.useState();

  // Prevents accidental scroll "jump" in Chrome
  window.scrollTo(0, 0);

  React.useEffect(() => {
    const { username } = props.match.params;

    fetch(`https://async-2-staging.appspot.com/users/${username}`)
      .then(res => res.json())
      .then(setArtistData)
      .catch(() => setArtistData(null));
    console.clear();
  }, [props.match.params]);

  const isArtistDataLoading = artistData === undefined;
  const artistExists = artistData !== null;

  if (isArtistDataLoading) {
    return <Spinner width="3rem" height="3rem" />;
  }

  if (!artistExists) {
    const { username } = props.match.params;
    return (
      <p className="mx-auto text-xl text-center mt-32">
        The user {username} does not exist!
      </p>
    );
  }

  const name = artistData.user.name || usernameToName(artistData.user.username);

  return (
    <section className="lg:flex justify-between">
      <article className="bg-gradient-to-r from-red-400 to-orange-300 h-fit-content p-8 mb-16 rounded-lg text-white text-center lg:w-4/12 lg:mr-12 xl:w-3/12">
        <img
          className="rounded-full w-32 h-32 mx-auto"
          src={`https://res.cloudinary.com/asynchronous-art-inc/image/upload/${artistData.user.userProfilePhotoPath}`}
          alt={`${name} profile icon`}
        />
        <p className="font-bold text-3xl mt-4">
          {name}
        </p>
        <p className="mb-4 mt-1">
          Lorem, ipsum dolor sit amet consectetur adipisicing.
        </p>

        <a
          className="block bg-white px-6 py-3 rounded-full font-bold text-gray-800 max-w-xs mx-auto"
          href={artistData.user.website}
          target="_blank"
          rel="noreferrer"
        >
          Get in Touch
        </a>
      </article>
      <div className="lg:w-8/12">
        <style>
          {`.images-grid-item a:last-of-type {
              display: none;
            }
          `}
        </style>
        <ImageGallery images={artistData.collection.slice(0, 12)} />
      </div>
    </section>
  );
};

export default ArtistProfile;
