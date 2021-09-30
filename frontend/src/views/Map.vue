<template>
    <div class="">
        <canvas id="ctx" width="1000" height="700" style="border:1px solid #000000;"></canvas>
    </div>
</template>


<script>
import * as io from 'socket.io-client'

export default {
    mounted() {
        if(this.socket)
            this.controls();
    },
    created() {
        this.socket = io("http://127.0.0.1:5000");
    },
    data() {
        return {
            socket: null,
        };
    },
    methods: {
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
                if (event.keyCode === 68)	//d
                    self.socket.emit('keyPress', {inputId: 'right', state: true});
                else if (event.keyCode === 83)	//s
                    self.socket.emit('keyPress', {inputId: 'down', state: true});
                else if (event.keyCode === 65) //a
                    self.socket.emit('keyPress', {inputId: 'left', state: true});
                else if (event.keyCode === 87) // w
                    self.socket.emit('keyPress', {inputId: 'up', state: true});

            }
            document.onkeyup = function (event) {
                if (event.keyCode === 68)	//d
                    self.socket.emit('keyPress', {inputId: 'right', state: false});
                else if (event.keyCode === 83)	//s
                    self.socket.emit('keyPress', {inputId: 'down', state: false});
                else if (event.keyCode === 65) //a
                    self.socket.emit('keyPress', {inputId: 'left', state: false});
                else if (event.keyCode === 87) // w
                    self.socket.emit('keyPress', {inputId: 'up', state: false});
            }
        }
    }
}
</script>
