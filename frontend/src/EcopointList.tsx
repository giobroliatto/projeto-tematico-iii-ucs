import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const EcopointList = () => {
    const [ecopoints, setEcopoints] = useState<any[]>([]); 

    useEffect(() => {
        axios.get('http://localhost:3001/ecopoints') 
            .then(response => {
                setEcopoints(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error); 
            });
    }, []);

    return (
        <div>
            <h1>Lista de Ecopontos</h1>
            <div className="container"> 
                {ecopoints.map(ecopoint => (
                    <div className="card" key={ecopoint._id}>
                        <h2>{ecopoint.name}</h2>
                        <p>CEP: {ecopoint.cep}</p>
                        <p>Resíduo: {ecopoint.residue.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EcopointList;
