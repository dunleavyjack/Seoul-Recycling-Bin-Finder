import React from 'react';

const InfoBlock = ({ icon, text }) => {
    return (
        <div className="info-block">
            <img src={icon} alt="search icon" className="overview-icon" />
            <p>{text}</p>
        </div>
    );
};

export default InfoBlock;
