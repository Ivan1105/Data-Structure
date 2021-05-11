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
	let rate = Math.random() * 100 | 0;
	for (let i in nodeRate) {
		if (rate >= 0 && rate <= nodeRate[i].rate) return { type: nodeRate[i].type, limit: nodeRate[i].type.limit };
		rate -= nodeRate[i].rate;
	}
	return {};
}

function edgeType(edgeRate) {
	let rate = Math.random() * 100 | 0;
	for (let i in edgeRate) {
		if (rate >= 0 && rate <= edgeRate[i].rate) return { monster: edgeRate[i].type, alive: true };
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
function maker(n, m, nodeRate, edgeRate) {
	let s, t, max = -Infinity;
	let dis = new Array(n);
	for (let i = 0; i < n; i++) {
		dis[i] = new Array(n);
		for (let j = 0; j < n; j++) {
			dis[i][j] = Infinity;
		}
	}

	let G = { nodes: [], edges: [] };

	for (let i = 0; i < n; i++) {
		let obj = nodeType(nodeRate);
		obj.id = i;
		G.nodes.push(obj);

		let tmp = m / n | 0;
		if (i < m % n) tmp++;
		while (tmp) {
			let v = Math.random() * n | 0;
			if (i == v || dis[i][v] != Infinity) continue;
			dis[i][v] = dis[v][i] = 1;
			tmp--;
		}
	}

	floyd(n, dis);
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			if (dis[i][j] > max) {
				max = dis[i][j];
				s = i;
				t = j;
			}
		}
	}
	G.startPoint = s;
	G.endPoint = t;

	G.nodes[s].type = hotels[0];
	G.nodes[s].limit = G.nodes[s].type.limit;
	G.nodes[t].type = shops[2];
	G.nodes[t].limit = G.nodes[t].limit;

	let pt = 0;

	for (let i = 0; i < n; i++) {
		for (let j = i + 1; j < n; j++) {
			if (dis[i][j] == 1) {
				let obj = edgeType(edgeRate);
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