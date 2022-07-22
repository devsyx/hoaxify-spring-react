import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getHoaxes, getNewHoaxCount, getNewHoaxes, getOldHoaxes } from '../api/apiCall';
import HoaxView from './HoaxView';
import { useApiProgress } from '../shared/ApiProgress'
import Spinner from './Spinner'
import { useParams } from 'react-router-dom';
const HoaxFeed = () => {
    const [hoaxPage, setHoaxPage] = useState({ content: [], last: true });
    const [newHoaxCount, setNewHoaxCount] = useState();
    const { t } = useTranslation();
    const { username } = useParams();

    const { content, last } = hoaxPage;
    let lastHoaxId = 0;
    let firstHoaxId = 0;

    if (content.length > 0) {
        firstHoaxId = content[0].id;
        lastHoaxId = content[content.length - 1].id;
    }

    const path = (username ? `/api/1.0/users/${username}/hoaxes` : `/api/1.0/hoaxes`);
    const initialHoaxLOadProgress = useApiProgress('get', path, true);
    const oldHoaxPath = (username ? `/api/1.0/users/${username}/hoaxes/${lastHoaxId}?size=2` : `/api/1.0/hoaxes/${lastHoaxId}?size=2`);
    const loadOldHoaxesProgress = useApiProgress('get', oldHoaxPath, true);
    const newHoaxPath = (username ? `/api/1.0/users/${username}/hoaxes/${firstHoaxId}?direction=after` : `/api/1.0/hoaxes/${firstHoaxId}?direction=after`)
    const loadNewHoaxesProgress = useApiProgress('get', newHoaxPath);
    useEffect(() => {
        const getCount = async () => {
            const response = await getNewHoaxCount(firstHoaxId, username);
            setNewHoaxCount(response.data.count);
        }
        let looper = setInterval(getCount, 3000);
        return () => {
            clearInterval(looper);
        }
    }, [firstHoaxId, username])

    useEffect((page) => {
        const loadHoaxes = async (page) => {
            try {
                const response = await getHoaxes(page, username);
                setHoaxPage((pre) => {
                    return {
                        ...response.data,
                        content: pre.content.concat(response.data.content)
                    }
                });
            }
            catch (err) { }
        };
        loadHoaxes(page);
    }, [username])

    const loadOldHoaxes = async () => {
        const response = await getOldHoaxes(lastHoaxId, username);
        setHoaxPage((pre) => {
            return {
                ...response.data,
                content: pre.content.concat(response.data.content)
            }
        });
    }

    const loadNewHoaxes = async () => {
        const response = await getNewHoaxes(firstHoaxId, username);
        setHoaxPage((pre) => {
            return {
                ...pre,
                content: response.data.concat(pre.content)
            }
        })
        setNewHoaxCount(0);
    }

    const onDeleteHoax = id => {
        setHoaxPage(pre => {
            return {
                ...pre,
                content: pre.content.filter(hoax => hoax.id !== id)
            }
        })
    }

    if (content.length === 0) {
        return <div className='alert alert-secondary text-center'>{initialHoaxLOadProgress ? <Spinner /> : t('There are no hoaxes')}</div>
    }
    return (
        <div>
            {newHoaxCount > 0
                && <div className='alert alert-secondary text-center mb-0' style={{ cursor: 'pointer' }} onClick={loadNewHoaxesProgress ? () => { } : loadNewHoaxes}> {loadNewHoaxesProgress ? <Spinner /> : t('There are new hoaxes')}</div>}
            {content.map((hoax) => {
                return <HoaxView hoax={hoax} key={hoax.id} t={t} onDeleteHoax={onDeleteHoax} />
            })}
            {!last
                && <div className='alert alert-secondary text-center mt-2' style={{ cursor: 'pointer' }} onClick={loadOldHoaxesProgress ? () => { } : loadOldHoaxes} >
                    {loadOldHoaxesProgress ? <Spinner /> : t('Load old hoaxes')} </div>}
        </div>
    )

};

export default HoaxFeed;