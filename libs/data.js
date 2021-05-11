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

class Hotel {
    constructor(cost, hp, maxhp = 0, limit = Infinity) {
        this.cost = cost;
        this.hp = hp;
        this.maxhp = maxhp;
        this.limit = limit;
    }
    use(node) {
        if (player.money < this.cost) return;
        if (node.limit <= 0) return;
        player.money -= this.cost;
        player.hp += this.hp;
        player.maxhp += this.maxhp;
        node.limit--;
        player.update();
    }
}

class Shop {
    constructor(cost, atk = 0, def = 0, limit = 1) {
        this.cost = cost;
        this.atk = atk;
        this.def = def;
        this.limit = limit;
    }
    use(node) {
        if (player.money < this.cost) return;
        if (node.limit <= 0) return;
        player.money -= this.cost;
        player.atk += this.atk;
        player.def += this.def;
        node.limit--;
        player.update();
    }
}

class Treasure {
    constructor(money, limit = 1) {
        this.money = money;
        this.limit = limit;
    }
    use(node) {
        if (node.limit <= 0) return;
        player.money += this.money;
        node.limit--;
        player.update();
    }
}

var monsters = [
    new Monster(25, 12, 0),
    new Monster(28, 15, 0),
    new Monster(50, 10, 5),
    new Monster(15, 20, 0)
];

var hotels = [
    new Hotel(10, 20),
    new Hotel(20, 50),
    new Hotel(15, 15, 15, 1)
];

var shops = [
    new Shop(10, 1),
    new Shop(10, 0, 1),
    new Shop(15, 1, 1)
];

var treasures = [
    new Treasure(25),
    new Treasure(40)
];

var player = {
    maxhp: 50,
    hp: 50,
    money: 100,
    atk: 12,
    def: 8,
    _atPoint: 0,
    get atPoint() {
        return this._atPoint;
    },
    set atPoint(val) {
        this._atPoint = val;
        if (val == g.endPoint) alert('感谢您游玩本次测试！');
        this.update();
    },
    update: function () {
        if (this.hp > this.maxhp) this.hp = this.maxhp;
        $('#hp').html(this.hp + '/' + this.maxhp);
        $('#money').html('$' + this.money);
        $('#atk').html(this.atk);
        $('#def').html(this.def);

        updateCurrentPoint();
        refreshGraph();
    }
};