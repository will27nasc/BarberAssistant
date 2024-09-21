import Style from './Servicos.module.css';

import { Link } from 'react-router-dom';

// hooks
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from '../../Hooks/useFetchDocuments';
import { useDeleteDocument } from '../../Hooks/useDeleteDocument';

export default function Servicos() {
    const { user } = useAuthValue();
    const uid = user.uid;

    // serviços cadastrados pelo usuário
    const { documents: services, loading } = useFetchDocuments("services", uid);

    // apagar serviço
    const { deleteDocument } = useDeleteDocument("services");

    return (
        <div className="container">
            
            <div className="d-flex justify-content-end w-100 border-bottom">
                <Link to="/servicos/criar_servico">
                    <button type="button" className="btn btn-success my-3 me-5">+ Add serviço</button>
                </Link>
            </div>

            {loading && <p>Loading...</p>}
            {services && services.length === 0 ? (
                <h1>Nenhum serviço registrado</h1>
            ) : (
                <>
                    <h1 className="mb-5">Serviços</h1>

                    {services && services.map((service) => (
                        <div className={ `mx-auto d-flex gap-5 justify-content-between shadow-sm p-4 mb-3 bg-body-tertiary rounded ${Style.boxServices}` } key={ service.id }>
                            <div className="d-flex flex-fill justify-content-between">
                                <div className="d-flex align-items-center gap-2">
                                    <i className="bi bi-bookmark-dash-fill"></i>
                                    <span className="">{ service.service }</span>
                                </div>
                                
                                <div className="d-flex align-items-center gap-2">
                                    <i className="bi bi-cash-coin"></i>
                                    <span>R$ { service.price }</span>
                                </div>
                            </div>

                            <div className="d-flex">
                                <button onClick={() => deleteDocument(service.id)} type="button" className="btn btn-danger">Apagar</button>
                            </div>
                        </div>
                    ))}
                </>
                
            )}

        </div>
    )
}
