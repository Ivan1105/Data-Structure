/**
 * 边
 */
class Edge {
	endPoint = -1;
	value = 0;
	constructor(endPoint = -1, value = 0) {
		this.endPoint = endPoint;
		this.value = value;
	}
}

/**
 * 邻接表
 */
class Graph {
	head = null;
	nodes = 0;
	edges = 0;
	constructor(n, m) {
		this.nodes = n;
		this.edges = m;
		this.head = new Array(n);
	}

	/**
	 * 为邻接表添加新的边
	 * @param {Number} u - 起点
	 * @param {Number} v - 终点
	 * @param {Number} w - 边的权值
	 */
	addEdge(u, v, w) {
		if (this.head[u] === undefined) this.head[u] = new Array();
		this.head[u].push(new Edge(v, w));
	}
}

/**
 * 小根堆
 */
class Heap {
	#data = new Array();
	constructor() {
		this.#data.push(new Edge(-1, 0));
	}

	/**
	 * 将堆的顶点下沉到对应位置
	 * @param {Number} x - 堆的节点编号
	 */
	checkdown(x) {
		let size = this.#data.length - 1;
		let t1 = x * 2;
		let t2 = x * 2 + 1;
		if (x > size) return;
		if ((t1 <= size && this.#data[x].value < this.#data[t1].value) && (t2 <= size && this.#data[x].value < this.#data[t2].value)) return;
		if ((t2 <= size && this.#data[t1].value < this.#data[t2].value) || (t1 == size)) {
			let tmp = this.#data[x];
			this.#data[x] = this.#data[t1];
			this.#data[t1] = tmp;
			this.checkdown(x * 2);
		}
		else if (t2 <= size) {
			let tmp = this.#data[x];
			this.#data[x] = this.#data[t2];
			this.#data[t2] = tmp;
			this.checkdown(t2);
		}
	}

	/**
	 * 向堆中添加新的Edge类元素
	 * @param {Edge} obj 
	 */
	push(obj) {
		this.#data.push(obj);
		let t1 = this.#data.length - 1;
		let t2 = parseInt(t1 / 2);
		while (t1 != 1 && this.#data[t1].value < this.#data[t2].value) {
			let tmp = this.#data[t1];
			this.#data[t1] = this.#data[t2];
			this.#data[t2] = tmp;
			t1 = t2;
			t2 = parseInt(t1 / 2);
		}
	}

	/**
	 * 将堆顶元素移出堆
	 */
	pop() {
		let size = this.#data.length - 1;
		this.#data[1] = this.#data[size];
		this.#data.pop();
		this.checkdown(1);
	}

	/**
	 * 堆是否为空
	 */
	get empty() {
		let size = this.#data.length - 1;
		if (size < 1) return true;
		else return false;
	}

	/**
	 * 返回堆顶元素
	 */
	get top() {
		return this.#data[1];
	}
}

/**
 * 堆优化的dijkstra算法
 * @param {Graph} G - 无向图
 * @param {Number} s - 起点
 * @param {Number} t - 终点
 * @returns 最短路径长度以及路线
 */
function dijkstra(G, s, t) {
	let dis = new Array(G.nodes);
	let used = new Array(G.nodes);
	let pre = new Array(G.nodes);

	for (let i = 0; i < G.nodes; i++) {
		dis[i] = Infinity;
		used[i] = false;
		pre[i] = -1;
	}

	dis[s] = 0;
	let q = new Heap();
	q.push(new Edge(s, 0));

	while (!q.empty) {
		let top = q.top;
		q.pop();
		s = top.endPoint;
		if (used[s]) continue;
		used[s] = true;

		for (let i in G.head[s]) {
			let v = G.head[s][i].endPoint;
			let w = G.head[s][i].value;
			if (!used[v] && dis[s] + w < dis[v]) {
				pre[v] = s;
				dis[v] = dis[s] + w;
				q.push(new Edge(v, dis[v]));
			}
		}
	}

	return { pathway: pre, distance: dis };
}

/**
 * 调用dijkstra算法
 * @param {Object} obj - 无向图
 * @param {Number} s - 起点
 * @returns 最短路径长度以及路线
 */
function calcShortestPath(obj, s) {
	let G = new Graph(obj.nodes.length, obj.edges.length);
	for (let i in obj.edges) {
		if (obj.edges[i].alive) {
			G.addEdge(obj.edges[i].source, obj.edges[i].target, obj.edges[i].monster.damage);
			G.addEdge(obj.edges[i].target, obj.edges[i].source, obj.edges[i].monster.damage);
		}
		else {
			G.addEdge(obj.edges[i].source, obj.edges[i].target, 0);
			G.addEdge(obj.edges[i].target, obj.edges[i].source, 0);
		}
	}
	return dijkstra(G, s);
}
