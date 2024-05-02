import React from 'react';
import './App.css';

const RegisterEcopoint = () => {
    return (
        <div className="container">
            <div className="card">
                <h1>Cadastro de Ecoponto Fixo</h1>
                <h2>Manifeste seu interesse em tornar-se um Ecoponto de resíduos especiais do Caxias Lixo Zero e ajude a nossa cidade a ser mais limpa, consciente e sustentável!</h2>
            </div>

            <div className="card">
                <h2>Antes de se cadastrar, leia com atenção os TERMOS:</h2>
                <p>- O Ecoponto é responsável pela organização da coleta...</p>
                <p>- A cada 2 meses, os resíduos devem ser entregues para o Coletivo...</p>
                <p>- Após o recebimento, o Coletivo Lixo Zero Caxias do Sul é o responsável...</p>
                <p>Desde já, nosso muito obrigado pelo seu interesse e consciência ambiental e coletiva!</p>
            </div>

            <div className="card">
                <h2>Formulário de Cadastro</h2>
                <form>
                    <div className="form-group">
                        <label>E-mail <span className="required">*</span></label>
                        <input type="email" placeholder="Digite seu e-mail" />
                    </div>
                    <div className="form-group">
                        <label>Nome da Empresa / Instituição / Estabelecimento <span className="required">*</span></label>
                        <input type="text" placeholder="Nome da Empresa" />
                    </div>
                    <div className="form-group">
                        <label>Responsável pelo cadastro (nome) <span className="required">*</span></label>
                        <input type="text" placeholder="Nome do Responsável" />
                    </div>
                    <div className="form-group">
                        <label>E-mail ou WhatsApp do responsável pelo cadastro <span className="required">*</span></label>
                        <input type="text" placeholder="E-mail ou WhatsApp" />
                    </div>
                    <div className="form-group">
                        <label>Redes sociais do local (se houver)</label>
                        <input type="text" placeholder="Redes sociais" />
                    </div>
                    <div className="form-group">
                        <label>Endereço completo do local (Ecoponto) <span className="required">*</span></label>
                        <input type="text" placeholder="Endereço completo" />
                    </div>
                    <div className="form-group">
                        <label>Tipo de resíduo que o Ecoponto vai receber (selecionar um ou mais!) <span className="required">*</span></label>
                        <select multiple>
                            <option>Resíduo 1</option> 
                            <option>Resíduo 2</option> 
                            <option>Resíduo 3</option>
                        </select>
                    </div>
                    <div className="form-group radio-group">
                        <label>Seu Ecoponto vai ser aberto ao público em geral? <span className="required">*</span></label>
                        <label>
                            <input type="radio" name="openToPublic" value="sim" /> Sim
                        </label>
                        <label>
                            <input type="radio" name="openToPublic" value="nao" /> Não
                        </label>
                    </div>
                    <button className="button">Enviar Cadastro</button> 
                </form>
            </div>
        </div>
    );
};

export default RegisterEcopoint;
