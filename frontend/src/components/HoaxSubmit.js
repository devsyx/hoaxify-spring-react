import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { postHoax, postHoaxAttachment } from '../api/apiCall'
import { useApiProgress } from '../shared/ApiProgress';
import { ButtonWithProgress } from './ButtonWithProgress';
import { Input } from '../components/input'
import AutoUploadImage from './AutoUploadImage';
const HoaxSubmit = () => {
    const { image } = useSelector((store) => {
        return {
            image: store.image
        }
    })
    const [focused, setFocused] = useState(false);
    const [hoax, setHoax] = useState('');
    const [errors, setErrors] = useState({});
    const [newImage, setNewImage] = useState();
    const [attachmentId, setAttachmentId] = useState();
    const { t } = useTranslation();

    useEffect(() => {
        if (!focused) {
            setHoax('');
            setErrors({});
            setNewImage();
            setAttachmentId();
        }
    }, [focused])

    useEffect(() => {
        setErrors({});
    }, [hoax])

    const onClickHoaxify = async () => {
        const body = {
            content: hoax,
            attachmentId: attachmentId
        }
        try {
            await postHoax(body);
            setFocused(false);
        }
        catch (err) {
            if (err.response.data.validationErrors) {
                setErrors(err.response.data.validationErrors);
            }
        }
    }

    const onChangeFile = (e) => {
        if (e.target.files.length < 1) {
            return;
        }
        const file = e.target.files[0]
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
            uploadFile(file);
        }
        fileReader.readAsDataURL(file);
    }

    const uploadFile = async (file) => {
        const attachment = new FormData();
        attachment.append("file", file);
        const response = await postHoaxAttachment(attachment);
        setAttachmentId(response.data.id);
    }
    const pendingApiCall = useApiProgress('post', '/api/1.0/hoaxes');
    const uploadedImageProgress = useApiProgress('post', '/api/1.0/hoax-attachment');

    let textAreaClass = 'form-control';
    if (errors.content) {
        textAreaClass += ' is-invalid'
    }
    return (
        <>
            <div className='card p-1 flex-row'>
                <ProfileImageWithDefault image={image} width='32' height='32' className='rounded-circle me-1 mt-1' />
                <div className='flex-fill'>
                    <textarea className={textAreaClass} rows={focused ? "3" : "1"} onFocus={() => setFocused(true)} onChange={(e) => setHoax(e.target.value)} value={hoax} />
                    <div className="invalid-feedback">{errors.contentx} </div>
                    {focused && <>
                        {newImage && newImage.split(':')[1].split('/')[0] === 'image' && <AutoUploadImage image={newImage} uploading={uploadedImageProgress} />}

                        <div className='d-flex mt-2 mb-1'>
                            <Input type="file" onChange={onChangeFile} style={{}} />
                            <div className='text-end flex-fill'>
                                <ButtonWithProgress className='btn btn-primary btn-sm me-1' onClick={onClickHoaxify} text='Hoaxify' disabled={pendingApiCall || uploadedImageProgress} pendingApiCall={pendingApiCall} />
                                <ButtonWithProgress className='btn btn-dark btn-sm' onClick={() => setFocused(false)} text={t('Cancel')} disabled={pendingApiCall || uploadedImageProgress} pendingApiCall={pendingApiCall} />
                            </div>
                        </div> </>}
                </div>
            </div>
        </>
    );
};

export default HoaxSubmit;