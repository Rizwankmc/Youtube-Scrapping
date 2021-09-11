import axios from 'axios';
import {server} from '../config/keys';

export const userInstance = axios.create({
  baseURL: `${server}/api`,
  headers: { "Content-Type": 'application/json' }
});
