let Entity = () => {
    let self = {
        x: 750,
        y: 400,
        spdX: 0,
        spdY: 0,
        id: ""
    }
    self.update = () => {
        self.updatePosition();
    }
    self.updatePosition = () => {
        self.x += self.spdX;
        self.y += self.spdY;
    }
    self.getDistance = function(pt){
        return Math.sqrt(Math.pow(self.x-pt.x,2) + Math.pow(self.y-pt.y,2));
    }
    return self;
}

export default Entity;