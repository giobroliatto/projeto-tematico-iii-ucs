import { useState } from 'react';
import s from './App.module.css';
import Header from './components/Header';
import Footer from './components/Footer';
import EcopointsList from './components/EcopointsList';
import EcopointRegistration from './components/EcopointRegistration';

const App = () => {
    const [activeComponent, setActiveComponent] = useState('ECOPONTOS');

    const handleOptionClick = (option) => {
        setActiveComponent(option);
    };

    return (
        <div className={s.App_container}>
            <Header onOptionClick={handleOptionClick} />
    
            <main className={s.content}>
                {activeComponent === 'ECOPONTOS' && <EcopointsList />}
                {activeComponent === 'EcopointRegistration' && <EcopointRegistration />}
                {/* {activeComponent === 'UserProfile' && <UserProfile />} */}
            </main>
    
            <Footer />
      </div>
    );
};

export default App;