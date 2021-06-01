class Monster {
    constructor(hp, atk, def) {
        this.hp = hp;
        this.atk = atk;
        this.def = def;
    }

    get damage() {
        let v1 = Math.max(player.atk - this.def, 0);
        let v2 = Math.max(this.atk - player.def, 0);
        if (v1 == 0) return Infinity;
        let turns = Math.ceil(this.hp / v1);
        return v2 * turns;
    }

    fight(edge) {
        if (!edge.alive) return true;
        if (this.damage >= player.hp) return false;
        edge.alive = false;
        player.hp -= this.damage;
        return true;
    }
}

const monsters = [
    new Monster(25, 12, 0),
    new Monster(28, 15, 0),
    new Monster(50, 10, 5),
    new Monster(15, 20, 0),
    new Monster(30, 18, 4),
    new Monster(22, 25, 2),
    new Monster(70, 11, 10)
];