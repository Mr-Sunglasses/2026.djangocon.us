---
category: talks
end_datetime: 2026-08-26 17:45:00-05:00
permalink: /talks/beyond-rest-implementing-the-model-context-protocol-mcp-in-django/
presenter_slugs:
- kumar-shivendu
room: Sauganash Ballroom
start_datetime: 2026-08-26 17:00:00-05:00
tags:
- Integrating AI in production
title: 'Beyond REST: Implementing the Model Context Protocol (MCP) in Django'
track: t0
---

Django has long been the "batteries-included" framework for building user-facing web apps. But in upcoming times, the primary "user" of your backend might be an AI agent taking actions on behalf of your users.

This session provides a technical blueprint for implementing an MCP server within a Django project. 

Key areas we will cover:

- MCP Protocol Primitives: Mapping the Host-Client-Server interaction model to the Django application lifecycle.
- SSE Transport via ASGI: Implementing stateful Server-Sent Events for persistent, bidirectional transport over HTTP.
- Schema Mapping: Transforming service-layer functions into executable JSON-RPC tools and ORM models into discoverable resources.
- The "Context Tax": Quantifying the bottlenecks of latency, state serialization, and token window orchestration in agentic workflows.
- Auth & Input Validation: Extending Django’s RBAC and validation layers to sanitize and authorize non-deterministic LLM inputs.

We will conclude with a **live demo**: connecting a local Claude Desktop instance to a Django backend to perform real-time data manipulation via a standard MCP connection.

### Who Should Attend
Intermediate to Advanced Django developers who have built standard REST APIs and are now looking to integrate their systems with AI agents. If you are curious about moving from "chatting with data" to "taking action with data," this talk is for you.

### Prerequisites
- Basic familiarity with Django models and the ORM.
- Basic understanding of Asynchronous Python (async/await)
- Foundational knowledge of LLM tool-calling (how models use external functions)