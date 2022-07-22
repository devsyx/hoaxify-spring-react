import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { format } from 'timeago.js'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { deleteHoax } from '../api/apiCall';
import Modal from './Modal';
import { useApiProgress } from '../shared/ApiProgress';
const HoaxView = (props) => {
    const { hoax, t, onDeleteHoax } = props;
    const { content, user, timestamp, fileAttachmentVM, id } = hoax;
    const { username, displayName, image } = user;
    const { i18n } = useTranslation();
    const formattet = format(timestamp, i18n.language);
    const loggedInUser = useSelector((store) => store.username);
    const ownedByLoggedInUser = loggedInUser === username;
    const [modalVisible, setModalVisible] = useState(false);
    const deleteProgress = useApiProgress('delete', '/api/1.0/hoaxes/' + id)

    const onClickDelete = async () => {
        await deleteHoax(id);
        onDeleteHoax(id);
    }

    const onClickCancel = () => {
        setModalVisible(false);
    }
    return (
        <>
            <div className='card p-2 mb-1 mt-2'>
                <div className='d-flex'>
                    <ProfileImageWithDefault image={image} width="32" height="32" className="rounded-circle" />
                    <div className='d-flex justify-content-between flex-fill m-auto ps-2  '>
                        <Link to={`/user/${username}`} className='text-dark text-decoration-none'>
                            <h6 className='d-inline'>{displayName}@{username}</h6>
                            <span> - {formattet}</span>
                        </Link>
                        <div>
                            {ownedByLoggedInUser && (
                                <button className='btn btn-delete-link' onClick={() => setModalVisible(true)}>
                                    <i className='material-icons'>delete_outline</i>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                {content}
                {
                    fileAttachmentVM && (
                        <div>
                            {fileAttachmentVM.fileType.startsWith('image') &&
                                <img className='w-50 pt-1 img-center' src={'images/attachment/' + fileAttachmentVM.name} alt={content} />}
                            {
                                !fileAttachmentVM.fileType.startsWith('image') && <strong>{t('Hoax has unknown attachment')}</strong>
                            }
                        </div>)
                }
            </div >
            <Modal visible={modalVisible} onClickCancel={onClickCancel} onClickOk={onClickDelete} pendingApiCall={deleteProgress} t={t} okText={t('Delete Hoax')} message={t('Are you sure to delete hoax?')} headerText={t('Delete Hoax')} />
        </>
    );
};

export default HoaxView;