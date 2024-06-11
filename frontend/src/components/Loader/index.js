import style from "./style.module.css";
    function Loader() {
        return (
            <div className={style.container}>
                <div className={style.loader}></div>
            </div>
        );
    }

export default Loader;