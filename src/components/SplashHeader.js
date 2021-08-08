import React from 'react';
import greenwave from '../assets/images/greenwave.png';

const SplashHeader = () => {
    return (
        <>
            <div className="splash-cover">
                <div className="splash-content">
                    <h1 className="splash-title">
                        Got something to throw away?
                    </h1>
                    <p className="splash-sub-title">
                        Connect and find public recyling and trash bins near
                        you.
                    </p>
                    <button
                        className="splash-button"
                        onClick={() => (window.location.pathname = '/map')}
                    >
                        FIND A BIN
                    </button>
                    <p>— Not in Seoul? —</p>
                    <button
                        className="splash-button"
                        onClick={() => (window.location.pathname = '/demo')}
                    >
                        VIEW A DEMO
                    </button>
                </div>
            </div>
            <img className="wave" alt="wave" src={greenwave} />
        </>
    );
};

export default SplashHeader;
