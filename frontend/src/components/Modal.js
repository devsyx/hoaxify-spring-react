import React from 'react';
import { ButtonWithProgress } from './ButtonWithProgress'
const Modal = (props) => {
    const { visible, t, onClickCancel, onClickOk, pendingApiCall, headerText, okText, message } = props;
    let className = visible ? 'modal fade show d-block' : 'modal fade'
    return (
        <div className={className} style={{ backgroundColor: '#000000b0' }} >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{headerText}</h5>
                    </div>
                    <div className="modal-body">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClickCancel}>{t('Cancel')}</button>
                        <ButtonWithProgress className="btn btn-danger" onClick={onClickOk} text={okText} disabled={pendingApiCall} pendingApiCall={pendingApiCall} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;