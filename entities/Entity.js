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
    return self;
}

export default Entity;