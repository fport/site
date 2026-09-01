import AgentToolLoopTr from './notes/ai/agent-tool-loop.tr.mdx';
import AgenticPatternsTr from './notes/ai/agentic-patterns.tr.mdx';
import AgenticRagLoopTr from './notes/ai/agentic-rag-loop.tr.mdx';
import BaselineStackTr from './notes/ai/baseline-stack.tr.mdx';
import ChunkingTr from './notes/ai/chunking.tr.mdx';
import ChunkingOpenQuestionTr from './notes/ai/chunking-open-question.tr.mdx';
import ContextBudgetTr from './notes/ai/context-budget.tr.mdx';
import EmbeddingFineTuneTr from './notes/ai/embedding-fine-tune.tr.mdx';
import EndToEndEvalTr from './notes/ai/end-to-end-eval.tr.mdx';
import EvalsFirstTr from './notes/ai/evals-first.tr.mdx';
import FineTuningMethodsTr from './notes/ai/fine-tuning-methods.tr.mdx';
import HybridSearchRerankTr from './notes/ai/hybrid-search-rerank.tr.mdx';
import MetadataFilteringTr from './notes/ai/metadata-filtering.tr.mdx';
import QueryTransformsTr from './notes/ai/query-transforms.tr.mdx';
import RagRetrievalLoopTr from './notes/ai/rag-retrieval-loop.tr.mdx';
import RagVsFineTuneTr from './notes/ai/rag-vs-fine-tune.tr.mdx';
import RetrievalEvalTr from './notes/ai/retrieval-eval.tr.mdx';
import RoadmapTr from './notes/ai/roadmap.tr.mdx';
import SmallToBigTr from './notes/ai/small-to-big.tr.mdx';
import VanillaRagPipelineTr from './notes/ai/vanilla-rag-pipeline.tr.mdx';
import VanillaVsAgenticTr from './notes/ai/vanilla-vs-agentic.tr.mdx';
import WhenToFineTuneTr from './notes/ai/when-to-fine-tune.tr.mdx';
import WhereNaiveRagBreaksTr from './notes/ai/where-naive-rag-breaks.tr.mdx';
import WhyRagTr from './notes/ai/why-rag.tr.mdx';
import type { GardenTranslation } from './types';

/**
 * Turkish overlay for the ai garden: titles, taglines, cluster labels and
 * note bodies (`notes/ai/<slug>.tr.mdx`). Anything missing here falls back
 * to the English registry in `ai.ts`.
 */
export const aiGardenTr: GardenTranslation = {
  title: 'AI Bahçesi',
  tagline: 'RAG ve fine-tuning mimarileri — vanilla RAG’den agentic RAG’e, ölçümüyle birlikte.',
  description:
    'LLM’lerle bir şeyler kurarken tutulan çalışma notları: halüsinasyon problemi, vanilla RAG pipeline’ı, chunking ve hybrid search, ileri retrieval, agentic pattern’ler, fine-tuning yöntemleri ve değerlendirme.',
  clusters: {
    start: 'buradan başla',
    why: 'neden rag?',
    vanilla: 'vanilla rag',
    'table-stakes': 'olmazsa olmazlar',
    advanced: 'ileri retrieval',
    agentic: 'agentic rag',
    finetune: 'fine-tuning',
    measurement: 'ölçüm',
  },
  notes: {
    /* ------------------------------------------------------------ start -- */
    roadmap: {
      title: 'Yol haritası',
      summary: 'Okuma sırası: problem, en ucuz çözüm, ucuz kazanımlar, pahalı kazanımlar, ölçüm.',
      Content: RoadmapTr,
    },

    /* -------------------------------------------------------------- why -- */
    'why-rag': {
      title: 'Neden RAG? Halüsinasyon',
      summary:
        'Modelin bilgisi donmuş: güncel değil, alan dışı, kaynaksız — ve yine de kendinden emin.',
      Content: WhyRagTr,
    },
    'rag-vs-fine-tune': {
      title: 'RAG mi, fine-tune mı?',
      summary: 'RAG bilgi için, fine-tuning biçim için. Bir karar tablosu ve bir karar ağacı.',
      Content: RagVsFineTuneTr,
    },

    /* ---------------------------------------------------------- vanilla -- */
    'vanilla-rag-pipeline': {
      title: 'Vanilla RAG pipeline’ı',
      summary: 'İki ayrı hat: offline index kurulumu ve her istekte çalışan sorgu yolu.',
      Content: VanillaRagPipelineTr,
    },
    'baseline-stack': {
      title: 'Referans baseline stack',
      summary: 'Express + LangChain + Chroma + Ollama. Her ölçümün kıyaslandığı sıfır noktası.',
      Content: BaselineStackTr,
    },
    'where-naive-rag-breaks': {
      title: 'Naif RAG nerede bozulur',
      summary:
        'Düşük precision, düşük recall, bayat veri, tek atış. Dışarıdan hepsi model hatası gibi görünür.',
      Content: WhereNaiveRagBreaksTr,
    },

    /* ---------------------------------------------------- table stakes -- */
    chunking: {
      title: 'Chunking: sınır > boyut',
      summary:
        'Başlıklara göre böl, %10–15 overlap tut, her chunk’ın önüne bir context satırı ekle.',
      Content: ChunkingTr,
    },
    'metadata-filtering': {
      title: 'Metadata filtreleme',
      summary:
        '"2021 risk faktörleri" bir anlam değil, bir filtre. Ham semantik arama ikisini karıştırır.',
      Content: MetadataFilteringTr,
    },
    'hybrid-search-rerank': {
      title: 'Hybrid search ve reranking',
      summary:
        'Dense + BM25, RRF ile birleştir, cross-encoder ile top-5’e kes. Geniş getir, dar ver.',
      Content: HybridSearchRerankTr,
    },
    'chunking-open-question': {
      title: 'Chunk mı, parent mı, özet mi?',
      summary: 'Retrieval birimi embedding birimine göre nerede durmalı — hâlâ çözülmedi.',
      Content: ChunkingOpenQuestionTr,
    },

    /* ----------------------------------------------------------- advanced */
    'small-to-big': {
      title: 'Small-to-big retrieval',
      summary:
        'Küçük şeyi embed et, büyük şeyi cevaba ver. Sentence window, parent/child, references.',
      Content: SmallToBigTr,
    },
    'query-transforms': {
      title: 'Sorgu dönüşümleri',
      summary:
        'Rewrite, HyDE, multi-query, decomposition, routing — index’e dokunmadan elde edilen kazanım.',
      Content: QueryTransformsTr,
    },
    'rag-retrieval-loop': {
      title: 'Retrieval döngüsünü kapat',
      summary:
        'Relevance kontrolü, groundedness kontrolü, durma koşulu. Corrective RAG’in çekirdeği.',
      Content: RagRetrievalLoopTr,
    },

    /* ---------------------------------------------------------- agentic -- */
    'agentic-rag-loop': {
      title: 'Agentic RAG döngüsü',
      summary:
        'Düşün, harekete geç, gözlemle, karar ver. Sabit bir pipeline değil — kendi aramasını yürüten bir orchestrator.',
      Content: AgenticRagLoopTr,
    },
    'agentic-patterns': {
      title: 'Agentic tasarım pattern’leri',
      summary:
        'Router, Adaptive, Corrective, Self-RAG, Multi-agent — ve her birinin hangi derdi çözdüğü.',
      Content: AgenticPatternsTr,
    },
    'vanilla-vs-agentic': {
      title: 'Vanilla vs agentic: bedeli',
      summary: 'Latency, token, karmaşıklık, doğruluk, hata yüzeyi. Karar bu takastan ibaret.',
      Content: VanillaVsAgenticTr,
    },
    'agent-tool-loop': {
      title: 'Agent bir döngüdür',
      summary: 'Mühendisliğin çoğu durma koşulunda yaşar.',
      Content: AgentToolLoopTr,
    },
    'context-budget': {
      title: 'Context bir bütçedir',
      summary: 'Önce kararlı prefix, en sona değişken kısım — yoksa iki kere ödersin.',
      Content: ContextBudgetTr,
    },

    /* --------------------------------------------------------- finetune -- */
    'when-to-fine-tune': {
      title: 'Ne zaman fine-tune',
      summary: 'Biçim için evet, olgular için hayır. Sıra: prompt, RAG, fine-tune, distill.',
      Content: WhenToFineTuneTr,
    },
    'fine-tuning-methods': {
      title: 'Fine-tuning yöntemleri',
      summary:
        'Full SFT, LoRA, QLoRA, DPO, GRPO, distillation — ve her birinin ne zaman cevap olduğu.',
      Content: FineTuningMethodsTr,
    },
    'embedding-fine-tune': {
      title: 'Embedding’i fine-tune etmek',
      summary:
        'Ham chunk’lardan sentetik sorular üret, embedding’i kendi kelime dağarcığınla eğit.',
      Content: EmbeddingFineTuneTr,
    },

    /* ------------------------------------------------------ measurement -- */
    'retrieval-eval': {
      title: 'Retrieval eval, izole',
      summary:
        'Hit rate, recall@k, MRR, NDCG. "Doğru şey getirildi mi" cevap kalitesinden önce gelir.',
      Content: RetrievalEvalTr,
    },
    'end-to-end-eval': {
      title: 'Uçtan uca eval',
      summary:
        'Faithfulness, answer relevancy, context precision ve recall. Etiketsiz ve etiketli modlar.',
      Content: EndToEndEvalTr,
    },
    'evals-first': {
      title: 'Prompt’tan önce eval',
      summary: 'Yirmi vaka ve bir diff, her türlü prompt sezgisini yener.',
      Content: EvalsFirstTr,
    },
  },
};
