import BetterAuthTr from './notes/stack/better-auth.tr.mdx';
import BullmqTr from './notes/stack/bullmq.tr.mdx';
import BunTr from './notes/stack/bun.tr.mdx';
import ClaudeCodeActionTr from './notes/stack/claude-code-action.tr.mdx';
import DrizzleOrmTr from './notes/stack/drizzle-orm.tr.mdx';
import HonoTr from './notes/stack/hono.tr.mdx';
import LangfuseTr from './notes/stack/langfuse.tr.mdx';
import McpTypescriptSdkTr from './notes/stack/mcp-typescript-sdk.tr.mdx';
import NextjsTr from './notes/stack/nextjs.tr.mdx';
import ShadcnUiTr from './notes/stack/shadcn-ui.tr.mdx';
import StrandsHarnessSdkTr from './notes/stack/strands-harness-sdk.tr.mdx';
import TanstackQueryTr from './notes/stack/tanstack-query.tr.mdx';
import VercelAiSdkTr from './notes/stack/vercel-ai-sdk.tr.mdx';
import VllmTr from './notes/stack/vllm.tr.mdx';
import WhyThisShapeTr from './notes/stack/why-this-shape.tr.mdx';
import ZodTr from './notes/stack/zod.tr.mdx';
import ZustandTr from './notes/stack/zustand.tr.mdx';
import type { GardenTranslation } from './types';

/**
 * Turkish overlay for the stack garden: titles, taglines, cluster labels and
 * note bodies (`notes/stack/<slug>.tr.mdx`). Anything missing here falls back
 * to the English registry in `stack.ts`.
 */
export const stackGardenTr: GardenTranslation = {
  title: 'Stack',
  tagline: 'Birlikte ürettiğim araçlar ve her birinin yerini nasıl hak ettiği.',
  description:
    'Projelerimin hep gelip oturduğu stack — frontend, backend, veri ve AI — bir logo duvarı değil, her seçimin arkasındaki neden.',
  clusters: {
    start: 'buradan başla',
    ai: 'ai',
    frontend: 'frontend',
    backend: 'backend & runtime',
    data: 'veri & tipler',
  },
  notes: {
    'why-this-shape': {
      title: 'Neden bu şekil',
      summary: 'Boştayken ucuz ve tek bir kişinin kafasında tutabileceği kadar küçük.',
      Content: WhyThisShapeTr,
    },
    'mcp-typescript-sdk': {
      title: 'modelcontextprotocol / typescript-sdk',
      summary: "Model Context Protocol server ve client'ları için resmi TypeScript SDK'sı.",
      Content: McpTypescriptSdkTr,
    },
    'vercel-ai-sdk': {
      title: 'vercel / ai',
      summary: "Next.js'in yaratıcılarından, TypeScript için AI Toolkit.",
      Content: VercelAiSdkTr,
    },
    langfuse: {
      title: 'langfuse / langfuse',
      summary:
        "Açık kaynak AI mühendisliği platformu: LLM eval'leri, observability, metrikler, prompt yönetimi.",
      Content: LangfuseTr,
    },
    'strands-harness-sdk': {
      title: 'strands-agents / harness-sdk',
      summary: "Bir agent harness'ı kur ve uçtan uca kontrol et.",
      Content: StrandsHarnessSdkTr,
    },
    vllm: {
      title: 'vllm-project / vllm',
      summary: "LLM'ler için yüksek throughput'lu ve bellek açısından verimli bir inference ve serving motoru.",
      Content: VllmTr,
    },
    'claude-code-action': {
      title: 'anthropics / claude-code-action',
      summary: 'GitHub Action olarak Claude Code.',
      Content: ClaudeCodeActionTr,
    },
    nextjs: {
      title: 'vercel / next.js',
      summary: "React Framework'ü.",
      Content: NextjsTr,
    },
    'shadcn-ui': {
      title: 'shadcn-ui / ui',
      summary: 'Güzel tasarlanmış, erişilebilir bir component seti ve bir kod dağıtım platformu.',
      Content: ShadcnUiTr,
    },
    zustand: {
      title: 'pmndrs / zustand',
      summary: "React'te state yönetimi için olmazsa olmazlar.",
      Content: ZustandTr,
    },
    'tanstack-query': {
      title: 'TanStack / query',
      summary: 'Güçlü asenkron state yönetimi, server-state araçları ve data fetching.',
      Content: TanstackQueryTr,
    },
    hono: {
      title: 'honojs / hono',
      summary: 'Web Standards üzerine kurulu web framework.',
      Content: HonoTr,
    },
    bun: {
      title: 'oven-sh / bun',
      summary: "İnanılmaz hızlı JavaScript runtime'ı, bundler, test runner ve package manager.",
      Content: BunTr,
    },
    'better-auth': {
      title: 'better-auth / better-auth',
      summary: "En kapsamlı authentication framework'ü.",
      Content: BetterAuthTr,
    },
    bullmq: {
      title: 'taskforcesh / bullmq',
      summary: 'Node.js için Redis üzerine kurulu message queue ve batch processing.',
      Content: BullmqTr,
    },
    'drizzle-orm': {
      title: 'drizzle-team / drizzle-orm',
      summary: 'Codegen adımı olmayan typed SQL ORM.',
      Content: DrizzleOrmTr,
    },
    zod: {
      title: 'colinhacks / zod',
      summary: "Statik type inference'lı, TypeScript-first schema validation.",
      Content: ZodTr,
    },
  },
};
