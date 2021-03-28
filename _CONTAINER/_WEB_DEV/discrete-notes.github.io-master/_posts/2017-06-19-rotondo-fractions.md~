---
layout: post
title: Combinatorics of continued fractions 
redirect_from: "/2017/06/19/rotondo-fractions/"
permalink: rotondo-fractions
---

Hello, today's post is by [Pablo Rotondo](https://www.irif.fr/users/rotondo/index) who gave a talk at the seminar a few months ago. As there is more to say about the subject, this post will probably have a follow-up post later.

-----

In this post we discuss **[continued fraction expansions](https://en.wikipedia.org/wiki/Continued_fraction)**, their statistics and conclude with one of our results regarding the application of these to [Sturmian Words](https://en.wikipedia.org/wiki/Sturmian_word).

# Introduction
Continued fractions are rather ubiquitous, they pop up in various contexts such as: 

* the [Euclidean Algorithm](https://en.wikipedia.org/wiki/Euclidean_algorithm) ;
* [Pell's equation](https://en.wikipedia.org/wiki/Pell%27s_equation) (see [here](http://www-bcf.usc.edu/~lototsky/PiMuEp/Pell-IMO.pdf) and [here](http://math.stanford.edu/~jbooher/expos/continued_fractions.pdf)) ;
* [Diophantine approximation](https://en.wikipedia.org/wiki/Diophantine_approximation) - the approximation of reals by rationals.

### Relation to the Euclidean algorithm and definitions.

Let us briefly see their relation to the Euclidean algorithm as an introduction.

The Euclidean algorithm allows us to calculate the greatest common divisor ($\gcd$) of 
a pair of positive integers $(x,y)$, by performing successive divisions. Supposing
$x\geq y$, the algorithm proceeds by applying $(x,y)\mapsto (y,x\bmod y)$ until the
smallest entry $y$ is $0$ and the result is then $x$. Its correctness is seen from the fact
that $x\bmod y = x - y \, \lfloor x/y\rfloor$, and therefore $\gcd(x,y)=\gcd(y,x\bmod y)$.

Let us get to the continued fractions, given a pair of positive integers $(x,y)$
with $x\geq y$ we may write

$$
\frac{y}{x} = \frac{1}{x/y} = \cfrac{1}{\lfloor x/y \rfloor + \cfrac{x\bmod y}{y} }\,,
$$

and then continue the procedure with $\cfrac{x\bmod y}{y}$ provided that $x\bmod y \neq 0$. This is
exactly the Euclidean algorithm, and observe that the quotients $\lfloor x/y\rfloor$
that we discard in the algorithm here appear as coefficients.

Thus the Euclidean produces a continued fraction expansion 

$$
\frac{y}{x} = \cfrac{1}{m_1 + \cfrac{1}{\ddots + \cfrac{1}{m_k} }}\,,
$$

where the positive integers $m_1,\ldots,m_k$ are the successive quotients in the algorithm.

More generally, we call any such expansion a continued fraction expansion and even given infinitely many coefficients $m_1,\ldots,m_k,\ldots$ we define

$$
\cfrac{1}{m_1 + \cfrac{1}{m_2+\ddots} } = \lim_{k\to\infty}\cfrac{1}{m_1 + \cfrac{1}{\ddots + \cfrac{1}{m_k} }}\,,
$$

whose convergence we do not prove here, but you can find a proof in Kinchin's book.

Rational numbers have exactly $2$ expansions

$$
\frac{y}{x} = \cfrac{1}{m_1 + \cfrac{1}{\ddots + \cfrac{1}{m_k} }}= \cfrac{1}{m_1 + \cfrac{1}{\ddots + \cfrac{1}{(m_k-1) + \cfrac{1}{1}} }}\,,
$$

while irrational numbers $\alpha\in (0,1)$ have a unique (infinite) expansion, which can be found applying the same Euclidean algorithm (!) to the pair $(1/\alpha,1)$.

Some remarkable examples of continued fractions are:

$$
\frac{\sqrt{5}-1}{2} = \cfrac{1}{1+\cfrac{1}{1+\cfrac{1}{\ddots}}}\,,
$$

$$
\qquad e-2 = \cfrac{1}{1+\cfrac{1}{2+\cfrac{1}{1+\cfrac{1}{1+\cfrac{1}{4+\cfrac{1}{1+\ddots}}}}}}\,,
$$

the last one being made up from the concatenation of the trios $1,2n,1$ for $n=1,2,\ldots$ (for a proof see [this](https://arxiv.org/abs/math/0601660) arXiv note or [this](https://topologicalmusings.wordpress.com/2008/08/04/continued-fraction-for-e/)).

###Notations 
Given an irrational number $\alpha \in (0,1)$ with continued fraction expansion

$$
\alpha  = \cfrac{1}{m_1 + \cfrac{1}{m_2+\ddots} }\,,
$$

the coefficients $m_1,m_2,\ldots \geq 1$ are called _partial quotients_ or _digits_, while the partial expansions

$$
\frac{p_k(\alpha)}{q_k(\alpha)} := \cfrac{1}{m_1 + \cfrac{1}{\ddots + \cfrac{1}{m_k}}}\,,
$$

with 
$$
\gcd(p_k(\alpha),q_k(\alpha)) = 1
$$, 
are known as *convergents*. By convention we define $p_0=0$ and $q_0=1$ for every irrational $\alpha\in (0,1)$. The denominators $(q_k(\alpha))_{k\in \mathbb{N}}$ of the convergents are known as the *continuants* of $\alpha$.

Of course, all of these definitions can be extended to rational numbers by considering only the meaningful part (that is when $k$ is smaller than the length of the expansion). See [here](http://stackoverflow.com/questions/5440688/the-guess-the-number-game-for-arbitrary-rational-numbers) for a particularly interesting application to a game of guessing a rational number!


### Number of steps in the Euclidean algorithm.

The depth of the continued fraction expansion of a rational number $x/y$ is exactly the number of steps $\ell:=\ell(x,y)$ performed by the Euclidean algorithm on $(x,y)$. To bound $\ell$, we remark that the denominators satisfy the following recurrence relation

$$
q_{k+1} = m_{k+1}q_k + q_{k-1}\,,\quad q_0=1,q_{-1}=0\,.
$$

This is proved by induction, along with the analogous (up to the initial condition) recurrence relation for the numerators $p_k$. 
It is evident from the recurrence relation that $q_k$ is strictly increasing, furthermore

$$
q_{k+1} = m_{k+1}q_k + q_{k-1} \geq 2 q_{k-1}\,,
$$

so that $q_k \geq 2^{\frac{k-1}{2}}$.

Picking $k=\ell(x,y)$, the previous inequality reads $y\geq 2^{\frac{\ell-1}{2}}$ so that 

$$ 
\ell(x,y) \leq 1 + 2 \log_2 y\,. 
$$


# Classical Continued Fraction Statistics
We have just seen that convergents $q_k(\alpha)$ grow at least exponentially

$$
2^{\frac{k-1}{2}} \leq q_k(\alpha)\,,
$$

we briefly mention that much more precise results are known when we allow $\alpha$ to be almost any irrational in $(0,1)$.

**Ce résultat est fou, je pense qu'il faudrait le dire**

**Theorem** [Lévy]
For almost every $\alpha\in (0,1)$ (w.r.t the Lebesgue -uniform- measure) we have

$$
\lim_{k\to\infty}\frac{1}{k}\log q_k(\alpha) = \frac{\pi^2}{12 \log 2}\,.
$$


This result is proved by using [Ergodic Theory](https://en.wikipedia.org/wiki/Ergodic_theory). Continued fractions are naturally associated to the
so called Euclidean Dynamical System arising from the [Gauss map](https://en.wikipedia.org/wiki/Gauss_map)

$$
T \colon (0,1)\to (0,1) \,,\qquad x\mapsto \left\{\tfrac{1}{x}\right\}\,,
$$

where $\{x\}:=x-\lfloor x\rfloor$ is the _fractional part_ of $x$.

Interestingly, it is also true that the frequency of $m_j=k$ tends to
$\log_2\left(1+\frac{1}{k(k+2)}\right)$ almost surely as we take more and more quotients.
For more on this read the notes [here](http://www.maths.manchester.ac.uk/~cwalkden/ergodic-theory/ergodic_theory.pdf) or the classic Khinchin 97.

#Best approximations
Convergents are particularly important due to the fact that they provide the ``best'' approximations to numbers in the following sense

_Definition_ [Best approximations of the second kind]
Let $\alpha \in (0,1)$ be a real number. Then the fraction $\tfrac{p}{q}$ with $q>0$ is said to be a best approximation of the second kind for $\alpha$ if and only if

$$
|q \alpha - p| < |q^\prime \alpha - p^\prime|
$$

for any other fraction $\tfrac{p^\prime}{q^\prime}$ with $0<
q \prime \leq q$.

Remark that 
$$
|q \alpha - p| = \frac{| \alpha - p / q|}{1/q}
$$ so that this ``objective function'' can be thought of as the error of approximating $\alpha$ by $p/q$, relative to the size of the denominator $q$. We are ready to state the relation with continued fractions

**Theorem** [See Khinchin 97]
Best approximations of the second kind are necessarily convergents, and conversely, every convergent is a best approximation of the second kind, with exception of the trivial case of

$$
\alpha = \frac{1}{2},\qquad \frac{p_0}{q_0} = 0\,.
$$

Concretely, this means that if we may choose from the set of fractions whose denominators are at most $n$, the best approximation is given by $\frac{p_k(\alpha)}{q_k(\alpha)}$ with $k:= k(\alpha,n)$ is the only index $k$ for which $q_k(\alpha)\leq n < q_{k+1}(\alpha)$.


We remark that it is the continuants under the condition $q_k(\alpha)\leq n < q_{k+1}(\alpha)$ and $n\to \infty$ that will eventually interest us, rather than the classical fixed depth $k\to \infty$.

**Peut-être clarifier un peu**

# Sturmian Words
[Sturmian words](https://en.wikipedia.org/wiki/Sturmian_word) are infinite words ${\bf{u}}=u_0u_1\ldots\in \mathcal{A}^\infty$ (sequences of symbols $u_i$ from an alphabet $\mathcal{A}$) that have numerous

**peut-être définition plutôt que caractérisations ?  **

 characterizations, as the coding of digital lines, as rotation sequences, minimal complexity sequences...  

**Disclaimer** The reader interested only in continued fraction may skip this section, but it is good to know that the best approximation of the second kind is directly related to the frequency of finite patterns within Sturmian words, and that continued fractions also turn up in the study of their recurrence properties (see Theorem **XXXXXXXXX**). We remark also that the study of the recurrence function of Sturmian words was our main motivation in **XXXXXXXX**.

*Definition* [Sturmian word]
Consider $\alpha,\beta \in [0,1)$ with $\alpha$ irrational. We define infinite words
$$
\left(\underline{s}_{\alpha,\beta}(n)\right)_{n\in\mathbb{N}}
$$ 
and 

**peut-être un mot pour dire comment on prononce (top et bottom ?)**

$$
\left(\bar{s}_{\alpha,\beta}(n)\right)_{n\in\mathbb{N}}
$$ 
by

$$
 \underline{s}_{\alpha,\beta}(n)= \left\lfloor (n+1)\,\alpha +\beta \right\rfloor - \left\lfloor n\,\alpha +\beta \right\rfloor\, ,
$$

and

$$
 \bar{s}_{\alpha,\beta}(n)= \left\lceil (n+1)\,\alpha +\beta \right\rceil - \left\lceil n\,\alpha +\beta \right\rceil\,,
$$

 for each $n\in \mathbb{N}$. A binary word ${\bf{u}} \in \{0,1\}^\infty$ is Sturmian if and only if it is of the form 
$$
u_n = \underline{s}_{\alpha,\beta}(n),\,\forall n
$$,
or 
$$
u_n = \bar{s}_{\alpha,\beta}(n),\,\forall n
$$ 
for some $\alpha,\beta$ as above. The irrational number $\alpha$ is called the *slope* of the word $\bf{u}$.


**Remark** Observe that if ${\bf{u}}=\underline{s}_{\alpha,\beta}$

$$
\lim_{n\to\infty} \frac{|u_0\ldots u_{n-1}|_1}{n} = \lim_{n\to\infty} \frac{1}{n}\,\sum_{i=0}^{n-1}u_i = \lim_{n\to\infty} \frac{\left\lfloor n\,\alpha +\beta \right\rfloor-\left\lfloor \beta \right\rfloor}{n} = \alpha\,,
$$

where 
$$
|\cdot|_1
$$
denotes the number of ones in the word 

**perso je préfère que la définition de |.|_1 soit avant la formule**

. Thus $\alpha$ represents the *frequency* of ones. Clearly the same result is true when 
$$
{\bf{u}}=\bar{s}_{\alpha,\beta}
$$ 
by the same argument. 

###Sturmian words as circle rotations 
The above definition can be seen more intuitively as the binary coding of the trajectory of a point on a circle of circumference $1$. This circle is realized as the interval $[0,1]$ identifying $0$ and $1$, that is, taking fractional parts $x\mapsto \{x\}$ or, equivalently, modulo one $x\mapsto x \bmod 1$.

Indeed, observe that

$$
\bar{s}_{\alpha,\beta}(n)=   1 \Longleftrightarrow n\alpha + \beta \leq m < (n+1)\alpha + \beta 
$$

for some integer $m$. By taking $\bmod 1$ it is immediately seen that this means that

$$
\bar{s}_{\alpha,\beta}(n)  = 1 \Longleftrightarrow \{n\alpha + \beta\} \in I_1  := [1-\alpha,1)\,,
$$

$$
\bar{s}_{\alpha,\beta}(n)  = 0 \Longleftrightarrow \{n\alpha + \beta\} \in I_0  := [0,1-\alpha)\,.
$$

A similar definition can be done for 
$$
\underline{s}_{\alpha,\beta}(n)
$$ 
by reversing the close-open in the border of the intervals. In terms of the circle, this reads: start from a point 
$$
y_0=\beta
$$ 
on the circle and rotate an arc-length of $\alpha$ on each discrete time 
$$
y_{k+1} = (\alpha + y_k)\bmod 1
$$, 
then code the resulting points by $1$ when they belong to 
$$
I_1
$$ 
and 
$0$ when they belong to 
$$ 
I_0
$$.

![](assets/rotondo_plot4.png){: .center-image height="300px"}

# Factors of Sturmian words.

The finite patterns appearing within our infinite words ${\bf{u}}$ are a fundamental object of study in the field of [Combinatorics on Words](https://en.wikipedia.org/wiki/Combinatorics_on_words). We say that $w\in \{0,1\}^m$ is a _factor_ of ${\bf{u}}$ if, for some index $i\geq 0$, we have 

$$ 
w_1\ldots w_m = u_i \ldots u_{i+m-1}\,, 
$$ 

and say that $m$ is its *length*.

We have seen that digits in a Sturmian word ${\bf{u}}$ correspond to intervals $I_0$ and $I_1$, this process can be iterated to explain what happens with larger factors $w\in \{0,1\}^m$. The result being that factors are in correspondance with the circle intervals delimited by

$$
0,-\alpha,-2\alpha,\ldots,-m\alpha\,,
$$

modulo $1$. 

![](assets/rotondo_plot3.png){: .center-image height="300px"}

**Remark** [Complexity of a Sturmian word]
Since $\alpha$ is irrational, the points

$$
0,-\alpha,-2\alpha,\ldots,-m\alpha\,,
$$

modulo $1$ are all distinct.

Thus the the above points delimit $m+1$ circle intervals: we have $m+1$ factors $w\in \{0,1\}^m$ of length $m$ appearing in $\bf{u}$. This is the smallest possible number of factors of length $m$ in the sense that, if we had at most $m$ factors of length $m$ for some $m$, our words would be eventually periodic.

The intervals-factor correspondence is independent from $\beta$. In particular, the set of factors of length $m$ appearing within ${\bf{u}}$ depends only on the choice of $\alpha$. Furthermore, the sequence $\{n\alpha\}$ is *equidistributed* (also known as [uniform distribution $\bmod. 1$](https://en.wikipedia.org/wiki/Equidistributed_sequence)) meaning that the proportion of the time it spends on an interval $I$ tends to its length 
$$
\left| I \right|
$$. 
Thus the initial point $y_0=\beta$ is not really important for our purposes.


The smallest (least frequent) interval delimited by 

$$
0,-\alpha,-2\alpha,\ldots,-m\alpha\,,
$$ 

in fact corresponds to the one given by $0$ and 
$$
\{-q_k\alpha\}
$$, 
where 
$$ 
q_k(\alpha)\leq m < q_{k+1}(\alpha)
$$, 
and has length 
$$
\Gamma(\alpha,m) := |q_k \alpha - p_k|
$$, 
by the Theorem of the *Best approximation* section.

# References.

* Aleksandr Ya. Khinchin. Continued Fractions.  _New York: Dover Publications_, 1997.
* M. Einsiedler and T. Ward. Ergodic Theory: with a view towards Number Theory. _Graduate Texts
in Mathematics. Springer, 2010._
* N. P. Fogg , V. Berthé, S. Ferenczi , C. Mauduit and Anne Siegel: Substitutions in Dynamics, Arithmetics, and Combinatorics _Lecture Notes in Mathematics, Vol. 1794._
