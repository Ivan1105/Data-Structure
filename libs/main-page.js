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
		let str = '金币 + $' + type.money;

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
		else {
			e.label = '0';
			e.type = 'dashed';
		}

		if (e.source == player.atPoint) {
			adjacent[e.target] = e;
			str += ' <span class="before-use" onclick="showPoint(' + e.target + ')">' + e.target + '</span>';
		}
		else if (e.target == player.atPoint) {
			adjacent[e.source] = e;
			str += ' <span class="before-use" onclick="showPoint(' + e.source + ')">' + e.source + '</span>';
		}
	});

	showPoint(g.endPoint);
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

/**
 * 点击使用当前点的设施
 */
$('#current-service').click(function () {
	if (!$(this).hasClass('before-use')) return;
	let node = s.graph.nodes(player.atPoint);
	node.type.use(node);
});

/**
 * 前往下一个点
 */
$('#gotoPoint').click(function () {
	if (!$(this).hasClass('before-use')) return;
	goForward(adjacent[$('#to').html()]);
});

/**
 * 查看节点信息
 * @param {number} node 
 */
function showPoint(node) {
	g.edges = s.graph.edges();
	let obj = calcShortestPath(g, player.atPoint, node);
	$('#path-way').html(obj.pathway.join('->'));
	$('#path-damage').html(obj.value);

	node = s.graph.nodes(node);
	let type = node.type;
	$('#to').html(node.id);

	$('#node-info').attr('class', 'show');
	$('#edge-info').attr('class', 'hidden');
	$('#to-type').html('');
	$('#to-service').html('');

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
		let str = '金币 + $' + type.money;

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

function showEdge(edge) {
	if (!edge.alive) {
		$('#node-info').attr('class', 'hidden');
		$('#edge-info').attr('class', 'hidden');
		return;
	}
	$('#node-info').attr('class', 'hidden');
	$('#edge-info').attr('class', 'show');
	$('#source-target').html(edge.source + '<->' + edge.target);
	$('#monster-hp').html(edge.monster.hp);
	$('#monster-atk').html(edge.monster.atk);
	$('#monster-def').html(edge.monster.def);
}

/**
 * 经过边edge
 * @param {Object} edge 
 */
function goForward(edge) {
	let monster = edge.monster;
	if (monster.fight(edge)) {
		if (player.atPoint == edge.source) player.atPoint = edge.target;
		else player.atPoint = edge.source;
	}
}

var g;
var s;

function loadFloor(fl) {
	if (fl == 1) {
		g = maker(15, 20, [{
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
	}

	for (let i in g.nodes) {
		g.nodes[i].label = '' + g.nodes[i].id;
		g.nodes[i].x = Math.random();
		g.nodes[i].y = Math.random();
		g.nodes[i].size = 1;
	}

	for (let i in g.edges) {
		g.edges[i].color = '#ccc';
		g.edges[i].size = 1;
		g.edges[i].hover_color = '#aaa';
	}

	if (s) {
		s.unbind();
		s.kill();
		s = undefined;
	}

	s = new sigma({
		graph: g,
		renderer: {
			container: document.getElementById('graph-container'),
			type: 'canvas'
		},
		settings: {
			minEdgeSize: 0.5,
			maxEdgeSize: 4,
			edgeLabelSize: 'proportional',
			doubleClickEnabled: false,
			enableEdgeHovering: true
		}
	});

	s.bind('clickNode', function (e) {
		showPoint(e.data.node.id);
	});

	s.bind('doubleClickNode', function (e) {
		$('#gotoPoint').click();
	});

	s.bind('clickEdge', function (e) {
		showEdge(e.data.edge);
	});

	var dragListener = sigma.plugins.dragNodes(s, s.renderers[0]);
	player.atPoint = g.startPoint;
}

$(function () {
	loadFloor(1);
});