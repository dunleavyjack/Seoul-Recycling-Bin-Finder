import React from 'react';
import InfoBlock from './InfoBlock';
import searchIcon from '../assets/images/search.png';
import directionIcon from '../assets/images/directions.png';
import recycleIcon from '../assets/images/recycling-symbol.png';

const Overview = () => {
    return (
        <div className="overview">
            <InfoBlock
                icon={searchIcon}
                text="It's not always easy to find a trash bin in Seoul. Using your device’s location, find the nearest recycling and trash bins near you."
            />
            <InfoBlock
                icon={directionIcon}
                text="Out and about? Using Kakao Map’s open API, get step-by-step directions to the nearest recycling or trash bin in your area. You can walk, run, or ride there without losing your way."
            />
            <InfoBlock
                icon={recycleIcon}
                text="Looking to get rid of a water bottle? Paper? Cans? Each bin is marked for recycling and trash so you can find the right one. It’s as easy as that. "
            />
        </div>
    );
};

export default Overview;
