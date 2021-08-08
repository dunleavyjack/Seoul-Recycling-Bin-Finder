/*global kakao */
import { useEffect, useState } from 'react';
import { markerdata } from '../data/markerData';
import trashMarkerImage from '../assets/images/trashMarker.png';
import recyclingMarkerImage from '../assets/images/recyclingMarker.png';
import locationMarkerImage from '../assets/images/locationMarker.png';
import { getGridPosition } from '../utils/helperFunctions';

const useMap = () => {
    const [nearbyBins, setNearbyBins] = useState(0);
    const [binDistance, setBinDistance] = useState([]);
    const [trashBinCount, setTrashBinCount] = useState(0);
    const [recyclingBinCount, setRecyclingBinCount] = useState(0);

    useEffect(() => {
        const demomapscript = () => {
            // Create map container
            let container = document.getElementById('map');

            // Set default map location and level
            let options = {
                center: new kakao.maps.LatLng(37.505809, 127.037707),
                level: 7,
            };

            // Set src and and size of custom trash, recyling, and 'your location' markers
            const trashMarkerSrc = trashMarkerImage,
                trashMarkerSize = new kakao.maps.Size(50, 75);
            const recyclePinSrc = recyclingMarkerImage,
                recyclePinSize = new kakao.maps.Size(50, 75);
            const locationMarkerSrc = locationMarkerImage,
                locationMarkerSize = new kakao.maps.Size(20, 20);

            // Create instances of each marker
            const trashMarker = new kakao.maps.MarkerImage(
                trashMarkerSrc,
                trashMarkerSize
            );
            const recyclePin = new kakao.maps.MarkerImage(
                recyclePinSrc,
                recyclePinSize
            );
            const locationMarker = new kakao.maps.MarkerImage(
                locationMarkerSrc,
                locationMarkerSize
            );

            // Build map at default location (Seoul)
            const map = new kakao.maps.Map(container, options);

            // Find current location of user
            const displayMarker = (userPosition) => {
                new kakao.maps.Marker({
                    map: map,
                    position: userPosition,
                    image: locationMarker,
                });

                // Set custom animation to zoom-in to user's location
                map.setCenter(userPosition);
                map.setLevel(5, {
                    animate: {
                        duration: 500,
                    },
                });
            };

            // If user location found, zoom-in to their location and find nearby bins
            const lat = 37.505809;
            const lon = 127.037707;

            // Use custom animation to jump to user location
            const userPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            displayMarker(userPosition);

            // Map over each bin location from the markerData file
            markerdata.forEach((bin) => {
                // Set lat and long for each bin
                let binPosition = new kakao.maps.LatLng(bin.lat, bin.lng);

                // Set 'map grid position' for each bin (needed for Kakao maps direction data)
                let binGridPosition = getGridPosition(binPosition);

                // Create marker for each bin
                let marker = new kakao.maps.Marker({
                    map: map,
                    position: binPosition,
                    title: bin.title,
                    image: bin.recycling ? recyclePin : trashMarker,
                });

                // Draw an 'invisible' line to each bin from user location
                let line = new kakao.maps.Polyline({
                    map: map,
                    path: [userPosition, binPosition],
                    strokeOpacity: 0, // Makes line invisible
                });

                // Get length of each line to find distance from user
                let lineLength = Math.round(line.getLength());
                if (lineLength < 1500) {
                    setNearbyBins((prevCount) => prevCount + 1);

                    // Check if nearby bin is recyling or trash only
                    if (bin.recycling) {
                        setRecyclingBinCount((prevCount) => prevCount + 1);
                    } else {
                        setTrashBinCount((prevCount) => prevCount + 1);
                    }
                }

                // Add this distance to array of all bin distances
                setBinDistance((prevArray) => [...prevArray, lineLength]);

                // Add this distance to each bin object
                bin.distance = lineLength;

                // Deteremin label based on 'bin-type'
                let hasRecycling = bin.recycling
                    ? 'RECYCLING AND TRASH'
                    : 'TRASH ONLY';

                // Create an 'infoWindow' (popup) object with distance and 'bin-type'
                let infowindow = new kakao.maps.InfoWindow({
                    position: binPosition,
                    content: `<div class="popup">
                            <h1 class="popupTitle">${lineLength}m</h1>
                            <p class="popupInfo">${hasRecycling}</p>
                            <button onClick="window.location.href = 'https://map.kakao.com/?urlX=${binGridPosition.x}&urlY=${binGridPosition.y}&name=Public+Trash+Can+%3A%29'" class="popupButton">
                                GET DIRECTIONS
                            </button>
                        </div>`,
                });

                // Add click listener to each marker to open infoWindow
                kakao.maps.event.addListener(marker, 'click', function () {
                    infowindow.open(map, marker);
                });

                // Add 'global' click listener everywhere on the map to close infoWindow
                kakao.maps.event.addListener(map, 'click', function () {
                    infowindow.close();
                });
            });
        };
        // run program
        demomapscript();
    }, []);
    // return distance from each bin and nearby bins to Map.js
    return { binDistance, nearbyBins, recyclingBinCount, trashBinCount };
};

export default useMap;
