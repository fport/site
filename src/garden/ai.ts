import { aiLayout } from "./ai.layout";
import AgentToolLoop from "./notes/ai/agent-tool-loop.mdx";
import AgenticPatterns from "./notes/ai/agentic-patterns.mdx";
import AgenticRagLoop from "./notes/ai/agentic-rag-loop.mdx";
import BaselineStack from "./notes/ai/baseline-stack.mdx";
import Chunking from "./notes/ai/chunking.mdx";
import ChunkingOpenQuestion from "./notes/ai/chunking-open-question.mdx";
import ContextBudget from "./notes/ai/context-budget.mdx";
import EmbeddingFineTune from "./notes/ai/embedding-fine-tune.mdx";
import EndToEndEval from "./notes/ai/end-to-end-eval.mdx";
import EvalsFirst from "./notes/ai/evals-first.mdx";
import FineTuningMethods from "./notes/ai/fine-tuning-methods.mdx";
import HybridSearchRerank from "./notes/ai/hybrid-search-rerank.mdx";
import MetadataFiltering from "./notes/ai/metadata-filtering.mdx";
import QueryTransforms from "./notes/ai/query-transforms.mdx";
import RagRetrievalLoop from "./notes/ai/rag-retrieval-loop.mdx";
import RagVsFineTune from "./notes/ai/rag-vs-fine-tune.mdx";
import RetrievalEval from "./notes/ai/retrieval-eval.mdx";
import Roadmap from "./notes/ai/roadmap.mdx";
import SmallToBig from "./notes/ai/small-to-big.mdx";
import VanillaRagPipeline from "./notes/ai/vanilla-rag-pipeline.mdx";
import VanillaVsAgentic from "./notes/ai/vanilla-vs-agentic.mdx";
import WhenToFineTune from "./notes/ai/when-to-fine-tune.mdx";
import WhereNaiveRagBreaks from "./notes/ai/where-naive-rag-breaks.mdx";
import WhyRag from "./notes/ai/why-rag.mdx";
import type { Garden } from "./types";

const UPDATED = "2026-08-29";

/**
 * The AI garden reads left to right as one argument: why retrieval exists, the
 * cheapest thing that works, the cheap wins, the expensive wins, and how you
 * know any of it helped.
 */
export const aiGarden: Garden = {
  id: "ai",
  path: "/garden/ai",
  title: "AI Garden",
  tagline:
    "RAG and fine-tuning architectures — from vanilla RAG to agentic RAG, with the measurement.",
  description:
    "Working notes on building with LLMs: the hallucination problem, the vanilla RAG pipeline, chunking and hybrid search, advanced retrieval, agentic patterns, fine-tuning methods and evaluation.",
  clusters: [
    { id: "start", label: "start here", accent: "slate" },
    { id: "why", label: "why rag?", accent: "rose" },
    { id: "vanilla", label: "vanilla rag", accent: "sky" },
    { id: "table-stakes", label: "table stakes", accent: "lime" },
    { id: "advanced", label: "advanced retrieval", accent: "violet" },
    { id: "agentic", label: "agentic rag", accent: "amber" },
    { id: "finetune", label: "fine-tuning", accent: "rose" },
    { id: "measurement", label: "measurement", accent: "slate" },
  ],
  frames: aiLayout,
  initialZoom: 0.8,
  notes: [
    /* ------------------------------------------------------------ start -- */
    {
      slug: "roadmap",
      title: "Roadmap",
      summary:
        "The reading order: problem, cheapest fix, cheap wins, expensive wins, measurement.",
      kind: "schema",
      status: "evergreen",
      updated: UPDATED,
      cluster: "start",
      tags: ["rag", "roadmap"],
      accent: "slate",
      links: ["why-rag"],
      Content: Roadmap,
    },

    /* -------------------------------------------------------------- why -- */
    {
      slug: "why-rag",
      title: "Why RAG? Hallucination",
      summary:
        "A model’s knowledge is frozen: not current, out of domain, unsourced — and confident anyway.",
      kind: "note",
      status: "evergreen",
      updated: UPDATED,
      cluster: "why",
      tags: ["rag", "hallucination"],
      accent: "rose",
      links: ["rag-vs-fine-tune"],
      Content: WhyRag,
    },
    {
      slug: "rag-vs-fine-tune",
      title: "RAG or fine-tune?",
      summary:
        "RAG is for knowledge, fine-tuning is for form. A decision table and a decision tree.",
      kind: "schema",
      status: "evergreen",
      updated: UPDATED,
      cluster: "why",
      tags: ["rag", "fine-tuning", "decision"],
      accent: "rose",
      links: ["vanilla-rag-pipeline"],
      Content: RagVsFineTune,
    },

    /* ---------------------------------------------------------- vanilla -- */
    {
      slug: "vanilla-rag-pipeline",
      title: "The vanilla RAG pipeline",
      summary:
        "Two separate tracks: the offline index build and the query path that runs on every request.",
      kind: "schema",
      status: "evergreen",
      updated: UPDATED,
      cluster: "vanilla",
      tags: ["rag", "pipeline"],
      accent: "sky",
      links: ["baseline-stack", "where-naive-rag-breaks"],
      Content: VanillaRagPipeline,
    },
    {
      slug: "baseline-stack",
      title: "The reference baseline stack",
      summary:
        "Express + LangChain + Chroma + Ollama. The zero point every measurement compares against.",
      kind: "snippet",
      status: "growing",
      updated: UPDATED,
      cluster: "vanilla",
      tags: ["langchain", "chroma", "ollama"],
      accent: "sky",
      Content: BaselineStack,
    },
    {
      slug: "where-naive-rag-breaks",
      title: "Where naive RAG breaks",
      summary:
        "Low precision, low recall, stale data, one shot. All of it looks like a model bug from outside.",
      kind: "note",
      status: "growing",
      updated: UPDATED,
      cluster: "vanilla",
      tags: ["rag", "retrieval", "failure"],
      accent: "sky",
      links: ["chunking", "hybrid-search-rerank"],
      Content: WhereNaiveRagBreaks,
    },

    /* ---------------------------------------------------- table stakes -- */
    {
      slug: "chunking",
      title: "Chunking: boundary > size",
      summary:
        "Split on headings, keep 10–15% overlap, prepend a context line to every chunk.",
      kind: "note",
      status: "growing",
      updated: UPDATED,
      cluster: "table-stakes",
      tags: ["chunking", "ingest"],
      accent: "lime",
      links: ["chunking-open-question", "small-to-big"],
      Content: Chunking,
    },
    {
      slug: "metadata-filtering",
      title: "Metadata filtering",
      summary:
        '"2021 risk factors" is not a meaning, it is a filter. Raw semantic search confuses the two.',
      kind: "schema",
      status: "growing",
      updated: UPDATED,
      cluster: "table-stakes",
      tags: ["metadata", "precision"],
      accent: "lime",
      links: ["query-transforms"],
      Content: MetadataFiltering,
    },
    {
      slug: "hybrid-search-rerank",
      title: "Hybrid search and reranking",
      summary:
        "Dense + BM25, fused with RRF, cut to top-5 by a cross-encoder. Retrieve wide, hand over narrow.",
      kind: "note",
      status: "growing",
      updated: UPDATED,
      cluster: "table-stakes",
      tags: ["bm25", "rerank", "hybrid"],
      accent: "lime",
      links: ["small-to-big"],
      Content: HybridSearchRerank,
    },
    {
      slug: "chunking-open-question",
      title: "Chunk, parent, or summary?",
      summary:
        "Where the retrieval unit should sit relative to the embedding unit — still unresolved.",
      kind: "open-question",
      status: "seed",
      updated: UPDATED,
      cluster: "table-stakes",
      tags: ["rag", "embeddings"],
      accent: "lime",
      Content: ChunkingOpenQuestion,
    },

    /* ----------------------------------------------------------- advanced */
    {
      slug: "small-to-big",
      title: "Small-to-big retrieval",
      summary:
        "Embed the small thing, hand the big thing to the answer. Sentence window, parent/child, references.",
      kind: "schema",
      status: "growing",
      updated: UPDATED,
      cluster: "advanced",
      tags: ["retrieval", "llamaindex"],
      accent: "violet",
      links: ["rag-retrieval-loop"],
      Content: SmallToBig,
    },
    {
      slug: "query-transforms",
      title: "Query transforms",
      summary:
        "Rewrite, HyDE, multi-query, decomposition, routing — the win available without touching the index.",
      kind: "note",
      status: "growing",
      updated: UPDATED,
      cluster: "advanced",
      tags: ["hyde", "query-rewriting"],
      accent: "violet",
      links: ["agentic-rag-loop"],
      Content: QueryTransforms,
    },
    {
      slug: "rag-retrieval-loop",
      title: "Close the retrieval loop",
      summary:
        "Relevance check, groundedness check, stopping condition. The core of Corrective RAG.",
      kind: "schema",
      status: "growing",
      updated: UPDATED,
      cluster: "advanced",
      tags: ["crag", "retrieval", "loop"],
      accent: "violet",
      links: ["agentic-patterns"],
      Content: RagRetrievalLoop,
    },

    /* ---------------------------------------------------------- agentic -- */
    {
      slug: "agentic-rag-loop",
      title: "The agentic RAG loop",
      summary:
        "Think, act, observe, decide. Not a fixed pipeline — an orchestrator running its own search.",
      kind: "schema",
      status: "growing",
      updated: UPDATED,
      cluster: "agentic",
      tags: ["agentic", "rag"],
      accent: "amber",
      links: ["agentic-patterns"],
      Content: AgenticRagLoop,
    },
    {
      slug: "agentic-patterns",
      title: "Agentic design patterns",
      summary:
        "Router, Adaptive, Corrective, Self-RAG, Multi-agent — and which pain each one fixes.",
      kind: "schema",
      status: "growing",
      updated: UPDATED,
      cluster: "agentic",
      tags: ["router", "crag", "multi-agent"],
      accent: "amber",
      links: ["vanilla-vs-agentic"],
      Content: AgenticPatterns,
    },
    {
      slug: "vanilla-vs-agentic",
      title: "Vanilla vs agentic: the cost",
      summary:
        "Latency, tokens, complexity, accuracy, failure surface. The decision is that trade.",
      kind: "note",
      status: "growing",
      updated: UPDATED,
      cluster: "agentic",
      tags: ["cost", "latency"],
      accent: "amber",
      links: ["when-to-fine-tune"],
      Content: VanillaVsAgentic,
    },
    {
      slug: "agent-tool-loop",
      title: "An agent is a loop",
      summary: "Most of the engineering lives in the stopping condition.",
      kind: "schema",
      status: "growing",
      updated: UPDATED,
      cluster: "agentic",
      tags: ["agents", "tools"],
      accent: "amber",
      links: ["context-budget"],
      Content: AgentToolLoop,
    },
    {
      slug: "context-budget",
      title: "Context is a budget",
      summary:
        "Stable prefix first, volatile last — otherwise you pay for it twice.",
      kind: "note",
      status: "growing",
      updated: UPDATED,
      cluster: "agentic",
      tags: ["context", "caching", "cost"],
      accent: "amber",
      Content: ContextBudget,
    },

    /* --------------------------------------------------------- finetune -- */
    {
      slug: "when-to-fine-tune",
      title: "When to fine-tune",
      summary:
        "Yes for form, no for facts. The order: prompt, RAG, fine-tune, distill.",
      kind: "schema",
      status: "growing",
      updated: UPDATED,
      cluster: "finetune",
      tags: ["fine-tuning", "decision"],
      accent: "rose",
      links: ["fine-tuning-methods", "embedding-fine-tune"],
      Content: WhenToFineTune,
    },
    {
      slug: "fine-tuning-methods",
      title: "Fine-tuning methods",
      summary:
        "Full SFT, LoRA, QLoRA, DPO, GRPO, distillation — and when each one is the answer.",
      kind: "note",
      status: "growing",
      updated: UPDATED,
      cluster: "finetune",
      tags: ["lora", "qlora", "dpo"],
      accent: "rose",
      Content: FineTuningMethods,
    },
    {
      slug: "embedding-fine-tune",
      title: "Fine-tuning the embedding",
      summary:
        "Generate synthetic questions from raw chunks, train the embedding on your own vocabulary.",
      kind: "experiment",
      status: "seed",
      updated: UPDATED,
      cluster: "finetune",
      tags: ["embeddings", "synthetic-data"],
      accent: "rose",
      links: ["retrieval-eval"],
      Content: EmbeddingFineTune,
    },

    /* ------------------------------------------------------ measurement -- */
    {
      slug: "retrieval-eval",
      title: "Retrieval eval, in isolation",
      summary:
        'Hit rate, recall@k, MRR, NDCG. "Was the right thing retrieved" comes before answer quality.',
      kind: "experiment",
      status: "growing",
      updated: UPDATED,
      cluster: "measurement",
      tags: ["eval", "mrr", "ndcg"],
      accent: "slate",
      links: ["end-to-end-eval"],
      Content: RetrievalEval,
    },
    {
      slug: "end-to-end-eval",
      title: "End-to-end eval",
      summary:
        "Faithfulness, answer relevancy, context precision and recall. Label-free and labelled modes.",
      kind: "experiment",
      status: "growing",
      updated: UPDATED,
      cluster: "measurement",
      tags: ["eval", "faithfulness", "ragas"],
      accent: "slate",
      links: ["evals-first"],
      Content: EndToEndEval,
    },
    {
      slug: "evals-first",
      title: "Evals before prompts",
      summary: "Twenty cases and a diff beat any amount of prompt intuition.",
      kind: "experiment",
      status: "growing",
      updated: UPDATED,
      cluster: "measurement",
      tags: ["evals", "testing"],
      accent: "slate",
      Content: EvalsFirst,
    },
  ],
};
