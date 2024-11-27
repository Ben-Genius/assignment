import axios from "axios";

const instance = axios.create({
  baseURL: 'https://rb-playground.onrender.com/internal/api/v1',
});

export default instance;
