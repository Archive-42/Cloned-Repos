---
layout: post
title: November notes
redirect_from: "/2018/11/30/november-2018-notes/"
permalink: november-2018-notes
---

A few notes for November 2018.

---

## A new paper on descriptive complexity of distributed computing
[Descriptive complexity](https://en.wikipedia.org/wiki/Descriptive_complexity_theory) 
basically aims at characterizing complexity classes through logic. A classic 
results is [Fagin's Theorem](https://en.wikipedia.org/wiki/Descriptive_complexity_theory)
that characterizes NP. 
Descriptive complexity for distributed computing is a relatively new topic,[^1]
and a [new paper](https://arxiv.org/abs/1811.08197) just came out on arxiv.
I'm not a specialist, but from what I understood, the classic assumption of the
LOCAL model that there are unique identifiers, is pretty difficult to transfer 
into logic, and this paper seems to make a step in this direction.

## A map of the theory of distributed computing community 
[Jukka Suomela](https://users.ics.aalto.fi/suomela/) published
[a nice map](https://plus.google.com/+JukkaSuomela/posts/JgWYFk4XzWW) of the 
PODC/DISC communities. (PODC and DISC are the two main conferences in theory 
of distributed computing.)  
It is a graph where the nodes are the authors, and the edges between them 
have different thickness, 
depending on how much they have collaborated, or have had papers in the same 
sessions. There are strong thematic clusters, which is no surprise.

## Symmetries in LPs and SOS
I attended the PhD defense of 
[Cécile Rottner](https://www.lip6.fr/actualite/personnes-fiche.php?ident=D1634)
who was a student in the OR team of [LIP6](https://www.lip6.fr/?LANG=en). 
Her thesis was about a problem that
any electric utility company faces: how to manage the different the power plants
to meet the demand while using the less energy possible, given that there are 
many constraints on these plants (a nuclear reactor cannot be switched on and 
off in a minute, some other stuff has to cool down, etc.). As often in OR (as far as
I know) this is done by having big LPs and playing with them, adding new 
inequalities, trying to use the structure to speed the computation, having 
branch and cut routines etc. 

One of the big challenges that one has to tackle when solving these big LPs 
in an industrial context is to break the symmetries.
Suppose you have two identical 
nuclear reactors in your system. Then if you use one or the other in your solution, 
you will have the same cost. This implies that you can have many many optimal 
solutions. This is bad for a branch and cut 
strategy, where the ideal case is to have only one optimal solution, and to be 
cutting all the other branches quickly. Cécile showed ways to solve this problem.

This reminded me of another PhD defense with symmetries: the one of 
[Victor Verdugo](https://sites.google.com/view/vverdugo/). Victor had a part of 
his PhD work on how to break symmetry for 
[sum-of-squares](https://en.wikipedia.org/wiki/Sum-of-squares_optimization). The
timing for this blog post is pretty good: the paper of Victor on this topic 
just appeared on arxiv, 
[here](https://arxiv.org/abs/1811.08539).

## Double-blind for DISC
The conference [DISC](http://www.disc-conference.org/wp/) will go 
double-blind next year (that is the names of both the reviewers and the authors will
be anonymized).[^2] At first I was sceptical about this idea, 
because of the usual reasons: extra-care in the process (e.g. when talking to 
people) with probably no big impact, etc. But recently I reviewed a paper by 
authors from a university I had never heard of, and I felt that before even 
starting I had a negative bias. I think double-blind is exactly about 
protecting authors from this bias. 

I heard many times that the 
problem is that well-known people get their papers accepted although 
they are not good enough, and I think this cannot really change (because 
of arxiv, favourite topics, writing style), but it's the other side of the 
spectrum that can be made more fair. So let's see how it goes.

## A few points on networks and games
I attended a talk at LIP6 by 
[Ariel Orda](http://webee.technion.ac.il/Sites/People/ArielOrda/) on game theory 
and networks. The talk described two very interesting works, but 
I just picked a few non-specific things that caught my interest. 

### Network formation games
The first topic is about understanding the structure of real-world networks, by 
finding ways to build algorithmically networks that have similar properties. 
A well-known generation algorithm is the 
[Barabási–Albert model](https://en.wikipedia.org/wiki/Barab%C3%A1si%E2%80%93Albert_model) 
where nodes basically arrive one by one and choose who to be linked to, 
based on the degree of the nodes that already arrived. There is a second 
type of network formation model that I didn't know,[^3]<sup>,</sup>[^4] which is to start 
with a fixed set of nodes, and to make them play a game to decide 
which edges are in the graph. 
For example, the nodes want to maximize their pay-offs in a game where every 
link cost something, but having short paths to every node is rewarded. 
These are called network formation games.  

### Monetary transfer
The second idea is about introducing money in games.
Suppose you have a Nash equilibrium 
that is very bad (for some definition of bad) because each player, when 
maximizing its gain, is hurting the other players a lot. Then you can introduce
monetary transfer, that consists for two players A and B to agree that if the 
A does this thing that decreases its pay-off but increases the pay-off 
of B, then B will give part of its 
pay-off to reimburse A, and both will be happier. Natural idea to 
consider, but that I had never heard of.

### Using motifs to validate a model
I knew that people studying social 
networks are obsessed with finding motifs (small graphs that appear more 
often than others), but I was not sure why. It could be just to have 
more knowledge about the relationships, but in Orda's talk, it was 
also a way to validate a model. Basically: in real-world graphs this and that 
motifs are very common, we don't know why, and previous generative 
models did not have this property, but their model could capture this. 
As far as I know, parameters such as the diameter, or the clustering 
coefficient are more classic ways to validate such models.

### About the price of anarchy, selfishness and collaboration
The [price of anarchy](https://en.wikipedia.org/wiki/Price_of_anarchy), 
is the ratio between the social cost when each players tries to optimize 
its own pay-off, and when all the players play the strategy that minimize 
the social cost. It is often said that this price is the price to pay 
when players are selfish. But it is not completely true, it is also the 
price of not collaborating. You can image scenarios in which players have
the option of collaborating but each player will agree only if it ensures 
 a better pay-off. That is the players are still selfish but 
they can talk to each other and make agreements. 
This can change the outcome a lot. Then one 
will consider what is called a Nash bargaining solution.

---

#### Footnotes 
[^1]: If you are interested, see [Fabian Reiter's very nice PhD thesis](https://arxiv.org/abs/1805.06238), and the [gentle introduction](https://semidoc.github.io/reiter-dga) to the topic I wrote on semidoc.
[^2]: See [this tweet](https://twitter.com/JukkaSuomela/status/1065259077738082304)
[^3]: There seems that there is no third well-known way to generate networks, at least in the [wikipedia article about network formation](https://en.wikipedia.org/wiki/Network_formation).
[^4]: Actually I somehow knew because of [this paper](https://dl.acm.org/citation.cfm?doid=3178876.3186122) by my PhD advisor and colleges, but I had forgotten.

