import React, { useEffect } from 'react';
import t from '../../i18nProvider/t';

function About() {
    useEffect(() => {
        console.log('Component DIDMOUNT');
        return () => {
            console.log('Component WILLUNMOUNT');
        };
    });
    return (
        <div className="About">
            <h1>{t('About Page')}</h1>
        </div>
    );
}

export default About;
