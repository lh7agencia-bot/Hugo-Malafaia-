export interface PracticeArea {
  id: string;
  number: string;
  title: string;
  summary: string;
  highlights: string[];
  spanClass: string;
}

export interface OfficePhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  aspectClass: string;
}

export interface Testimonial {
  id: string;
  name: string;
  context: string;
  rating: number;
  text: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const BUSINESS_INFO = {
  name: 'Hugo Malafaia advogado',
  shortName: 'Hugo Malafaia',
  slogan: 'Sua defesa é nossa vitória',
  niche: 'Advocacia Estratégica',
  address: 'Av. T-4, 619 - Sl 310 - St. Bueno, Goiânia - GO, 74230-035',
  shortAddress: 'Av. T-4, 619 - Sl 310 · St. Bueno, Goiânia - GO',
  phoneDisplay: '(62) 99865-8106',
  whatsappNumber: '5562998658106',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Av.+T-4,+619+-+Sl+310+-+St.+Bueno,+Goi%C3%A2nia+-+GO,+74230-035',
  hours: 'Segunda a Sexta · 08h30 às 18h00',
};

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const HERO_PILLARS = [
  {
    index: '01',
    title: 'Atendimento Direto',
    description: 'Contato próximo e transparente diretamente com o advogado responsável pelo seu caso.',
  },
  {
    index: '02',
    title: 'Estratégia Processual',
    description: 'Análise minuciosa de provas, prazos e precedentes antes de cada medida judicial.',
  },
  {
    index: '03',
    title: 'Presencial e Online',
    description: 'Estrutura no Setor Bueno em Goiânia e consultoria por videoconferência em todo o país.',
  },
  {
    index: '04',
    title: 'Acompanhamento Claro',
    description: 'Atualizações objetivas sobre cada etapa e movimentação, sem juridiquês desnecessário.',
  },
];

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: 'civil',
    number: '01',
    title: 'Direito Civil e Contratos',
    summary:
      'Defesa patrimonial, elaboração e revisão de contratos, cobranças, responsabilidade civil e ações indenizatórias conduzidas com rigor técnico.',
    highlights: [
      'Revisão e blindagem de cláusulas contratuais',
      'Ações de cobrança, execução e defesa do devedor',
      'Indenizações por danos materiais e morais',
    ],
    spanClass: 'lg:col-span-2',
  },
  {
    id: 'familia',
    number: '02',
    title: 'Direito de Família e Sucessões',
    summary:
      'Atuação sensível e firme em divórcios, guarda, pensão alimentícia, regulamentação de convivência, inventários e partilha de bens.',
    highlights: [
      'Divórcio consensual e litigioso',
      'Inventário judicial e extrajudicial',
      'Pensão alimentícia e guarda de menores',
    ],
    spanClass: 'lg:col-span-1',
  },
  {
    id: 'digital',
    number: '03',
    title: 'Direito Digital e LGPD',
    summary:
      'Adequação à Lei Geral de Proteção de Dados, proteção de imagem e reputação online, contratos digitais e respostas a incidentes de segurança.',
    highlights: [
      'Adequação jurídica à LGPD',
      'Remoção de conteúdos e proteção digital',
      'Termos de uso e contratos eletrônicos',
    ],
    spanClass: 'lg:col-span-1',
  },
  {
    id: 'consumidor',
    number: '04',
    title: 'Direito do Consumidor e Defesa Estratégica',
    summary:
      'Enfrentamento técnico contra práticas abusivas, falhas na prestação de serviços, negativações indevidas e desequilíbrios contratuais.',
    highlights: [
      'Cancelamento de cobranças e negativações indevidas',
      'Revisão de cláusulas abusivas e planos de saúde',
      'Atuação ágil em pedidos de tutela de urgência',
    ],
    spanClass: 'lg:col-span-2',
  },
];

export const OFFICE_PHOTOS: OfficePhoto[] = [
  {
    id: 'escritorio-4',
    src: '/images/escritorio-4.jpg',
    alt: 'Hugo Malafaia advogado em retrato profissional no escritório',
    caption: 'Atendimento executivo com foco na defesa estratégica de cada cliente.',
    aspectClass: 'aspect-[2/3]',
  },
  {
    id: 'escritorio-1',
    src: '/images/escritorio-1.jpg',
    alt: 'Hugo Malafaia analisando processos e legislação em sua mesa de trabalho',
    caption: 'Estudo aprofundado de autos, doutrina especializada e jurisprudência atualizada.',
    aspectClass: 'aspect-[9/16]',
  },
  {
    id: 'escritorio-2',
    src: '/images/escritorio-2.png',
    alt: 'Hugo Malafaia advogado em seu gabinete no Setor Bueno em Goiânia',
    caption: 'Gabinete no Setor Bueno, Goiânia — ambiente reservado para reuniões presenciais.',
    aspectClass: 'aspect-square',
  },
  {
    id: 'escritorio-3',
    src: '/images/escritorio-3.jpg',
    alt: 'Hugo Malafaia ajustando a gravata antes de audiência e sustentação',
    caption: 'Preparação rigorosa para audiências, mediações e sustentações orais.',
    aspectClass: 'aspect-[2/3]',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'dep-1',
    name: 'Mariana Oliveira',
    context: 'Direito de Família · Goiânia',
    rating: 5,
    text: 'Cheguei ao escritório com muitas dúvidas sobre um processo de partilha e guarda. O Dr. Hugo explicou cada cenário com clareza desde a primeira reunião e conduziu o acordo com agilidade e firmeza.',
  },
  {
    id: 'dep-2',
    name: 'Ricardo Mendes',
    context: 'Direito Civil e Contratos · Goiânia',
    rating: 5,
    text: 'Precisava revisar um contrato de alto valor que continha cláusulas desfavoráveis. A análise apontou riscos que eu não havia percebido e garantiu segurança jurídica para assinar sem prejuízos.',
  },
  {
    id: 'dep-3',
    name: 'Fernanda Costa',
    context: 'Direito do Consumidor · Atendimento Online',
    rating: 5,
    text: 'Tive meu nome negativado indevidamente e precisava de uma solução rápida. A equipe entrou com o pedido liminar no mesmo dia em que enviei os documentos e resolveu a situação em poucos dias.',
  },
  {
    id: 'dep-4',
    name: 'Carlos Eduardo Silva',
    context: 'LGPD e Direito Digital · Goiânia',
    rating: 5,
    text: 'Atendimento pontual, linguagem acessível e domínio técnico evidente. Toda a documentação de proteção de dados e os termos de atendimento foram estruturados sob medida para a nossa rotina.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Como funciona a primeira consulta com o Dr. Hugo Malafaia?',
    answer:
      'Na primeira consulta avaliamos os fatos, os documentos disponíveis e os riscos jurídicos envolvidos. Ao final da reunião, você recebe uma orientação objetiva sobre as alternativas viáveis — extrajudiciais ou judiciais — e os próximos passos recomendados.',
  },
  {
    id: 'faq-2',
    question: 'O atendimento é realizado apenas presencialmente em Goiânia?',
    answer:
      'Não. Nosso escritório físico fica na Av. T-4, 619, Sala 310, no Setor Bueno em Goiânia - GO, onde realizamos atendimentos presenciais com horário marcado. Também atendemos por videoconferência clientes de todo o Brasil, com a mesma segurança e envio digital de documentos.',
  },
  {
    id: 'faq-3',
    question: 'Quais documentos devo separar antes do agendamento?',
    answer:
      'Recomendamos ter em mãos documentos pessoais (RG/CPF), comprovante de residência e todo material relacionado ao caso — como contratos, conversas registradas, notificações, boletos ou números de processos em andamento. Caso falte algo, orientamos durante o atendimento.',
  },
  {
    id: 'faq-4',
    question: 'Como são definidos os honorários advocatícios?',
    answer:
      'Os honorários seguem os parâmetros éticos da OAB e são definidos de forma transparente após a análise inicial do caso, considerando a complexidade da demanda e as etapas necessárias. Tudo é formalizado em contrato antes de qualquer protocolo.',
  },
  {
    id: 'faq-5',
    question: 'Como acompanho o andamento do meu processo após a contratação?',
    answer:
      'Você recebe atualizações diretas sempre que houver movimentação relevante nos autos, audiências agendadas ou decisões judiciais, além de poder tirar dúvidas diretamente pelo WhatsApp oficial do escritório.',
  },
  {
    id: 'faq-6',
    question: 'Consigo resolver meu problema sem precisar ir à Justiça?',
    answer:
      'Sempre avaliamos se a via extrajudicial — como notificações, mediações ou acordos formalizados — traz um resultado mais rápido e seguro. Quando o acordo não é suficiente para proteger seus interesses, atuamos com firmeza na via judicial.',
  },
];

export const TIME_SLOTS = ['09:00', '10:30', '14:00', '15:30', '17:00'];
