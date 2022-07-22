import React, { useState } from 'react';
import { Input } from '../components/input';
import { useTranslation } from 'react-i18next';
import { ButtonWithProgress } from '../components/ButtonWithProgress'
import { useApiProgress } from '../shared/ApiProgress';
import { useDispatch } from 'react-redux';
import { signupHandler } from "../redux/authActions";
const UserSignupPage = (props) => {
    const [form, setForm] = useState({
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
    });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const onChange = (e) => {
        const { name, value } = e.target;

        setErrors((previousErrors) => {
            return {
                ...previousErrors,
                [name]: undefined
            }
        });
        setForm((previousForm) => {
            return {
                ...previousForm,
                [name]: value
            }
        });
    }
    const onClick = async e => {
        const { username, displayName, password } = form;
        const body = { username, displayName, password };
        const { history } = props;
        const { push } = history;
        try {
            await dispatch(signupHandler(body));
            push('/');
        }
        catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors);
            }
        }
        e.preventDefault();
    }
    const { username: usernameError, displayName: displayNameError, password: passwordError } = errors;
    const pendingApiCallSignup = useApiProgress('post', '/api/1.0/users');
    const pendingApiCallLogin = useApiProgress('post', '/api/1.0/auth');
    const pendingApiCall = pendingApiCallLogin || pendingApiCallSignup;

    const { t } = useTranslation();
    let passwordRepeatError;
    if (form.password !== form.passwordRepeat) {
        passwordRepeatError = t('password dissmatch');
    }
    return (
        <div className="container">
            <form>
                <h1 className='text-center'>{t('User Signup Page')}</h1>

                <Input label={t('Username')} name="username" error={usernameError} onChange={onChange} />

                <Input label={t('Display name')} name="displayName" error={displayNameError} onChange={onChange} />

                <Input label={t('Password')} name="password" error={passwordError} onChange={onChange} type="password" />

                <Input label={t('Password repeat')} name="passwordRepeat" error={passwordRepeatError} onChange={onChange} type="password" />

                <div className='text-center mt-3'>
                    <ButtonWithProgress
                        onClick={onClick}
                        disabled={pendingApiCall || passwordRepeatError !== undefined}
                        pendingApiCall={pendingApiCall}
                        text={t('Sign Up')} />
                </div>
            </form>
        </div>
    )
}
export default UserSignupPage;