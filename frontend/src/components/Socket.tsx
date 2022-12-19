import{ useMemo } from 'react';
import { toast } from 'react-toastify';
import io from 'socket.io-client';
import api from '../services/api';

const socket = io('https://api.wydimperial.com/', { });

function Socket() {
    socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('ping', (data) => {
        console.log(data);
    });

    socket.on('cron', (message) => {
        toast.dark(message, {
            type: 'info',
            position: 'bottom-left',
            delay: 1,
        });
    });
    return (<></>);
}

export default Socket;