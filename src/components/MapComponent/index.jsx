/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import './MapComponent.scss';
import { mapApiKey, ipstackAPI } from '../../apikeys.js';

export default function MapComponent({ input, onChange, name }) {
  const containerStyle = {
    width: '100%',
    height: '300px',
    margin: '20px 0 0',
  };

  const setLocation = (location) => {
    onChange(name, {
      center: {
        lat: location.latitude,
        lng: location.longitude,
      },
      zoom: 11,
    });
  }
  
  useEffect(() => {
    if (navigator.geolocation && input.value.center.lat === 0) {
      navigator.geolocation.getCurrentPosition((position) => setLocation(position.coords), 
      () => {
        fetch(`http://api.ipstack.com/check?access_key=${ipstackAPI}&format=1`)
        .then(res => res.json())
        .then(data => setLocation(data));
      });
    }
  }, []);

  function onChangeMarkerPosition(position) {
    const newPosition = {
      center: {
        lat: position.latLng.lat(),
        lng: position.latLng.lng(),
      },
      zoom: 11,
    };
    onChange(name, newPosition);
  }

  return (
    <LoadScript googleMapsApiKey={mapApiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={input.value.center}
        zoom={input.value.zoom}
      >
        <Marker
          position={input.value.center}
          onDragEnd={(position) => onChangeMarkerPosition(position)}
          draggable
        />
      </GoogleMap>
    </LoadScript>
  );
}
