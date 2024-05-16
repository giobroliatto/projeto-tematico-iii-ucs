import { useEffect, useState } from 'react';
import axios from 'axios';
import s from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const EcopointsList = () => {
    const [ecopoints, setEcopoints] = useState([]);
    const [nameFilter, setNameFilter] = useState('');
    const [residueFilter, setResidueFilter] = useState('');
    const [residueTypes, setResidueTypes] = useState([]);

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

    const filteredEcopoints = ecopoints.filter(
        (ecopoint) =>
            ecopoint.companyName.toLowerCase().includes(nameFilter.toLowerCase()) &&
            ecopoint.residues.some(residue => residue.name.toLowerCase().includes(residueFilter.toLowerCase()))
    );

    const clearNameFilter = () => {
        setNameFilter('');
    };

    return (
        <div className={s.content}>
            <h1 className={s.title1}>Ecopontos</h1>

            <div className={s.wrapper_all}>

                <div className={s.wrapper}>

                    <section className={s.filter_section}>
                        <select
                            value={residueFilter}
                            onChange={(e) => setResidueFilter(e.target.value)}
                            className={s.filter_select}
                        >
                            <option value="">Todos os resíduos</option>
                            {residueTypes.map((type) => (
                                <option key={type} value={type.toLowerCase()}>
                                    {type}
                                </option>
                            ))}
                        </select>

                        <button className={s.select_residue_button}>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </button>

                        <input
                            type="text"
                            value={nameFilter}
                            onChange={(e) => setNameFilter(e.target.value)}
                            placeholder="Digite o nome de um ecoponto..."
                            className={s.filter_input}
                        />

                        <button className={s.clear_filters_button} onClick={clearNameFilter}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </section>

                    <section className={s.ecopoints_section}>
                        {filteredEcopoints.length === 0 ? (
                            <div className={s.no_ecopoints}>
                                Nenhum ecoponto encontrado
                            </div>
                        ) : (
                            filteredEcopoints.map((ecopoint) => (
                                <div className={s.card} key={ecopoint._id}>
                                    <h2>{ecopoint.companyName}</h2>
                                    <p>
                                        Resíduos: {ecopoint.residues.map(residue => residue.name).join(', ')}
                                    </p>
                                    <p>CEP: {ecopoint.companyCep}</p>
                                </div>
                            ))
                        )}
                    </section>

                </div>
                
            </div>

        </div>
    );
};

export default EcopointsList;
