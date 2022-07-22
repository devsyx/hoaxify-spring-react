import React, { useEffect, useState } from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useTranslation } from 'react-i18next';
import { Input } from '../components/input'
import { updateUser, deleteUser } from '../api/apiCall';
import { useApiProgress } from '../shared/ApiProgress'
import { ButtonWithProgress } from './ButtonWithProgress'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { logoutSuccess, updateSuccess } from '../redux/authActions'
import Modal from './Modal'

const ProfileCard = (props) => {
    const { t } = useTranslation();
    const [user, setUser] = useState(props.user);
    const [inEditMode, setInEditMode] = useState(false);
    const [updatedDisplayName, setUpdatedDisplayName] = useState();
    const [editable, setEditable] = useState(false);
    const [newImage, setNewImage] = useState();
    const [validationErrors, setValidationErrors] = useState({});
    const [modalVisible, setModalVisible] = useState(false);

    const { username: loggedInUsername } = useSelector(store => {
        return { username: store.username }
    })

    const routeParams = useParams();

    const { username, displayName, image } = user;

    const dispatch = useDispatch();
    const history = useHistory();

    const onChange = (e) => {
        setUpdatedDisplayName(e.target.value);
    }
    const onChangeFile = (e) => {
        if (e.target.files.length < 1) {
            return;
        }
        const file = e.target.files[0]
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }
    useEffect(() => {
        if (!inEditMode) {
            setUpdatedDisplayName(undefined);
            setNewImage(undefined);
        } else {
            setUpdatedDisplayName(displayName);
        }
    }, [inEditMode, displayName])

    useEffect(() => {
        setEditable(routeParams.username === loggedInUsername);
    }, [routeParams.username, loggedInUsername])

    useEffect(() => {
        setValidationErrors((pre) => {
            return {
                ...pre,
                displayName: undefined
            }
        })
    }, [updatedDisplayName])
    useEffect(() => {
        setValidationErrors((pre) => {
            return {
                ...pre,
                image: undefined
            }
        })
    }, [newImage])
    const saveClick = async () => {
        let image;
        if (newImage) {
            image = newImage.split(',')[1];
        }
        const body = {
            displayName: updatedDisplayName,
            image: image
        }
        try {
            const response = await updateUser(user.username, body);
            setUser(response.data);
            setInEditMode(false);
            dispatch(updateSuccess(response.data));
        } catch (err) {
            setValidationErrors(err.response.data.validationErrors);
        }
    }
    const onClickDeleteUser = async () => {
        await deleteUser(username);
        setModalVisible(false);
        dispatch(logoutSuccess());
        history.push('/');
    }

    const onClickCancel = () => {
        setModalVisible(false);
    }

    const pendingApiCall = useApiProgress('put', '/api/1.0/users/' + username);
    const deleteProgress = useApiProgress('delete', '/api/1.0/users/' + username);
    const { displayName: displayNameErrors, image: imageError } = validationErrors;
    return (
        <>
            < div className='card text-center' >
                <div className='card-header'>
                    <ProfileImageWithDefault image={image} tempimage={newImage} className='rounded-circle shadow' width='150' />
                </div>
                <div className='card-body'>
                    {!inEditMode && (
                        <>
                            <h3>{displayName}@{username}</h3>
                            {editable && <button className='btn btn-success d-inline-flex' onClick={() => { setInEditMode(true) }}>
                                <i className="material-icons me-1">edit</i>
                                {t('Edit')}
                            </button>}

                            {editable && <button className='btn btn-danger d-inline-flex ms-1' onClick={() => { setModalVisible(true) }}>
                                <i className="material-icons me-1">directions_run</i>
                                {t('Delete')}
                            </button>}

                        </>
                    )}
                    {inEditMode && (
                        <>
                            <Input label={t('Change Display Name')} onChange={onChange} defaultValue={displayName} error={displayNameErrors} />
                            <Input type={'file'} onChange={onChangeFile} error={imageError} className='mt-2' style={{ 'textAlignLast': 'center' }} />
                            <div className='p-2'>
                                <ButtonWithProgress style={{ 'width': '80px' }} onClick={saveClick} disabled={pendingApiCall} pendingApiCall={pendingApiCall} text={t('Save')} />
                                <button className='btn btn-dark ms-1' style={{ 'width': '80px' }} onClick={() => { setInEditMode(false) }} disabled={pendingApiCall}>{t('Cancel')} </button>
                            </div>
                        </>
                    )}
                </div>
            </div >
            <Modal visible={modalVisible} onClickCancel={onClickCancel} onClickOk={onClickDeleteUser} t={t} okText={t('Delete Account')} message={t('Are you sure to delete your account?')} headerText={t('Delete Account')} pendingApiCall={deleteProgress} />
        </>
    );
}
export default ProfileCard;