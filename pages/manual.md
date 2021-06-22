# Manual

### 规则介绍

游戏以关卡的形式呈现，共4个小关卡和一个boss（首领）关卡。

前四个关卡为迷宫，以无向图的方式呈现。玩家需从一个起点到达一个终点前往下一个关卡。

玩家初始持有一定数量的金币，且拥有一定值的 $HP_P（血量）、ATK_P（攻击力）和DEF_P（防御力）$。

玩家在前往某一个点的路上可能会有怪物，怪物也拥有一定值的 $HP_M、ATK_M和DEF_M$。

如果经过，玩家需与怪物进行战斗，战斗结束后玩家受到伤害的计算公式为
$$
ceil(HP_M\div(ATK_P-DEF_M)\times(ATK_M-DEF_P))
$$
即回合数乘以玩家每回合受到的伤害。HP归零时游戏结束。

部分点上可能设立有宝箱（获得金币）、旅店（回复HP）、商店（消耗金币提升属性值）等特殊设施。玩家经过时可以使用设施。

如何规划自己的路线，经营自己的属性值和金币成为了决策点。

玩家可以选择以受到最少的伤害快速前往下一个关卡或是绕绕远路提升自己的属性值以应对更强力的怪物。

### 玩法介绍

![manual-1](E:\ds\shortest-path\pages\manual-1.png)

![manual-2](E:\ds\shortest-path\pages\manual-2.png)

![manual-3](E:\ds\shortest-path\pages\manual-3.png)

![manual-4](E:\ds\shortest-path\pages\manual-4.png)

![manual-5](E:\ds\shortest-path\pages\manual-5.png)

![manual-6](E:\ds\shortest-path\pages\manual-6.png)