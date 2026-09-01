import AstVsWindowsTr from "./notes/rag/ast-vs-windows.tr.mdx";
import ChunkIsACodeUnitTr from "./notes/rag/chunk-is-a-code-unit.tr.mdx";
import FirstExperimentTr from "./notes/rag/first-experiment.tr.mdx";
import FourHardThingsTr from "./notes/rag/four-hard-things.tr.mdx";
import GotchasTr from "./notes/rag/gotchas.tr.mdx";
import IncrementalSyncTr from "./notes/rag/incremental-sync.tr.mdx";
import LanguageCoverageIsARuleTr from "./notes/rag/language-coverage-is-a-rule.tr.mdx";
import McpSameProcessTr from "./notes/rag/mcp-same-process.tr.mdx";
import MeasureOrItDidntHappenTr from "./notes/rag/measure-or-it-didnt-happen.tr.mdx";
import RerankerHurtTr from "./notes/rag/reranker-hurt.tr.mdx";
import RouteByQueryShapeTr from "./notes/rag/route-by-query-shape.tr.mdx";
import StackChoicesTr from "./notes/rag/stack-choices.tr.mdx";
import ThreeBandsTr from "./notes/rag/three-bands.tr.mdx";
import TurkishOverEnglishCodeTr from "./notes/rag/turkish-over-english-code.tr.mdx";
import type { GardenTranslation } from "./types";

/**
 * Turkish overlay for the rag garden: titles, taglines, cluster labels and
 * note bodies (`notes/rag/<slug>.tr.mdx`). Anything missing here falls back
 * to the English registry in `rag.ts`.
 */
export const ragGardenTr: GardenTranslation = {
  title: "Code RAG Bahçesi",
  tagline:
    "Uçtan uca kurulmuş bir codebase RAG'i — İngilizce kod üzerinde Türkçe sorular, incremental sync ve ölçülmüş her karar.",
  description:
    "Bir codebase RAG'i kurarken tutulan çalışma notları: kod retrieval'ının dört zor problemi, stack ve neden, query biçimine göre yönlendirme, reranker'ın neden kapalı kaldığı, tree-sitter chunking ve gerçekte ne kazandırdığı, tablo yerine kural olarak dil kapsamı, hayır demek için üç skor bandı, aynı process'te bir MCP yüzeyi ve tuzaklar.",
  clusters: {
    problem: "problem",
    stack: "stack",
    retrieval: "retrieval, ölçülmüş",
    chunking: "chunking & diller",
    abstain: "hayır demek",
    agent: "agent yüzeyi",
    lessons: "dersler",
  },
  notes: {
    /* ---------------------------------------------------------- problem -- */
    "four-hard-things": {
      title: "Code RAG'in dört zor tarafı",
      summary:
        "Vektör arama kolay kısmı: birebir semboller, İngilizce kod üzerinde Türkçe, bayatlama ve hayır diyebilmek.",
      Content: FourHardThingsTr,
    },
    "first-experiment": {
      title: "Kullan-at deney",
      summary:
        "MiniLM, 30 soru: sembollerde BM25 dense'i geçti, fusion ikisine de yenildi, Türkçe 0.04 aldı.",
      Content: FirstExperimentTr,
    },

    /* ------------------------------------------------------------ stack -- */
    "stack-choices": {
      title: "Stack, ve neden",
      summary:
        "Yerleşik BM25'li Milvus, yerel BGE-M3, tree-sitter, sha256 manifest, SQLite, aynı process'te MCP.",
      Content: StackChoicesTr,
    },
    "incremental-sync": {
      title: "İçerik hash'iyle incremental sync",
      summary:
        "Bir push yalnız değişen dosyaları yeniden index'liyor; manifest sıralaması öldürülen bir job'ı zararsız kılıyor.",
      Content: IncrementalSyncTr,
    },

    /* -------------------------------------------------------- retrieval -- */
    "route-by-query-shape": {
      title: "Query biçimine göre yönlendir",
      summary:
        "Sembol biçimli query'ler BM25'e, cümleler dense'e; her zaman hybrid ikisinden de kötü ölçüldü.",
      Content: RouteByQueryShapeTr,
    },
    "reranker-hurt": {
      title: "Zarar veren reranker",
      summary:
        "Recall@40 masada 17 puan bıraktı; bge-reranker-v2-m3 onları harcadı ve saniyeler ekledi.",
      Content: RerankerHurtTr,
    },
    "turkish-over-english-code": {
      title: "Türkçe soru, İngilizce kod",
      summary:
        "Çok dilli bir embedder TR düzyazıyı 0.04'ten 0.684'e taşıdı; LLM'in yazdığı açıklamalar MRR'ı 0.93'e çıkardı.",
      Content: TurkishOverEnglishCodeTr,
    },

    /* --------------------------------------------------------- chunking -- */
    "chunk-is-a-code-unit": {
      title: "Chunk bir kod birimidir",
      summary:
        "tree-sitter sınırları, ≤ 2000 byte, büyük sınıflar bölünüyor, küçük parçalar birleşiyor, header yalnız index'te.",
      Content: ChunkIsACodeUnitTr,
    },
    "ast-vs-windows": {
      title: "AST chunk'ları vs. düz pencereler",
      summary:
        "Aynı repo, aynı sorular: bir soruluk recall, MRR +0.09 — neredeyse tamamı sembol sıralaması.",
      Content: AstVsWindowsTr,
    },
    "language-coverage-is-a-rule": {
      title: "Dil kapsamı tablo değil, kural",
      summary:
        "371 grammar, bir uzantı adı kuralı, rol taksonomisi yok, framework başına kod yok — production sistemlerinin yaptığı.",
      Content: LanguageCoverageIsARuleTr,
    },

    /* ---------------------------------------------------------- abstain -- */
    "three-bands": {
      title: "Hayır demek: üç bant",
      summary:
        "kNN asla 'yakın bir şey yok' demez; cosine gri bölgede çakışır, o yüzden bir taban, bir not ve bir yargıç.",
      Content: ThreeBandsTr,
    },

    /* ------------------------------------------------------------ agent -- */
    "mcp-same-process": {
      title: "Aynı process'te MCP",
      summary:
        "Tek retriever üzerinde search_code, read_code, list_repos; filtre değil sinyal; yalnız index'lenmiş dosyaları okur.",
      Content: McpSameProcessTr,
    },

    /* ---------------------------------------------------------- lessons -- */
    "measure-or-it-didnt-happen": {
      title: "Ölç, yoksa olmamıştır",
      summary:
        "Negatifli bir golden set, README'de bir ledger tablosu ve sayıların devirdiği inançlar.",
      Content: MeasureOrItDidntHappenTr,
    },
    gotchas: {
      title: "Tuzaklar",
      summary:
        "tree-sitter'da segfault'lar, takılan grammar'lar, kayan yerel LLM'ler, lazy indirmeler, secret temizliği.",
      Content: GotchasTr,
    },
  },
};
