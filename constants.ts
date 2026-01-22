
import { Prize, PrizeType } from './types';

export const PRIZES: Prize[] = [
  {
    id: 'joke-macarena',
    name: 'Solo de Macarena',
    description: 'Show visual gratuito.',
    type: PrizeType.JOKE,
    color: '#EC4899',
    longDescription: 'Debes bailar la Macarena entera encima de una silla o en mitad de la calle. Sin música. Cantándola tú. Ahora mismo.'
  },
  {
    id: 'joke-hug',
    name: 'Abrazo de Oso Sudoroso',
    description: 'El novio te debe amor.',
    type: PrizeType.JOKE,
    color: '#EF4444',
    longDescription: 'Premio físico: El novio debe darte un abrazo de 30 segundos en mitad de la fiesta. Si suda, puntúa doble por el compromiso.'
  },
  {
    id: 'joke-ronda',
    name: 'El Pagafantas Local',
    description: 'Te toca soltar la mosca.',
    type: PrizeType.JOKE,
    color: '#10B981',
    longDescription: 'La ruleta ha hablado. La próxima ronda de chupitos de fuego corre de tu cuenta. Tu cartera llora, el grupo celebra vuestra futura insolvencia.'
  },
  {
    id: 'joke-pimpinela',
    name: 'Dúo de Pimpinela',
    description: 'Olvídame y pega la vuelta.',
    type: PrizeType.JOKE,
    color: '#06B6D4',
    longDescription: 'Busca a la persona más seria del grupo y cantad a pleno pulmón el estribillo de Pimpinela. Hay que ponerle drama, gestos y quizás alguna lágrima.'
  },
  {
    id: 'joke-chupito',
    name: 'Chupito del Infierno',
    description: 'Cortesía del destino.',
    type: PrizeType.JOKE,
    color: '#F97316',
    longDescription: 'Te has ganado el derecho a beberte un chupito de lo más raro que haya en la barra (mezcla prohibida). Salud por el novio y por tu esófago.'
  },
  {
    id: 'joke-perreo',
    name: 'Perreo al Camarero',
    description: 'Seducción de bajo presupuesto.',
    type: PrizeType.JOKE,
    color: '#8B5CF6',
    longDescription: 'Acércate al camarero/a más cercano y dedícale un perreo suave de 5 segundos mientras pides la siguiente ronda. Mantén el contacto visual si te atreves.'
  },
  {
    id: 'joke-discurso',
    name: 'Discurso de Padrino Ebrio',
    description: 'Palabras que arruinan bodas.',
    type: PrizeType.JOKE,
    color: '#F59E0B',
    longDescription: 'Súbete a un lugar elevado y da un discurso de 1 minuto sobre por qué el novio es un milagro de la naturaleza. Debe incluir una anécdota vergonzosa.'
  },
  {
    id: 'joke-estatua',
    name: 'Estatua Humana',
    description: 'Inmovilidad estratégica.',
    type: PrizeType.JOKE,
    color: '#64748b',
    longDescription: 'Debes quedarte totalmente inmóvil en la pose más ridícula posible durante los próximos 2 minutos. Si te ríes o te mueves, pagas ronda.'
  }
];
