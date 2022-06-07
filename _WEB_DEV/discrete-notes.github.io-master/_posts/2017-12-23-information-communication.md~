---
layout: post
title: Communication complexity and information theory
redirect_from: "/2017/12/23/information-communication/"
permalink: information-communication
---

I attended the annual meeting of the [complexity and algorithms working 
group of the CNRS](https://www.irif.fr/~nschaban/GT-COA/) (GT CoA) a few weeks ago, and 
I wanted to review some parts of it. This is the first element of a series of 
posts. The talks at this meeting were quite 
technical, and I cannot give a deep overview of each them. So instead 
I will just write about some details that caught my attention, and that are easy 
to explain, or, like today, give a very succinct	 summary of the story. 
For most of the talks, the post will deal with basic considerations, and 
not with the new things developed by the speakers. 
For comments: feuilloley [at] irif [dot] fr.

---
The first talk was actually a lecture,
entitled _Information Theory and Communication Protocols_ by Florent Urrutia 
from [IRIF at Paris Diderot university](https://www.irif.fr/en/index). 

## Communication complexity

In a nutshell, [communication complexity](https://en.wikipedia.org/wiki/Communication_complexity)
measures the number of bits that some agents must exchange to complete a task. 
More precisely, in the basic setting, there are two players, 
traditionally named Alice and Bob, and each of them is given 
half of an input bit string. They both have to output the result of a boolean
function of the (whole) input. A task is for example to output the 
parity of the number of 1s in the input string.
Before outputting, they can communicate, that is exchange some bits one after the other.
Then an easy protocol is to send each other all the (half-)inputs they have, and 
then to compute the output in parallel. The basic question is: for which tasks
you can do better, that is sending less bits than the size of the input?

## Information complexity
In another nutshell, [information theory](https://en.wikipedia.org/wiki/Information_theory) 
measure the amount of information contained in some message given some context. 
This has been 
introduced by Shannon in the forties, and is used in many 
contexts. 
It requires formulas, with logs, sups, infs etc. to 
make this precise, and I do not want to dive into this. If you know about 
[Shannon entropy](https://en.wikipedia.org/wiki/Entropy_(information_theory)), 
[mutual information](https://en.wikipedia.org/wiki/Mutual_information) etc., 
you know what I mean. Otherwise, no problem, it is not really
necessary for this post. Now, very roughly speaking, _information complexity_ measures 
the amount of information that one needs to reveal to solve some task under some 
distribution, and its definition is based on the one of the entropy. 

## Information as a lower bound on communication
The focus of the course was to look at the relation between these two fields.
The main point, that is very powerful, can be stated as a naive sentence: the 
number of bits communicated in any protocol to solve the task 
must be larger than the information the players have 
to reveal, in theory, when communicating. Namely, the communication 
complexity must be at least 
the information complexity. As I have not properly defined the two notions, this 
may sound quite useless, I will try to convince the reader that it is interesting. 
What is surprizing is that these two notions are 
quite different in the way they are defined. The first one is defined as a simple 
worst-case measure and has a quite combinatorial flavour, it really counts bits. 
Indeed it is possible 
to prove lower bound on communication complexity by studying some combinatorics 
of 0-1 matrices.[^1]
The second one is defined as an infimum (over communication protocols) of a supremum 
over distributions of inputs of an (entropy-like) function that is based on a 
sum of logs. A pretty non-combinatorial object. 

I guess this inequality mainly means that these definitions are the right ones..!

## Further
It is not true that communication complexity is equal to information 
complexity, there can even be an exponential gap between those, but this happens 
in some very special context. See the paper _[Exponential Separation of 
Information and
Communication for Boolean Functions](https://pdfs.semanticscholar.org/fd13/ba5bb068e7887fb450ef6c2cc2a849652db2.pdf)_ 
(not for the beginners). 

Nevertheless, this approach is very powerful, and almost all the lower bounds 
we have on 
communication complexity can be phrased as information complexity lower bounds 
(See [this paper](https://arxiv.org/abs/1204.1505)). 

## Multi-party communication (the more the merrier... maybe not)
Multi-party communication is the setting in which the input is split between 
more than two players. In this new setting, lower bounds are 
difficult to get. A natural step is to use information complexity. 
But this is not easy. There are different 
ways to define the information revealed during a multi-party protocol, and none of 
ones we know gives very good bounds.  

## Footnotes
[^1]: See the classic _rectangle method_, for example in [this survey](https://pdfs.semanticscholar.org/6094/392d07d36c086a988493686b73ebca39169b.pdf).
