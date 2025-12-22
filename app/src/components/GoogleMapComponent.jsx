"use client";
import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"];

const GoogleMapComponent = ({ searchInputRef }) => {
    const [center, setCenter] = useState({
        lat: 24.875424711883458,
        lng: 67.08809582540871,
    });
    const [markerPosition, setMarkerPosition] = useState(center);
    const mapRef = useRef(null);
    const autocompleteRef = useRef(null);

    const mapContainerStyle = {
        width: "100%",
        height: "471px",
    };

    const onMapLoad = (map) => {
        mapRef.current = map;
    };

    const onPlaceSelected = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            if (place && place.geometry) {
                const location = place.geometry.location;
                const newPosition = {
                    lat: location.lat(),
                    lng: location.lng(),
                };
                setCenter(newPosition);
                setMarkerPosition(newPosition);
                mapRef.current.panTo(newPosition);
            } else {
                console.error("Selected place has no geometry or is invalid");
            }
        }
    };

    useEffect(() => {
        let autocomplete;
        if (window.google && window.google.maps && searchInputRef?.current) {
            autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current);
            autocompleteRef.current = autocomplete;
            autocomplete.addListener("place_changed", onPlaceSelected);
        } else {
            console.error("Google Maps script not loaded or search input ref is invalid.");
        }

        return () => {
            if (autocomplete) {
                window.google.maps.event.clearInstanceListeners(autocomplete);
            }
        };
    }, [searchInputRef]);

    return (
        <LoadScript
            googleMapsApiKey={"YOUR_API_KEY"} // Replace with your key
            libraries={libraries}
            onError={(e) => console.error("Error loading Google Maps API:", e)}
        >
            <div style={{ position: "relative" }}>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={15}
                    onLoad={onMapLoad}
                >
                    <Marker position={markerPosition} />
                </GoogleMap>
            </div>
        </LoadScript>
    );
};

export default GoogleMapComponent;
