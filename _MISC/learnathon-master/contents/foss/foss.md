---
title: "What is Free and Open Software"
subtitle: "Introduction to FOSS and some examples of free software"
date: '2019-06-15'
keywords: "FOSS, free software, open source, Learnathon, Sagarmatha"
writer: 'Diwakar Wagle'
---

### Introduction (What is FOSS and OSS?)
Most of the softwares we use daily are proprietary in nature i.e. the publisher or the author retains all or most of the rights. These rights include copyright of the source code and patent rights. The user needs to agree to the non-negotiable end-user licence agreement(EULA) specified by the vendor to use the software. 

Free and Open Source Softwares (FOSS), on the other hand, give the user the right to use, change and distribute the software as the source code is shared openly. FOSS is a broad term that includes [Free Software](https://www.gnu.org/philosophy/free-sw.en.html) as well as [Open Source Software](https://opensource.org/osd). Technically, free software licences are compatible with open source licences but might have philosophical differences. According to the [FSF](https://www.fsf.org/), free software must provide four essential freedoms to the user:
* The freedom to run the program as you wish, for any purpose (freedom 0).
* The freedom to study how the program works, and change it so it does your computing as you wish (freedom 1). Access to the source code is a precondition for this.
* The freedom to redistribute copies so you can help others (freedom 2).
* The freedom to distribute copies of your modified versions to others (freedom 3). By doing this you can give the whole community a chance to benefit from your changes. Access to the source code is a precondition for this.The word 'free' in free software refers to the user's freedom rather than the monetory cost of the software. Although, as a side effect of releasing the source code freely, usually the software is available free of cost as well. 

Free softwares are different from softwares in public domain. Although the source code of softwares in public domain is freely available, the software does not have ownership such as copyright, trademark or patent. Whereas, free software hands the ownership of the software to the user. A user of a free software cannot release the software as a public domain as it may impinge on the rights of other users. E.g. [SQLite](https://sqlite.org/index.html) is a popular software in public domain. 

## How it all started
Closed-source softwares were uncommon in the early days. Softwares were often shared as public-domain softwares, as they were developed by academics and corporate researchers in collaboration. Later the openness and co-operation declined as the cost of producing softwares increased and the competion between the companies grew. AT&T used to distribute UNIX to academics and the government for free. Later as the popularity of UNIX grew, AT&T stopped the free distribution and charged for system patches. UNIX was equally popular among hobbyists and [hackers](http://www.catb.org/jargon/html/H/hacker.html), who didn't like these new restrictions being imposed. One of these hackers working at [MIT's AI Lab](http://www.csail.mit.edu/), Richard M. Stallman decided to create his own operating system called GNU (recursive acronym for "GNU's Not UNIX") that he would distribute for free for others to use and improve upon. In 1983, he [announced](https://www.gnu.org/gnu/initial-announcement.en.html) [The GNU Project](https://www.gnu.org/gnu/thegnuproject.en.html) in net.unix-wizard newsgroup. He later released the [GNU General Public License](https://www.gnu.org/licenses/old-licenses/gpl-1.0.en.html)(GPL) in 1989. It was the start of the free software movement. The Free Software Foundation (FSF) was established in 1985 to support this movement.

In August 1991, Linus Torvalds [announced](https://groups.google.com/forum/#!topic/comp.os.minix/dlNtH7RRrGA%5B1-25%5D) that he was working on a new OS (later named [Linux](https://www.kernel.org/)) which he later released under GPLv2. This further popularised the GPL license and free software movement in general. 

### Advantages of using FOSS

* The user has more control on the behavior of the software as free software are more customizable, and the changes to the source code can be merged into the original software for the benefit of others.
* Free softwares are usually free of cost or have low cost.
* FOSS allows better collaboration between different parties thus reduces the duplication of effort. This has a positive effect on the efficiency and quality of the software.
* The privacy and security features of free softwares can be verified as the source is readily available. Bugs in the softwares are identified fast and solved efficiently.


### limitations of FOSS
* Sometimes FOSS softwares are incompatible with the hardware or another proprietary software.
* As most of the free softwares are built by volunteers, the user support and security may be lacking. They are provided without any guarantees so the user can't rely on the provider for help and support when software malfunctions.
* User may find hard to find a free software applicable for his/her particular need. Their are fewer FOSS applications compared to proprietary softwares.

### How to release your software as FOSS

1. Choose a Version Control System (e.g. [git](https://git-scm.com/), [mercurial](https://www.mercurial-scm.org/), [svn](https://subversion.apache.org/)) to manage your source code versions. 
2. Choose an open source license for your software. [choosealicense](https://choosealicense.com) could be helpful for this.
3. Write some code and host it in one of the free online hosting services (e.g. [Github](https://github.com), [Gitlab](https://about.gitlab.com/), [Bitbucket](https://bitbucket.org/), [Savannah](https://savannah.gnu.org), [SourceForge](https://sourceforge.net/) etc.) 

### Some examples of FOSS software

#### [Linux](https://kernel.org/)
  The Linux kernel is a free and open-source Unix-like operating system kernel. The GNU/Linux distributions are based on this kernel and packaged with the GNU coreutils along with other various user-space applications. It is released under GPLv2 license.
  
#### [firefox](https://www.mozilla.org/firefox/)
  Firefox is a cross-platform web browser developed by [Mozilla](https://www.mozilla.org/firefox/. It is second most used web browser after Google Chrome.

#### [GCC](https://gcc.gnu.org)
  GNU Compiler Collection (GCC) is a compiler Suite that is part of the GNU Project. It supports various programming languages and is ported to many instruction set architectures.


#### [VLC](https://www.videolan.org/vlc/index.en-GB.html)
  VLC is a cross-platform media player and streaming media server. This LGPLv2.1+ licensed media player supports wide ranges of audio and video formats.

#### [FFmpeg](https://ffmpeg.org)
  FFmpeg is a collection of libraries and programs for handling multimedia files and stream. It is used for format transcoding, audio and video editing, video scaling and post-production effects.
  
#### [LibreOffice](https://www.libreoffice.org)
  It is a free and open source office suite maintained by [The Document Foundation](https://www.documentfoundation.org). It also supports Microsoft Office's file formats.

#### [Apache HTTP Server](https://httpd.apache.org)
  Apache is the most popular web server used currently. It is released under Apache License 2.0.

#### [Blender](https://www.blender.org/)
  Blender is a 3D computer graphics software used by many commercial media companies to produce animations and CGI.

#### [Nmap](https://nmap.org/)
  Nmap is a popular cross-platform network scanner used to discover hosts and services on a computer network. It is released under GPLv2 license.

#### [GnuPG](https://gnupg.org/)
  GNU Privacy Guard (GPG) is an encryption program that provides cryptographic privacy and authentication for data communication. It is released under GPLv3 license.

#### [OpenSSH](https://www.openssh.com/)

  OpenSSH is a suite of network tools based on [Secure Shell](https://en.wikipedia.org/wiki/Secure_Shell)(SSH) protocol.

#### [GIMP](https://www.gimp.org)

  GNU Image Manipulation Program (GIMP) is a cross-platform raster graphics editor released under GPL version 3+ license. It is used for image retouching and editing, converting between different image formats, free-form drawing etc.


### Additional Resources

* [What does free mean](http://www.debian.org/intro/free.html)
* [Free as in Freedom](https://www.oreilly.com/openbook/freedom/)
* [Categories of free and non-free softwares](https://www.gnu.org/philosophy/categories.html)
* [List of GNU softwares](https://www.gnu.org/software/software.html)
* [Benefits of Open Source](http://www.albion.com/security/intro-7.html)




