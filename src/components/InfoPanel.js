import React from 'react';
import trashIcon from '../assets/images/trashIcon.png';
import recycleIcon from '../assets/images/recycleIcon.png';

const InfoPanel = ({ nearby, nearbyTrash = 0, nearbyRecycling = 0 }) => {
    return (
        <>
            <div className="infoContainer">
                <div className="infoPanel">
                    <div className="infoCircleContainer">
                        <div className="infoCircle"></div>
                        <p className="info">
                            <span className="number">{nearby}</span> NEARBY BINS
                        </p>
                    </div>
                    <div className="infoBarTest">
                        <img
                            src={trashIcon}
                            alt="Trash Icon"
                            className="trashIcon"
                        />
                        <p className="nearbyTrash">{nearbyTrash}</p>
                    </div>
                    <div className="infoBarTestTwo">
                        <img
                            src={recycleIcon}
                            alt="Recycle Icon"
                            className="recycleIcon"
                        />
                        <p className="nearbyTrash">{nearbyRecycling}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InfoPanel;
