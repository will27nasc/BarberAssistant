import { NavLink } from 'react-router-dom';

import { useAuthentication } from '../Hooks/useAuthentication';

import { useAuthValue } from '../context/AuthContext';

export default function Navbar() {
    
    const { user } = useAuthValue();
    const { logout } = useAuthentication();

    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container">
                <NavLink to="/">
                    <img className="navbar-brand" src="logo.png" alt="logo" width="120px" />    
                </NavLink>

                <ul className="navbar-nav d-flex flex-row gap-3">
                    {!user && (
                        <>
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link">
                                    Home
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link">
                                    Entrar
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/register" className="nav-link">
                                    Registrar
                                </NavLink>
                            </li>
                        </>
                    )}

                    {user && (
                        <>
                            <li className="nav-item">
                                <NavLink to="/agenda" className="nav-link">
                                    Agenda
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/servicos" className="nav-link">
                                    Servicos
                                </NavLink>
                            </li>

                            <li className="nav-item" onClick={ logout }>
                                <button className="nav-link">Sair</button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    )
}
