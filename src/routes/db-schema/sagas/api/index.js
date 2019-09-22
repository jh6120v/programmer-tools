import axios from 'axios/index';
import { loadProgressBar } from 'axios-progress-bar';

export const getFileHashApi = () => {
    const instance = axios.create();

    loadProgressBar({
        showSpinner: false
    }, instance);

    return instance({
        // url: 'http://localhost:3000/check-data',
        url: ' https://my-json-server.typicode.com/jh6120v/programmer-tools/check-data',
        method: 'get',
        responseType: 'json',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
        }
    })
        .then((res) => res.data)
        .catch((error) => {
            throw error;
        });
};

export const getFileDataApi = () => {
    const instance = axios.create();

    loadProgressBar({
        showSpinner: false
    }, instance);

    return instance({
        // url: 'http://localhost:3000/get-data',
        url: 'https://my-json-server.typicode.com/jh6120v/programmer-tools/get-data',
        method: 'get',
        responseType: 'json',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
        }
    })
        .then((res) => res.data)
        .catch((error) => {
            throw error;
        });
};
