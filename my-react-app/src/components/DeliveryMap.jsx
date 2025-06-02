import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const DeliveryMap = ({ driverAddress, deliveryAddress }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBqBMU_ixRmA-6HijDB56ptqq8faYsQgd4',
  });

  const [driverLocation, setDriverLocation] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState(null);

  const getLatLngFromAddress = (address) => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          resolve({ lat: lat(), lng: lng() });
        } else {
          reject(`Geocoding failed for ${address}: ${status}`);
        }
      });
    });
  };

  useEffect(() => {
    if (isLoaded) {
      Promise.all([
        getLatLngFromAddress(driverAddress),
        getLatLngFromAddress(deliveryAddress),
      ])
        .then(([driver, delivery]) => {
          setDriverLocation(driver);
          setDeliveryLocation(delivery);
        })
        .catch((err) => console.error('Error fetching coordinates:', err));
    }
  }, [isLoaded, driverAddress, deliveryAddress]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  const mapCenter = driverLocation || { lat: 0, lng: 0 };

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={12}>
      {driverLocation && <Marker position={driverLocation} label="Driver" />}
      {deliveryLocation && <Marker position={deliveryLocation} label="Delivery" />}
    </GoogleMap>
  );
};

export default DeliveryMap;
