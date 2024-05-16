import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import EcopointsList from './components/EcopointsList';
import EcopointRegistration from './components/EcopointRegistration';

const App = () => {
    return (
        <div className="App-container">
            <Header />
    
            <main className="content">
                <EcopointsList />
                <EcopointRegistration />
            </main>
    
            <Footer />
      </div>
    );
};

export default App;