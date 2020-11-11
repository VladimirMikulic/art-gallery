import { Route } from 'react-router-dom';
import ImageGallery from './containers/ImageGallery/ImageGallery';

function App() {
  return (
    <div className="App p-4 sm:p-8">
      <Route
        path={['/', '/user/:username']}
        exact
        component={ImageGallery}
      ></Route>
    </div>
  );
}

export default App;
