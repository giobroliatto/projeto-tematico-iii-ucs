import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faCheck, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import s from './style.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader';

const ResiduesForm = () => {
    const [residues, setResidues] = useState([]);
    const [editableResidueIndex, setEditableResidueIndex] = useState(null);
    const [editedResidueName, setEditedResidueName] = useState('');
    const [newResidueName, setNewResidueName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3001/residues')
            .then((response) => {
                const residuesData = response.data;
                setResidues(residuesData);
            })
            .catch((error) => {
                console.error('Erro ao buscar resíduos:', error);
            });
    }, []);

    useEffect(() => {
        loadResidues();
    }, []);

    const loadResidues = async () => {
        setIsLoading(true);

        try {
            const response = await axios.get('http://localhost:3001/residues');
            setResidues(response.data);
        } catch (error) {
            console.error('Erro ao carregar resíduos:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditClick = (index) => {
        setEditableResidueIndex(index);
        setEditedResidueName(residues[index].name);
    };

    const handleCheckClick = async (index) => {
        setIsLoading(true);

        try {
            await axios.put(`http://localhost:3001/residues/${residues[index]._id}`, { name: editedResidueName });
            await updateResidueInEcopoints(residues[index]._id, editedResidueName);
            setEditableResidueIndex(null);
            axios.get('http://localhost:3001/residues')
                .then((response) => {
                    const updatedResidues = response.data;
                    setResidues(updatedResidues);
                });
                toast.success('Resíduo alterado com sucesso.', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "colored",
                })
        } catch (error) {
            toast.error(error, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "colored"
            });   
        } finally {
            setIsLoading(false);
        }
    };
    
    const updateResidueInEcopoints = async (residueId, newName) => {
        try {
            const ecopoints = await axios.get(`http://localhost:3001/ecopoints?residueId=${residueId}`);
            await Promise.all(ecopoints.data.map(async (ecopoint) => {
                const updatedResidues = ecopoint.residues.map(residue => {
                    if (residue._id === residueId) {
                        return { ...residue, name: newName };
                    } else {
                        return residue;
                    }
                });
                await axios.put(`http://localhost:3001/ecopoints/${ecopoint._id}`, { residues: updatedResidues });
            }));
        } catch (error) {
            toast.error(error, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "colored"
            });   
        }
    };

    const handleResidueSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            if (!newResidueName) {
                toast.error('Insira o nome do resíduo.', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "colored"
                });
                return;
            }
            await axios.post('http://localhost:3001/residues', { name: newResidueName });
            toast.success('Resíduo cadastrado com sucesso.', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "colored",
            });
            setNewResidueName('');
            loadResidues();
        } catch (error) {
            console.error('Erro ao cadastrar resíduo:', error);
            toast.error('Erro ao cadastrar resíduo. Por favor, tente novamente.', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "colored"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (event) => {
        setEditedResidueName(event.target.value);
    };

    const handleInputAddChange = (event) => {
        setNewResidueName(event.target.value);
    };

    const handleCancelEdit = () => {
        setEditableResidueIndex(null);
        setEditedResidueName('');
    };

    const handleRemoveResidue = async (residueId, index) => {
        const confirmed = window.confirm('Tem certeza de que deseja remover este resíduo?');
        if (!confirmed) return;

        setIsLoading(true);

        try {
            await axios.delete(`http://localhost:3001/residues/${residueId}`);
            setResidues(prevResidues => prevResidues.filter((_, idx) => idx !== index));
            toast.success('Resíduo removido com sucesso.', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "colored",
            })
        } catch (error) {
            toast.error(error.response.data.message, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "colored"
            });   
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={s.content}>
            {isLoading && <Loader />}
            <ToastContainer />
            <h1 className={s.title1}>Manutenção de Resíduos</h1>
            <div className={s.wrapper_all}>
                <div className={s.wrapper}>
                <h2 className={s.title2}>Cadastrar resíduo</h2>
                    <section className={s.create_residue_section}>
                        <form onSubmit={handleResidueSubmit}>
                            <div className={s.add_residue_form}>
                                <label className={s.residue_label}>Nome do resíduo:</label>
                                <input
                                    className={s.add_residue_input}
                                    type="text"
                                    value={newResidueName}
                                    onChange={handleInputAddChange}
                                    placeholder="Digite o nome do resíduo..."
                                />
                                <button className={s.button} type="submit">
                                    Adicionar
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        className={s.icon_add}
                                    />
                                </button>
                            </div>
                        </form>
                    </section>
                    <h2 className={s.title2}>Resíduos</h2>
                    <section className={s.residues_list}>
                        {residues.map((residue, index) => (
                            <div key={index} className={s.residue}>
                                {editableResidueIndex === index ? (
                                    <>
                                        <input
                                            className={s.edit_residue_input}
                                            type="text"
                                            value={editedResidueName}
                                            onChange={handleInputChange}
                                        />
                                        <div className={s.icon_wrapper}>
                                            <FontAwesomeIcon
                                                icon={faCheck}
                                                className={s.icon_check}
                                                onClick={() => handleCheckClick(index)}
                                            />
                                            <FontAwesomeIcon
                                                icon={faTimes}
                                                className={s.icon_cancel}
                                                onClick={handleCancelEdit}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <label>{residue.name}</label>
                                        <div className={s.icon_wrapper}>
                                            <FontAwesomeIcon
                                                icon={faPen}
                                                className={s.icon_edit}
                                                onClick={() => handleEditClick(index)}
                                            />
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                className={s.icon_remove}
                                                onClick={() => handleRemoveResidue(residue._id, index)}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ResiduesForm;
