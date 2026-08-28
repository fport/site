import { aiLayout } from './ai.layout';
import AgentToolLoop from './notes/ai/agent-tool-loop.mdx';
import ChunkingOpenQuestion from './notes/ai/chunking-open-question.mdx';
import ContextBudget from './notes/ai/context-budget.mdx';
import EvalsFirst from './notes/ai/evals-first.mdx';
import HowThisGardenWorks from './notes/ai/how-this-garden-works.mdx';
import RagRetrievalLoop from './notes/ai/rag-retrieval-loop.mdx';
import type { Garden } from './types';

export const aiGarden: Garden = {
  id: 'ai',
  path: '/garden/ai',
  title: 'AI Garden',
  tagline: 'Working notes, schemas and open questions about building with LLMs.',
  description:
    'A whiteboard of my working notes on building with LLMs — retrieval, agents, context budgets and evaluation. Half-finished on purpose.',
  clusters: [
    { id: 'start', label: 'start here', accent: 'slate' },
    { id: 'retrieval', label: 'retrieval', accent: 'sky' },
    { id: 'agents', label: 'agents & context', accent: 'violet' },
    { id: 'measurement', label: 'measurement', accent: 'lime' },
  ],
  frames: aiLayout,
  notes: [
    {
      slug: 'how-this-garden-works',
      title: 'How this garden works',
      summary: 'Notes are MDX files. The layout you drag comes back out as code.',
      kind: 'note',
      status: 'evergreen',
      updated: '2026-08-28',
      cluster: 'start',
      tags: ['meta', 'mdx'],
      accent: 'slate',
      Content: HowThisGardenWorks,
    },
    {
      slug: 'rag-retrieval-loop',
      title: 'The retrieval half of RAG',
      summary: 'Chunking, hybrid search and reranking — where quality is actually won.',
      kind: 'schema',
      status: 'growing',
      updated: '2026-08-28',
      cluster: 'retrieval',
      tags: ['rag', 'retrieval', 'search'],
      accent: 'sky',
      links: ['chunking-open-question', 'evals-first'],
      Content: RagRetrievalLoop,
    },
    {
      slug: 'chunking-open-question',
      title: 'Chunk, parent, or summary?',
      summary: 'Where the retrieval unit should sit relative to the embedding unit.',
      kind: 'open-question',
      status: 'seed',
      updated: '2026-08-28',
      cluster: 'retrieval',
      tags: ['rag', 'embeddings'],
      Content: ChunkingOpenQuestion,
    },
    {
      slug: 'agent-tool-loop',
      title: 'An agent is a loop',
      summary: 'Most of the engineering lives in the stopping condition.',
      kind: 'schema',
      status: 'growing',
      updated: '2026-08-28',
      cluster: 'agents',
      tags: ['agents', 'tools'],
      accent: 'violet',
      links: ['context-budget'],
      Content: AgentToolLoop,
    },
    {
      slug: 'context-budget',
      title: 'Context is a budget',
      summary: 'Stable prefix first, volatile last — otherwise you pay for it twice.',
      kind: 'note',
      status: 'growing',
      updated: '2026-08-28',
      cluster: 'agents',
      tags: ['context', 'caching', 'cost'],
      links: ['evals-first'],
      Content: ContextBudget,
    },
    {
      slug: 'evals-first',
      title: 'Evals before prompts',
      summary: 'Twenty cases and a diff beat any amount of prompt intuition.',
      kind: 'experiment',
      status: 'growing',
      updated: '2026-08-28',
      cluster: 'measurement',
      tags: ['evals', 'testing'],
      accent: 'lime',
      Content: EvalsFirst,
    },
  ],
};
