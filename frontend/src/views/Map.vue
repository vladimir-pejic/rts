<template>
    <div class="row">
        <div class="col-10">
            <canvas id="ctx" width="1500" height="800" class="canvas-game"></canvas>
        </div>

        <div class="col-2">
            <div class="row">
                <div class="col-12 chat-box" id="chat-box">
                    <p v-for="(chatMessage, chatKey ) in chatMessages" :key="chatKey">{{ chatMessage }}</p>
                </div>
                <div class="col-12">
                    <input type="text"
                           class="form-control"
                           style="font-size: 16px;"
                           v-model="newMessage"
                           @focus="chatActive = !chatActive"
                           @blur="chatActive = !chatActive"
                           v-on:keyup.enter="sendMessage()">
                </div>
            </div>
        </div>

    </div>
</template>


<script>
import * as io from 'socket.io-client';

export default {
    mounted() {
        if (this.socket) {
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
            if (this.newMessage[0] === '/' || this.newMessage === '') {
                this.$notify({
                    type: 'error',
                    title: 'Error',
                    text: 'You must enter a message to send!'
                });
            } else {
                this.socket.emit('sendMsgToServer', this.newMessage);
            }
            this.newMessage = '';
        },
        receiveMessage() {
            let self = this;
            this.socket.on('addToChat', function (data) {
                self.chatMessages.push(data);
                self.autoScroll();
            });
            this.socket.on('evalAnswer', function (data) {
                console.log(data);
            });
        },
        autoScroll() {
            let elem = document.getElementById('chat-box');
            elem.scrollTop = elem.scrollHeight;
        },
        controls() {
            let ctx = document.getElementById("ctx").getContext("2d");
            ctx.font = '30px Arial';

            let self = this;

            self.socket.on('newPositions', function (data) {
                ctx.clearRect(0, 0, 1500, 800);
                for (let i = 0; i < data.player.length; i++)
                    ctx.fillText(data.player[i].number, data.player[i].x, data.player[i].y);

                for (let i = 0; i < data.bullet.length; i++)
                    ctx.fillRect(data.bullet[i].x - 5, data.bullet[i].y - 5, 5, 5);
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

            document.onmousedown = function () {
                self.socket.emit('keyPress', {inputId: 'attack', state: true});
            }
            document.onmouseup = function () {
                self.socket.emit('keyPress', {inputId: 'attack', state: false});
            }
            document.onmousemove = function (event) {
                let x = -750 + event.clientX - 8;
                let y = -400 + event.clientY - 8;
                let angle = Math.atan2(y, x) / Math.PI * 180;
                self.socket.emit('keyPress', {inputId: 'mouseAngle', state: angle});
            }
        }
    }
}
</script>

<style>
.canvas-game {
    border: 1px solid #000000;
}

.chat-box {
    background-color: aliceblue;
    overflow-y: scroll;
    height: 85vh;
    text-align: left;
}
</style>