import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocuments } from '../../Hooks/useFetchDocuments';
import { useInsertDocument } from '../../Hooks/useInsertDocument';

export default function CreateClient() {
    const [name, setName] = useState('');
    const [service, setService] = useState(0);
    const [formError, setFormError] = useState('');

    const { user } = useAuthValue();
    const uid = user.uid;

    // inserir dados no documento clients
    const { insertDocument, response } = useInsertDocument('clients');

    // listar serviços no select option
    const { documents: services } = useFetchDocuments("services", uid);

    const navigate = useNavigate();

    function handleChange(e) {
        setService(e)
    }

    function handleSubmit(e) {
        e.preventDefault();
        setFormError('');

        // checar todos os valores
        if(!name || !service) {
            setFormError("Por favor, preencha todos os campos");
        } 

        if(formError) return;

        insertDocument({
            name,
            servi: {
                title: services[service].service,
                price: services[service].price,
            },
            uid: user.uid,
        });

        // redirect to homepage
        navigate('/agenda');
        
    }
    return (
        <div className="container">
            <div className="d-flex gap-3 my-3 me-5 ">
                <Link to="/servicos">
                    <button type="button" className="btn btn-dark">Voltar</button>
                </Link>
                <h1>Cadastre clientes</h1>
            </div>

            <div className="card" id="perguntas">
                <div className="card-header">
                    <h3>Cadastrar clientes</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={ handleSubmit }>
                        <input 
                            type="text" 
                            placeholder="Nome" 
                            className="form-control my-4" 
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />

                        <br />
                        <label className="my-2">Serviço</label>
                        <select 
                            name="category" 
                            className="form-select form-select mb-3" 
                            onChange={(e) => handleChange(e.target.value)}
                            value={ service }
                        >
                            <option value="" disabled={true}>Escolha o serviço</option>
                            {services && services.map((option, index) => (
                                <option key={ index } value={ index }>{ option.service }</option>
                            ))}
                        </select>
                        <br />
                        {!response.loading && <button type="submit" className="btn btn-secondary">Cadastrar</button>}
                        {response.loading && (
                            <button type="submit" className="btn btn-secondary" disable="true">
                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                <span className="visually-hidden" role="status">Loading...</span>
                            </button>
                        )}
                        {response.error && <p className='mt-2 form-control is-invalid text-danger'>{ response.error }</p>}
                        {formError && <p className='mt-2 form-control is-invalid text-danger'>{ formError }</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

