import React from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from "../api/apiCall"

const LanguageSelectors = props => {
    const { i18n } = useTranslation();

    const onChangeLanguage = language => {
        i18n.changeLanguage(language);
        changeLanguage(language);
    }
    return (
        <div className="container mt-2">
            <img
                src="https://flagcdn.com/24x18/tr.png"
                srcSet="https://flagcdn.com/48x36/tr.png 2x, https://flagcdn.com/72x54/tr.png 3x"
                width="28"
                height="21"
                alt="Turkey" style={{ cursor: 'pointer' }} onClick={() => onChangeLanguage('tr')}></img>

            <img
                src="https://flagcdn.com/24x18/us.png"
                srcSet="https://flagcdn.com/48x36/us.png 2x, https://flagcdn.com/72x54/us.png 3x"
                width="28"
                height="21"
                alt="United States" style={{ cursor: 'pointer' }} className='m-1' onClick={() => onChangeLanguage('en')}></img>
        </div>
    );
};

export default LanguageSelectors;