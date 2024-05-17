import { useEffect, useState } from 'react';
import axios from 'axios';
import s from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const EcopointsList = () => {
    const [ecopoints, setEcopoints] = useState([]);
    const [selectedResidues, setSelectedResidues] = useState([]);
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

    const toggleResidue = (residue) => {
        const isSelected = selectedResidues.includes(residue);
        if (isSelected) {
            setSelectedResidues(selectedResidues.filter(selected => selected !== residue));
        } else {
            setSelectedResidues([...selectedResidues, residue]);
        }
    };

    const filteredEcopoints = ecopoints.filter(
        (ecopoint) =>
            selectedResidues.every(residue => ecopoint.residues.some(ecopointResidue => ecopointResidue.name === residue))
    );

    const openGoogleMaps = (companyStreet, companyNumber, companyDistrict, companyCity) => {
        const street = companyStreet || '';
        const number = companyNumber || '';
        const district = companyDistrict || '';
        const city = companyCity || '';

        const address = `${street} ${number} ${district} ${city}`;

        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        window.open(mapsUrl);
    };

    return (
        <div className={s.content}>
            <h1 className={s.title1}>Ecopontos</h1>
            <div className={s.wrapper_all}>
                <div className={s.wrapper}>
                    <h2 className={s.title2}>Tipos de resíduos</h2>
                    <section className={s.filter_section}>
                        <div className={s.tags}>
                            {residueTypes.map((type) => (
                                <div
                                    key={type}
                                    onClick={() => toggleResidue(type)}
                                    className={`${s.tag} ${selectedResidues.includes(type) ? s.tag_selected : ''}`}
                                >
                                    {type}
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className={s.ecopoints_section}>
                        {filteredEcopoints.length === 0 ? (
                            <div className={s.no_ecopoints}>
                                Nenhum ecoponto encontrado
                            </div>
                        ) : (
                            filteredEcopoints.map((ecopoint) => (
                                <div className={s.card} key={ecopoint._id}>
                                    <h3 className={s.title3}>{ecopoint.companyName}</h3>
                                    <div className={s.residue_tags}>
                                        {ecopoint.residues.map((residue, index) => (
                                            <div key={index} className={s.residue_tag}>
                                                {residue.name}
                                            </div>
                                        ))}
                                    </div>
                                    <div className={s.address_wrapper}>
                                        <div className={s.address}>
                                            {ecopoint.companyStreet}, {ecopoint.companyNumber}{ecopoint.companyComplement && `/${ecopoint.companyComplement}`}, {ecopoint.companyDistrict}
                                        </div>
                                        <button 
                                            className={s.location_dot_button}
                                            onClick={() => openGoogleMaps(ecopoint.companyStreet, ecopoint.companyNumber, ecopoint.companyDistrict, ecopoint.companyCity)}>
                                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                                        </button>
                                    </div>
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
