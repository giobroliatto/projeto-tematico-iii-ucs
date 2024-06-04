import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import style from './style.module.css';
import { Slide, ToastContainer, toast } from 'react-toastify';

Modal.setAppElement('#root');

const EcopointsPreRegistered = () => {
    const [ecopoints, setEcopoints] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEcopoint, setSelectedEcopoint] = useState(null);
    const [action, setAction] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/ecopoints?validated=false')
            .then((response) => {
                setEcopoints(response.data);
            })
            .catch(err => {
                console.log("Erro ao buscar os ecopontos", err);
            });
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

    const handleConfirm = () => {
        if (action === 'Aceitar') {
            handleAccept(selectedEcopoint);
        } else if (action === 'Rejeitar') {
            handleReject(selectedEcopoint._id);
        }
        handleCloseModal();
    };

    const handleAccept = async (ecopoint) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            };

            const response = await axios.post(`http://localhost:3001/user`, {
                email: ecopoint.email
            }, config);

            if(response.status === 200 || response.status === 201){
                toast.success('Login gerado com sucesso', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "colored",
                });

                await updateEcopoint(ecopoint);

            }


        } catch (err) {
            const errorMessage = err.response.data.message;

            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                draggable: true,
                theme: 'dark',
                transition: Slide
            })
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

    const handleReject = async (ecopoint) => {
        alert("EM ANDAMENTO...");
        /* CONSTRUÇÃO */
    };

    return (
        <>
            <ToastContainer />
            <div className={style.container}>
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