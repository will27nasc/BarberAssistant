import Style from './Login.module.css';

import { useState, useEffect} from 'react';

import { useAuthentication } from '../../Hooks/useAuthentication';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login, error: authError, loading } = useAuthentication();

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");

        const user = {
            email,
            password,
        }

        const res = await login(user)

    }

    useEffect(() => {

        if(authError) {
            setError(authError);
        }

    }, [authError]);

    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className={`border shadow-sm p-3 mb-5 bg-body-tertiary m-5 ${Style.box}`}>
                <h3>Login</h3>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            aria-describedby="emailHelp" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Senha</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}  
                        />
                    </div>
                    {!loading && <button type="submit" className="btn btn-primary">Entrar</button>}
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
