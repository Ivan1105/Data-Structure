function shuffleSelf(array, size) {
	var index = -1,
		length = array.length,
		lastIndex = length - 1;

	size = size === undefined ? length : size;
	while (++index < size) {
		// var rand = baseRandom(index, lastIndex),
		var rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
		value = array[rand];

		array[rand] = array[index];

		array[index] = value;
	}
	array.length = size;
	return array;
}

function floyd(nodes, dis) {
	for (let k = 0; k < nodes; k++) {
		for (let i = 0; i < nodes; i++) {
			for (let j = 0; j < nodes; j++) {
				if (dis[i][k] + dis[k][j] < dis[i][j]) {
					dis[i][j] = dis[i][k] + dis[k][j];
				}
			}
		}
	}
}

function nodeType(nodeRate) {
	if (!nodeRate.type) return {};
	if (nodeRate.rate) {
		let rate = Math.random() * 100 | 0;
		for (let i in nodeRate.type) {
			if (rate < nodeRate.rate[i]) return { type: nodeRate.type[i], limit: nodeRate.type[i].limit };
			rate -= nodeRate.rate[i];
		}
	}
	else return { type: nodeRate.type, limit: nodeRate.type.limit };
	return {};
}

function edgeType(edgeRate) {
	let rate = Math.random() * 100 | 0;
	for (let i in edgeRate) {
		if (rate >= 0 && rate < edgeRate[i].rate) return { monster: edgeRate[i].type, alive: true };
		rate -= edgeRate[i].rate;
	}
	return {};
}

/**
 * 生成n个点图，m条边的图
 * @param {number} n 
 * @param {number} m 
 * @param {Object} nodeRate 
 * @param {Object} edgeRate 
 * @returns graph
 */
function maker(level) {
	let n = level.nodes, m = level.edges;
	let s, t, max = -Infinity;
	let dis = new Array(n);
	for (let i = 0; i < n; i++) {
		dis[i] = new Array(n);
		for (let j = 0; j < n; j++) {
			if (i == j) dis[i][j] = 0;
			else dis[i][j] = Infinity;
		}
	}

	let G = { nodes: [], edges: [] };
	while (level.nodeRates.length < n - 2) level.nodeRates.push({});
	shuffleSelf(level.nodeRates);

	for (let i = 0, j = 0; i < n; i++) {
		let tmp = m / n | 0;
		let road = [];
		if (i < m % n) tmp++;

		for (let j = 0; j < n; j++) {
			if (i != j && dis[i][j] == Infinity) {
				road.push(j);
			}
		}
		shuffleSelf(road);

		while (tmp--) {
			if (road[tmp]) dis[i][road[tmp]] = dis[road[tmp]][i] = 1;
		}
	}

	floyd(n, dis);
	s = Math.random() * n | 0;
	for (let i = 0; i < n; i++) {
		if (dis[s][i] > max) {
			max = dis[s][i];
			t = i;
		}
	}
	G.startPoint = s;
	G.endPoint = t;

	for (let i = 0, j = 0; i < n; i++) {
		let obj = {};

		if (i == s) {
			obj.type = level.startPoint;
			obj.limit = obj.type.limit;
		}
		else if (i == t) {
			obj.type = level.endPoint;
			obj.limit = obj.type.limit;
		}
		else {
			obj = nodeType(level.nodeRates[j++]);
		}

		obj.id = i;
		G.nodes.push(obj);
	}

	let pt = 0;

	for (let i = 0; i < n; i++) {
		for (let j = i + 1; j < n; j++) {
			if (dis[i][j] == 1) {
				let obj = edgeType(level.edgeRates);
				obj.id = pt;
				obj.source = i;
				obj.target = j;

				G.edges.push(obj);
				pt++;
			}
		}
	}
	return G;
}