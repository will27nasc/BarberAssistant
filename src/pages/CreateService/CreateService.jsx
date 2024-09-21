import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../Hooks/useInsertDocument';

export default function CreateService() {
    const [service, setService] = useState('');
    const [price, setPrice] = useState('');
    const [formError, setFormError] = useState('');

    const { user } = useAuthValue();

    const { insertDocument, response } = useInsertDocument('services');

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setFormError('');

        // checar todos os valores
        if(!service || !price) {
            setFormError("Por favor, preencha todos os campos");
        } 

        if(formError) return;

        insertDocument({
            service,
            price: Number(price),
            uid: user.uid,
        });

        // redirect to homepage
        navigate('/servicos');
    }

    return (
        <div className="container">
            <div className="d-flex gap-3 my-3 me-5 ">
                <Link to="/servicos">
                    <button type="button" className="btn btn-dark">Voltar</button>
                </Link>
                <h1>Cadastre serviços</h1>
            </div>

            <div className="card" id="perguntas">
                <div className="card-header">
                    <h3>Cadastrar serviço</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={ handleSubmit }>
                        <input 
                            type="text" 
                            placeholder="Título serviço" 
                            className="form-control my-4" 
                            name="servico" 
                            onChange={(e) => setService(e.target.value)}
                            value={service}
                        />

                        <input 
                            type="text" 
                            placeholder="Preço exemplo: 55.00" 
                            className="form-control my-4" 
                            name="price"
                            onChange={(e) => parseFloat(setPrice(e.target.value))} 
                            value={price}
                        />
                        
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

