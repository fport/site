import AnatomyOfAServer from "./notes/mcp/anatomy-of-a-server.mdx";
import AttackSurface from "./notes/mcp/attack-surface.mdx";
import Authorization from "./notes/mcp/authorization.mdx";
import ClientPrimitives from "./notes/mcp/client-primitives.mdx";
import HostClientServer from "./notes/mcp/host-client-server.mdx";
import McpVsFunctionCalling from "./notes/mcp/mcp-vs-function-calling.mdx";
import RequestWalkthrough from "./notes/mcp/request-walkthrough.mdx";
import ServerPrimitives from "./notes/mcp/server-primitives.mdx";
import StatelessSpec from "./notes/mcp/stateless-spec.mdx";
import TheNxmProblem from "./notes/mcp/the-nxm-problem.mdx";
import ToolDesign from "./notes/mcp/tool-design.mdx";
import Transports from "./notes/mcp/transports.mdx";
import WhatMcpIs from "./notes/mcp/what-mcp-is.mdx";
import { mcpLayout } from "./mcp.layout";
import type { Garden } from "./types";

const UPDATED = "2026-08-29";

/**
 * The MCP garden reads left to right: the problem the protocol solves, its
 * shape, what a server actually exposes, how you write one, what can go wrong,
 * and where the spec moved in 2026.
 */
export const mcpGarden: Garden = {
  id: "mcp",
  path: "/garden/mcp",
  title: "MCP Garden",
  tagline:
    "The Model Context Protocol — the N×M problem, the architecture, the primitives, and the 2026 stateless spec.",
  description:
    "Working notes on the Model Context Protocol: why it exists, host/client/server roles, stdio and Streamable HTTP transports, tools, resources and prompts, designing tools an LLM can actually use, the security surface, OAuth 2.1 authorization, and the 2026-07-28 stateless specification.",
  clusters: [
    { id: "why", label: "why mcp exists", accent: "rose" },
    { id: "architecture", label: "architecture", accent: "sky" },
    { id: "primitives", label: "primitives", accent: "lime" },
    { id: "building", label: "building one", accent: "violet" },
    { id: "security", label: "security", accent: "amber" },
    { id: "spec", label: "where the spec went", accent: "slate" },
  ],
  frames: mcpLayout,
  initialZoom: 0.8,
  notes: [
    /* -------------------------------------------------------------- why -- */
    {
      slug: "what-mcp-is",
      title: "What MCP is",
      summary:
        "A standardised way to connect a model to external systems. Tool discovery for LLMs.",
      kind: "note",
      status: "evergreen",
      updated: UPDATED,
      cluster: "why",
      tags: ["mcp", "anthropic"],
      accent: "rose",
      links: ["the-nxm-problem"],
      Content: WhatMcpIs,
    },
    {
      slug: "the-nxm-problem",
      title: "The N×M problem",
      summary:
        "N models, M tools, every pair a bespoke protocol. MCP collapses it to N+M.",
      kind: "schema",
      status: "evergreen",
      updated: UPDATED,
      cluster: "why",
      tags: ["mcp", "integration"],
      accent: "rose",
      links: ["host-client-server"],
      Content: TheNxmProblem,
    },

    /* ----------------------------------------------------- architecture -- */
    {
      slug: "host-client-server",
      title: "Host, client, server",
      summary:
        "The host is the app, it holds one client per connection, each client talks to one server.",
      kind: "schema",
      status: "evergreen",
      updated: UPDATED,
      cluster: "architecture",
      tags: ["architecture", "roles"],
      accent: "sky",
      links: ["transports", "request-walkthrough"],
      Content: HostClientServer,
    },
    {
      slug: "transports",
      title: "Transports: stdio and HTTP",
      summary:
        "stdio for local, Streamable HTTP for remote. The legacy HTTP+SSE transport is deprecated.",
      kind: "note",
      status: "growing",
      updated: UPDATED,
      cluster: "architecture",
      tags: ["stdio", "http", "transport"],
      accent: "sky",
      Content: Transports,
    },
    {
      slug: "request-walkthrough",
      title: "One request, end to end",
      summary:
        "Discovery then invocation — what actually happens between a question and an answer.",
      kind: "schema",
      status: "evergreen",
      updated: UPDATED,
      cluster: "architecture",
      tags: ["sequence", "discovery"],
      accent: "sky",
      links: ["server-primitives"],
      Content: RequestWalkthrough,
    },

    /* ------------------------------------------------------- primitives -- */
    {
      slug: "server-primitives",
      title: "Tools, resources, prompts",
      summary:
        "Three things a server exposes — and the difference is who decides to use them.",
      kind: "schema",
      status: "evergreen",
      updated: UPDATED,
      cluster: "primitives",
      tags: ["tools", "resources", "prompts"],
      accent: "lime",
      links: ["tool-design", "client-primitives"],
      Content: ServerPrimitives,
    },
    {
      slug: "client-primitives",
      title: "The client side, and MRTR",
      summary:
        "Sampling, roots and logging are deprecated; elicitation is replaced by input_required + retry.",
      kind: "note",
      status: "growing",
      updated: UPDATED,
      cluster: "primitives",
      tags: ["elicitation", "mrtr", "deprecated"],
      accent: "lime",
      Content: ClientPrimitives,
    },
    {
      slug: "tool-design",
      title: "Designing a tool",
      summary:
        "The model sees a name, a description and a schema. That is where the quality lives.",
      kind: "note",
      status: "growing",
      updated: UPDATED,
      cluster: "primitives",
      tags: ["tools", "design"],
      accent: "lime",
      links: ["anatomy-of-a-server"],
      Content: ToolDesign,
    },

    /* --------------------------------------------------------- building -- */
    {
      slug: "anatomy-of-a-server",
      title: "Anatomy of a server",
      summary:
        "Declare capabilities, answer list, handle call, return content. Smaller than it sounds.",
      kind: "schema",
      status: "growing",
      updated: UPDATED,
      cluster: "building",
      tags: ["server", "sdk"],
      accent: "violet",
      links: ["attack-surface"],
      Content: AnatomyOfAServer,
    },
    {
      slug: "mcp-vs-function-calling",
      title: "MCP vs function calling",
      summary:
        "MCP does not replace function calling — it answers where the tool list came from.",
      kind: "note",
      status: "growing",
      updated: UPDATED,
      cluster: "building",
      tags: ["function-calling", "comparison"],
      accent: "violet",
      Content: McpVsFunctionCalling,
    },

    /* --------------------------------------------------------- security -- */
    {
      slug: "attack-surface",
      title: "The attack surface",
      summary:
        "Tool poisoning, indirect prompt injection, confused deputy, supply chain.",
      kind: "note",
      status: "growing",
      updated: UPDATED,
      cluster: "security",
      tags: ["security", "prompt-injection"],
      accent: "amber",
      links: ["authorization"],
      Content: AttackSurface,
    },
    {
      slug: "authorization",
      title: "Authorization",
      summary:
        "OAuth 2.1 with mandatory PKCE, audience validation, no token passthrough, CIMD over DCR.",
      kind: "note",
      status: "growing",
      updated: UPDATED,
      cluster: "security",
      tags: ["oauth", "pkce", "security"],
      accent: "amber",
      links: ["stateless-spec"],
      Content: Authorization,
    },

    /* ------------------------------------------------------------- spec -- */
    {
      slug: "stateless-spec",
      title: "The 2026-07-28 stateless spec",
      summary:
        "No handshake, no session id, MRTR, header routing, cacheable lists, an extensions framework.",
      kind: "note",
      status: "growing",
      updated: UPDATED,
      cluster: "spec",
      tags: ["spec", "stateless", "2026"],
      accent: "slate",
      Content: StatelessSpec,
    },
  ],
};
