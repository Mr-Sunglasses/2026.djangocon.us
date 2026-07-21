---
category: talks
end_datetime: 2026-08-26 14:35:00-05:00
permalink: /talks/breaking-the-request-chain-rethinking-service-communication-in-django-systems/
presenter_slugs:
- mohammad-ahtasham-ul-hassan
- muhammad-arif
room: Sauganash Ballroom
start_datetime: 2026-08-26 13:50:00-05:00
tags:
- Cloud
- deployment
- IPC
title: 'Breaking the Request Chain: Rethinking Service Communication in Django Systems'
track: t0
---

Many distributed systems begin with a simple pattern: Service A calls Service B, which calls Service C
 (**A -> B -> C and so on**), all through synchronous HTTP requests. In Django applications, where request/response workflows are the default, this approach often feels natural and easy to implement and is the go to for almost everyone.

But as systems grow, however, these synchronous chains can quietly become a bottleneck. Each request that waits on another service keeps an application worker occupied.

In typical Django deployments running behind Gunicorn, concurrency is limited by the number of available workers, so requests that spend time waiting on downstream services can quickly tie up capacity.

Thinking about autoscaling?? It doesn’t help either if every instance is still waiting on the same external dependencies. What started as simple service interactions can evolve into tightly coupled request chains where latency compounds across services and failures propagate in unexpected ways.

In this talk, we will walk through how we gradually untangled these dependencies and introduced patterns that reduce tight coupling between services.

We’ll explore practical approaches Django teams can adopt, such as caching frequently requested data, using background workers and queues  (for example Celery), using async proxies, and introducing event-driven workflows where appropriate, to decouple services and improve resilience.

The goal isn’t to argue that synchronous HTTP is inherently bad, many Django systems rely on it successfully. Instead, this talk focuses on recognizing when synchronous dependencies start to hurt scalability and reliability, and how Django developers can evolve their systems toward more resilient communication patterns without rewriting everything from scratch.

If you’ve ever debugged a request that touched multiple services and discovered that everything was waiting on everything else, this talk will likely feel very familiar.