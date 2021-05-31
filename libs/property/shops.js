class Shop {
    constructor(cost, atk = 0, def = 0, limit = 1) {
        this.cost = cost;
        this.atk = atk;
        this.def = def;
        this.limit = limit;
        this.name = '商店';
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

    get detail() {
        let str = '';
        if (this.atk) str += this.atk + '攻击力 ';
        if (this.def) str += this.def + '防御力 ';
        str += '- $' + this.cost;
        return str;
    }
}

const shops = [
    new Shop(10, 1),
    new Shop(10, 0, 1),
    new Shop(15, 1, 1)
];