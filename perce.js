// perce.js — Ato 1: A Tag · ES5
var PERCE = {
  id: 'perce',
  name: 'Perce',
  handle: '@perce.vis · Rio de Janeiro',

  // SVG portrait inline — influencer carioca, olhos dourados (percepção)
  avatar: '<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="sg" cx="50%" cy="38%" r="55%"><stop offset="0%" stop-color="#D49870"/><stop offset="100%" stop-color="#9A6040"/></radialGradient><radialGradient id="eg" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#C8A96E" stop-opacity=".9"/><stop offset="100%" stop-color="#8B6A30" stop-opacity="0"/></radialGradient></defs><rect width="80" height="80" fill="#120A18"/><ellipse cx="40" cy="72" rx="26" ry="14" fill="#1A0F0A"/><ellipse cx="40" cy="18" rx="24" ry="18" fill="#1A0F0A"/><ellipse cx="40" cy="44" rx="15" ry="19" fill="url(#sg)"/><ellipse cx="40" cy="24" rx="22" ry="15" fill="#1A0F0A"/><path d="M20,32 Q28,24 40,27 Q28,30 22,40" fill="#1A0F0A"/><ellipse cx="31" cy="41" rx="5" ry="5" fill="#120808"/><ellipse cx="49" cy="41" rx="5" ry="5" fill="#120808"/><circle cx="31" cy="41" r="3" fill="#2A1408"/><circle cx="49" cy="41" r="3" fill="#2A1408"/><circle cx="31" cy="41" r="2" fill="url(#eg)"/><circle cx="49" cy="41" r="2" fill="url(#eg)"/><circle cx="32.2" cy="39.5" r=".9" fill="white" opacity=".95"/><circle cx="50.2" cy="39.5" r=".9" fill="white" opacity=".95"/><path d="M27,36 Q31,33 36,35" stroke="#1A0F0A" stroke-width="1.4" fill="none" stroke-linecap="round"/><path d="M44,35 Q49,33 53,36" stroke="#1A0F0A" stroke-width="1.4" fill="none" stroke-linecap="round"/><ellipse cx="38" cy="48" rx="2" ry="1.2" fill="#7A4830" opacity=".5"/><ellipse cx="42" cy="48" rx="2" ry="1.2" fill="#7A4830" opacity=".5"/><path d="M34,54 Q40,58 46,54" fill="#C07060"/><path d="M34,54 Q40,51.5 46,54" fill="#D08070"/><circle cx="23" cy="45" r="1.8" fill="#C8A96E" opacity=".8"/><circle cx="57" cy="45" r="1.8" fill="#C8A96E" opacity=".8"/><ellipse cx="31" cy="41" rx="7" ry="7" fill="none" stroke="#C8A96E" stroke-width=".4" opacity=".35"/><ellipse cx="49" cy="41" rx="7" ry="7" fill="none" stroke="#C8A96E" stroke-width=".4" opacity=".35"/></svg>',

  nodes: {

    'start': [
      {t:'sys', text:'nova mensagem · contato desconhecido'},
      {t:'msg', from:'unknown', text:'rosebud', delay:0},
      {t:'msg', from:'perce', text:'você também recebeu?', delay:5000},
      {t:'choice', opts:[
        {text:'quem é você?', next:'c1a'},
        {text:'como você sabe?', next:'c1b'}
      ]}
    ],

    'c1a': [
      {t:'msg', from:'perce', text:'perce. fico no Rio.', delay:2500},
      {t:'goto', next:'c1_cont'}
    ],

    'c1b': [
      {t:'msg', from:'perce', text:'porque eu também recebi. do mesmo jeito.', delay:2500},
      {t:'goto', next:'c1_cont'}
    ],

    'c1_cont': [
      {t:'msg', from:'perce', text:'a palavra chegou de madrugada. acordei sabendo dela.', delay:5000},
      {t:'msg', from:'perce', text:'não foi sonho. foi outra coisa.', delay:3500},
      {t:'choice', opts:[
        {text:'comigo foi diferente', next:'c2a'},
        {text:'igual aqui', next:'c2b'}
      ]}
    ],

    'c2a': [
      {t:'msg', from:'perce', text:'diferente como?', delay:2000},
      {t:'msg', from:'perce', text:'não importa. a sensação é a mesma de qualquer jeito.', delay:4000},
      {t:'goto', next:'c2_cont'}
    ],

    'c2b': [
      {t:'msg', from:'perce', text:'eu sabia que não era só eu.', delay:2000},
      {t:'goto', next:'c2_cont'}
    ],

    'c2_cont': [
      {t:'msg', from:'perce', text:'postei como legenda de foto. aquela foto brega de caneca de café.', delay:5000},
      {t:'msg', from:'perce', text:'em 3 minutos, dois contatos que eu nunca vi mandaram DM.', delay:3500},
      {t:'msg', from:'perce', text:'um sumiu antes de eu abrir. o outro disse: "você é um de nós."', delay:4000},
      {t:'choice', opts:[
        {text:'um de nós o quê?', next:'c3a'},
        {text:'isso te assustou?', next:'c3b'}
      ]}
    ],

    'c3a': [
      {t:'msg', from:'perce', text:'ainda não sei.', delay:2000},
      {t:'msg', from:'perce', text:'mas eu vou descobrir. a gente vai.', delay:3000},
      {t:'goto', next:'c3_cont'}
    ],

    'c3b': [
      {t:'msg', from:'perce', text:'muito.', delay:1500},
      {t:'msg', from:'perce', text:'mas olha — eu passo o dia inteiro editando o que as pessoas veem.', delay:4000},
      {t:'msg', from:'perce', text:'essa palavra não tem edição. ela é o que é de qualquer ângulo.', delay:4000},
      {t:'goto', next:'c3_cont'}
    ],

    'c3_cont': [
      {t:'msg', from:'perce', text:'isso não tinha acontecido comigo antes.', delay:4000},
      {t:'msg', from:'perce', text:'ontem no metrô, uma mulher estava lendo notícias. eu vi o que ela sentia antes de ver a tela dela.', delay:5000},
      {t:'msg', from:'perce', text:'não foi intuição. foi literal. o volume da realidade subiu sem eu pedir.', delay:4000},
      {t:'choice', opts:[
        {text:'isso acontece sempre?', next:'c4a'},
        {text:'quantas pessoas são?', next:'c4b'}
      ]}
    ],

    'c4a': [
      {t:'msg', from:'perce', text:'desde a palavra chegou, sim.', delay:2500},
      {t:'msg', from:'perce', text:'antes eram flashes. agora é constante.', delay:3500},
      {t:'goto', next:'c4_cont'}
    ],

    'c4b': [
      {t:'msg', from:'perce', text:'acho que doze.', delay:3000},
      {t:'msg', from:'perce', text:'...', delay:2500},
      {t:'msg', from:'perce', text:'não sei de onde veio esse número. chegou junto com a palavra.', delay:4000},
      {t:'goto', next:'c4_cont'}
    ],

    'c4_cont': [
      {t:'msg', from:'perce', text:'você sabe o que rosebud significa?', delay:5500},
      {t:'msg', from:'perce', text:'citizen kane. a última palavra de um homem que tinha tudo.', delay:4000},
      {t:'msg', from:'perce', text:'ninguém entendeu. ninguém foi atrás.', delay:3000},
      {t:'msg', from:'perce', text:'eu acho que a gente é a resposta pra uma pergunta que ainda não foi feita em voz alta.', delay:5000},
      {t:'choice', opts:[
        {text:'que pergunta?', next:'c5a'},
        {text:'quem são os outros?', next:'c5b'}
      ]}
    ],

    'c5a': [
      {t:'msg', from:'perce', text:'ainda não sei.', delay:3000},
      {t:'msg', from:'perce', text:'mas quando a gente se encontrar, vai ficar óbvio.', delay:4000},
      {t:'goto', next:'c5_cont'}
    ],

    'c5b': [
      {t:'msg', from:'perce', text:'tem uma aqui no Rio que sabe mais do que eu.', delay:3500},
      {t:'msg', from:'perce', text:'não vou dar o nome agora.', delay:2500},
      {t:'goto', next:'c5_cont'}
    ],

    'c5_cont': [
      {t:'msg', from:'perce', text:'olha, eu sei que isso parece loucura.', delay:5000},
      {t:'msg', from:'perce', text:'num dia normal eu te bloqueava.', delay:3000},
      {t:'msg', from:'perce', text:'mas rosebud não é um dia normal.', delay:3500},
      {t:'choice', opts:[
        {text:'o que você quer de mim?', next:'c6a'},
        {text:'onde você está agora?', next:'c6b'}
      ]}
    ],

    'c6a': [
      {t:'msg', from:'perce', text:'quero saber se você vê o que eu vejo.', delay:4000},
      {t:'goto', next:'c6_cont'}
    ],

    'c6b': [
      {t:'msg', from:'perce', text:'Copacabana. quinto andar.', delay:2000},
      {t:'msg', from:'perce', text:'janela com vista pro maior complexo de saúde mental da América Latina.', delay:4000},
      {t:'msg', from:'perce', text:'que tomou 200 metros de praia depois de 2027.', delay:3500},
      {t:'msg', from:'perce', text:'tem uma ironia enorme nisso que ainda estou processando.', delay:3500},
      {t:'goto', next:'c6_cont'}
    ],

    'c6_cont': [
      {t:'msg', from:'perce', text:'quando você estiver pronto, me fala.', delay:4500},
      {t:'msg', from:'perce', text:'eu vou estar aqui.', delay:2500},
      {t:'choice', opts:[
        {text:'estou pronto.', next:'final_a'},
        {text:'preciso de tempo.', next:'final_b'}
      ]}
    ],

    'final_a': [
      {t:'msg', from:'perce', text:'ok.', delay:2000},
      {t:'msg', from:'perce', text:'procura por Trans. ela é vereadora aqui no Rio.', delay:4500},
      {t:'msg', from:'perce', text:'quando falar com ela, diz rosebud. só isso.', delay:3500},
      {t:'sys', text:'— ato 1 encerrado · novo contato desbloqueado'},
      {t:'end'}
    ],

    'final_b': [
      {t:'msg', from:'perce', text:'tudo bem.', delay:2000},
      {t:'msg', from:'perce', text:'rosebud fica aí. eu fico aqui também.', delay:4000},
      {t:'sys', text:'— perce está disponível'},
      {t:'end'}
    ]
  }
};
