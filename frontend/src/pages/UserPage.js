import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getUser } from '../api/apiCall';
import ProfileCard from '../components/ProfileCard';
import { useApiProgress } from '../shared/ApiProgress'
import Spinner from '../components/Spinner';
import HoaxFeed from '../components/HoaxFeed';
const UserPage = () => {
    const [user, setUser] = useState({});
    const [notFound, setNotFound] = useState(false);
    const { username } = useParams();
    const { t } = useTranslation();
    const pendingApiCall = useApiProgress('get', '/api/1.0/users/' + username, true);

    useEffect(() => {
        setNotFound(false);
    }, [user]);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await getUser(username);
                setUser(response.data);
            } catch {
                setNotFound(true);
            }
        };
        loadUser();
    }, [username])

    if (notFound) {
        return (
            <div className="container text-center">
                <div class="alert alert-danger">
                    <div>
                        <i className="material-icons" style={{ fontSize: '48px' }}>error</i>
                    </div>
                    {t('User not found!')}
                </div>
            </div >
        );
    }

    if (pendingApiCall || user.username !== username) {
        return (
            <Spinner />
        )
    }
    return (
        <div className="container">
            <div className='row'>
                <div className='col mt-2'>
                    <ProfileCard user={user} />
                </div>
                <div className='col'>
                    <HoaxFeed username={username} />
                </div>
            </div>
        </div>
    );
}
export default UserPage;