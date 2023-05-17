import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../AuthContext';
import { getTokenData } from '../../../util/auth';
import { requestBackendLogin } from '../../../util/requests';
import { saveAuthData } from '../../../util/storage';
import './styles.css';

type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const { setAuthContextData } = useContext(AuthContext);

  const [hasError, sethasError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const history = useHistory();

  const onSubmit = (formData: FormData) => {
    requestBackendLogin(formData)
      .then((response) => {
        saveAuthData(response.data);
        sethasError(false);
        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData(),
        });
        history.push('/movies');
      })
      .catch((error) => {
        sethasError(true);
        console.log('ERRO', error);
      });
  };

  return (
    <div className="login-container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="form-content">
        {hasError && (
          <div className="alert alert-danger error-alert-container">
            Ocorreu um erro de preenchimento
          </div>
        )}

        <div className="input-container">
          <input
            {...register('username', {
              required: 'Campo Obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email Inválido',
              },
            })}
            type="text"
            className={`${errors.username ? 'form-control is-invalid' : ''}`}
            placeholder="Email"
            name="username"
          />

          <div className="invalid-container">{errors.username?.message}</div>
        </div>

        <div className="input-container">
          <input
            {...register('password', {
              required: 'Campo Obrigatório',
            })}
            type="password"
            className={`${errors.password ? 'form-control is-invalid' : ''}`}
            placeholder="Senha"
            name="password"
          />

          <div className="invalid-container">{errors.password?.message}</div>
        </div>

        <button type="submit">Fazer Login</button>
      </form>
    </div>
  );
};

export default Login;
