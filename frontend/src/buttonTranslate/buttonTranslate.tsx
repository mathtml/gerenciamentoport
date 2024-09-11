import React from 'react';
import { IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
// @ts-ignore
import euaImg from '../assets/images/eua.png'; 
// @ts-ignore
import brasilImg from '../assets/images/brasil.png'; 


const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('language', lang); 
    };

    return (
        <div>
            <IconButton onClick={() => changeLanguage('en')} aria-label="English">
                <img src={euaImg} alt="English" style={{ width: 40, height: 40 }} />
            </IconButton>
            <IconButton onClick={() => changeLanguage('pt')} aria-label="Portuguese">
                <img src={brasilImg} alt="Portuguese" style={{ width: 40, height: 40 }} />
            </IconButton>
        </div>
    );
};

export default LanguageSelector;
