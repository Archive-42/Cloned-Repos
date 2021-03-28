---
layout: post
title: Fast self-stabilizing bit dissemination
redirect_from: "/2017/03/09/boczkowski-3-bits/"
permalink: boczkowski-3-bits
---

### Introduction
(The introduction is in French and English, the text itself is in English)

fr : Bonjour, et bienvenue pour le premier vrai post de ce blog. Aujourd'hui [Lucas Boczkowski](https://www.irif.fr/~lboczko/) résume (en anglais) l'exposé qu'il a donné au séminaire des doctorants le 22 février 2017 à propos de l'article [*Minimizing Message Size in Stochastic Communication Patterns: Fast Self-Stabilizing Protocols with 3 bits*](https://arxiv.org/abs/1602.04419), présenté avec ses co-auteurs à SODA 2017. Si vous avez des commentaires n'hésitez pas à les envoyer, à Lucas ou bien à moi (respectivement lboczko et feuilloley at irif.fr).

en: Hi everyone, and welcome to the first real post of this blog. The following text is a summary (in English) by [Lucas Boczkowski](https://www.irif.fr/~lboczko/) of the talk he gave at the PhD seminar on the 22nd of February 2017. It is about the paper he and his coauthors presented at SODA this year: [*Minimizing Message Size in Stochastic Communication Patterns: Fast Self-Stabilizing Protocols with 3 bits*](https://arxiv.org/abs/1602.04419). For any comment, send an email to Lucas or to me (respectively lboczko and feuilloley at irif.fr).

# Setup and result
Consider the following scenario.
A school of $n$ fish has to decide whether to keep moving forward or change direction. We model an answer to this question by a binary bit $b \in \{0,1\}$.
An informed source, perhaps a fish who saw a predator, is convinced on what the correct choice of $b$ should be and she wishes to spread  it to her peers. On each round every fish looks at $O(1)$ randomly chosen other fish.
If they see the source or someone who knows $b$ they learn it themselves.

We will be interested in information spreading of the kind we just described.
Let us denote  by *SIMPLE* this simple example. It can be shown that *SIMPLE* only needs $O(\log n)$ rounds to finish with high probability (w.h.p). 
In this work, we seek to understand what are the harshest conditions under which such efficient spreading of information can be implemented.
Our result is a generalization to a more general context that still runs in $\tilde{O}(\log n)$ rounds.

To begin with, it should be pointed out that *SIMPLE* already has some nice features. Agents interact *stochastically* and *anonymously*. When they interact they only need to exchange one bit which is $b$. In fact, we should be more precise and say they actually exchange two bits one saying if they are *knowledgeable* and the other possibly giving the value $b$. 

On top of this, we add a requirement known as *self-stabilization*. This means that no matter what the agents inner state is at the beginning of the protocol, they should after some (hopefully short) time get to know the source bit $b$. Even if initially most fish wanted to go forward, if the informed source saw a predator, she will manage to influence the whole school.
The self-stabilizing requirement  can be a daunting one. Indeed, the more complex a protocol is, the more states the agents are allowed to have, the more cases a proof of self-stabilization needs to handle.
Another view on self-stabilization is that if the source for some reason, in the middle of the execution of the protocol changes her mind from $b$ to $1-b$ then soon after that, the mechanism allows everyone to agree on $1-b$.

Regarding communication, we allow the agents to have a big memory, but we ask that messages exchanged on each round by each agent are of small size. 
In other words, 
even if agents are able to do sophisticated computations privately, only few bits are exchanged on each interaction.

Let us now go back to *SIMPLE* and try and understand why it does not meet our demands. 
First we need to be slightly more precise and define what happens when two knowledgeable agents with different opinions meet. For concreteness let us say that in this case they flip opinions, except for the source of course. In the first paragraph, such a situation didn't occur because we implicitly started from a very favourable configuration where nobody was in a ``knowledgeable state", i.e., thought they had already seen the source.
But in fact, if we start with everybody being knowledgeable, and being convinced of the wrong value of $b$, convergence will be very slow. Other similar simple rules share this burden of being slow, or they are demanding in terms of message size.

Our main result is the following.

**Theorem**
 There exists a  protocol, which solves the *broadcast* problem in a self-stabilizing manner in $\tilde{O}(\log n)$ rounds w.h.p using $3$-bit messages.

Note these $3$ bits in principle allow to encode information such as *I am the source* but it is not enough to say *I saw the source $k$ rounds ago* for more than $\Omega(1)$ distinct values of $k$.

# Sketch of proof of the Theorem

The proof consists of three steps.

* We first show that the problem can be reduced to that of agreeing on a counter modulo $O(\log n)$.
* We then build such a counter  in $\tilde{O}(\log n)$ rounds using large messages.
* A message reduction tool is invoked to reduce the message size down to $O(1)$, paying only a small $o(\log n)$ multiplicative overhead in the number of rounds.

## Step $(1)$ 
	
Under the assumption that all agents share the same clock modulo $T = C \log n$ for a big constant $C$, the following trick shows how to obtain convergence  in $O(\log n)$ time. Each phase of length $T$ is subdivided into two subphases of length $T/2$, the *morning* and the *evening*. In the morning, non-source agents are *sensitive* to opinion $0$. This means that whenever they see another agent displaying $0$, they turn their displayed bit to $0$, but if they see $1$ they ignore it. Then, in the evening, they do the opposite, namely they switch the displayed bit to $1$ as soon as they see a $1$. 

Consider the phase (i.e., morning+evening) starting after initialization.  If $b=0$ after morning is over at time $T/2$, every displayed bit is $0$ w.h.p., and remains there forever. Otherwise, if $b=1$, after the first evening, $[T/2+1, T]$, all displayed bits are set to $1$ w.h.p., and remain $1$ forever. Note that a common time notion is required to achieve correctness, and this cannot be assumed in a self-stabilizing framework as the common clock is a part of the memory which could be initially corrupted.

## Step $(2)$
Step $(2)$ is based on the protocol *MAJORITY* from the paper *[Stabilizing consensus with the power of two choices](http://vesta.informatik.rwth-aachen.de/opus/volltexte/2010/2429/pdf/09371.ScheidelerChristian.Paper.2429.pdf)*. To design a clock modulo $T$ each agent displays $\log T$ bits corresponding to the binary expansion of a number $< T$. On each round, each agent samples the counters of $2$ other agents uniformly at random. Then *3-MAJORITY* is applied bitwise and the counters are also incremented on every round. 

At this stage, convergence of the counters may seem counter-intuitive. Each bit of each counter is affected both by the operation of incrementing and also by the majority rule. It turns out however that this solution works in $O(\log T \log n)$ rounds provided $T$ is a power of $2$. However it uses $\log T$ bits messages and later we want $T$ to be of order $\log  n >> 1$.

## Step $(3)$

In this part, our main lemma is the following.

**Informal lemma**
In our context, any protocol  $\Pi$ using $\ell$ bits messages can be emulated by another one using $\lceil \log \ell \rceil +1$ bits messages, at the cost of only a small overhead in the running time.

*Informal proof*
We know from the previous step how to design a counter modulo $\ell$ using $\lceil \log \ell \rceil $ bits. This can be interpreted as an index saying which bit of the $\Pi$-message  to display. Looping over indices of $\Pi$ allows, within $\ell$ rounds to emulate \emph{one} round of $\Pi$.

The lemma can be applied to any protocol, and in particular\ldots to the clock synchronization protocol we saw in Step $2$. This reduces the message size from $\log T$ to $\lceil \log \log T\rceil +1$. We can keep iterating this and
we are able to reduce the message size until reaching the fixed point of $T \mapsto \lceil \log T \rceil + 1$ which happens to be $3$.

# Open questions
Does there exist a $1$ bit efficient solution to the *broadcast* problem ? A solution that does not build a clock would be of special interest to us. 
