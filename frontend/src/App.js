import { useState } from 'react';
import s from './App.module.css';
import Header from './components/Header';
import Footer from './components/Footer';
import EcopointsList from './components/EcopointsList';
import EcopointRegistration from './components/EcopointRegistration';
import UserProfile from './components/UserProfile';
import EcopointsPreRegistered from './components/EcopointsPreRegistered';
import ResiduesForm from './components/ResiduesForm';

const App = () => {
    const [activeComponent, setActiveComponent] = useState('ECOPONTOS');

    const handleOptionClick = (option) => {
        setActiveComponent(option);
    };

    const handleNavigation = (component) => {
        setActiveComponent(component);
    };

    return (
        <div className={s.App_container}>
            <Header onOptionClick={handleOptionClick} />
    
            <main className={s.content}>
                {activeComponent === 'ECOPONTOS' && <EcopointsList />}
                {activeComponent === 'EcopointRegistration' && <EcopointRegistration />}
                {activeComponent === 'UserProfile' && <UserProfile onNavigate={handleNavigation}/>}
                {activeComponent === 'EcopointsPreRegistered' && <EcopointsPreRegistered />}
                {activeComponent === 'ResiduesForm' && <ResiduesForm />}
            </main>
    
            <Footer />
      </div>
    );
};

export default App;