import Navigation from './components/Navigation/Navigation';
import ImageGallery from './containers/ImageGallery/ImageGallery';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
      </header>
      <main>
        <ImageGallery />
      </main>
    </div>
  );
}

export default App;
