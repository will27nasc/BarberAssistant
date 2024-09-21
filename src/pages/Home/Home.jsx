import Style from './Home.module.css';

export default function Home() {
    return (
        <div className={`container-fluid d-flex justify-content-center pt-5 ${Style.fundoHome}`}>
            <div className="text-center pt-5">
                <h1 className="display-5 fw-bold text-white">Organize sua barbearia</h1>
                <div className="col-lg-6 mx-auto">
                <p className="lead mb-4 text-white">Com o barber assistant, você consegue acompanhar seus clientes e gerenciar seus serviços de maneira fácil e segura.</p>
                </div>
            </div>
        </div>
    )
}
