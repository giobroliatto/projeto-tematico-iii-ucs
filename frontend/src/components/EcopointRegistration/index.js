import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputMask from 'react-input-mask';
import Select from 'react-select';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import s from './style.module.css';
import SchedulePicker from '../SchedulePicker';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../Loader';

const EcopointRegistration = () => {
    const { id } = useParams(); 
    const isEditMode = !!id;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        companyName: '',
        responsibleName: '',
        responsibleNumber: '',
        companyCep: '',
        companyStreet: '',
        companyDistrict: '',
        companyNumber: '',
        companyComplement: '',
        residues: [],
        openToPublic: true,
        schedules: [],
        validated: false,
    });

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? 'white' : 'black',
        }),
        multiValueRemove: (provided, state) => ({
            ...provided,
            color: '#cc5f5f',
        }),
        multiValue: (provided, state) => ({
            ...provided,
            backgroundColor: '#bcdbb1',
        }),
        control: (provided, state) => ({
            ...provided,
            borderRadius: '10px',
        }),
    };

    const [residuesList, setResiduesList] = useState([]);
    const [selectedResiduesOptions, setSelectedResiduesOptions] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [ecopointName, setEcopointName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const residuesOptions = residuesList.map(residue => ({
        value: residue._id,
        label: residue.name
    }));

    const openModal = () => {
        setModalIsOpen(true);
    };
    
    const closeModal = () => {
        setModalIsOpen(false);
        setEcopointName('');
    };
    
    const handleConfirmDelete = () => {
        if (ecopointName.trim() === formData.companyName) {
            handleDelete();
            closeModal();
        } else {
            toast.error('O nome do Ecoponto não corresponde.', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "colored",
            });
        }
    };
    
    useEffect(() => {
        const fetchResidues = async () => {
            try {
                const response = await fetch('http://localhost:3001/residues/');
                if (response.ok) {
                    const data = await response.json();
                    setResiduesList(data);
                } else {
                    console.error("Erro ao carregar a lista de resíduos");
                }
            } catch (error) {
                console.error("Erro ao buscar resíduos:", error);
            }
        };

        fetchResidues();
    }, []);

    useEffect(() => {
        if (isEditMode) {
            const fetchEcopoint = async () => {
                try {
                    const response = await fetch(`http://localhost:3001/ecopoints/${id}`);
                    if (response.ok) {
                        const data = await response.json();
                        const selectedResidues = data.residues.map(residue => ({
                            value: residue._id,
                            label: residue.name,
                        }));

                        setFormData({
                            email: data.email,
                            companyName: data.companyName,
                            responsibleName: data.responsibleName,
                            responsibleNumber: data.responsibleNumber,
                            companyCep: data.companyCep,
                            companyStreet: data.companyStreet,
                            companyDistrict: data.companyDistrict,
                            companyCity: data.companyCity,
                            companyNumber: data.companyNumber,
                            companyComplement: data.companyComplement,
                            residues: selectedResidues.map(residue => residue.value),
                            openToPublic: data.openToPublic,
                            schedules: data.schedules,
                            validated: data.validated,
                        });

                        setSelectedResiduesOptions(selectedResidues);
                    } else {
                        console.error("Erro ao carregar os dados do Ecoponto");
                    }
                } catch (error) {
                    console.error("Erro ao buscar dados do Ecoponto:", error);
                }
            };

            fetchEcopoint();
        }
    }, [id, isEditMode]);

    const fetchAddressByCep = async (cep) => {
        setIsLoading(true);
    
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            if (response.ok) {
                const addressData = await response.json();
                
                if (!addressData.erro) {
                    setFormData({
                        ...formData,
                        companyCep: addressData.cep || '',
                        companyStreet: addressData.logradouro || '',
                        companyDistrict: addressData.bairro || '',
                        companyCity: addressData.localidade || '',
                    });
                } else {
                    setFormData({
                        ...formData,
                        companyCep: '',
                        companyStreet: '',
                        companyDistrict: '',
                        companyCity: '',
                    });
                    toast.error('CEP inválido', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        theme: "colored",
                    });                    
                }
            } else {
                console.error('Erro ao buscar endereço por CEP');
            }
        } catch (error) {
            console.error('Erro ao buscar endereço por CEP:', error);
            toast.error(error.response?.data?.message || 'Erro ao buscar endereço por CEP', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "colored",
            });
        } finally {
            setIsLoading(false);
        }
    };    

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
        
        if (name === 'companyCep' && value.replace(/\D/g, '').length === 8) {
            fetchAddressByCep(value.replace(/\D/g, ''));
        }
    };

    const handleResiduesChange = (selectedOptions) => {
        const selectedResidues = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setFormData({
            ...formData,
            residues: selectedResidues
        });
        setSelectedResiduesOptions(selectedOptions);
    };

    const handleRadioChange = (e) => {
        setFormData({
            ...formData,
            openToPublic: e.target.value === 'true',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        try {
            const companyCep = String(formData.companyCep).replace(/\D/g, '');
            const responsibleNumber = String(formData.responsibleNumber).replace(/\D/g, '');
        
            const formattedData = {
                ...formData,
                companyCep: companyCep,
                responsibleNumber: responsibleNumber,
            };
        
            const response = await fetch(`http://localhost:3001/ecopoints/${isEditMode ? id : ''}`, {
                method: isEditMode ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedData),
            });
        
            if (response.ok) {
                toast.success(`${isEditMode ? 'Ecoponto atualizado com sucesso!' : 'Dados enviados para análise. Você será comunicado quando seu ecoponto for validado'}`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "colored",
                });
        
                navigate('/');
            } else {
                console.error(`Erro ao ${isEditMode ? 'atualizar' : 'cadastrar'} o Ecoponto.`);
            }
        } catch (error) {
            console.error("Erro durante a requisição:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (isEditMode) {
            setIsLoading(true);

            try {
                const response = await fetch(`http://localhost:3001/ecopoints/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    toast.success('Ecoponto removido com sucesso!', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        theme: "colored",
                    });

                    navigate('/');
                } else {
                    console.error("Erro ao remover o Ecoponto");
                }
            } catch (error) {
                console.error("Erro ao remover o Ecoponto:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className={s.content}>
            {isLoading && <Loader />}
            <ToastContainer />

            <h1 className={s.title1}>{isEditMode ? 'Editar Ecoponto' : 'Cadastro de Ecoponto Fixo'}</h1>

            <div className={s.wrapper_all}>
                <div className={s.wrapper}>
                        {!isEditMode && (
                        <>
                            <div className={s.card}>
                                <h2 className={s.title2}>Manifeste seu interesse em tornar-se um Ecoponto de resíduos especiais do Caxias Lixo Zero e ajude a nossa cidade a ser mais limpa, consciente e sustentável!</h2>
                            </div>
                            <div className={s.card}>
                                <h2 className={s.title2}>Antes de se cadastrar, leia com atenção os TERMOS:</h2>
                                <p className={s.paragraph}>- O Ecoponto é responsável pela organização da coleta, ou seja, é o parceiro que deverá disponibilizar uma ou mais caixas para que as pessoas possam depositar os resíduos, e também é responsável pela verificação dos materiais descartados (se estão de acordo com a proposta); </p>
                                <p className={s.paragraph}>- A cada 2 meses, os resíduos devem ser entregues para o Coletivo Lixo Zero Caxias do Sul no nosso Drive Thru. Sempre será avisado com antecedência quando o Drive Thru irá ocorrer, assim como o horário e local; </p>
                                <p className={s.paragraph}>- Após o recebimento, o Coletivo Lixo Zero Caxias do Sul é o responsável por destinar corretamente os resíduos coletados pelo(s) parceiro(s). </p>
                                <p className={s.paragraph}>Desde já, nosso muito obrigado pelo seu interesse e consciência ambiental e coletiva!</p>
                            </div>
                        </>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className={s.card}>
                            <h3 className={s.title3}>{isEditMode ? `${formData.companyName}` : 'Formulário de Cadastro'}</h3>

                            <div className={`row`}> 
                                <div className={`col-md-12 ${s.form_group}`}>
                                    <label>Responsável pelo cadastro <span className={s.required}>*</span></label>
                                    <input
                                        className={s.input_registration}
                                        type="text"
                                        name="responsibleName"
                                        placeholder="Digite o nome do responsável..."
                                        value={formData.responsibleName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            
                            <div className={`row`}> 
                                <div className={`col-md-8 ${s.form_group}`}>
                                    <label>E-mail <span className={s.required}>*</span></label>
                                    <input
                                        className={s.input_registration}
                                        type="email"
                                        name="email"
                                        placeholder="Digite seu e-mail..."
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            <div className={`col-md-4 ${s.form_group}`}>
                                <label>WhatsApp <span className={s.required}>*</span></label>
                                <InputMask
                                    mask="(99) 99999-9999"
                                    value={formData.responsibleNumber}
                                    onChange={(e) => {
                                    const { name, value } = e.target;
                                    setFormData({
                                        ...formData,
                                        [name]: value,
                                    });
                                    }}
                                >
                                    {(inputProps) => (
                                    <input
                                        className={s.input_registration}
                                        {...inputProps}
                                        type="text"
                                        name="responsibleNumber"
                                        placeholder="Número (com DDD)"
                                    />
                                    )}
                                </InputMask>
                                </div>
                            </div>
                                
                            <div className={`row`}> 
                                <div className={`col-md-12 ${s.form_group}`}>
                                    <label>Nome da empresa/Instituição/Estabelecimento <span className={s.required}>*</span></label>
                                    <input
                                        className={s.input_registration}
                                        type="text"
                                        name="companyName"
                                        placeholder="Digite o nome da empresa..."
                                        value={formData.companyName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            
                            <div className={`row`}>
                                <div className={`col-md-3 ${s.form_group}`}>
                                    <label>CEP <span className={s.required}>*</span></label>
                                    <InputMask
                                        mask="99999-999"
                                        value={formData.companyCep}
                                        onChange={handleChange}
                                    >
                                        {(inputProps) => (
                                            <input
                                                className={s.input_registration}
                                                {...inputProps}
                                                type="text"
                                                name="companyCep"
                                                placeholder="CEP do local"
                                            />
                                        )}
                                    </InputMask>
                                </div>
                                <div className={`col-md-5 ${s.form_group}`}>
                                    <label>Rua <span className={s.required}>*</span></label>
                                    <input
                                        className={`${s.disabled} ${s.input_registration}`}
                                        type="text"
                                        name="companyStreet"
                                        disabled={true}
                                        value={formData.companyStreet}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={`col-md-4 ${s.form_group}`}>
                                    <label>Bairro <span className={s.required}>*</span></label>
                                    <input
                                        className={`${s.disabled} ${s.input_registration}`}
                                        type="text"
                                        name="companyDistrict"
                                        disabled={true}
                                        value={formData.companyDistrict}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className={`row`}>
                                <div className={`col-md-6 ${s.form_group}`}>
                                    <label>Cidade <span className={s.required}>*</span></label>
                                    <input
                                        className={`${s.disabled} ${s.input_registration}`}
                                        type="text"
                                        name="companyCity"
                                        disabled={true}
                                        value={formData.companyCity}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className={`col-md-4 ${s.form_group}`}>
                                    <label>Número <span className={s.required}>*</span></label>
                                    <input
                                        className={s.input_registration}
                                        type="number"
                                        name="companyNumber"
                                        placeholder="0000"
                                        value={formData.companyNumber}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className={`col-md-2 ${s.form_group}`}>
                                    <label>Complemento</label>
                                    <input
                                        className={s.input_registration}
                                        type="number"
                                        name="companyComplement"
                                        value={formData.companyComplement}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            
                            <div className={s.form_group}>
                                <label>Tipo de resíduo que o Ecoponto vai receber <span className={s.required}>*</span></label>
                                <Select
                                    options={residuesOptions}
                                    isMulti
                                    onChange={handleResiduesChange}
                                    styles={customStyles}
                                    value={selectedResiduesOptions}
                                    placeholder='Selecione um ou mais resíduos...'
                                />
                            </div>
                            
                            <div className={`${s.form_group} ${s.radio_group}`}>
                                <label>Seu Ecoponto vai ser aberto ao público em geral? <span className={s.required}>*</span></label>
                                <label>
                                    <input
                                        className={s.input_registration}
                                        type="radio"
                                        name="openToPublic"
                                        value={true}
                                        onChange={handleRadioChange}
                                        checked={formData.openToPublic === true}
                                    /> Sim
                                </label>
                                <label>
                                    <input
                                        className={s.input_registration}
                                        type="radio"
                                        name="openToPublic"
                                        value={false}
                                        onChange={handleRadioChange}
                                        checked={formData.openToPublic === false}
                                    /> Não
                                </label>
                            </div>

                            <SchedulePicker
                                schedules={formData.schedules}
                                setSchedules={newSchedules => setFormData({ ...formData, schedules: newSchedules })}
                            />
                        </div>
                        <div className={s.button_wrapper}>
                            <button className={s.button} onClick={handleSubmit}>{isEditMode ? 'Atualizar' : 'Cadastrar'}</button>
                            {isEditMode && (
                                <button 
                                    type="button" 
                                    className={`${s.button} ${s.button_remove}`} 
                                    onClick={openModal}
                                >
                                    Remover Ecoponto
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className={s.modal}
                overlayClassName={s.modalOverlay}
            >
                <h2 className={s.modal_title}>Atenção! Esta ação não pode ser desfeita</h2>
                <p>Ao continuar, você estará removendo o Ecoponto permanentemente.</p>
                <p>Para confirmar, digite "{formData.companyName}" no campo abaixo:</p>
                <input
                    type="text"
                    value={ecopointName}
                    onChange={(e) => setEcopointName(e.target.value)}
                    className={s.remove_ecopoint_input}
                />

                <div className={s.button_wrapper}>
                    <button className={s.button_remove_modal} onClick={handleConfirmDelete}>Remover Ecoponto</button>
                    <button className={s.button_cancel_modal} onClick={closeModal}>Cancelar</button>
                </div>
            </Modal>
        </div>
    );
};

export default EcopointRegistration;
