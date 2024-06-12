import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import style from './style.module.css';
import { Slide, ToastContainer, toast } from 'react-toastify';
import Loader from '../Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEye } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const EcopointsPreRegistered = () => {
    const [ecopoints, setEcopoints] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEcopoint, setSelectedEcopoint] = useState(null);
    const [action, setAction] = useState('');
    const [ecopointDetails, setEcopointDetails] = useState(null);

    const fetchEcopoints = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:3001/ecopoints?validated=false');
            setEcopoints(response.data);
        } catch (err) {
            console.error("Erro ao buscar os ecopontos", err);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchEcopointDetails = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3001/ecopoints/${id}`);
            setEcopointDetails(response.data);
        } catch (err) {
            console.error('Erro ao buscar detalhes do ecoponto', err);
        }
    };

    useEffect(() => {
        fetchEcopoints();
    }, []);

    const handleOpenModal = (ecopoint, action) => {
        setSelectedEcopoint(ecopoint);
        setAction(action);
        if (action === 'Visualizar') {
            fetchEcopointDetails(ecopoint._id);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEcopoint(null);
        setAction('');
        setEcopointDetails(null);
    };

    const handleConfirm = async () => {
        handleCloseModal();
        setIsLoading(true);
        if (action === 'Aceitar') {
            await handleAccept(selectedEcopoint);
        }
        setIsLoading(false);
        fetchEcopoints();
    };

    const handleAccept = async (ecopoint) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            };

            const response = await axios.post('http://localhost:3001/user', {
                email: ecopoint.email
            }, config);

            if (response.status === 200 || response.status === 201) {
                await updateEcopoint(ecopoint);
                await sendEmailConfirmation(response.data.user);

                toast.success('Ecoponto aceito.\nEmail enviado com sucesso!', {
                    position: 'bottom-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: 'colored',
                });
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Erro ao processar a solicitação';
            toast.error(errorMessage, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                draggable: true,
                theme: 'dark',
                transition: Slide,
            });
        }
    };

    const updateEcopoint = async (ecopoint) => {
        try {
            await axios.put(`http://localhost:3001/ecopoints/${ecopoint._id}`, {
                validated: true
            });
        } catch (err) {
            console.error('Erro ao atualizar o ecoponto:', err);
            throw err;
        }
    };

    const sendEmailConfirmation = async (dataEmail) => {
        try {
            await axios.post('http://localhost:3001/sendEmail', {
                email: dataEmail.email,
                password: dataEmail.password
            });
        } catch (err) {
            console.error('Erro ao enviar o email:', err);
            throw err;
        }
    };

    return (
        <>
            <ToastContainer />
            <div className={style.container}>
                {isLoading && <Loader />}
                <div className={style.tableContainer}>
                    <h1>Ecopontos não cadastrados</h1>
                    <ul>
                        {ecopoints.map((ecopoint) => (
                            <li key={ecopoint._id} className={style.listItem}>
                                {ecopoint.companyName}
                                <div className={style.iconContainer}>
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                        className={style.iconCheck}
                                        onClick={() => handleOpenModal(ecopoint, 'Aceitar')}
                                        title='Aceitar'
                                    />
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className={style.iconEye}
                                        onClick={() => handleOpenModal(ecopoint, 'Visualizar')}
                                        title='Visualizar'
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={handleCloseModal}
                    contentLabel="Confirmação"
                    className={style.modal}
                    overlayClassName={style.modalOverlay}
                >
                    {action === 'Aceitar' ? (
                        <>
                            <h2 className={style.modalTitle}>{action}?</h2>
                            <p className={style.modalText}>Tem certeza que deseja {action} o ecoponto <strong>{selectedEcopoint?.companyName}</strong>?</p>
                            <button className={style.btnConfirmModal} onClick={handleConfirm}>Confirmar</button>
                            <button className={style.btnCloseModal} onClick={handleCloseModal}>Cancelar</button>
                        </>
                    ) : (
                        <>
                            <h2 className={style.modalTitle}>Detalhes</h2>
                            {ecopointDetails ? (
                                <div className={style.modalDetails}>
                                    <p className={style.modalItem}><strong>Nome da Empresa:</strong> {ecopointDetails.companyName}</p>
                                    <p className={style.modalItem}><strong>Email:</strong> {ecopointDetails.email}</p>
                                    <p className={style.modalItem}><strong>Responsável:</strong> {ecopointDetails.responsibleName}</p>
                                    <p className={style.modalItem}><strong>Telefone:</strong> {ecopointDetails.responsibleNumber}</p>
                                    <p className={style.modalItem}><strong>Endereço:</strong> {ecopointDetails.companyStreet}, {ecopointDetails.companyNumber}, {ecopointDetails.companyComplement}, {ecopointDetails.companyDistrict}, {ecopointDetails.companyCity}, CEP: {ecopointDetails.companyCep}</p>
                                    <p className={style.modalSubtitle}><strong>Resíduos aceitos:</strong></p>
                                    <ul className={style.modalList}>
                                        {ecopointDetails.residues.map(residue => (
                                            <li key={residue._id} className={style.modalListItem}>{residue.name}</li>
                                        ))}
                                    </ul>
                                    <p className={style.modalSubtitle}><strong>Horários de Funcionamento:</strong></p>
                                    <ul className={style.modalList}>
                                        {ecopointDetails.schedules.map(schedule => (
                                            <li key={schedule._id} className={style.modalListItem}>
                                                {['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'][schedule.weekDay]}: {schedule.startTime1} - {schedule.endTime1} {schedule.startTime2 && `, ${schedule.startTime2} - ${schedule.endTime2}`}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className={style.modalItem}><strong>Aberto ao Público:</strong> {ecopointDetails.openToPublic ? 'Sim' : 'Não'}</p>
                                </div>
                            ) : (
                                <p className={style.modalLoading}>Carregando...</p>
                            )}
                            <button className={style.btnCloseModal} onClick={handleCloseModal}>Fechar</button>
                        </>
                    )}
                </Modal>
            </div>
        </>
    );
};

export default EcopointsPreRegistered;
