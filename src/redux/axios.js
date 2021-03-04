import axios from 'axios';
import cookie from 'js-cookie'
import { USER_TOKEN } from '../constants';

const tokenAuth = cookie.get(USER_TOKEN)

const instance = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    timeout: 10000,
    headers: {
        Authorization: `Bearer ${tokenAuth}`
    }
})

export default instance