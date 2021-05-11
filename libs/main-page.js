/**
 * 更新当前节点信息
 */
function updateCurrentPoint() {
	$('#cur').html(player.atPoint);
	let type = s.graph.nodes(player.atPoint).type;
	let limit = s.graph.nodes(player.atPoint).limit;

	$('#current-type').html('');
	$('#current-service').html('').removeClass();

	if (type instanceof Shop) {
		let str = '';
		if (type.atk) str += type.atk + '攻击力 ';
		if (type.def) str += type.def + '防御力 ';
		str += '- $' + type.cost;

		$('#current-type').html('商店');
		$('#current-service').html(str);
	}
	else if (type instanceof Hotel) {
		let str = '';
		if (type.maxhp) str += '增加' + type.maxhp + '生命上限 ';
		else str += '回复' + type.hp + '生命 ';
		str += '- $' + type.cost;

		$('#current-type').html('旅店');
		$('#current-service').html(str);
	}
	else if (type instanceof Treasure) {
		let str = '金币 - $' + type.money;

		$('#current-type').html('宝箱');
		$('#current-service').html(str);
	}

	if (limit <= 0) $('#current-service').addClass('after-use');
	else $('#current-service').addClass('before-use');
}

/** 记录当前点的相邻节点 */
var adjacent = {};

/**
 * 刷新图
 */
function refreshGraph() {
	s.graph.nodes().forEach(function (e) {
		if (e.id == player.atPoint) e.color = '#f00';
		else if (e.id == g.endPoint) e.color = '#00f';
		else e.color = undefined;
	});

	let str = '';
	adjacent = {};
	s.graph.edges().forEach(function (e) {
		if (e.alive) e.label = '' + e.monster.damage;
		else e.label = '0';

		if (e.source == player.atPoint) {
			adjacent[e.target] = e;
			str += ' <span class="before-use" onclick="showPoint(' + e.target + ')">' + e.target + '</span>';
		}
		else if (e.target == player.atPoint) {
			adjacent[e.source] = e;
			str += ' <span class="before-use" onclick="showPoint(' + e.source + ')">' + e.source + '</span>';
		}
	});

	showPoint(player.atPoint);
	$('#neighbors').html(str);
	s.refresh();
}

/**
 * 重置点的位置
 */
function resetGraph() {
	s.graph.nodes().forEach(function (e) {
		e.x = g.nodes[e.id].x;
		e.y = g.nodes[e.id].y;
	});

	s.refresh();
}

$('#current-service').click(function () {
	if (!$(this).hasClass('before-use')) return;
	let node = s.graph.nodes(player.atPoint);
	node.type.use(node);
});

$('#gotoPoint').click(function () {
	if (!$(this).hasClass('before-use')) return;
	goForward(adjacent[$('#to').html()]);
});

function showPoint(node) {
	node = s.graph.nodes(node);
	let type = node.type;
	$('#to').html(node.id);

	$('#to-type').html('');
	$('#to-service').html('');
	$('#monster-info').html('');
	$('#monster-hp').html('');
	$('#monster-atk').html('');
	$('#monster-def').html('');

	if (type instanceof Shop) {
		let str = '';
		if (type.atk) str += type.atk + '攻击力 ';
		if (type.def) str += type.def + '防御力 ';
		str += '- $' + type.cost;

		$('#to-type').html('商店');
		$('#to-service').html(str);
	}
	else if (type instanceof Hotel) {
		let str = '';
		if (type.maxhp) str += '增加' + type.maxhp + '生命上限 ';
		else str += '回复' + type.hp + '生命 ';
		str += '- $' + type.cost;

		$('#to-type').html('旅店');
		$('#to-service').html(str);
	}
	else if (type instanceof Treasure) {
		let str = '金币 - $' + type.money;

		$('#to-type').html('宝箱');
		$('#to-service').html(str);
	}

	if (adjacent[node.id]) {
		let edge = adjacent[node.id];
		if (edge.alive) {
			$('#monster-info').html('怪物');
			$('#monster-hp').html('生命值：' + edge.monster.hp);
			$('#monster-atk').html('攻击力：' + edge.monster.atk);
			$('#monster-def').html('防御力：' + edge.monster.def);
		}
		$('#gotoPoint').attr('class', 'before-use');
	}
	else $('#gotoPoint').attr('class', 'after-use');
}

function goForward(edge) {
	let monster = edge.monster;
	if (monster.fight(edge)) {
		if (player.atPoint == edge.source) player.atPoint = edge.target;
		else player.atPoint = edge.source;
	}
}

var g = maker(15, 20, [{
	rate: 20,
	type: hotels[0]
}, {
	rate: 10,
	type: hotels[1]
}, {
	rate: 5,
	type: hotels[2]
}, {
	rate: 10,
	type: shops[0]
}, {
	rate: 10,
	type: shops[1]
}, {
	rate: 5,
	type: shops[2]
}, {
	rate: 5,
	type: treasures[0]
}, {
	rate: 2,
	type: treasures[1]
}], [{
	rate: 50,
	type: monsters[0]
}, {
	rate: 30,
	type: monsters[1]
}, {
	rate: 10,
	type: monsters[2]
}, {
	rate: 10,
	type: monsters[3]
}]);

var dis = new Array(g.nodes.length);
for (let i in g.nodes) dis[i] = new Array(g.nodes.length);

for (let i in g.nodes) {
	g.nodes[i].label = '' + g.nodes[i].id;
	g.nodes[i].x = Math.random();
	g.nodes[i].y = Math.random();
	g.nodes[i].size = 1;
}

for (let i in g.edges) {
	dis[g.edges[i].source][g.edges[i].target] = dis[g.edges[i].target][g.edges[i].source] = g.edges[i].value;
	g.edges[i].color = '#ccc';
	g.edges[i].size = 1;
}

var s = new sigma({
	graph: g,
	renderer: {
		container: document.getElementById('graph-container'),
		type: 'canvas'
	},
	settings: {
		minEdgeSize: 0.5,
		maxEdgeSize: 4,
		edgeLabelSize: 'proportional'
	}
});

s.bind('clickNode', function (e) {
	showPoint(e.data.node.id);
});

var dragListener = sigma.plugins.dragNodes(s, s.renderers[0]);
player.atPoint = g.startPoint;