import axios from "axios";

export function getGameBackendAPI() {
    const database = axios;
    database.defaults.baseURL = process.env.REACT_APP_GAME_BACKEND_API_URL;
    return database;
}