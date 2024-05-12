import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputMask from 'react-input-mask';
import Select from 'react-select';
import './EcopointRegistrationForm.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import SchedulePicker from './components/SchedulePicker';

const EcopointRegistrationForm = () => {
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

    const residuesOptions = residuesList.map(residue => ({
        value: residue._id,
        label: residue.name
    }));

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

    const fetchAddressByCep = async (cep) => {
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
                    });
                } else {
                    setFormData({
                        ...formData,
                        companyCep: '',
                        companyStreet: '',
                        companyDistrict: '',
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
            }
        } catch (error) {
            console.error("Erro ao buscar informações pelo CEP:", error);
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
    };

    const handleRadioChange = (e) => {
        setFormData({
            ...formData,
            openToPublic: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedData = {
            ...formData,
            companyCep: formData.companyCep.replace(/\D/g, ''), 
            responsibleNumber: formData.responsibleNumber.replace(/\D/g, ''),
        };

        const response = await fetch('http://localhost:3001/ecopoints/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedData),
        });

        if (response.ok) {
            toast.success('Informações enviadas para análise', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "colored",
            });  
        } else {
            console.error("Erro ao cadastrar o Ecopoint.");
        }
    };

    return (
        <div className="content">
            <ToastContainer />

            <h1>Cadastro de Ecoponto Fixo</h1>
            
            <div className="wrapper">
                <div className="card">
                    <h2>Manifeste seu interesse em tornar-se um Ecoponto de resíduos especiais do Caxias Lixo Zero e ajude a nossa cidade a ser mais limpa, consciente e sustentável!</h2>
                </div>

                <div className="card">
                    <h2>Antes de se cadastrar, leia com atenção os TERMOS:</h2>
                    <p>- O Ecoponto é responsável pela organização da coleta, ou seja, é o parceiro que deverá disponibilizar uma ou mais caixas para que as pessoas possam depositar os resíduos, e também é responsável pela verificação dos materiais descartados (se estão de acordo com a proposta); </p>
                    <p>- A cada 2 meses, os resíduos devem ser entregues para o Coletivo Lixo Zero Caxias do Sul no nosso Drive Thru. Sempre será avisado com antecedência quando o Drive Thru irá ocorrer, assim como o horário e local; </p>
                    <p>- Após o recebimento, o Coletivo Lixo Zero Caxias do Sul é o responsável por destinar corretamente os resíduos coletados pelo(s) parceiro(s). </p>
                    <p>Desde já, nosso muito obrigado pelo seu interesse e consciência ambiental e coletiva!</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="card">
                        <h3>Formulário de Cadastro</h3>

                        <div className="row"> 
                            <div className="col-md-12 form-group">
                                <label>Responsável pelo cadastro <span className="required">*</span></label>
                                <input
                                    type="text"
                                    name="responsibleName"
                                    placeholder="Digite o nome do responsável..."
                                    value={formData.responsibleName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        
                        <div className="row"> 
                            <div className="col-md-8 form-group">
                                <label>E-mail <span className="required">*</span></label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Digite seu e-mail..."
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        <div className="col-md-4 form-group">
                            <label>Telefone para contato (WhatsApp) <span className="required">*</span></label>
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
                                    {...inputProps}
                                    type="text"
                                    name="responsibleNumber"
                                    placeholder="Número (com DDD)"
                                />
                                )}
                            </InputMask>
                            </div>
                        </div>
                            
                        <div className="row"> 
                            <div className="col-md-12 form-group">
                                <label>Nome da empresa/Instituição/Estabelecimento <span className="required">*</span></label>
                                <input
                                    type="text"
                                    name="companyName"
                                    placeholder="Digite o nome da empresa..."
                                    value={formData.companyName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        
                        <div className='row'>
                            <div className="col-md-3 form-group">
                                <label>CEP <span className="required">*</span></label>
                                <InputMask
                                    mask="99999-999"
                                    value={formData.companyCep}
                                    onChange={handleChange}
                                >
                                    {(inputProps) => (
                                        <input
                                            {...inputProps}
                                            type="text"
                                            name="companyCep"
                                            placeholder="CEP do local"
                                        />
                                    )}
                                </InputMask>
                            </div>
                            <div className="col-md-9 form-group">
                                <label>Rua <span className="required">*</span></label>
                                <input
                                    className='disabled'
                                    type="text"
                                    name="companyStreet"
                                    disabled={true}
                                    value={formData.companyStreet}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className='row'>
                            <div className="col-md-6 form-group">
                                <label>Bairro <span className="required">*</span></label>
                                <input
                                    className='disabled'
                                    type="text"
                                    name="companyDistrict"
                                    disabled={true}
                                    value={formData.companyDistrict}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-4 form-group">
                                <label>Número <span className="required">*</span></label>
                                <input
                                    type="number"
                                    name="companyNumber"
                                    placeholder="0000"
                                    value={formData.companyNumber}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-2 form-group">
                                <label>Complemento</label>
                                <input
                                    type="number"
                                    name="companyComplement"
                                    value={formData.companyComplement}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label>Tipo de resíduo que o Ecoponto vai receber <span className="required">*</span></label>
                            <Select
                                options={residuesOptions}
                                isMulti
                                onChange={handleResiduesChange}
                                styles={customStyles}
                                placeholder='Selecione um ou mais resíduos...'
                            />
                        </div>
                        
                        <div className="form-group radio-group">
                            <label>Seu Ecoponto vai ser aberto ao público em geral? <span className="required">*</span></label>
                            <label>
                                <input
                                    type="radio"
                                    name="openToPublic"
                                    value={true}
                                    onChange={handleRadioChange}
                                    checked={true}
                                /> Sim
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="openToPublic"
                                    value={false}
                                    onChange={handleRadioChange}
                                /> Não
                            </label>
                        </div>

                        <SchedulePicker
                            schedules={formData.schedules}
                            setSchedules={newSchedules => setFormData({ ...formData, schedules: newSchedules })}
                        />
                    </div>
                    <div className="button-wrapper">
                        <button className="button" type="submit">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EcopointRegistrationForm;
