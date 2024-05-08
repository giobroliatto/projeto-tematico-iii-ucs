import { useEffect, useState } from 'react';
import axios from 'axios';
import './EcopointList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const EcopointList = () => {
    const [ecopoints, setEcopoints] = useState<any[]>([]);
    const [nameFilter, setNameFilter] = useState('');
    const [residueFilter, setResidueFilter] = useState('');
    const [residueTypes, setResidueTypes] = useState<string[]>([]);

    useEffect(() => {
        axios.get<Ecopoint[]>('http://localhost:3001/ecopoints')
            .then((response) => {
                const ecopoints = response.data; 
                setEcopoints(response.data);

                const types = Array.from(new Set(ecopoints.map((e) => e.residue.name)));
                setResidueTypes(types);
            })
            .catch((error) => {
                console.error('Erro ao buscar dados:', error);
            });
    }, []);

    const filteredEcopoints = ecopoints.filter(
        (ecopoint) =>
            ecopoint.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
            ecopoint.residue.name.toLowerCase().includes(residueFilter.toLowerCase())
    );

    const clearNameFilter = () => {
        setNameFilter('');
    };

    return (
        <div className="content">
            <h1>Ecopontos</h1>

            <div className="wrapper">

                <section className="filter-section">
                    <select
                        value={residueFilter}
                        onChange={(e) => setResidueFilter(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">Todos os resíduos</option>
                        {residueTypes.map((type) => (
                            <option key={type} value={type.toLowerCase()}>
                                {type}
                            </option>
                        ))}
                    </select>

                    <button className="select-residue-button">
                        <FontAwesomeIcon icon={faChevronDown} />
                    </button>

                    <input
                        type="text"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        placeholder="Digite o nome de um ecoponto..."
                        className="filter-input"
                    />

                    <button className="clear-filters-button" onClick={clearNameFilter}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </section>

                <section className="ecopoints-section">
                    {filteredEcopoints.length === 0 ? (
                        <div className="no-ecopoints">
                            Nenhum ecoponto encontrado
                        </div>
                    ) : (
                        filteredEcopoints.map((ecopoint) => (
                            <div className="card" key={ecopoint._id}>
                                <h2>{ecopoint.name}</h2>
                                <p>Resíduo: {ecopoint.residue.name}</p>
                                <p>CEP: {ecopoint.cep}</p>
                            </div>
                        ))
                    )}
                </section>

            </div>

        </div>
    );
};

export default EcopointList;

interface Ecopoint {
    name: string;
    residue: {
      name: string;
    };
    cep: string;
    _id: string;
}
