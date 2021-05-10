#include <iostream>
#include <cstdio>
using namespace std;

class Edge
{
private:
	static Edge **head;
	static int n;
	Edge *_next = nullptr;
	int endPoint = -1, value = 0;

public:
	Edge(Edge *_next = nullptr, int endPoint = -1, int value = 0)
	{
		this->_next = _next;
		this->endPoint = endPoint;
		this->value = value;
	}
	int getEndPoint()
	{
		return this->endPoint;
	}
	int getValue()
	{
		return this->value;
	}
	Edge *nextEdge()
	{
		return this->_next;
	}
};

class Graph
{
private:
	Edge **head = nullptr;
	int n = 0, m = 0;

public:
	Graph(int n = 0, int m = 0)
	{
		this->n = n;
		this->m = m;
		head = new Edge *[n];
		for (int i = 0; i < n; i++)
			head[i] = nullptr;
	}
	void addEdge(int u, int v, int w)
	{
		Edge *tmp = new Edge(head[u], v, w);
		head[u] = tmp;
	}
	int numOfNodes()
	{
		return this->n;
	}
	int numOfEdges()
	{
		return this->m;
	}
	Edge *firstEdge(int u)
	{
		return head[u];
	}
	Edge *nextEdge(Edge *i)
	{
		return i->nextEdge();
	}
	void print()
	{
		for (int i = 0; i < n; i++)
		{
			cout << i << ": ";
			for (Edge *j = firstEdge(i); j != nullptr; j = nextEdge(j))
			{
				cout << j->getEndPoint() << ' ';
			}
			cout << endl;
		}
	}
};

typedef pair<int, int> PII;

class Heap
{
private:
	int sz = 0;
	PII *data = nullptr;
	void checkdown(int x)
	{
		if (x > sz)
			return;
		if ((x * 2 <= sz && data[x].second < data[x * 2].second) && (x * 2 + 1 <= sz && data[x].second < data[x * 2 + 1].second))
			return;
		if (x * 2 <= sz && data[x * 2].second < data[x * 2 + 1].second)
		{
			swap(data[x], data[x * 2]);
			checkdown(x * 2);
		}
		else if (x * 2 + 1 <= sz)
		{
			swap(data[x], data[x * 2 + 1]);
			checkdown(x * 2 + 1);
		}
	}

public:
	Heap(int sz = 0)
	{
		data = new PII[sz + 1];
	}
	void push(PII x)
	{
		data[++sz] = x;
		int t = sz;
		while (t != 1 && data[t].second < data[t / 2].second)
		{
			swap(data[t], data[t / 2]);
			t /= 2;
		}
	}
	PII top()
	{
		return data[1];
	}
	void pop()
	{
		data[1] = data[sz];
		sz--;
		checkdown(1);
	}
	bool empty()
	{
		if (sz < 1)
			return true;
		else
			return false;
	}
};

int dijkstra(Graph G, int s, int t)
{
	const int Inf = 0x3fffffff;
	int *dis = new int[G.numOfNodes()];
	bool *used = new bool[G.numOfNodes()];

	for (int i = 0; i < G.numOfNodes(); i++)
		dis[i] = Inf, used[i] = false;
	dis[s] = 0;
	Heap q(G.numOfNodes() * G.numOfEdges());
	q.push({s, 0});

	while (!q.empty())
	{
		PII top = q.top();
		q.pop();
		s = top.first;
		if (used[s])
			continue;
		used[s] = true;

		for (Edge *j = G.firstEdge(s); j != nullptr; j = j->nextEdge())
		{
			int v = j->getEndPoint(), w = j->getValue();
			if (!used[v] && dis[s] + w < dis[v])
			{
				dis[v] = dis[s] + w;
				q.push({v, dis[v]});
			}
		}
	}
	return dis[t];
}

int main()
{
	int n, m, u, v, w, s, t;
	scanf("%d%d%d%d", &n, &m, &s, &t);
	Graph G(n, m);

	while (m--)
	{
		scanf("%d%d%d", &u, &v, &w);
		G.addEdge(u, v, w);
		G.addEdge(v, u, w);
	}

	cout << dijkstra(G, s, t);
	return 0;
}