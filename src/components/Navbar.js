import React from 'react';
import infoIcon from '../assets/images/infoImg.png';
import title from '../assets/images/title.png';

const Navbar = () => {
    return (
        <div className="nav">
            <img className="navInfoTitle" src={title} alt="Title" />
            <img className="navInfoImage" src={infoIcon} alt="Info" />
        </div>
    );
};

export default Navbar;
