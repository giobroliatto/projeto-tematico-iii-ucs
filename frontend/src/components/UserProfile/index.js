import { useEffect, useState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdAlternateEmail } from "react-icons/md";
import axios from "axios";
import styles from './style.module.css';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Utils from "../Utils/utils";
import { useLocation } from 'react-router-dom';

const UserProfile = () => {
    const navigate = useNavigate();

    const location = useLocation();

    const isLogout = location.state?.logout; 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState("");

    useEffect(() => {
        const checkAdminRole = () => {
            const token = sessionStorage.getItem('token');
            const role = Utils.getRoleFromToken(token);

            if(role === 'admin'){
                setIsAuthenticated("ADMIN");
            } else if(role === 'ecopointer') {
                setIsAuthenticated("ECOPOINTER");
            } else {

                if(isLogout){
                    toast.success('Logout realizado com sucesso!', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        theme: "colored",
                    });
                }

                setIsAuthenticated("");

            }
        };
        checkAdminRole();
    }, [isLogout]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/auth/login', {
                email,
                password
            });

            if (response.status === 200 || response.status === 201) {
                const token = response.data.token;

                /* GUARDAR O TOKEN NO SESSION STORAGE */
                sessionStorage.setItem('token', token);

                const role = Utils.getRoleFromToken(token);
                if(role === 'admin'){
                    setIsAuthenticated("ADMIN");
                } else if(role === 'ecopointer') {
                    setIsAuthenticated("ECOPOINTER");
                }
            }

        } catch (err) {
            const errorMessage = err.response.data.message;

            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                draggable: true,
                theme: 'dark',
                transition: Slide
            });
        }
    };

    const handleBack = () => {
        navigate('/ecopoints');
    };

    const handleEditEcopoint = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/ecopoints/email/${email}`);
            if (response.status === 200) {
                const ecopointId = response.data[0]._id;
                navigate(`/edit-ecopoint/${ecopointId}`);
            }
        } catch (err) {
            toast.error('Erro ao buscar ecoponto pelo email.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                draggable: true,
                theme: 'dark',
                transition: Slide
            });
        }
    };

    return (
        <>
            <ToastContainer />
            {isAuthenticated === "" && (
                <div className={styles.container}>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <h1 className={styles.title1}>Acesso ao sistema</h1>
                            <div className={styles.inputField}>
                                <input 
                                    type="email"
                                    placeholder="Digite seu e-mail"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <MdAlternateEmail className={`${styles.icon} ${styles.iconEmail}`} />
                            </div>
                            <div className={styles.inputField}>
                                <input 
                                    type="password" 
                                    placeholder="Digite sua senha"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <RiLockPasswordFill className={`${styles.icon} ${styles.iconPassword}`} />
                            </div>
                            <div className={styles.groupButtons}>
                                <button className={styles.btn} type="submit">Entrar</button>
                                <button onClick={handleBack} className={styles.btn}>Voltar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {isAuthenticated === 'ADMIN' &&  (
                <div className={styles.containerAuth}>
                    <h1 className={styles.titleAuth}>Bem-vindo administrador</h1>
                    <div className={styles.cardContainer}>
                        <div className={styles.card} onClick={() => navigate('/residues-form')}>
                            <h2>Manutenção de resíduos</h2>
                        </div>
                        <div className={styles.card} onClick={() => navigate('/ecopoints-pre-registered')}>
                            <h2>Ecopontos pré-cadastrados</h2>
                        </div>
                    </div>
                </div>
            )}
            {isAuthenticated === 'ECOPOINTER' && (
                <div className={styles.containerAuth}>
                    <h1 className={styles.titleAuth}>Bem-vindo</h1>
                    <div className={styles.cardContainer}>
                        <div className={styles.card} onClick={handleEditEcopoint}>
                            <h2>Editar meu Ecoponto</h2>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserProfile;
