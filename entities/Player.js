var SOCKET_LIST = {};
var PLAYER_LIST = {};

var Player = function(id){
    var self = {
        x:250,
        y:250,
        id:id,
        number:"" + Math.floor(10 * Math.random()),
        pressingRight:false,
        pressingLeft:false,
        pressingUp:false,
        pressingDown:false,
        maxSpd:10,
    }
    self.updatePosition = function(){
        if(self.pressingRight)
            self.x += self.maxSpd;
        if(self.pressingLeft)
            self.x -= self.maxSpd;
        if(self.pressingUp)
            self.y -= self.maxSpd;
        if(self.pressingDown)
            self.y += self.maxSpd;
    }
    return self;
}

export 