<template>
    <div class="">
        <canvas id="ctx" width="1000" height="700" style="border:1px solid #000000;"></canvas>
        <div id="chat-text" style="width: 1000px; height: 100px; overflow-y:scroll">
            <div v-for="(chatMessage, chatKey ) in chatMessages" :key="chatKey">{{ chatMessage }}</div>
        </div>
        <input id="chat-input" type="text"
               style="width: 1000px; font-size: 20px;"
               v-model="newMessage"
               @focus="chatActive = !chatActive"
               @blur="chatActive = !chatActive"
               v-on:keyup.enter="sendMessage()">
    </div>
</template>


<script>
import * as io from 'socket.io-client'

export default {
    mounted() {
        if(this.socket) {
            this.controls();
            this.receiveMessage();
        }
    },
    created() {
        this.socket = io("http://127.0.0.1:5000");
    },
    data() {
        return {
            socket: null,
            chatActive: false,
            newMessage: '',
            chatMessages: []
        };
    },
    methods: {
        sendMessage() {
            if(this.newMessage[0] === '/' && this.newMessage === '')
                this.socket.emit('evalServer', this.newMessage.slice(1));
            else
                this.socket.emit('sendMsgToServer', this.newMessage);
            this.newMessage = '';
        },
        receiveMessage() {
            let self = this;
            this.socket.on('addToChat',function(data) {
                self.chatMessages.push(data);
            });
            this.socket.on('evalAnswer',function(data){
                console.log(data);
            });
        },
        controls() {
            let ctx = document.getElementById("ctx").getContext("2d");
            ctx.font = '30px Arial';

            let self = this;

            self.socket.on('newPositions', function (data) {
                ctx.clearRect(0, 0, 1000, 700);
                for(let i = 0 ; i < data.player.length; i++)
                    ctx.fillText(data.player[i].number,data.player[i].x,data.player[i].y);

                for(let i = 0 ; i < data.bullet.length; i++)
                    ctx.fillRect(data.bullet[i].x-5,data.bullet[i].y-5,5,5);
            });

            document.onkeydown = function (event) {
                if (event.keyCode === 68 && !self.chatActive)	//d
                    self.socket.emit('keyPress', {inputId: 'right', state: true});
                else if (event.keyCode === 83 && !self.chatActive)	//s
                    self.socket.emit('keyPress', {inputId: 'down', state: true});
                else if (event.keyCode === 65 && !self.chatActive) //a
                    self.socket.emit('keyPress', {inputId: 'left', state: true});
                else if (event.keyCode === 87 && !self.chatActive) // w
                    self.socket.emit('keyPress', {inputId: 'up', state: true});

            }
            document.onkeyup = function (event) {
                if (event.keyCode === 68 && !self.chatActive)	//d
                    self.socket.emit('keyPress', {inputId: 'right', state: false});
                else if (event.keyCode === 83 && !self.chatActive)	//s
                    self.socket.emit('keyPress', {inputId: 'down', state: false});
                else if (event.keyCode === 65 && !self.chatActive) //a
                    self.socket.emit('keyPress', {inputId: 'left', state: false});
                else if (event.keyCode === 87 && !self.chatActive) // w
                    self.socket.emit('keyPress', {inputId: 'up', state: false});
            }
        }
    }
}
</script>
