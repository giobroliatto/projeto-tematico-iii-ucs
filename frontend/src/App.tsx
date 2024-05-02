import EcopointList from './EcopointList';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
    return (
        <div>
            <Header />

            <EcopointList /> 

            <Footer />
        </div>
    );
};

export default App;