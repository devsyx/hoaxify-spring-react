import React, { useEffect, useRef, useState } from 'react';
import logo from '../assets/hoaxify.png'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'
import { logoutSuccess } from '../redux/authActions'
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useApiProgress } from '../shared/ApiProgress'
const TopBar = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { username, isLoggedIn, displayName, image } = useSelector((store) => {
        return {
            isLoggedIn: store.isLoggedIn,
            username: store.username,
            displayName: store.displayName,
            image: store.image
        }
    })
    const onLogoutSuccess = () => {
        dispatch(logoutSuccess());
    }
    const logoutProgress = useApiProgress('post', '/api/1.0/logout');

    const menuArea = useRef(null);
    const [menuVisible, setMenuVisible] = useState(false);
    useEffect(() => {
        document.addEventListener('click', menuClickTracker);
        return () => {
            document.removeEventListener('click', menuClickTracker);
        }
    }, [isLoggedIn])
    const menuClickTracker = (e) => {
        if (menuArea.current === null || !menuArea.current.contains(e.target))
            setMenuVisible(false);
    }

    let links = (
        <ul className='navbar-nav ms-auto me-3 '>
            <li>
                <Link className="nav-link" to="/login">{t('Login')} </Link>
            </li>
            <li>
                <Link className='nav-link' to="/signup">{t('Sign Up')} </Link>
            </li>
        </ul>
    );
    if (isLoggedIn) {
        let dropdownClass = 'dropdown-menu p-0 shadow'
        if (menuVisible) {
            dropdownClass += ' show'
        }
        links = (
            <ul className='navbar-nav ms-auto me-3' ref={menuArea}>
                <li className='nav-item dropdown'>
                    <div className='d-flex' style={{ cursor: 'pointer' }} onClick={() => {
                        if (menuVisible) setMenuVisible(false)
                        else setMenuVisible(true)
                    }}>
                        <ProfileImageWithDefault image={image} width='32' height='32' className='rounded-circle m-auto' />
                        <span className='nav-link dropdown-toggle'>{displayName}</span>
                    </div>
                    <div className={dropdownClass}>
                        < Link className='nav-link dropdown-item d-flex' to={'/user/' + username} onClick={() => setMenuVisible(false)}>
                            <i className='material-icons text-warning me-1'>person</i>
                            {t('Account')}
                        </Link>
                        <button className='nav-link dropdown-item d-flex' onClick={onLogoutSuccess} style={{ cursor: 'pointer' }} disabled={logoutProgress}>
                            <i className='material-icons text-danger me-1'>power_settings_new</i>
                            {t('Logout')}
                        </button>
                    </div>
                </li>


            </ul>
        );
    }
    return (
        <div className="shadow-sm mb-3 bg-light">
            <nav className="navbar navbar-light navbar-expand">
                <Link className='navbar-brand ms-3' to="/">
                    <img src={logo} width="55" alt='Hoaxify Logo' />
                    Hoaxify
                </Link >
                {links}
            </nav>
        </ div >
    );

}
export default TopBar;
