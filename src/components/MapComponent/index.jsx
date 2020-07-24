import React, { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import './MapComponent.scss'

const containerStyle = {
  width: '400px',
  height: '400px',
  margin: '20px 0 0'
};

export default function MapComponent({input, onChange}) {

  useEffect(() => {
    if (navigator.geolocation && input.value.center.lat === 0) {
      navigator.geolocation.getCurrentPosition(function(position) {
        onChange(input.name, {
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        zoom: 11
        });
      });
    }
  });

  function onChangeMarkerPosition(position) {
    const newPosition = {
      center: {
        lat: position.latLng.lat(),
        lng: position.latLng.lng()
      },
      zoom: 11
    };
    onChange(input.name, newPosition);
  }

  return (
    <LoadScript
      googleMapsApiKey="YOUR_API_KEY"
    >
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
        { /* Child components, such as markers, info windows, etc. */ }
      </GoogleMap>
    </LoadScript>
  )
}