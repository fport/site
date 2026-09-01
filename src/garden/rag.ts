import AstVsWindows from "./notes/rag/ast-vs-windows.mdx";
import ChunkIsACodeUnit from "./notes/rag/chunk-is-a-code-unit.mdx";
import FirstExperiment from "./notes/rag/first-experiment.mdx";
import FourHardThings from "./notes/rag/four-hard-things.mdx";
import Gotchas from "./notes/rag/gotchas.mdx";
import IncrementalSync from "./notes/rag/incremental-sync.mdx";
import LanguageCoverageIsARule from "./notes/rag/language-coverage-is-a-rule.mdx";
import McpSameProcess from "./notes/rag/mcp-same-process.mdx";
import MeasureOrItDidntHappen from "./notes/rag/measure-or-it-didnt-happen.mdx";
import RerankerHurt from "./notes/rag/reranker-hurt.mdx";
import RouteByQueryShape from "./notes/rag/route-by-query-shape.mdx";
import StackChoices from "./notes/rag/stack-choices.mdx";
import ThreeBands from "./notes/rag/three-bands.mdx";
import TurkishOverEnglishCode from "./notes/rag/turkish-over-english-code.mdx";
import { ragLayout } from "./rag.layout";
import type { Garden } from "./types";

const UPDATED = "2026-09-01";

/**
 * The Code RAG garden is the applied companion to the AI garden: one system
 * built end to end — a codebase RAG that answers Turkish questions over
 * English code and stays fresh on push — read left to right as the problems,
 * the stack, what retrieval measured, what chunking actually buys, how it
 * says "no", the agent surface, and the lessons.
 */
export const ragGarden: Garden = {
  id: "rag",
  path: "/garden/rag",
  title: "Code RAG Garden",
  tagline:
    "A codebase RAG built end to end — Turkish questions over English code, incremental sync, and every decision measured.",
  description:
    "Working notes from building a codebase RAG: the four hard problems of code retrieval, the stack and why, routing by query shape, why the reranker stayed off, tree-sitter chunking and what it actually buys, language coverage as a rule instead of a table, three score bands for saying no, an MCP surface in the same process, and the gotchas.",
  clusters: [
    { id: "problem", label: "the problem", accent: "rose" },
    { id: "stack", label: "the stack", accent: "sky" },
    { id: "retrieval", label: "retrieval, measured", accent: "lime" },
    { id: "chunking", label: "chunking & languages", accent: "violet" },
    { id: "abstain", label: "saying no", accent: "amber" },
    { id: "agent", label: "agent surface", accent: "sky" },
    { id: "lessons", label: "lessons", accent: "slate" },
  ],
  frames: ragLayout,
  initialZoom: 0.8,
  notes: [
    /* ---------------------------------------------------------- problem -- */
    {
      slug: "four-hard-things",
      title: "Four hard things about code RAG",
      summary:
        "Vector search is the easy part: exact symbols, Turkish over English code, staleness, and saying no.",
      kind: "schema",
      status: "evergreen",
      updated: UPDATED,
      cluster: "problem",
      tags: ["rag", "code-search"],
      accent: "rose",
      links: ["first-experiment", "stack-choices"],
      Content: FourHardThings,
    },
    {
      slug: "first-experiment",
      title: "The throwaway experiment",
      summary:
        "MiniLM, 30 questions: BM25 beat dense on symbols, fusion lost to both, Turkish scored 0.04.",
      kind: "experiment",
      status: "evergreen",
      updated: UPDATED,
      cluster: "problem",
      tags: ["baseline", "bm25", "multilingual"],
      accent: "rose",
      links: ["route-by-query-shape", "turkish-over-english-code"],
      Content: FirstExperiment,
    },

    /* ------------------------------------------------------------ stack -- */
    {
      slug: "stack-choices",
      title: "The stack, and why",
      summary:
        "Milvus with built-in BM25, BGE-M3 locally, tree-sitter, a sha256 manifest, SQLite, MCP in-process.",
      kind: "schema",
      status: "evergreen",
      updated: UPDATED,
      cluster: "stack",
      tags: ["milvus", "bge-m3", "tree-sitter", "architecture"],
      accent: "sky",
      links: ["incremental-sync", "chunk-is-a-code-unit"],
      Content: StackChoices,
    },
    {
      slug: "incremental-sync",
      title: "Incremental sync by content hash",
      summary:
        "A push re-indexes only changed files; the manifest ordering makes a killed job harmless.",
      kind: "schema",
      status: "evergreen",
      updated: UPDATED,
      cluster: "stack",
      tags: ["webhook", "manifest", "freshness"],
      accent: "sky",
      links: ["mcp-same-process"],
      Content: IncrementalSync,
    },

    /* -------------------------------------------------------- retrieval -- */
    {
      slug: "route-by-query-shape",
      title: "Route by query shape",
      summary:
        "Symbol-shaped queries go to BM25, sentences to dense; always-hybrid measured worse than either.",
      kind: "experiment",
      status: "evergreen",
      updated: UPDATED,
      cluster: "retrieval",
      tags: ["routing", "bm25", "dense", "rrf"],
      accent: "lime",
      links: ["reranker-hurt"],
      Content: RouteByQueryShape,
    },
    {
      slug: "reranker-hurt",
      title: "The reranker that hurt",
      summary:
        "Recall@40 left 17 points on the table; bge-reranker-v2-m3 spent them and added seconds.",
      kind: "experiment",
      status: "evergreen",
      updated: UPDATED,
      cluster: "retrieval",
      tags: ["rerank", "cross-encoder", "latency"],
      accent: "lime",
      links: ["three-bands"],
      Content: RerankerHurt,
    },
    {
      slug: "turkish-over-english-code",
      title: "Turkish questions, English code",
      summary:
        "A multilingual embedder took TR prose from 0.04 to 0.684; LLM-written descriptions took MRR to 0.93.",
      kind: "experiment",
      status: "growing",
      updated: UPDATED,
      cluster: "retrieval",
      tags: ["multilingual", "contextual-retrieval", "enrichment"],
      accent: "lime",
      links: ["measure-or-it-didnt-happen"],
      Content: TurkishOverEnglishCode,
    },

    /* --------------------------------------------------------- chunking -- */
    {
      slug: "chunk-is-a-code-unit",
      title: "A chunk is a code unit",
      summary:
        "tree-sitter boundaries, ≤ 2000 bytes, big classes split, small pieces merged, header only in the index.",
      kind: "schema",
      status: "evergreen",
      updated: UPDATED,
      cluster: "chunking",
      tags: ["chunking", "tree-sitter"],
      accent: "violet",
      links: ["ast-vs-windows"],
      Content: ChunkIsACodeUnit,
    },
    {
      slug: "ast-vs-windows",
      title: "AST chunks vs. plain windows",
      summary:
        "Same repo, same questions: one question of recall, MRR +0.09 — almost all of it symbol ranking.",
      kind: "experiment",
      status: "evergreen",
      updated: UPDATED,
      cluster: "chunking",
      tags: ["ablation", "chunking", "cast"],
      accent: "violet",
      links: ["language-coverage-is-a-rule"],
      Content: AstVsWindows,
    },
    {
      slug: "language-coverage-is-a-rule",
      title: "Language coverage is a rule, not a table",
      summary:
        "371 grammars, an extension-name rule, no role taxonomy, no per-framework code — what production systems do.",
      kind: "note",
      status: "evergreen",
      updated: UPDATED,
      cluster: "chunking",
      tags: ["languages", "tree-sitter", "survey"],
      accent: "violet",
      links: ["gotchas"],
      Content: LanguageCoverageIsARule,
    },

    /* ---------------------------------------------------------- abstain -- */
    {
      slug: "three-bands",
      title: "Saying no: three bands",
      summary:
        "kNN never says nothing is close; cosine overlaps in the grey zone, so a floor, a note, and a judge.",
      kind: "schema",
      status: "evergreen",
      updated: UPDATED,
      cluster: "abstain",
      tags: ["abstention", "crag", "calibration"],
      accent: "amber",
      links: ["mcp-same-process"],
      Content: ThreeBands,
    },

    /* ------------------------------------------------------------ agent -- */
    {
      slug: "mcp-same-process",
      title: "MCP in the same process",
      summary:
        "search_code, read_code, list_repos on one retriever; signals not filters; reads only indexed files.",
      kind: "note",
      status: "evergreen",
      updated: UPDATED,
      cluster: "agent",
      tags: ["mcp", "agent", "signals"],
      accent: "sky",
      links: ["measure-or-it-didnt-happen"],
      Content: McpSameProcess,
    },

    /* ---------------------------------------------------------- lessons -- */
    {
      slug: "measure-or-it-didnt-happen",
      title: "Measure, or it didn't happen",
      summary:
        "A golden set with negatives, a ledger in the README, and the beliefs the numbers overturned.",
      kind: "note",
      status: "evergreen",
      updated: UPDATED,
      cluster: "lessons",
      tags: ["evals", "golden-set", "ledger"],
      accent: "slate",
      links: ["gotchas"],
      Content: MeasureOrItDidntHappen,
    },
    {
      slug: "gotchas",
      title: "Gotchas",
      summary:
        "Segfaults in tree-sitter, grammars that hang, local LLMs that drift, lazy downloads, secret scrubbing.",
      kind: "snippet",
      status: "growing",
      updated: UPDATED,
      cluster: "lessons",
      tags: ["gotchas", "production"],
      accent: "slate",
      Content: Gotchas,
    },
  ],
};
