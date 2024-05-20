import { useState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdAlternateEmail } from "react-icons/md";
import axios from "axios";
import styles from './style.module.css';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = ({ onNavigate }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/auth/login', {
                email,
                password
            })

            if(response.status === 200 || response.status === 201) {
                const token = response.data.token;
                localStorage.setItem('token', token);


                toast.success('Autenticação realizada com sucesso');

                onNavigate('EcopointsPreRegistered');
                
            }   

        } catch(err){
            const errorMessage = err.response.data.message;

            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                draggable: true,
                theme: 'dark',
                transition: Slide
            })
        }
    }

    const handleBack = () => {
        onNavigate('ECOPONTOS');
    }

    return (
        <>
            <ToastContainer />
            <div className={styles.container}>
                <div>
                    <form onSubmit={handleSubmit}>
                        <h1>Acesso ao sistema</h1>
                        <div className={styles.inputField}>
                            <input 
                                type="email"
                                placeholder="Digite seu e-mail"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <MdAlternateEmail className={`${styles.icon} ${styles.iconEmail}`}></MdAlternateEmail>
                        </div>
                        <div className={styles.inputField}>
                            <input 
                                type="password" 
                                placeholder="Digite sua senha"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <RiLockPasswordFill className={`${styles.icon} ${styles.iconPassword}`}></RiLockPasswordFill>
                        </div>

                        <div className={styles.groupButtons}>
                        
                            <button className={styles.btn}>Entrar</button>

                            <button onClick={handleBack} className={styles.btn}>Voltar</button>

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UserProfile