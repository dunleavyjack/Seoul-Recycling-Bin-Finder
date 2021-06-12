import React from 'react';
import useMap from '../../hooks/useMap';
import InfoPanel from '../InfoPanel';
import Navbar from '../Navbar';
import { findClosestBin } from '../../utils/helperFunctions';

const Map = () => {
    const { binDistance, nearbyBins, recyclingBinCount, trashBinCount } =
        useMap();
    let closest = 0;

    if (binDistance.length === 32) {
        closest = findClosestBin(binDistance);
        console.log('closest bin below');
        console.log(closest);
        console.log('nearby bin below');
        console.log(nearbyBins);
    }

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
