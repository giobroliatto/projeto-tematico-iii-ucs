import React, { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService';

const Map = () => {
  const [geolocationData, setGeolocationData] = useState(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [error, setError] = useState(null);

  // Obter dados de geolocalização ao carregar o componente
  useEffect(() => {
    const fetchGeolocationData = async () => {
      try {
        const data = await ApiService.getGeolocationData();
        setGeolocationData(data);
      } catch (error) {
        setError('Erro ao obter dados de geolocalização.');
      }
    };

    fetchGeolocationData();
  }, []);

  // Função para calcular a rota ao definir o destino
  const handleSetDestination = async () => {
    try {
      const data = await ApiService.getRouteData(destinationCoordinates);
      setRouteData(data);
    } catch (error) {
      setError('Erro ao calcular rota.');
    }
  };

  return (
    <div className="map-container">
      {error && <div className="error">{error}</div>}
      {geolocationData && (
        <div className="geolocation-data">
          <p>Latitude: {geolocationData.latitude}</p>
          <p>Longitude: {geolocationData.longitude}</p>
          <p>Endereço: {geolocationData.address}</p>
        </div>
      )}
      {routeData && (
        <div className="route-data">
          <p>Distância: {routeData.distance}</p>
          <p>Duração: {routeData.duration}</p>
        </div>
      )}
      <button onClick={handleSetDestination}>Definir Destino</button>
    </div>
  );
};

export default Map;
