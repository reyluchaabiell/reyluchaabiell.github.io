---
layout: writeup-layout.njk
title: "Hello World: This my new journey to reporting my own as a cybersecurity practitioner."
date: 2026-09-22
category: REPORT
tags: 
  - writeups
  - writing
  - opening
  - report
description: "The first post on this blog. It discusses the background behind creating a static blog for CTF documentation and cybersecurity research."
---

## TL;DR
Writing good reports is one of the fundamental skills for a security analyst. I created this blog as a platform to document every finding, *malware* analysis, and CTF *write-up* I’ve completed.

## 1. RECON
In the *cybersecurity* industry, a public portfolio is far more valuable than mere claims of expertise. I identified the need for a *blogging* platform that is fast, secure (without a *database*), and easy to manage, much like a code repository.

## 2. PLANNED
The original plan was to use a standard GitHub repository. However, to give the site a professional look and improve *readability*, I decided to build a *Static Site Generator* (SSG) using Eleventy (11ty). The main content will be divided into specific categories: WEB, PWN, and FORENSICS.

## 3. EXECUTION
This site was built entirely using *vanilla* HTML, CSS, and JavaScript on the *client* side. The use of Markdown simplifies technical writing (such as embedding *log files* or lines of exploit code). The search feature (*live search*) is implemented directly in the user’s browser to prevent *Cross-Site Scripting* (XSS) vulnerabilities.

## 4. SUMMARY AND LESSON LEARNED
With the launch of this blog, my documentation infrastructure is now in place. An important lesson from this phase is that building something based on the *Secure by Design* principle (such as choosing a static website over a dynamic CMS) will significantly reduce maintenance time in the future.

*Hunt Logic, Not Luck.*