import { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import { getTokenData, isAuthenticated } from '../../util/auth';
import history from '../../util/history';
import { removeAuthData } from '../../util/storage';
import './styles.css';

const Navbar = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace('/');
  };

  return (
    <nav className="navbar-container">
      <NavLink to="/">
        <h1>MovieFlix</h1>
      </NavLink>

      {authContextData.authenticated && (
        <>
          <span>{authContextData.tokenData?.user_name}</span>
          <button onClick={handleLogoutClick}>SAIR</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
