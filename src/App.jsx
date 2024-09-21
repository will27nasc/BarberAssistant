import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

// context 
import { AuthProvider } from './context/AuthContext';

// hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './Hooks/useAuthentication';

// pages
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Agenda from './pages/Agenda/Agenda';
import Servicos from './pages/Servicos/Servicos';
import CreateClient from './pages/CreateClient/CreateClient';
import CreateService from './pages/CreateService/CreateService';

// componentes
import Navbar from './components/Navbar';
import Carregando from './components/Carregando/Carregando';

function App() {

  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

  }, [auth])

  if(loadingUser) {
    return <Carregando />;
  }

  return (
    <>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/agenda" />}></Route>
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/agenda" />}></Route>
              <Route path="/agenda" element={user ? <Agenda /> : <Navigate to="/login" />}></Route>
              <Route path="/servicos" element={user ? <Servicos /> : <Navigate to="/login" />}></Route>
              <Route path="/agenda/criar_cliente" element={user ? <CreateClient /> : <Navigate to="/login" />}></Route>
              <Route path="/servicos/criar_servico" element={user ? <CreateService /> : <Navigate to="/login" />}></Route>
            </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
