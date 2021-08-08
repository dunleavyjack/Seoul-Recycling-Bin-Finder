import React from 'react';
import useMap from '../../hooks/useMap';
import InfoPanel from '../InfoPanel';
import Navbar from '../Navbar';

const Map = () => {
    const { nearbyBins, recyclingBinCount, trashBinCount } = useMap();

    return (
        <>
            <Navbar />
            <div
                id="map"
                style={{ width: '100vw', height: '100vh', margin: '0px' }}
            ></div>
            <InfoPanel
                nearby={nearbyBins}
                nearbyTrash={trashBinCount}
                nearbyRecycling={recyclingBinCount}
            />
        </>
    );
};

export default Map;
