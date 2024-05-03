import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const EcopointList = () => {
    const [ecopoints, setEcopoints] = useState<any[]>([]);
    const [nameFilter, setNameFilter] = useState('');
    const [residueFilter, setResidueFilter] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/ecopoints')
            .then((response) => {
                setEcopoints(response.data);
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

    const clearResidueFilter = () => {
        setResidueFilter('');
    };

    return (
        <div>
            <h1>ECOPONTOS</h1>

            <section className="filter-section">
                <input
                    type="text"
                    value={residueFilter}
                    onChange={(e) => setResidueFilter(e.target.value)}
                    placeholder="Filtrar ecoponto por RESÍDUO..."
                    className="filter-input"
                />

                <button className="clear-filters-button" onClick={clearResidueFilter}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>

                <input
                    type="text"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    placeholder="Filtrar ecoponto por NOME..."
                    className="filter-input"
                />

                <button className="clear-filters-button" onClick={clearNameFilter}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </section>

            <div className="container">
                {filteredEcopoints.map((ecopoint) => (
                    <div className="card" key={ecopoint._id}>
                        <h2>{ecopoint.name}</h2>
                        <p>Resíduo: {ecopoint.residue.name}</p>
                        <p>CEP: {ecopoint.cep}</p>
                    </div>
                ))}
            </div>

            <div className="button-container">
                <button className="button" onClick={() => alert('link para cadastro')}>
                    Seja um ecoponto cadastrado!
                </button>
            </div>
        </div>
    );
};

export default EcopointList;
