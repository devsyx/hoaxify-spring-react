import React, { useEffect, useState } from "react";
import { Input } from "../components/input"
import { useTranslation } from "react-i18next";
import { ButtonWithProgress } from "../components/ButtonWithProgress"
import { useApiProgress } from '../shared/ApiProgress';
import { useDispatch } from "react-redux";
import { loginHandler } from "../redux/authActions";
const LoginPage = (props) => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        setError(undefined);
    }, [username, password])

    const onClick = async (e) => {
        e.preventDefault();

        const creds = { username, password }
        const { history } = props;
        const { push } = history;
        setError(undefined);
        try {
            await dispatch(loginHandler(creds));
            push('/');
        } catch (apiError) {
            setError(apiError.response.data.message);
        }
    }
    const pendingApiCall = useApiProgress('post', '/api/1.0/auth');
    const { t } = useTranslation();
    const buttonEnabled = username && password;
    return (
        <div className="container">
            <form>
                <h1 className="text-center">{t('Login Page')}</h1>

                <Input label={t('Username')} name='username' onChange={(e) => setUsername(e.target.value)} />

                <Input label={t('Password')} name='password' type='password' onChange={(e) => setPassword(e.target.value)} />

                {error && <div className="alert alert-danger mt-3">
                    {error}
                </div>}

                <div className="text-center mt-3">
                    <ButtonWithProgress
                        onClick={onClick}
                        disabled={!buttonEnabled || pendingApiCall}
                        pendingApiCall={pendingApiCall}
                        text={t('Login')} />
                </div>
            </form >
        </div >
    )
}
export default LoginPage;