import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
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
        <div>
            <h1>Ecopontos</h1>

            <div className="wrapper">

                <section className="filter-section">
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
                </section>

                <section className="ecopoints-section">
                    {filteredEcopoints.map((ecopoint) => (
                        <div className="card" key={ecopoint._id}>
                            <h2>{ecopoint.name}</h2>
                            <p>Resíduo: {ecopoint.residue.name}</p>
                            <p>CEP: {ecopoint.cep}</p>
                        </div>
                    ))}
                </section>

            </div>

        </div>
    );
};

interface Ecopoint {
    name: string;
    residue: {
      name: string;
    };
    cep: string;
    _id: string;
  }

export default EcopointList;
