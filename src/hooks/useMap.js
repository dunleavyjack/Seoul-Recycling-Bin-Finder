/*global kakao */
import { useEffect, useState } from 'react';
import { markerdata } from '../data/markerData';
import trashPinImage from '../assets/images/trashPin.png';
import recyclingPinImage from '../assets/images/recyclingPin.png';
import locationPinImage from '../assets/images/locationPin3.png';
import { getGridPosition } from '../utils/helperFunctions';

const useMap = () => {
    const [nearbyCans, setNearbyCans] = useState(0);
    const [canDistance, setCanDistance] = useState([]);
    const [nearbyTrash, setNearbyTrash] = useState(0);
    const [nearbyRecycling, setNearbyRecycling] = useState(0);

    useEffect(() => {
        const mapscript = () => {
            // establish the map container
            let container = document.getElementById('map');

            // establish center pin and level of map
            let options = {
                center: new kakao.maps.LatLng(37.505809, 127.037707),
                level: 7,
            };

            // set imgSrc and size of trash marker
            const trashPinSrc = trashPinImage,
                trashPinSize = new kakao.maps.Size(50, 75);

            // set imgSrc and size of recycle marker
            const recyclePinSrc = recyclingPinImage,
                recyclePinSize = new kakao.maps.Size(50, 75);

            // set imgSrc and size of location pin
            const locationPinSrc = locationPinImage,
                locationPinSize = new kakao.maps.Size(20, 20);

            // create trash marker
            const trashPin = new kakao.maps.MarkerImage(
                trashPinSrc,
                trashPinSize
            );

            // create recycle marker
            const recyclePin = new kakao.maps.MarkerImage(
                recyclePinSrc,
                recyclePinSize
            );

            // create location pin
            const locationPin = new kakao.maps.MarkerImage(
                locationPinSrc,
                locationPinSize
            );

            // build map at default location (central seoul)
            const map = new kakao.maps.Map(container, options);

            // find current location
            const displayMarker = (locPosition) => {
                new kakao.maps.Marker({
                    map: map,
                    position: locPosition,
                    image: locationPin,
                });

                // when user location found, add zoom-in animation
                map.setCenter(locPosition);
                map.setLevel(5, {
                    animate: {
                        duration: 500,
                    },
                });
            };

            // if user location found, begin program
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var lat = position.coords.latitude, // 위도
                        lon = position.coords.longitude; // 경도

                    // use animation to jump to user location
                    var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                    displayMarker(locPosition);

                    // map over each bin location from the markerData file
                    markerdata.forEach((trashCan) => {
                        // set lat and long for each bin
                        let trashPosition = new kakao.maps.LatLng(
                            trashCan.lat,
                            trashCan.lng
                        );

                        // set 'map grid position' for each bin (needed for direction data)
                        let trashGridPosition = getGridPosition(trashPosition);

                        //create marker for each pin
                        let marker = new kakao.maps.Marker({
                            map: map,
                            position: trashPosition,
                            title: trashCan.title,
                            image: trashCan.recycling ? recyclePin : trashPin,
                        });

                        // draw an 'invisible' line to each pin from user location
                        let line = new kakao.maps.Polyline({
                            map: map, // 선을 표시할 지도입니다
                            path: [locPosition, trashPosition],
                            strokeOpacity: 0,
                        });

                        // get length of each line to find distance
                        let lineLength = Math.round(line.getLength());
                        if (lineLength < 1500) {
                            setNearbyCans((prevCount) => prevCount + 1);

                            //check if nearby can is recyling or trash
                            if (trashCan.recycling) {
                                setNearbyRecycling(
                                    (prevCount) => prevCount + 1
                                );
                            } else {
                                setNearbyTrash((prevCount) => prevCount + 1);
                            }
                        }

                        // add this distance to state array
                        setCanDistance((prevArray) => [
                            ...prevArray,
                            lineLength,
                        ]);

                        // add this distance to each bin object
                        trashCan.distance = lineLength;

                        // deteremine 'bin-type'
                        let hasRecycling = trashCan.recycling
                            ? 'RECYCLING AND TRASH'
                            : 'TRASH ONLY';

                        // create an infoWindow object with distance/'bin-type'
                        let infowindow = new kakao.maps.InfoWindow({
                            position: trashPosition,
                            // content: `<div class="popup";><a href="https://map.kakao.com/?urlX=${trashGridPosition.x}&urlY=${trashGridPosition.y}&name=Public+Trash+Can+%3A%29">Directions</a> ${lineLength}m Away</div>`,
                            content: `<div class="popup">
                                        <h1 class="popupTitle">${lineLength}m</h1>
                                        <p class="popupInfo">${hasRecycling}</p>
                                        <button onClick="window.location.href = 'https://map.kakao.com/?urlX=${trashGridPosition.x}&urlY=${trashGridPosition.y}&name=Public+Trash+Can+%3A%29'" class="popupButton">
                                            GET DIRECTIONS
                                        </button>
                                    </div>`,
                        });

                        // add click listener to each marker to open infoWindow
                        kakao.maps.event.addListener(
                            marker,
                            'click',
                            function () {
                                infowindow.open(map, marker);
                            }
                        );

                        // add 'global' click listener anywhere else on the map to close infoWindow
                        kakao.maps.event.addListener(map, 'click', function () {
                            infowindow.close();
                        });
                    });
                });
            } else {
                // if no location set, keep center of map at center
                var locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
                displayMarker(locPosition);
            }
        };
        // run program
        mapscript();
    }, []);
    // return distance from each bin and nearby bins to Map.js
    return { canDistance, nearbyCans, nearbyRecycling, nearbyTrash };
};

export default useMap;
