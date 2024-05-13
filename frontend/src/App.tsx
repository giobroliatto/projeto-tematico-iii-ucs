import './App.css';
import EcopointList from './EcopointList';
import Header from './components/Header';
import Footer from './components/Footer';
import EcopointRegistrationForm from './EcopointRegistrationForm';

const App = () => {
    return (
        <div className="App-container">
            <Header />
    
            <main className="content">
                {/* <EcopointList /> */}
                <EcopointRegistrationForm />
            </main>
    
            <Footer />
      </div>
    );
};

export default App;