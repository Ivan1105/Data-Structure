class Treasure {
    constructor(money, limit = 1) {
        this.money = money;
        this.limit = limit;
        this.name = '宝箱';
    }
    use(node) {
        if (node.limit <= 0) return;
        player.money += this.money;
        node.limit--;
        player.update();
    }

    get detail() {
        let str = '金币 + $' + this.money;
        return str;
    }
}

const treasures = [
    new Treasure(25),
    new Treasure(40),
    new Treasure(70),
    new Treasure(100),
    new Treasure(125)
];