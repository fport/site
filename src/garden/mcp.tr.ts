import AnatomyOfAServerTr from "./notes/mcp/anatomy-of-a-server.tr.mdx";
import AttackSurfaceTr from "./notes/mcp/attack-surface.tr.mdx";
import AuthorizationTr from "./notes/mcp/authorization.tr.mdx";
import ClientPrimitivesTr from "./notes/mcp/client-primitives.tr.mdx";
import HostClientServerTr from "./notes/mcp/host-client-server.tr.mdx";
import McpVsFunctionCallingTr from "./notes/mcp/mcp-vs-function-calling.tr.mdx";
import RequestWalkthroughTr from "./notes/mcp/request-walkthrough.tr.mdx";
import ServerPrimitivesTr from "./notes/mcp/server-primitives.tr.mdx";
import StatelessSpecTr from "./notes/mcp/stateless-spec.tr.mdx";
import TheNxmProblemTr from "./notes/mcp/the-nxm-problem.tr.mdx";
import ToolDesignTr from "./notes/mcp/tool-design.tr.mdx";
import TransportsTr from "./notes/mcp/transports.tr.mdx";
import WhatMcpIsTr from "./notes/mcp/what-mcp-is.tr.mdx";
import type { GardenTranslation } from "./types";

/**
 * Turkish overlay for the mcp garden: titles, taglines, cluster labels and
 * note bodies (`notes/mcp/<slug>.tr.mdx`). Anything missing here falls back
 * to the English registry in `mcp.ts`.
 */
export const mcpGardenTr: GardenTranslation = {
  title: "MCP Bahçesi",
  tagline:
    "Model Context Protocol — N×M problemi, mimari, primitive'ler ve 2026 stateless spec'i.",
  description:
    "Model Context Protocol üzerine çalışma notları: neden var, host/client/server rolleri, stdio ve Streamable HTTP transport'ları, tool'lar, resource'lar ve prompt'lar, bir LLM'in gerçekten kullanabileceği tool'lar tasarlamak, güvenlik yüzeyi, OAuth 2.1 authorization ve 2026-07-28 stateless spec'i.",
  clusters: {
    why: "mcp neden var",
    architecture: "mimari",
    primitives: "primitive'ler",
    building: "bir tane yazmak",
    security: "güvenlik",
    spec: "spec nereye gitti",
  },
  notes: {
    /* -------------------------------------------------------------- why -- */
    "what-mcp-is": {
      title: "MCP nedir",
      summary:
        "Bir modeli dış sistemlere bağlamanın standart yolu. LLM'ler için tool discovery.",
      Content: WhatMcpIsTr,
    },
    "the-nxm-problem": {
      title: "N×M problemi",
      summary:
        "N model, M tool, her çift ısmarlama bir protokol. MCP bunu N+M'ye indiriyor.",
      Content: TheNxmProblemTr,
    },

    /* ----------------------------------------------------- architecture -- */
    "host-client-server": {
      title: "Host, client, server",
      summary:
        "Host uygulamadır, bağlantı başına bir client tutar, her client tek bir server'la konuşur.",
      Content: HostClientServerTr,
    },
    transports: {
      title: "Transport'lar: stdio ve HTTP",
      summary:
        "Yerel için stdio, uzak için Streamable HTTP. Eski HTTP+SSE transport'u deprecated.",
      Content: TransportsTr,
    },
    "request-walkthrough": {
      title: "Bir istek, uçtan uca",
      summary:
        "Önce discovery, sonra invocation — bir soruyla bir cevap arasında aslında ne oluyor.",
      Content: RequestWalkthroughTr,
    },

    /* ------------------------------------------------------- primitives -- */
    "server-primitives": {
      title: "Tool'lar, resource'lar, prompt'lar",
      summary:
        "Bir server'ın dışa açtığı üç şey — fark, onları kullanmaya kimin karar verdiğinde.",
      Content: ServerPrimitivesTr,
    },
    "client-primitives": {
      title: "Client tarafı ve MRTR",
      summary:
        "Sampling, roots ve logging deprecated; elicitation'ın yerini input_required + retry aldı.",
      Content: ClientPrimitivesTr,
    },
    "tool-design": {
      title: "Bir tool tasarlamak",
      summary:
        "Model bir isim, bir açıklama ve bir schema görür. Kalite orada yaşar.",
      Content: ToolDesignTr,
    },

    /* --------------------------------------------------------- building -- */
    "anatomy-of-a-server": {
      title: "Bir server'ın anatomisi",
      summary:
        "Capability bildir, list'e cevap ver, call'u işle, content döndür. Kulağa geldiğinden küçük.",
      Content: AnatomyOfAServerTr,
    },
    "mcp-vs-function-calling": {
      title: "MCP vs function calling",
      summary:
        "MCP function calling'in yerini almaz — tool listesinin nereden geldiğini cevaplar.",
      Content: McpVsFunctionCallingTr,
    },

    /* --------------------------------------------------------- security -- */
    "attack-surface": {
      title: "Saldırı yüzeyi",
      summary:
        "Tool poisoning, indirect prompt injection, confused deputy, supply chain.",
      Content: AttackSurfaceTr,
    },
    authorization: {
      title: "Authorization",
      summary:
        "Zorunlu PKCE'li OAuth 2.1, audience doğrulama, token passthrough yok, DCR yerine CIMD.",
      Content: AuthorizationTr,
    },

    /* ------------------------------------------------------------- spec -- */
    "stateless-spec": {
      title: "2026-07-28 stateless spec'i",
      summary:
        "Handshake yok, session id yok, MRTR, header routing, cache'lenebilir listeler, bir extensions framework'ü.",
      Content: StatelessSpecTr,
    },
  },
};
