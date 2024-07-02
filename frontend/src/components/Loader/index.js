import style from "./style.module.css";

function Loader() {
    console.log('oi')
    return (
        <div className={style.overlay}>
            <div className={style.loader}></div>
        </div>
    );
}

export default Loader;