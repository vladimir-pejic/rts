import Entity from './Entity.js';

let Bullet = function (angle) {
    let self = Entity();
    self.id = Math.random();
    self.spdX = Math.cos(angle / 180 * Math.PI) * 10;
    self.spdY = Math.sin(angle / 180 * Math.PI) * 10;

    self.timer = 0;
    self.toRemove = false;
    let super_update = self.update;
    self.update = function () {
        if (self.timer++ > 100)
            self.toRemove = true;
        super_update();
    }
    Bullet.list[self.id] = self;
    return self;
}
Bullet.list = {};

Bullet.update = function () {
    if (Math.random() < 0.1) {
        Bullet(Math.random() * 360);
    }

    let pack = [];
    for (let i in Bullet.list) {
        let bullet = Bullet.list[i];
        bullet.update();
        pack.push({
            x: bullet.x,
            y: bullet.y,
        });
    }
    return pack;
}

export default Bullet;