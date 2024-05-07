import fetch from 'node-fetch';

// Chave de API HERE Maps
const apiKey = "_Sc_kaDhyq1N0Hs9MHh0gOV8EiQmqDpPSpj2kos7JxU";

class ApiService {
  static async getGeolocationData() {
    try {
      // Fazer solicitação para obter dados de geolocalização
      const response = await fetch('/geolocation');
      if (!response.ok) {
        throw new Error('Failed to fetch geolocation data');
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getRouteData(destinationCoordinates) {
    try {
      // Fazer solicitação para obter dados de rota
      const response = await fetch('/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(destinationCoordinates)
      });
      if (!response.ok) {
        throw new Error('Failed to fetch route data');
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default ApiService;
