import { Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import ImageGallery from './pages/ImageGallery/ImageGallery';
import ArtistProfile from './pages/ArtistProfile/ArtistProfile';

function App() {
  return (
    <div className="App p-4 sm:p-8">
      <header className="App-header">
        <Navigation />
      </header>

      <main className="container mx-auto my-16">
        <Route
          path={['/', '/search/:username']}
          exact
          component={props => (
            <ImageGallery {...props} key={window.location.pathname} />
          )}
        ></Route>
        <Route path="/artist/:username" exact component={ArtistProfile}></Route>
      </main>
    </div>
  );
}

export default App;
