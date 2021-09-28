import * as io from 'socket.io-client'

class SocketioService {

    socket;
    constructor() {}

    setupSocketConnection() {
        this.socket = io("http://127.0.0.1:5000");
    }
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}

export default new SocketioService();