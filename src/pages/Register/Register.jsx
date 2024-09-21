import Style from './Register.module.css';

import { useState, useEffect} from 'react';

import { useAuthentication } from '../../Hooks/useAuthentication';

export default function Register() {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const { createUser, error: authError, loading } = useAuthentication();

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");

        const user = {
            displayName,
            email,
            password,
        }

        if(password !== confirmPassword) {
            setError("As senhas precisam ser iguais");
            return;
        }

        const res = await createUser(user)

    }

    useEffect(() => {

        if(authError) {
            setError(authError);
        }

    }, [authError]);

    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className={`border shadow-sm p-3 mb-5 bg-body-tertiary m-5 ${Style.box}`}>
                <h3>Cadastre-se</h3>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nome</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="name" 
                            value={displayName} 
                            onChange={(e) => setDisplayName(e.target.value)} 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Senha</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">confirma Senha</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="confirmPassword" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                        />
                    </div>
                    {!loading && <button type="submit" className="btn btn-primary">Registrar</button>}
                    {loading && (
                        <button type="submit" className="btn btn-primary" disable="true">
                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                            <span className="visually-hidden" role="status">Loading...</span>
                        </button>
                    )}
                    {error && <p className='mt-2 form-control is-invalid text-danger'>{ error }</p>}
                </form>
            </div>
        </div>
    )
}
