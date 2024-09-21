import Style from './Agenda.module.css';

import { Link } from 'react-router-dom';
import moment from 'moment-timezone';

// hooks
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from '../../Hooks/useFetchDocuments';
import { useDeleteDocument } from '../../Hooks/useDeleteDocument';

export default function Agenda() {
    const { user } = useAuthValue();
    const uid = user.uid;

    // serviços cadastrados pelo usuário
    const { documents: clients, loading } = useFetchDocuments("clients", uid);

    // apagar serviço
    const { deleteDocument } = useDeleteDocument("clients");

    return (
        <div className="container">
            <div className="d-flex justify-content-end w-100 border-bottom">
                <Link to="/agenda/criar_cliente">
                    <button type="button" className="btn btn-success my-3 me-5">+ Cliente</button>
                </Link>
            </div>

            {loading && <p>Loading...</p>}
            {clients && clients.length === 0 ? (
                <h1>Nenhum cliente registrado</h1>
            ) : (
                <>
                    <h1 className="mb-5">Agenda</h1>

                    {clients && clients.map((client) => (
                        <div className={ `mx-auto d-flex gap-5 justify-content-between shadow-sm p-4 mb-3 bg-body-tertiary rounded ${Style.boxServices}` } key={ client.id }>
                            <div className="d-flex flex-fill justify-content-between">
                                <div className="d-flex align-items-center gap-2">
                                    <i className="bi bi-alarm-fill"></i>
                                    <span>{ moment(client.createdAt.seconds*1000).format('HH:mm:ss') }</span>
                                </div>

                                <div className="d-flex align-items-center gap-2">
                                    <i className="bi bi-person-circle"></i>
                                    <span>{ client.name }</span>
                                </div>

                                <div className="d-flex align-items-center gap-2">
                                    <i className="bi bi-bookmark-dash-fill"></i>
                                    <span>{ client.servi.title }</span>
                                </div>
                                
                                <div className="d-flex align-items-center gap-2">
                                    <i className="bi bi-cash-coin"></i>
                                    <span>R$ { client.servi.price }</span>
                                </div>
                            </div>

                            <div className="d-flex">
                                <button onClick={() => deleteDocument(client.id)} type="button" className="btn btn-primary">Concluido</button>
                            </div>
                        </div>
                    ))}
                </>
                
            )}
        </div>
    )
}
