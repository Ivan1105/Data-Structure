/** 记录当前点的相邻节点 */
var adjacent = [];
/** 生成的原始图 */
var g;
/** sigma插件建立的图 */
var s;
/** 拖动点的监听事件 */
var dragListener;
/** 到达每个点的距离 */
var pathToOthers;

/**
 * 更新当前节点信息
 */
function updateCurrentPoint() {
	g.edges = s.graph.edges();
	pathToOthers = calcShortestPath(g, player.atPoint);
	$('#cur').html(player.atPoint);
	let type = s.graph.nodes(player.atPoint).type || { name: '', detail: '' };
	let limit = s.graph.nodes(player.atPoint).limit;

	$('#current-type').html('');
	$('#current-service').html('').removeClass();

	$('#current-type').html(type.name);
	$('#current-service').html(type.detail);

	if (limit <= 0) $('#current-service').addClass('after-use');
	else $('#current-service').addClass('before-use');
}

/**
 * 刷新图
 */
function refreshGraph() {
	s.graph.nodes().forEach(function (e) {
		if (e.id == player.atPoint) e.color = '#f00';
		else if (e.id == g.endPoint) e.color = '#00f';
		else e.color = undefined;
	});

	s.graph.edges().forEach(function (e) {
		if (e.alive) e.label = '' + e.monster.damage;
		else {
			e.label = '';
			e.type = 'dashed';
		}
	});

	showPoint(player.atPoint);
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
 * 解析一条路径
 * @param {Number} node 
 * @returns Array
 */
function getSinglePath(node) {
	let singlePath = [];
	while (node != -1) {
		singlePath.unshift(node);
		node = pathToOthers.pathway[node];
	}
	return singlePath;
}

/**
 * 查看节点信息
 * @param {number} node 
 */
function showPoint(node) {
	if (node == player.atPoint) {
		$('#node-info').attr('class', 'hidden');
		$('#edge-info').attr('class', 'hidden');
		return;
	}

	$('#path-way').html(getSinglePath(node).join('->'));
	$('#path-damage').html(pathToOthers.distance[node]);

	node = s.graph.nodes(node);
	let type = node.type || { name: '', detail: '' };
	$('#to').html(node.id);

	$('#node-info').attr('class', 'show');
	$('#edge-info').attr('class', 'hidden');
	$('#to-type').html('');
	$('#to-service').html('');

	$('#to-type').html(type.name);
	$('#to-service').html(type.detail);
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
	$('#monster-damage').html(edge.monster.damage);
}

/**
 * 前往一个点
 * @param {Object} edge 
 */
function goForward(node) {
	if (player.atPoint == node || player.hp <= pathToOthers.distance[node]) return;
	let singlePath = getSinglePath(node);
	for (i = 0; i < singlePath.length - 1; i++) {
		let edge = adjacent[singlePath[i]][singlePath[i + 1]];
		if (edge) edge.monster.fight(edge);
	}

	$("#all-nodes").modal('hide');
	player.atPoint = node;
}

function loadFloor(fl) {
	if (fl == 1) {
		g = maker(8, 20, [{
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

	adjacent = new Array(g.nodes);
	for (let i in g.nodes) {
		adjacent[i] = new Array(g.nodes);

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
		s.graph.clear();
		s.graph.read(g);
	}
	else {
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

		dragListener = sigma.plugins.dragNodes(s, s.renderers[0]);

		s.bind('overNode', function (e) {
			showPoint(e.data.node.id);
		});

		s.bind('rightClickNode', function (e) {
			goForward(e.data.node.id);
		});

		s.bind('overEdge', function (e) {
			showEdge(e.data.edge);
		});

		s.bind('rightClickStage', function () {
			$('#all-nodes-details').empty();
			s.graph.nodes().forEach(function (e) {
				let type = e.type;
				if (!type) type = { name: '无', detail: '无' };

				let tr = document.createElement('tr');
				tr.onclick = 'goForward(' + e.id + ')';
				tr.innerHTML = '<td>' + e.id + '</td><td>' + type.name + '</td><td>' + type.detail + '</td><td>' + pathToOthers.distance[e.id] + '</td><td>' + getSinglePath(e.id).join('->') + '</td>';
				$('#all-nodes-details').append(tr);
			});
			$("#all-nodes").modal('toggle');
		});
	}

	s.graph.edges().forEach(function (e) {
		adjacent[e.source][e.target] = adjacent[e.target][e.source] = e;
	});

	player.atPoint = g.startPoint;
}

$(function () {
	/**
	 * 点击使用当前点的设施
	 */
	$('#current-service').click(function () {
		if (!$(this).hasClass('before-use')) return;
		let node = s.graph.nodes(player.atPoint);
		node.type.use(node);
	});

	$(document).contextmenu(function (e) {
		return false;
	});

	loadFloor(1);
	$("#loading").fadeOut(function () {
		$(this).remove();
	});
});