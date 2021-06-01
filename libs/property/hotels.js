class Hotel {
    constructor(cost, hp, maxhp = 0, limit = Infinity) {
        this.cost = cost;
        this.hp = hp;
        this.maxhp = maxhp;
        this.limit = limit;
        this.name = '旅店';
    }
    use(node) {
        if (player.money < this.cost || player.hp == player.maxhp) return;
        if (node.limit <= 0) return;
        player.money -= this.cost;
        player.hp += this.hp;
        player.maxhp += this.maxhp;
        node.limit--;
        player.update();
    }

    get detail() {
        let str = '';
        if (this.maxhp) str += '增加' + this.maxhp + '生命上限 ';
        else str += '回复' + this.hp + '生命 ';
        str += '- $' + this.cost;
        return str;
    }
}

const hotels = [
    new Hotel(10, 20),
    new Hotel(20, 50),
    new Hotel(15, 15, 15, 1),
    new Hotel(25, 70),
    new Hotel(25, 20, 20, 1)
];