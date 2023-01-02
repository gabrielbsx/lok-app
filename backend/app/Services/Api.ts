import Env from '@ioc:Adonis/Core/Env';
import Axios from 'axios';

export default Axios.create({
  baseURL: Env.get('API_URL'),
  headers: {
    Authorization: Env.get('API_SECRET'),
  },
});