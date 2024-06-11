import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import style from './style.module.css';
import { Slide, ToastContainer, toast } from 'react-toastify';
import Loader from '../Loader';

Modal.setAppElement('#root');

const EcopointsPreRegistered = () => {
    const [ecopoints, setEcopoints] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEcopoint, setSelectedEcopoint] = useState(null);
    const [action, setAction] = useState('');

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

    useEffect(() => {
        fetchEcopoints();
    }, []);

    const handleOpenModal = (ecopoint, action) => {
        setSelectedEcopoint(ecopoint);
        setAction(action);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEcopoint(null);
        setAction('');
    };

    const handleConfirm = async () => {
        handleCloseModal();
        setIsLoading(true);
        if (action === 'Aceitar') {
            await handleAccept(selectedEcopoint);
        } else if (action === 'Rejeitar') {
            await handleReject(selectedEcopoint._id);
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

    const handleReject = async (ecopointId) => {
        alert('EM ANDAMENTO...');
        /* CONSTRUÇÃO */
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
                            <li key={ecopoint._id}>
                                {ecopoint.companyName}
                                <div>
                                    <button onClick={() => handleOpenModal(ecopoint, 'Aceitar')}>Aceitar</button>
                                    <button onClick={() => handleOpenModal(ecopoint, 'Rejeitar')}>Rejeitar</button>
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
                    <h2>{action}?</h2>
                    <p>Tem certeza que deseja {action} o ecoponto <strong>{selectedEcopoint?.companyName}</strong>?</p>
                    <button className={style.btnConfirmModal} onClick={handleConfirm}>Confirmar</button>
                    <button className={style.btnCloseModal} onClick={handleCloseModal}>Cancelar</button>
                </Modal>
            </div>
        </>
    );
};

export default EcopointsPreRegistered;
