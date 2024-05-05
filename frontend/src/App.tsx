import EcopointList from './EcopointList';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
    return (
        <div className="App-container">
            <Header />
    
            <main className="content">
                <EcopointList />
            </main>
    
            <Footer />
      </div>
    );
};

export default App;