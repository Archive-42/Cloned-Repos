---
layout: post
title: The Moore Bounds
comments: false
redirect_from: "/2017/01/16/moore_bounds/"
permalink: moore-bounds
---

The Moore bounds give a lower bound on the number of vertices in a graph $G$ in terms of the minimum degree $\delta$ and the girth $g$ (length of the shortest cycle).
The bounds can be stated as follows:

$$
\begin{alignat*}{2}
	& 1 + \delta\sum_{i=0}^{d-1} \delta^{d-1} &\text{if }g = 2d+1\\
	&2\sum_{i=0}^{d-1} \delta^{d-1} &\text{if }g = 2d\\
\end{alignat*}
$$

The proof is relatively simple. Let $g=2d+1$ and $v$ be some arbitrary vertex. Consider a DFS tree starting at $v$. $v$ has at least $\delta$ children and every vertex of the next $d-1$ levels has at least $d-1$ children. None of the children of the first $d$ levels can be the same, as we would otherwise create a cycle of length smaller than $g$. The proof for $g=2d$ is similiar. Instead of starting from a vertex $v$ we start from an edge $e$.

Note that the result also holds for the average degree. In $\Delta$-regular graphs the same proof as above works. The proof of the irregular case is a lot more involved.
