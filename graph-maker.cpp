#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <ctime>
using namespace std;

const int N=100,Inf=0x3fffffff;
int dis[N][N],ans[N][N],steps[N][N];

void floyd(int n){
	for(int k=0;k<n;k++){
		for(int i=0;i<n;i++){
			for(int j=0;j<n;j++){
				if(ans[i][k]+ans[k][j]<ans[i][j]){
					ans[i][j]=ans[i][k]+ans[k][j];
					steps[i][j]=steps[i][k]+steps[k][j];
				}
			}
		}
	}
}

int main(){
	srand(time(NULL));
	int n=15,m=30,s,t,mx=0,mn=Inf;
	for(int i=0;i<N;i++){
		for(int j=0;j<N;j++){
			dis[i][j]=Inf;
			ans[i][j]=Inf;
			steps[i][j]=1;
		}
	}
	for(int i=0;i<n;i++){
		int tmp=2;
		while(tmp){
			int v=rand()%n,w=rand()%20+20;
			if(i==v||dis[i][v]!=Inf) continue;
			dis[i][v]=dis[v][i]=w;
			ans[i][v]=ans[v][i]=w;
			tmp--;
		}
	}

	floyd(n);
	for(int i=0;i<n;i++){
		for(int j=0;j<n;j++){
			if(steps[i][j]>mx){
				mx=steps[i][j];
				mn=ans[i][j];
				s=i;
				t=j;
			}
			else if(steps[i][j]==mx&&ans[i][j]<mn){
				mn=ans[i][j];
				s=i;
				t=j;
			}
		}
	}

	printf("%d %d %d %d\n", n,m,s,t);
	for(int i=0;i<n;i++){
		for(int j=i+1;j<n;j++){
			if(dis[i][j]!=Inf) printf("%d %d %d\n", i,j,dis[i][j]);
		}
	}
	return 0;
}