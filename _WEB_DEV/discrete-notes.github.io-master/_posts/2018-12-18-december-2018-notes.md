---
layout: post
title: December notes
redirect_from: "/2018/12/18/december-2018-notes/"
permalink: december-2018-notes
---

![](assets/arbre.png){: .center-image height="500px"}

---

## Karchmer-Wigderson theorem 

Karchmer-Wigderson theorem makes a precise link between circuit and 
communication complexity. More precisely it 
 relates the depth of a boolean
circuit computing some function $f$, to the communication complexity of a game 
based on $f$. The game is the following: 

* Inputs: Alice has an input $x$ such that $f(x)=1$, 
and Bob has another input $y$ such that $f(y)=0$.
* Task: find $i$ such that $x_i \neq y_i$ (such an $i$ must exist). 

The way to go from the circuit to a communication protocol is the following. 
Alice and Bob each run the circuit on their inputs, the usual bottom-up way. 
Thus each of them knows the 
evaluation after each gate ("after this gate, this wire holds a 0, after this 
one it's a 1" etc.). Now the protocol will go top-down.
As after the final gate (that is, the top gate), 
Alice gets a 1 and Bob gets a 0, we know that the two wires 
entering this gate cannot both have the same value for Alice and Bob. 
Alice and Bob can communicate to agree on one wire that has different value. 
This takes constant number of bits. And then you just follow the wire to the 
next gate and continue. At the end Alice and Bob agree on an input wire that has different 
value and they win the game. The communication complexity is the circuit depth. 

For the other direction, see the Internet. 

(I learnt about Karchmer-Wigderson theorem recently by watching parts of an 
[online talk](https://www.youtube.com/watch?v=t1EsRm1dmw0) by 
[Mika Göös](http://www.math.ias.edu/~mika/).) 

## Counting crows

These days I often cross the 
[Jardin des Plantes](https://en.wikipedia.org/wiki/Jardin_des_plantes)
in Paris, and I saw a sign giving information about the counting of crows in 
Paris. Basically a large number of crows now have a ring with a specific number. 
The problem is that the rings tend to fall, disappear etc. To evaluate this 
loss rate, the birds are rung with two rings. Then 
by counting the number of crows with zero, one and two rings, one can evaluate 
the loss rate, and then the population. 

This sounded very much like CS to me, for example in networks, 
sending packets that may disappear, and trying to know the message loss for 
example.

## Minimum degree spanning tree
[Minimum-degree spanning tree](https://en.wikipedia.org/wiki/Degree-constrained_spanning_tree), 
consists in finding a spanning tree of a graph, 
with the constraint that the maximum degree of the tree should be as small as 
possible. This problem is NP-hard, because if the answer is 2 then it means that 
you have an Hamiltonian path. But one can get an approximation with additive 
constant 1.
The algorithm (from 
[this paper](https://doi.org/10.1006%2Fjagm.1994.1042), explained in 
[these lecture notes](http://pages.cs.wisc.edu/~shuchi/courses/880-S07/scribe-notes/lecture08.pdf))
consists in a local search, with swapping of edges to as local moves.

This problems looks very natural and potentially very useful. I'd be curious 
to know if there are real-world applications.  

(I discovered this problem in
[this distributed computing paper](https://doi.org/10.1109/ICDCS.2015.66).)

## Cycle cover
An [(edge) cycle-cover](https://en.wikipedia.org/wiki/Edge_cycle_cover)
is a set of cycles of a graph, such that every edge of the graph 
is contained in at least one cycle. There are several problems associated with 
this object, for example related to the total length of the cycles in such a 
cover. I want to mention a super-cute-super-hard open problem: the 
[cycle double cover conjecture](https://en.wikipedia.org/wiki/Cycle_double_cover). 
The conjecture is: in every graph with no 
[bridge](https://en.wikipedia.org/wiki/Bridge_(graph_theory)), 
there is a list of cycles so that every edge is 
contained in exactly two.  

If you think "How can this be open?!", I'll just add that it is listed in the 
[open problem garden](http://www.openproblemgarden.org/op/cycle_double_cover_conjecture) 
has of "outstanding importance". See there, or on the wikipedia page linked above 
for the details. 

([A paper about cycle covers](https://arxiv.org/abs/1812.04492) recently 
appeared on the arxiv, reminded me this problem.)

## MST algorithms
Consider the following algorithm for finding a minimum weight spanning tree, similar to 
[Borůvka's algorithm](https://en.wikipedia.org/wiki/Bor%C5%AFvka%27s_algorithm). 

* Every node begins has a so-called fragment. 
* Until there is only one fragment: choose an arbitrary fragment, find the 
lightest edge linking a node of 
this fragment to another fragment, merge the two fragments into a new one by 
adding this edge. 
* Output the final fragment.

This algorithm is actually a generalization of Borůvka, Prim and Kruskal algorithm! 
For Borůvka's algorithm, one would basically choose an 
outgoing edge for all fragments in parallel. For Prim, one would always choose 
the same fragment to enlarge. F	or Kruskal, one would choose the lightest 
outgoing edge of all the fragments. 

This can probably be explained with red-blue rules, but I like this point of
view with a kind of scheduler, with different strategies.

(I'm working again on some minimum spanning tree distributed problems, and it 
reminded me about this fact, that I discovered a few years ago, but that I've 
never seen in undergraduate courses.) 

## Squashed cube conjecture and distance labelling
Distance labelling are labels given to the nodes of a graph such that given the 
labels of two arbitrary nodes $u$ and $v$, and without seeing the graph, one can compute 
the distance between $u$ and $v$. One usually tries to minimize the size of 
the labels.
A strategy for this is to find some metric embedding of the graph, because then 
one can 
simply give the coordinates of the nodes as labels. 
In this direction, a natural thing to do is to try the embed the graph in an 
hypercube with the Hamming distance. This cannot be done in general, but the 
squashed cube conjecture (that is actually a theorem) provides a result close to 
this. 

Consider that instead of two symbols, there are three: 0, 1, and *, and 
that the "distance" between $x$ and $y$ is the number of indices such that $x=0$ 
and $y=1$ or $x=1$ and $y=0$. That is * is at distance zero from 0 and 1. 
(Note that this distance is not a proper distance.)
Now how many symbols do you need to have a distance preserving embedding? 
Exactly $n-1$, as proved in [this paper](https://doi.org/10.1007/BF02579350). 


(I discovered this in the related works section of 
[this paper](https://doi.org/10.1007/3-540-44676-1_40).)

## Jaccard metric
Lipton and Regan talk about the 
[Jaccard metric](https://en.wikipedia.org/wiki/Jaccard_index) in 
[a post](https://rjlipton.wordpress.com/2018/12/14/explaining-the-jaccard-metric/)
of their blog, *Gödel's lost letter*, in particular why it is a metric. I didn't 
know about this distance over sets, so here is the definition. 

Let $A$ and $B$ 
be two sets, the distance is:
$$d(A,B)=1-\frac{|A \cap B|}{|A \cup B|}.$$

## Preprints
I have two new preprints this month: 

* [Graph classes and forbidden patterns on three vertices](https://arxiv.org/abs/1812.05913)
with [Michel Habib](https://www.irif.fr/~habib/).
* [Lower bounds for text indexing with mismatches and differences](xxx) with
[Vincent Cohen-Addad](https://www.di.ens.fr/~vcohen/) and 
[Tatiana Starikoskaya](https://starikovskaya.github.io/homepage/).

I really like both papers, I hope I'll find some time to blog about it soon.
