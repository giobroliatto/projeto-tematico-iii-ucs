import { useEffect, useState } from 'react';
import './EcopointRegistrationForm.css';

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

    const [residuesList, setResiduesList] = useState([]);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData({
            ...formData,
            [name]: checked,
        });
    };

    const handleResiduesChange = (e) => {
        const options = Array.from(e.target.selectedOptions, option => option.value);
        setFormData({
            ...formData,
            residues: options,
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

        const response = await fetch('http://localhost:3001/ecopoints/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            console.log("Ecopoint cadastrado com sucesso!");
        } else {
            console.error("Erro ao cadastrar o Ecopoint.");
        }
    };

    return (
        <div className="content">
            <h1>Cadastro de Ecoponto Fixo</h1>
            
            <div className="wrapper">
                <div className="card">
                    <h2>Manifeste seu interesse em tornar-se um Ecoponto de resíduos especiais do Caxias Lixo Zero e ajude a nossa cidade a ser mais limpa, consciente e sustentável!</h2>
                </div>

                <div className="card">
                    <h2>Antes de se cadastrar, leia com atenção os TERMOS:</h2>
                    <p>- O Ecoponto é responsável pela organização da coleta...</p>
                    <p>- A cada 2 meses, os resíduos devem ser entregues para o Coletivo...</p>
                    <p>- Após o recebimento, o Coletivo Lixo Zero Caxias do Sul é responsável...</p>
                    <p>Desde já, nosso muito obrigado pelo seu interesse e consciência ambiental e coletiva!</p>
                </div>

                <div className="card">
                    <h3>Formulário de Cadastro</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>E-mail <span className="required">*</span></label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Digite seu e-mail"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Nome da Empresa / Instituição / Estabelecimento <span className="required">*</span></label>
                            <input
                                type="text"
                                name="companyName"
                                placeholder="Nome da Empresa"
                                value={formData.companyName}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Responsável pelo cadastro (nome) <span className="required">*</span></label>
                            <input
                                type="text"
                                name="responsibleName"
                                placeholder="Nome do Responsável"
                                value={formData.responsibleName}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Contato do responsável pelo cadastro (e-mail ou WhatsApp) <span className="required">*</span></label>
                            <input
                                type="text"
                                name="responsibleNumber"
                                placeholder="E-mail ou WhatsApp"
                                value={formData.responsibleNumber}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>CEP do Local <span className="required">*</span></label>
                            <input
                                type="number"
                                name="companyCep"
                                placeholder="CEP do local"
                                value={formData.companyCep}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Rua do Local <span className="required">*</span></label>
                            <input
                                type="text"
                                name="companyStreet"
                                placeholder="Rua"
                                value={formData.companyStreet}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Bairro <span className="required">*</span></label>
                            <input
                                type="text"
                                name="companyDistrict"
                                placeholder="Bairro"
                                value={formData.companyDistrict}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Número do Local <span className="required">*</span></label>
                            <input
                                type="number"
                                name="companyNumber"
                                placeholder="Número do local"
                                value={formData.companyNumber}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Complemento (se houver)</label>
                            <input
                                type="number"
                                name="companyComplement"
                                placeholder="Complemento"
                                value={formData.companyComplement}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div class="form-group">
                            <label>Tipo de resíduo que o Ecoponto vai receber (selecionar um ou mais!) <span className="required">*</span></label>
                            <select 
                                multiple 
                                name="residues" 
                                size={residuesList.length}
                                onChange={handleResiduesChange}>
                                {residuesList.map(residue => (
                                    <option key={residue._id} value={residue._id}>
                                        {residue.name}
                                    </option>
                                ))}
                            </select>
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
                        
                        <div className="button-wrapper">
                            <button className="button" type="submit">Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EcopointRegistrationForm;
