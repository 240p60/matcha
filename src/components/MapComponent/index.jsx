import React, { useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import './MapComponent.scss';
import { mapApiKey } from '../../apikeys';

const containerStyle = {
  width: '100%',
  height: '400px',
  margin: '20px 0 0',
};

export default function MapComponent({ input, onChange, name }) {
  useEffect(() => {
    if (navigator.geolocation && input.value.center.lat === 0) {
      navigator.geolocation.getCurrentPosition(function (position) {
        onChange(name, {
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          zoom: 11,
        });
      });
    }
  });

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
