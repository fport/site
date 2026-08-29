import { aiLayout } from "./ai.layout";
import AgentToolLoop from "./notes/ai/agent-tool-loop.mdx";
import AgenticDesenler from "./notes/ai/agentic-desenler.mdx";
import AgenticRagDongusu from "./notes/ai/agentic-rag-dongusu.mdx";
import BaselineYigin from "./notes/ai/baseline-yigin.mdx";
import ChunkingOpenQuestion from "./notes/ai/chunking-open-question.mdx";
import Chunklama from "./notes/ai/chunklama.mdx";
import ContextBudget from "./notes/ai/context-budget.mdx";
import EmbeddingFineTune from "./notes/ai/embedding-fine-tune.mdx";
import EvalsFirst from "./notes/ai/evals-first.mdx";
import FineTuneYontemleri from "./notes/ai/fine-tune-yontemleri.mdx";
import HibritAramaVeRerank from "./notes/ai/hibrit-arama-ve-rerank.mdx";
import MetadataFiltreleme from "./notes/ai/metadata-filtreleme.mdx";
import NaiveRagNeredeKirilir from "./notes/ai/naive-rag-nerede-kirilir.mdx";
import NeZamanFineTune from "./notes/ai/ne-zaman-fine-tune.mdx";
import NedenRag from "./notes/ai/neden-rag.mdx";
import RagRetrievalLoop from "./notes/ai/rag-retrieval-loop.mdx";
import RagVsFineTune from "./notes/ai/rag-vs-fine-tune.mdx";
import RetrievalEvali from "./notes/ai/retrieval-evali.mdx";
import SmallToBig from "./notes/ai/small-to-big.mdx";
import SorguDonusumleri from "./notes/ai/sorgu-donusumleri.mdx";
import UctanUcaEval from "./notes/ai/uctan-uca-eval.mdx";
import VanillaRagHatti from "./notes/ai/vanilla-rag-hatti.mdx";
import VanillaVsAgentic from "./notes/ai/vanilla-vs-agentic.mdx";
import YolHaritasi from "./notes/ai/yol-haritasi.mdx";
import type { Garden } from "./types";

const UPDATED = "2026-08-29";

/**
 * The AI garden reads left to right as one argument: why retrieval exists,
 * the cheapest thing that works, the cheap wins, the expensive wins, and how
 * you know any of it helped. Written in Turkish because it doubles as the
 * board I teach from.
 */
export const aiGarden: Garden = {
  id: "ai",
  path: "/garden/ai",
  title: "AI Garden",
  tagline:
    "RAG ve fine-tuning mimarileri — vanilla RAG'den agentic RAG'e, ölçümüyle birlikte.",
  description:
    "LLM'lerle üretim yaparken kullandığım RAG ve fine-tuning notları: halüsinasyon problemi, vanilla RAG hattı, chunking ve hibrit arama, ileri retrieval, agentic desenler, fine-tuning yöntemleri ve eval.",
  clusters: [
    { id: "start", label: "buradan başla", accent: "slate" },
    { id: "neden", label: "neden rag?", accent: "rose" },
    { id: "vanilla", label: "vanilla rag", accent: "sky" },
    { id: "ayarlar", label: "table stakes", accent: "lime" },
    { id: "ileri", label: "ileri retrieval", accent: "violet" },
    { id: "agentic", label: "agentic rag", accent: "amber" },
    { id: "finetune", label: "fine-tuning", accent: "rose" },
    { id: "olcum", label: "ölçüm", accent: "slate" },
  ],
  frames: aiLayout,
  initialZoom: 0.8,
  notes: [
    /* ------------------------------------------------------------ start -- */
    {
      slug: "yol-haritasi",
      title: "Yol haritası",
      summary:
        "Tahtanın okunma sırası: problem, en ucuz çözüm, ucuz kazanımlar, pahalı kazanımlar, ölçüm.",
      kind: "schema",
      status: "evergreen",
      updated: UPDATED,
      cluster: "start",
      tags: ["rag", "yol-haritası"],
      accent: "slate",
      links: ["neden-rag"],
      Content: YolHaritasi,
    },

    /* ------------------------------------------------------------ neden -- */
    {
      slug: "neden-rag",
      title: "Neden RAG? Halüsinasyon",
      summary:
        "LLM'in bilgisi donuk: güncel değil, domain dışı, kaynaksız — ve yine de emin.",
      kind: "note",
      status: "evergreen",
      updated: UPDATED,
      cluster: "neden",
      tags: ["rag", "halüsinasyon"],
      accent: "rose",
      links: ["rag-vs-fine-tune"],
      Content: NedenRag,
    },
    {
      slug: "rag-vs-fine-tune",
      title: "RAG mi, fine-tune mu?",
      summary:
        "RAG bilgi içindir, fine-tune biçim içindir. Karar tablosu ve karar ağacı.",
      kind: "schema",
      status: "evergreen",
      updated: UPDATED,
      cluster: "neden",
      tags: ["rag", "fine-tuning", "karar"],
      accent: "rose",
      links: ["vanilla-rag-hatti"],
      Content: RagVsFineTune,
    },

    /* ---------------------------------------------------------- vanilla -- */
    {
      slug: "vanilla-rag-hatti",
      title: "Vanilla RAG hattı",
      summary:
        "İki ayrı hat: offline index kurulumu ve her istekte koşan sorgu hattı.",
      kind: "schema",
      status: "evergreen",
      updated: UPDATED,
      cluster: "vanilla",
      tags: ["rag", "pipeline"],
      accent: "sky",
      links: ["baseline-yigin", "naive-rag-nerede-kirilir"],
      Content: VanillaRagHatti,
    },
    {
      slug: "baseline-yigin",
      title: "Referans baseline yığını",
      summary:
        "Express + LangChain + Chroma + Ollama. Ölçümlerin karşılaştırıldığı sıfır noktası.",
      kind: "snippet",
      status: "growing",
      updated: UPDATED,
      cluster: "vanilla",
      tags: ["langchain", "chroma", "ollama"],
      accent: "sky",
      Content: BaselineYigin,
    },
    {
      slug: "naive-rag-nerede-kirilir",
      title: "Naive RAG nerede kırılır",
      summary:
        "Düşük precision, düşük recall, bayat veri, tek atış. Hepsi dışarıdan model hatası gibi görünür.",
      kind: "note",
      status: "growing",
      updated: UPDATED,
      cluster: "vanilla",
      tags: ["rag", "retrieval", "hata"],
      accent: "sky",
      links: ["chunklama", "hibrit-arama-ve-rerank"],
      Content: NaiveRagNeredeKirilir,
    },

    /* --------------------------------------------------------- ayarlar -- */
    {
      slug: "chunklama",
      title: "Chunklama: sınır > boyut",
      summary:
        "Başlıktan böl, %10-15 overlap, her parçaya bağlam cümlesi ekle.",
      kind: "note",
      status: "growing",
      updated: UPDATED,
      cluster: "ayarlar",
      tags: ["chunking", "ingest"],
      accent: "lime",
      links: ["chunking-open-question", "small-to-big"],
      Content: Chunklama,
    },
    {
      slug: "metadata-filtreleme",
      title: "Metadata filtreleme",
      summary:
        '"2021 risk faktörleri" bir anlam değil, bir filtre. Ham semantik arama bunu karıştırır.',
      kind: "schema",
      status: "growing",
      updated: UPDATED,
      cluster: "ayarlar",
      tags: ["metadata", "precision"],
      accent: "lime",
      links: ["sorgu-donusumleri"],
      Content: MetadataFiltreleme,
    },
    {
      slug: "hibrit-arama-ve-rerank",
      title: "Hibrit arama ve rerank",
      summary:
        "Dense + BM25, RRF ile birleştir, cross-encoder ile top-5. Geniş getir, dar ver.",
      kind: "note",
      status: "growing",
      updated: UPDATED,
      cluster: "ayarlar",
      tags: ["bm25", "rerank", "hybrid"],
      accent: "lime",
      links: ["small-to-big"],
      Content: HibritAramaVeRerank,
    },
    {
      slug: "chunking-open-question",
      title: "Chunk, parent, yoksa özet?",
      summary:
        "Retrieval birimi, embedding biriminin neresinde durmalı — hâlâ netleşmedi.",
      kind: "open-question",
      status: "seed",
      updated: UPDATED,
      cluster: "ayarlar",
      tags: ["rag", "embedding"],
      accent: "lime",
      Content: ChunkingOpenQuestion,
    },

    /* ------------------------------------------------------------ ileri -- */
    {
      slug: "small-to-big",
      title: "Small-to-big retrieval",
      summary:
        "Küçüğü embed et, cevaba büyüğü ver. Sentence window, parent/child, metadata reference.",
      kind: "schema",
      status: "growing",
      updated: UPDATED,
      cluster: "ileri",
      tags: ["retrieval", "llamaindex"],
      accent: "violet",
      links: ["rag-retrieval-loop"],
      Content: SmallToBig,
    },
    {
      slug: "sorgu-donusumleri",
      title: "Sorgu dönüşümleri",
      summary:
        "Rewrite, HyDE, multi-query, decomposition, routing — index'e dokunmadan alınan kazanç.",
      kind: "note",
      status: "growing",
      updated: UPDATED,
      cluster: "ileri",
      tags: ["hyde", "query-rewriting"],
      accent: "violet",
      links: ["agentic-rag-dongusu"],
      Content: SorguDonusumleri,
    },
    {
      slug: "rag-retrieval-loop",
      title: "Retrieval'ı kapalı döngüye çevir",
      summary:
        "Alaka kontrolü, groundedness kontrolü, durma koşulu. Corrective RAG'in çekirdeği.",
      kind: "schema",
      status: "growing",
      updated: UPDATED,
      cluster: "ileri",
      tags: ["crag", "retrieval", "döngü"],
      accent: "violet",
      links: ["agentic-desenler"],
      Content: RagRetrievalLoop,
    },

    /* ---------------------------------------------------------- agentic -- */
    {
      slug: "agentic-rag-dongusu",
      title: "Agentic RAG döngüsü",
      summary:
        "Düşün, eylem, gözlem, karar. Sabit boru hattı değil, kendi aramasını yöneten orkestratör.",
      kind: "schema",
      status: "growing",
      updated: UPDATED,
      cluster: "agentic",
      tags: ["agentic", "rag"],
      accent: "amber",
      links: ["agentic-desenler"],
      Content: AgenticRagDongusu,
    },
    {
      slug: "agentic-desenler",
      title: "Agentic tasarım kalıpları",
      summary:
        "Router, Adaptive, Corrective, Self-RAG, Multi-agent — hangisi hangi derde.",
      kind: "schema",
      status: "growing",
      updated: UPDATED,
      cluster: "agentic",
      tags: ["router", "crag", "multi-agent"],
      accent: "amber",
      links: ["vanilla-vs-agentic"],
      Content: AgenticDesenler,
    },
    {
      slug: "vanilla-vs-agentic",
      title: "Vanilla vs agentic: maliyet",
      summary:
        "Gecikme, token, karmaşıklık, doğruluk, hata yüzeyi. Karar bu takasın kendisi.",
      kind: "note",
      status: "growing",
      updated: UPDATED,
      cluster: "agentic",
      tags: ["maliyet", "latency"],
      accent: "amber",
      links: ["ne-zaman-fine-tune"],
      Content: VanillaVsAgentic,
    },
    {
      slug: "agent-tool-loop",
      title: "Ajan bir döngüdür",
      summary: "Mühendisliğin çoğu durma koşulunda yaşar.",
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
      title: "Context bir bütçedir",
      summary:
        "Sabit kısım başa, değişken kısım sona — yoksa bedelini iki kez ödersin.",
      kind: "note",
      status: "growing",
      updated: UPDATED,
      cluster: "agentic",
      tags: ["context", "caching", "maliyet"],
      accent: "amber",
      Content: ContextBudget,
    },

    /* --------------------------------------------------------- finetune -- */
    {
      slug: "ne-zaman-fine-tune",
      title: "Ne zaman fine-tune?",
      summary:
        "Biçim için evet, gerçekler için hayır. Sıra: prompt, RAG, fine-tune, distill.",
      kind: "schema",
      status: "growing",
      updated: UPDATED,
      cluster: "finetune",
      tags: ["fine-tuning", "karar"],
      accent: "rose",
      links: ["fine-tune-yontemleri", "embedding-fine-tune"],
      Content: NeZamanFineTune,
    },
    {
      slug: "fine-tune-yontemleri",
      title: "Fine-tune yöntemleri",
      summary:
        "Full SFT, LoRA, QLoRA, DPO, GRPO, distillation — hangisi ne zaman.",
      kind: "note",
      status: "growing",
      updated: UPDATED,
      cluster: "finetune",
      tags: ["lora", "qlora", "dpo"],
      accent: "rose",
      Content: FineTuneYontemleri,
    },
    {
      slug: "embedding-fine-tune",
      title: "Embedding fine-tune",
      summary:
        "Ham chunklardan sentetik soru üret, embedding modelini kendi jargonunla eğit.",
      kind: "experiment",
      status: "seed",
      updated: UPDATED,
      cluster: "finetune",
      tags: ["embedding", "sentetik-veri"],
      accent: "rose",
      links: ["retrieval-evali"],
      Content: EmbeddingFineTune,
    },

    /* ------------------------------------------------------------ olcum -- */
    {
      slug: "retrieval-evali",
      title: "Retrieval evali (izole)",
      summary:
        "Hit rate, recall@k, MRR, NDCG. Getirilen doğru muydu sorusu, cevaptan önce gelir.",
      kind: "experiment",
      status: "growing",
      updated: UPDATED,
      cluster: "olcum",
      tags: ["eval", "mrr", "ndcg"],
      accent: "slate",
      links: ["uctan-uca-eval"],
      Content: RetrievalEvali,
    },
    {
      slug: "uctan-uca-eval",
      title: "Uçtan uca eval",
      summary:
        "Faithfulness, answer relevancy, context precision ve recall. Etiketli ve etiketsiz iki mod.",
      kind: "experiment",
      status: "growing",
      updated: UPDATED,
      cluster: "olcum",
      tags: ["eval", "faithfulness", "ragas"],
      accent: "slate",
      links: ["evals-first"],
      Content: UctanUcaEval,
    },
    {
      slug: "evals-first",
      title: "Önce eval, sonra prompt",
      summary: "Yirmi vaka ve bir diff, her türlü prompt sezgisini yener.",
      kind: "experiment",
      status: "growing",
      updated: UPDATED,
      cluster: "olcum",
      tags: ["eval", "test"],
      accent: "slate",
      Content: EvalsFirst,
    },
  ],
};
