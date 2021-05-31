var player = {
    maxhp: 50,
    hp: 50,
    money: 100,
    atk: 12,
    def: 8,
    _atPoint: -1,
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