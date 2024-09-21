import Style from './Carregando.module.css';

export default function Carregando() {
    return (
        <div className={`${Style.carregandoBody} bg-light`}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden"></span>
            </div>
            <h1>Carregando...</h1>
        </div>
    )
}
