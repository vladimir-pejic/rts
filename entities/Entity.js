let Entity = () => {
    let self = {
        x: 500,
        y: 350,
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
    return self;
}

export default Entity;