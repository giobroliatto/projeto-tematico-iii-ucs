import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import s from './style.module.css';

const ResiduesForm = () => {
    const [residues, setResidues] = useState([]);

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

    return (
        <div className={s.content}>
            <h1 className={s.title1}>Manutenção de Resíduos</h1>
            <div className={s.wrapper_all}>
                <div className={s.wrapper}>
                    <h2 className={s.title2}>Resíduos</h2>
                    <section className={s.residues_list}>
                        {residues.map((residue, index) => (
                            <div key={index} className={s.residue}>
                                <label>{residue.name}</label>
                                <div className={s.icon_wrapper}>
                                    <FontAwesomeIcon icon={faPen} className={s.icon_edit} />
                                    <FontAwesomeIcon icon={faTrash} className={s.icon_remove} />
                                </div>
                            </div>
                        ))}
                    </section>
                    <h2 className={s.title2}>Cadastrar resíduo</h2>
                    <section className={s.create_residue_section}>
                       
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ResiduesForm;
