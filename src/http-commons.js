import axios from "axios";
import {api} from './enviroments/config';

export default axios.create({
  baseURL: api,
  headers: {
    "Content-type": "application/json",
    'Authorization': 'Bearer ' + localStorage.token
  },
});
