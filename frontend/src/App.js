import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import s from './App.module.css';
import Header from './components/Header';
import Footer from './components/Footer';
import EcopointsList from './components/EcopointsList';
import EcopointRegistration from './components/EcopointRegistration';
import UserProfile from './components/UserProfile';
import EcopointsPreRegistered from './components/EcopointsPreRegistered';
import ResiduesForm from './components/ResiduesForm';
// import EditEcopoint from './components/EditEcopoint';

const App = () => {
    return (
        <Router>
            <div className={s.App_container}>
                <Header />
                <main className={s.content}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/ecopoints" />} />
                        <Route path="/ecopoints" element={<EcopointsList />} />
                        <Route path="/register-ecopoint" element={<EcopointRegistration />} />
                        {/* <Route path="/edit-ecopoint/:id" element={<EditEcopoint />} /> */}
                        <Route path="/user-profile" element={<UserProfile />} />
                        <Route path="/ecopoints-pre-registered" element={<EcopointsPreRegistered />} />
                        <Route path="/residues-form" element={<ResiduesForm />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;