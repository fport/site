import AiLearningTr from '@/content/paper/ai-learning.tr.mdx';
import FabricGanTr from '@/content/paper/fabric-gan.tr.mdx';
import FanteziKaptanTr from '@/content/paper/fantezi-kaptan.tr.mdx';
import FisleTr from '@/content/paper/fisle.tr.mdx';
import GemmaFinetuneTr from '@/content/paper/gemma-finetune.tr.mdx';
import type { PostTranslation } from './writing';

/**
 * Turkish titles, summaries and bodies for the posts in `writing.ts`, keyed by
 * slug. A post missing here — or a field missing from its entry — renders in
 * English on the Turkish site.
 */
export const postsTr: Record<string, PostTranslation> = {
  'gemma-finetune': {
    title: 'Modeli Kötüleştiren Fine-Tune',
    summary:
      'Gemma 3 4B üzerinde Türkçe Alpaca ile LoRA. Pipeline çalıştı, model yine de kötüleşti — bunu da yalnızca önce ölçtüğüm için biliyorum.',
    Content: GemmaFinetuneTr,
  },
  'fantezi-kaptan': {
    title: "Fantezi Kaptan: TFF Fantezi Ligi'ni Modellemek",
    summary:
      "Sekiz sezon Süper Lig, kendi xG modelim, bir xPts modeli ve ILP ile bir kadro optimiser'ı — neyin çalıştığına baseline'lar karar verdi.",
    Content: FanteziKaptanTr,
  },
  'ai-learning': {
    title: 'Üretken Yapay Zekâ Yolculuğum',
    summary:
      "NLP ve CNN'lerden transformer'lara, fine-tuning'e ve RAG'a — zemin nasıl sürekli kaydı.",
    Content: AiLearningTr,
  },
  fisle: {
    title: "Fisle'yi Yan Proje Olarak Geliştirmek",
    summary:
      "Türk mali müşavirleri için fişleri Luca'ya hazır muhasebe kayıtlarına çeviren bir yan proje.",
    Content: FisleTr,
  },
  'fabric-gan': {
    title: "2021'de Metinden Kumaş Deseni Üretmek",
    summary:
      'Bir TÜBİTAK lisans araştırma projesi: bir tekstil desenini kelimelerle tarif et, karşılığında özgün bir desen al. Text-to-image bir ürün olmadan önce text-to-image.',
    Content: FabricGanTr,
  },
};
