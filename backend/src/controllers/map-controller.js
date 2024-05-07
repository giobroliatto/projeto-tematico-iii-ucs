import fetch from "node-fetch";

// Chave de API HERE Maps
const apiKey = "_Sc_kaDhyq1N0Hs9MHh0gOV8EiQmqDpPSpj2kos7JxU";

class MapController {
    // Obter dados de geolocalização
    static async getGeolocationData(req, res) {
        try {
            // Obter coordenadas de geolocalização do usuário
            const coordinates = await this.getUserCoordinates();

            // Construir a URL da API HERE Maps com as coordenadas do usuário
            const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${coordinates.latitude},${coordinates.longitude}&apiKey=${apiKey}`;

            // Fazer solicitação à API HERE Maps
            const response = await fetch(url);
            const data = await response.json();

            // Extrair informações de endereço da resposta da API
            const address = data.items[0].address.label;

            // Enviar resposta com os dados de geolocalização
            res.status(200).json({ latitude: coordinates.latitude, longitude: coordinates.longitude, address: address });
        } catch (error) {
            console.error("Erro ao obter dados de geolocalização:", error);
            res.status(500).json({ message: "Erro ao obter dados de geolocalização." });
        }
    }
    static async getUserCoordinates() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude });
                }, error => {
                    console.error("Erro ao obter coordenadas de geolocalização:", error);
                    reject(error);
                });
            } else {
                reject("Geolocalização não suportada pelo navegador.");
            }
        });
    }

    // Obter dados de rota
    static async getRouteData(req, res) {
        try {
            // Coordenadas de destino fornecidas pelo usuário
            const destinationCoordinates = { latitude: req.body.latitude, longitude: req.body.longitude };

            // Coordenadas de origem obtidas da geolocalização do usuário
            const originCoordinates = await this.getUserCoordinates();

            // Construir a URL da API HERE Maps para calcular a rota
            const url = `https://router.hereapi.com/v8/routes?apiKey=${apiKey}&transportMode=car&origin=${originCoordinates.latitude},${originCoordinates.longitude}&destination=${destinationCoordinates.latitude},${destinationCoordinates.longitude}`;

            // Fazer solicitação à API HERE Maps
            const response = await fetch(url);
            const data = await response.json();

            // Extrair informações da rota da resposta da API
            const route = data.routes[0];
            const distance = route.sections[0].summary.length;
            const duration = route.sections[0].summary.duration;

            // Enviar resposta com os dados de rota
            res.status(200).json({ distance: distance, duration: duration });
        } catch (error) {
            console.error("Erro ao obter dados de rota:", error);
            res.status(500).json({ message: "Erro ao obter dados de rota." });
        }
    }
}

export default MapController;
