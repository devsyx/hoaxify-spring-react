import React from 'react';
import './AutoUploadImage.css'
const AutoUploadImage = (props) => {
    const { image, uploading } = props;
    return (
        <div style={{ position: 'relative' }} className='w-25'>
            <img src={image} alt="hoax-attachment" className='img-thumbnail pt-1' />
            <div className='overlay' style={{ opacity: uploading ? '1' : 0 }}>
                <div className='d-flex justify-content-center h-100'>
                    <div className="spinner-border m-auto text-light">
                        <span className="sr-only"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AutoUploadImage;