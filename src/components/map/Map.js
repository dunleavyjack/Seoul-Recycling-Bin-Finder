import React from 'react';
import useMap from '../../hooks/useMap';
import InfoPanel from '../InfoPanel';
import Navbar from '../Navbar';
import { findClosestBin } from '../../utils/helperFunctions';

const Map = () => {
    const { canDistance, nearbyCans, nearbyRecycling, nearbyTrash } = useMap();
    let closest = 0;

    if (canDistance.length === 32) {
        closest = findClosestBin(canDistance);
        console.log('closest can below');
        console.log(closest);
        console.log('nearby cans below');
        console.log(nearbyCans);
    }

    return (
        <>
            <Navbar />
            <div
                id="map"
                style={{ width: '100vw', height: '100vh', margin: '0px' }}
            ></div>
            <InfoPanel
                nearby={nearbyCans}
                nearbyTrash={nearbyTrash}
                nearbyRecycling={nearbyRecycling}
            />
        </>
    );
};

export default Map;
