import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import s from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

Modal.setAppElement('#root');

const EcopointsList = () => {
    const [ecopoints, setEcopoints] = useState([]);
    const [selectedResidues, setSelectedResidues] = useState([]);
    const [residueTypes, setResidueTypes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentSchedules, setCurrentSchedules] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/ecopoints')
            .then((response) => {
                const ecopoints = response.data; 
                setEcopoints(ecopoints);

                const types = Array.from(new Set(ecopoints.flatMap(ecopoint => ecopoint.residues.map(residue => residue.name))));
                setResidueTypes(types);
            })
            .catch((error) => {
                console.error('Erro ao buscar dados:', error);
            });
    }, []);

    const toggleResidue = (residue) => {
        const isSelected = selectedResidues.includes(residue);
        if (isSelected) {
            setSelectedResidues(selectedResidues.filter(selected => selected !== residue));
        } else {
            setSelectedResidues([...selectedResidues, residue]);
        }
    };

    const filteredEcopoints = ecopoints.filter(
        (ecopoint) =>
            selectedResidues.every(residue => ecopoint.residues.some(ecopointResidue => ecopointResidue.name === residue))
    );

    const openGoogleMaps = (companyStreet, companyNumber, companyDistrict, companyCity) => {
        const street = companyStreet || '';
        const number = companyNumber || '';
        const district = companyDistrict || '';
        const city = companyCity || '';

        const address = `${street} ${number} ${district} ${city}`;

        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        window.open(mapsUrl);
    };

    const isOpenNow = (schedules) => {
        const now = new Date();
        const currentDay = now.getDay(); 
        const currentTime = `${now.getHours()}:${now.getMinutes()}`.padStart(5, '0'); 

        const formatTime = (time) => {
            const [hours, minutes] = time.split(':').map(Number);
            return hours * 60 + minutes;
        };

        const currentMinutes = formatTime(currentTime);

        return schedules.some(schedule => {
            if (schedule.weekDay !== currentDay) {
                return false;
            }

            const startTime1Minutes = formatTime(schedule.startTime1);
            let endTime1Minutes = formatTime(schedule.endTime1);

            if (endTime1Minutes === 0) {
                endTime1Minutes = 1440;
            }

            if (currentMinutes >= startTime1Minutes && currentMinutes < endTime1Minutes) {
                return true;
            }

            if (schedule.startTime2 && schedule.endTime2) {
                const startTime2Minutes = formatTime(schedule.startTime2);
                let endTime2Minutes = formatTime(schedule.endTime2);

                if (endTime2Minutes === 0) {
                    endTime2Minutes = 1440;
                }

                if (currentMinutes >= startTime2Minutes && currentMinutes < endTime2Minutes) {
                    return true;
                }
            }

            return false;
        });
    };

    const handleClockClick = (schedules) => {
        setCurrentSchedules(schedules);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className={s.content}>
            <h1 className={s.title1}>Ecopontos</h1>
            <div className={s.wrapper_all}>
                <div className={s.wrapper}>
                    <h2 className={s.title2}>Tipos de resíduos</h2>
                    <section className={s.filter_section}>
                        <div className={s.tags}>
                            {residueTypes.map((type) => (
                                <div
                                    key={type}
                                    onClick={() => toggleResidue(type)}
                                    className={`${s.tag} ${selectedResidues.includes(type) ? s.tag_selected : ''}`}
                                >
                                    {type}
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className={s.ecopoints_section}>
                        {filteredEcopoints.length === 0 ? (
                            <div className={s.no_ecopoints}>
                                Nenhum ecoponto encontrado
                            </div>
                        ) : (
                            filteredEcopoints.map((ecopoint) => {
                                const openNow = isOpenNow(ecopoint.schedules);
                                return (
                                    <div className={s.card} key={ecopoint._id}>
                                        <h3 className={s.title3}>{ecopoint.companyName}</h3>
                                        <div className={s.schedule_section}>
                                            <h4 className={`${s.title4} ${openNow ? s.title4_open : s.title4_closed}`}>
                                                {openNow ? 'Aberto' : 'Fechado'}
                                            </h4>
                                            <FontAwesomeIcon
                                                className={s.clock_icon}
                                                icon={faClock}
                                                onClick={() => handleClockClick(ecopoint.schedules)}
                                            />
                                        </div>
                                        <div className={s.residue_tags}>
                                            {ecopoint.residues.map((residue, index) => (
                                                <div key={index} className={s.residue_tag}>
                                                    {residue.name}
                                                </div>
                                            ))}
                                        </div>
                                        <div className={s.address_wrapper}>
                                            <div className={s.address}>
                                                {ecopoint.companyStreet}, {ecopoint.companyNumber}{ecopoint.companyComplement && `/${ecopoint.companyComplement}`}, {ecopoint.companyDistrict}
                                            </div>
                                            <button 
                                                className={s.location_dot_button}
                                                onClick={() => openGoogleMaps(ecopoint.companyStreet, ecopoint.companyNumber, ecopoint.companyDistrict, ecopoint.companyCity)}>
                                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </section>
                </div>
            </div>
            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                contentLabel="Horários de Funcionamento"
                className={s.modal}
                overlayClassName={s.modalOverlay}
            >
                <h2 className={s.modal_title}>Horários de funcionamento</h2>

                <FontAwesomeIcon
                    icon={faTimes}
                    className={s.modal_close}
                    onClick={closeModal}
                />

                {currentSchedules.map((schedule, index) => (
                    <div className={s.days} key={index}>
                        <label className={s.day}>
                            {[
                                'domingo', 
                                'segunda-feira', 
                                'terça-feira', 
                                'quarta-feira', 
                                'quinta-feira', 
                                'sexta-feira', 
                                'sábado'
                            ][schedule.weekDay]} - {schedule.startTime1} - {schedule.endTime1} {schedule.startTime2 && schedule.endTime2 && (
                                <>
                                    | {schedule.startTime2} - {schedule.endTime2}
                                </>
                            )}
                        </label>
                    </div>
                ))}

            </Modal>
        </div>
    );
};

export default EcopointsList;
