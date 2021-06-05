import React from 'react';
import infoIcon from '../assets/images/infoImg.png';
import title from '../assets/images/title.png';

const Navbar = () => {
    return (
        <div className="nav">
            <img className="navInfoTitle" src={title} />
            <img className="navInfoImage" src={infoIcon} />
        </div>
    );
};

export default Navbar;
