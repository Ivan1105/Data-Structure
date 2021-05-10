function floyd(nodes, ans, steps) {
	for (let k = 0; k < nodes; k++) {
		for (let i = 0; i < nodes; i++) {
			for (let j = 0; j < nodes; j++) {
				if (ans[i][k] + ans[k][j] < ans[i][j]) {
					ans[i][j] = ans[i][k] + ans[k][j];
					steps[i][j] = steps[i][k] + steps[k][j];
				}
			}
		}
	}
}

/**
 * 生成图
 * @param {number} n 
 * @param {number} m 
 * @param {Object} nodeRate 
 * @param {Object} edgeRate 
 * @returns graph
 * TODO: 修改图的生成算法
 */
function maker(n, m, nodeRate, edgeRate) {
	let s, t, max = -Infinity, min = Infinity;
	let dis = new Array(n);
	let ans = new Array(n);
	let steps = new Array(n);
	for (let i = 0; i < n; i++) {
		dis[i] = new Array(n);
		ans[i] = new Array(n);
		steps[i] = new Array(n);
		for (let j = 0; j < n; j++) {
			dis[i][j] = Infinity;
			ans[i][j] = Infinity;
			steps[i][j] = 1;
		}
	}

	for (let i = 0; i < n; i++) {
		let tmp = m / n | 0;
		if (i < m % n) tmp++;
		while (tmp) {
			let v = Math.random() * n | 0;
			let w = Math.random() * 20 | 0 + 20;
			if (i == v || dis[i][v] != Infinity) continue;
			dis[i][v] = dis[v][i] = w;
			ans[i][v] = ans[v][i] = w;
			tmp--;
		}
	}

	floyd(n, ans, steps);
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			if (steps[i][j] > max) {
				max = steps[i][j];
				min = ans[i][j];
				s = i;
				t = j;
			}
			else if (steps[i][j] == max && ans[i][j] < min) {
				min = ans[i][j];
				s = i;
				t = j;
			}
		}
	}

	let G = { nodes: [], edges: [], startPoint: s, endPoint: t };
	let pt = 0;
	for (let i = 0; i < n; i++) {
		let rate = Math.random() * 100 | 0;
		let obj = { id: i, type: undefined, limit: Infinity };

		if (i == s) {
			obj.type = hotels[0];
		}
		else if (i == t) {
			obj.type = shops[Math.random() * 2 | 0];
			obj.limit = 1;
		}
		else {
			for (let j in nodeRate) {
				if (rate >= 0 && rate <= nodeRate[j].rate) {
					obj.type = nodeRate[j].type;
					obj.limit = nodeRate[j].type.limit;
					break;
				}
				rate -= nodeRate[j].rate;
			}
		}

		G.nodes.push(obj);
	}

	for (let i = 0; i < n; i++) {
		for (let j = i + 1; j < n; j++) {
			if (dis[i][j] != Infinity) {
				let rate = Math.random() * 100 | 0;
				let obj = { id: pt, source: i, target: j, value: undefined, monster: undefined, alive: true };

				for (let k in edgeRate) {
					if (rate >= 0 && rate <= edgeRate[k].rate) {
						obj.monster = edgeRate[k].type;
						obj.value = obj.monster.damage;
						break;
					}
					rate -= edgeRate[k].rate;
				}

				G.edges.push(obj);
				pt++;
			}
		}
	}
	return G;
}