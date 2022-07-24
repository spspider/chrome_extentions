(function () {
  'use strict';

  /*
    A short list of partial hashes matching domains we don't want to share
  */

  const hashList = [
    /08fb2eb6424d/,
    /1529ad2b2cc8/,
    /1847807c0ea1/,
    /1d1d5ffa1d50/,
    /20c46b653b00/,
    /25f7c9982cea/,
    /293aa4f9b3d0/,
    /32aa39d04eb4/,
    /415215dcadbf/,
    /540b2374abf1/,
    /6f145d4255cf/,
    /71c1f4783e6d/,
    /79f57d83d54a/,
    /820a6e7baa0f/,
    /85ae87da6618/,
    /871de03c9980/,
    /8c2d5961f7af/,
    /8de5d416e5d2/,
    /95fa195f8b6a/,
    /9e2089d8b8f2/,
    /a32353817e45/,
    /cefdc93047b7/,
    /dbafdf055617/,
    /eefa602a72ed/,
    /efa3a2deb839/,
  ];

  /*
    Rules for styling the iframe that hosts the default client when pinmarklet is not called from one of our apps or extensions
  */

  const iframeStyle = {
    display: 'block',
    position: 'fixed',
    height: '100%',
    width: '100%',
    top: '0',
    left: '0',
    bottom: '0',
    right: '0',
    margin: '0',
    clip: '0',
    zIndex: '2147483647',
  };

  /*
    Translated strings for various error conditions
  */

  const msg = {
    en: {
      noPinDomain:
        'Sorry, pinning is not allowed from this domain. Please contact the site operator if you have any questions.',
      noPinMeta:
        'Sorry, pinning is not allowed from this page. Please contact the site operator if you have any questions.',
      noPinnablesFound: "Sorry, couldn't find any pinnable things on this page.",
    },
    cs: {
      noPinDomain:
        'Je nám líto. Z této domény není možné přidávat piny. S dotazy se obracejte na provozovatele webu.',
      noPinMeta:
        'Je nám líto. Z této stránky není možné přidávat piny. S dotazy se obracejte na provozovatele webu.',
      noPinnablesFound:
        'Je nám líto. Na této stránce jsme nenalezli žádný obsah, který by bylo možné připnout.',
    },
    da: {
      noPinDomain:
        'Det er ikke muligt at tilføje pins fra domænet. Kontakt websitets ejer, hvis du har spørgsmål.',
      noPinMeta:
        'Det er ikke tilladt at sætte pins op fra denne side. Kontakt websitets ejer, hvis du har spørgsmål.',
      noPinnablesFound: 'Der er ikke rigtigt noget at sætte op på denne side.',
    },
    de: {
      noPinDomain:
        'Es tut uns leid, aber von dieser Domain kann nichts gepinnt werden. Bitte kontaktiere den Website-Betreiber, falls du weitere Fragen hast.',
      noPinMeta:
        'Es tut uns leid, aber von dieser Seite kann nichts gepinnt werden. Bitte kontaktiere den Website-Betreiber, falls du weitere Fragen hast.',
      noPinnablesFound:
        'Es tut uns leid, aber wir konnten auf dieser Seite nichts finden, was du pinnen könntest.',
    },
    es: {
      noPinDomain:
        'Lo sentimos, no está permitido pinear desde este dominio. Ponte en contacto con el operador del sitio si tienes alguna pregunta.',
      noPinMeta:
        'Lo sentimos, no está permitido pinear desde esta página. Ponte en contacto con el operador del sitio si tienes alguna pregunta.',
      noPinnablesFound:
        'Lo sentimos, no hemos encontrado ningún elemento que se pueda pinear en esta página.',
    },
    'es-mx': {
      noPinDomain:
        'Lamentablemente, no está permitido pinear desde este dominio. Si quieres hacer consultas, comunícate con el operador del sitio.',
      noPinMeta:
        'Lamentablemente, no está permitido pinear desde esta página. Si quieres hacer consultas, comunícate con el operador del sitio.',
      noPinnablesFound: 'Lamentablemente, no se encontraron cosas para pinear en esta página.',
    },
    el: {
      noPinDomain:
        'Λυπάμαι, δεν επιτρέπεται το καρφίτσωμα από αυτόν τον τομέα. Επικοινωνήστε με το διαχειριστή της ιστοσελίδας αν έχετε απορίες.',
      noPinMeta:
        'Λυπάμαι, δεν επιτρέπεται το καρφίτσωμα από αυτήν τη σελίδα. Επικοινωνήστε με το διαχειριστή της ιστοσελίδας αν έχετε απορίες.',
      noPinnablesFound:
        'Λυπάμαι, δεν ήταν δυνατή η εύρεση στοιχείων που μπορούν να καρφιτσωθούν σε αυτήν τη σελίδα.',
    },
    fi: {
      noPinDomain:
        'Et voi tehdä Pin-lisäyksiä tästä verkkotunnuksesta. Jos sinulla on kysyttävää, ota yhteyttä sivuston ylläpitäjään.',
      noPinMeta:
        'Et voi tehdä Pin-lisäyksiä tältä sivulta. Jos sinulla on kysyttävää, ota yhteyttä sivuston ylläpitäjään.',
      noPinnablesFound: 'Sivulta ei valitettavasti löydy sisältöä, jota voi lisätä.',
    },
    fr: {
      noPinDomain:
        "Désolé, mais vous ne pouvez pas épingler les contenus de ce domaine. Pour toute question, veuillez contacter l'administrateur du site.",
      noPinMeta:
        "Désolé, mais vous ne pouvez pas épingler les contenus de cette page. Pour toute question, veuillez contacter l'administrateur du site.",
      noPinnablesFound:
        "Désolé, mais aucun contenu susceptible d'être épinglé n'a été trouvé sur cette page.",
    },
    id: {
      noPinDomain:
        'Maaf, Anda tidak diizinkan mengepin dari domain ini. Hubungi operator situs jika Anda memiliki pertanyaan.',
      noPinMeta:
        'Maaf, Anda tidak diizinkan mengepin dari halaman ini. Silakan hubungi operator situs jika Anda memiliki pertanyaan.',
      noPinnablesFound: 'Maaf, tidak ada yang bisa dipin dari halaman ini.',
    },
    it: {
      noPinDomain:
        "Ci dispiace, ma l'aggiunta di Pin non è consentita da questo dominio. Se hai domande, contatta il gestore del sito.",
      noPinMeta:
        "Ci dispiace, ma l'aggiunta di Pin non è consentita da questa pagina. Se hai domande, contatta il gestore del sito.",
      noPinnablesFound:
        'Spiacenti, impossibile trovare immagini o video che è possibile aggiungere ai Pin in questa pagina.',
    },
    hi: {
      noPinDomain:
        'क्षमा करें, इस डोमेन से पिन लगाने की अनुमति नहीं है। अगर आपका कोई प्रश्न हैं, तो कृपया साइट ऑपरेटर से संपर्क करें।',
      noPinMeta:
        'क्षमा करें, इस पेज से पिन लगाने की अनुमति नहीं है। अगर आपका कोई प्रश्न हैं, तो कृपया साइट ऑपरेटर से संपर्क करें।',
      noPinnablesFound: 'क्षमा करें, इस पेज पर कोई भी पिन लगाने वाली चीज़ नहीं मिल सकी।',
    },
    hu: {
      noPinDomain:
        'Sajnáljuk, ebből a tartományból nem lehet pinelni. Kérjük, kérdéseiddel fordulj az oldal üzemeltetőjéhez.',
      noPinMeta:
        'Sajnáljuk, erről az oldalról nem lehet pinelni. Kérjük, kérdéseiddel fordulj az oldal üzemeltetőjéhez.',
      noPinnablesFound: 'Sajnáljuk, ezen az oldalon nem található semmilyen pinelhető dolog.',
    },
    ja: {
      noPinDomain:
        'し訳ありません。HTML 以外のページでピンすることはできません。画像をアップロードしようと試みている場合は、pinterest.com にアクセスしてください。',
      noPinMeta:
        'このページからのピンは許可されていません。ご質問がある場合は、サイト運営者にお問い合わせください。',
      noPinnablesFound:
        '申し訳ございません、このページでピンできるアイテムは見つかりませんでした。',
    },
    ko: {
      noPinDomain:
        '죄송합니다. 이 도메인에서는 핀하기가 허용되지 않습니다. 질문이 있으시면 사이트 운영자에게 문의하시기 바랍니다.',
      noPinMeta:
        '죄송합니다. 이 페이지에서는 핀하기가 허용되지 않습니다. 질문이 있으시면 사이트 운영자에게 문의하시기 바랍니다.',
      noPinnablesFound: '죄송합니다. 이 페이지에서 핀할 수 있는 것을 찾지 못했습니다.',
    },
    ms: {
      noPinDomain:
        'Maaf, mengepin tidak dibenarkan dari domain ini. Sila hubungi pengendali laman jika anda ada sebarang solan.',
      noPinMeta:
        'Maaf, mengepin tidak dibenarkan dari halaman ini. Sila hubungi pengendali laman jika anda ada sebarang soalan.',
      noPinnablesFound:
        'Maaf, tidak dapat mencari sebarang imej yang boleh dipin pada halaman ini.',
    },
    nb: {
      noPinDomain:
        'Beklager, pinning er ikke tillatt fra dette domenet. Ta kontakt med webmasteren hvis du har spørsmål.',
      noPinMeta:
        'Beklager, pinning er ikke tillatt fra denne siden. Ta kontakt med webmasteren hvis du har spørsmål.',
      noPinnablesFound: 'Beklager, kunne ikke finne noen ting som kunne pinnes på denne siden.',
    },
    nl: {
      noPinDomain:
        'Sorry, het is niet toegestaan om vanaf dit domein te pinnen. Neem contact op met de beheerder van deze website als je vragen hebt.',
      noPinMeta:
        'Sorry, het is niet toegestaan om vanaf dit domein te pinnen. Neem contact op met de beheerder van deze website als je vragen hebt.',
      noPinnablesFound: 'Sorry, er is niets wat je kunt pinnen op deze pagina.',
    },
    pl: {
      noPinDomain:
        'Niestety przypinanie z tej domeny jest niedozwolone. Skontaktuj się z operatorem witryny, jeśli masz pytania.',
      noPinMeta:
        'Niestety przypinanie z tej strony jest niedozwolone. Skontaktuj się z operatorem witryny, jeśli masz pytania.',
      noPinnablesFound: 'Niestety na tej stronie nie ma żadnych rzeczy do przypinania.',
    },
    pt: {
      noPinDomain:
        'Lamentamos, mas não é permitido afixar pins a partir deste domínio. Em caso de dúvidas, contacta o operador do site.',
      noPinMeta:
        'Lamentamos, mas não é permitido afixar pins a partir desta página. Em caso de dúvidas, contacta o operador do site.',
      noPinnablesFound:
        'Lamentamos, mas não foi possível encontrar nesta página nenhum conteúdo que possa ser afixado.',
    },
    'pt-br': {
      noPinDomain:
        'Não é possível pinar a partir deste domínio. Entre em contato com o operador do site se tiver dúvidas.',
      noPinMeta:
        'Não é possível pinar a partir desta página. Entre em contato com o operador do site se tiver dúvidas.',
      noPinnablesFound: 'Não foi possível encontrar nesta página conteúdo que possa ser pinado.',
    },
    ro: {
      noPinDomain:
        'Ne pare rău, nu se pot adăuga Pinuri de pe acest site. Te rugăm să-l contactezi pe operatorul site-ului dacă ai întrebări.',
      noPinMeta:
        'Ne pare rău, nu se pot adăuga Pinuri de pe această pagină. Te rugăm să-l contactezi pe operatorul site-ului dacă ai întrebări.',
      noPinnablesFound:
        'Ne pare rău, nu am putut găsi conținut pentru adăugat ca Pinuri pe această pagină.',
    },
    ru: {
      noPinDomain:
        'К сожалению, прикалывание Пинов в данном домене невозможно. Со всеми вопросами обращайтесь к администратору веб-сайта.',
      noPinMeta:
        'К сожалению, прикалывание Пинов с данной страницы невозможно. Со всеми вопросами обращайтесь к администратору веб-сайта.',
      noPinnablesFound: 'На этой странице нет ничего, что можно было бы приколоть.',
    },
    sk: {
      noPinDomain:
        'Prepáčte, z tejto domény si nemôžete pripínať piny. Kontaktujte prevádzkovateľa stránky, ak máte nejaké otázky.',
      noPinMeta:
        'Prepáčte, z tejto stránky si nemôžete pripínať piny. Kontaktujte prevádzkovateľa stránky, ak máte nejaké otázky.',
      noPinnablesFound: 'Prepáčte, na tejto stránke sme nenašli nič na pripnutie.',
    },
    sv: {
      noPinDomain:
        'Tyvärr går det inte att pinna från den här domänen. Kontakta webbplatsoperatören om du har frågor.',
      noPinMeta:
        'Det går inte att pinna från den här sidan. Kontakta webbplatsoperatören om du har frågor.',
      noPinnablesFound: 'Det gick inte att hitta något på den här sidan som går att pinna.',
    },
    th: {
      noPinDomain: 'ขออภัย โดเมนนี้ไม่อนุญาตให้ปักพิน กรุณาติดต่อผู้ดูแลเว็บไซต์หากมีข้อสงสัย',
      noPinMeta: 'ขออภัย เพจนี้ไม่อนุญาตให้ปักพิน กรุณาติดต่อผู้ดูแลเว็บไซต์หากมีข้อสงสัย',
      noPinnablesFound: 'ขออภัย ไม่พบอะไรที่ปักพินได้ในเพจนี้',
    },
    tl: {
      noPinDomain:
        "Sorry, hindi allowed ang pinning sa domain na 'to. Paki-contact ang site operator kung may tanong ka.",
      noPinMeta:
        "Sorry, hindi allowed ang pinning mula sa page na 'to. Paki-contact ang site operator kung may tanong ka.",
      noPinnablesFound: "Sorry, walang makitang puwedeng i-pin sa page na 'to.",
    },
    tr: {
      noPinDomain:
        'Üzgünüz, bu alan adından pinlemeye izin verilmiyor. Sorularınız varsa, lütfen site operatörüne başvurun.',
      noPinMeta:
        'Üzgünüz, bu sayfadan pinlemeye izin verilmiyor. Sorularınız varsa, lütfen site operatörüne başvurun.',
      noPinnablesFound: 'Üzgünüz, bu sayfada pinlenebilecek bir şey bulunamadı.',
    },
    uk: {
      noPinDomain:
        "На жаль, приколювати піни з цього домену не можна. Якщо у вас виникли запитання, зв'яжіться з оператором веб-сайту.",
      noPinMeta:
        "На жаль, приколювати піни з цієї сторінки не можна. Якщо у вас виникли запитання, зв'яжіться з оператором веб-сайту.",
      noPinnablesFound:
        'На жаль, ми не змогли знайти на цій сторінці зображень, які можна було б приколоти.',
    },
    vi: {
      noPinDomain:
        'Rất tiếc, không cho phép ghim từ miền này. Vui lòng liên hệ người điều hành trang web nếu bạn có thắc mắc.',
      noPinMeta:
        'Rất tiếc, không cho phép ghim từ trang này. Vui lòng liên hệ người điều hành trang web nếu bạn có thắc mắc.',
      noPinnablesFound: 'Rất tiếc, không thể tìm thấy thứ gì ghim được trên trang này.',
    },
    // simplified Chinese  - show for anything starting with zh that is not zh-tw
    zh: {
      noPinDomain: '抱歉，不允许从此域收藏 Pin 图。如有疑虑请联系网站运营商。',
      noPinMeta: '抱歉，不允许从此域收藏 Pin 图。如有疑虑请联系网站运营商。',
      noPinnablesFound: '抱歉，未在此页面中找到可收藏的 Pin 图。',
    },
    // traditional Chinese
    'zh-tw': {
      noPinDomain: '抱歉！不允許從此網域收藏釘圖。若有疑問，請聯絡網站營運商。',
      noPinMeta: '抱歉！不允許從此網頁收藏釘圖。若有疑問，請聯絡網站營運商。',
      noPinnablesFound: '抱歉！在此網頁上找不到任何可收藏釘圖的內容。',
    },
  };

  /*
    Patterns for URLs we should not save from
  */

  const nopeList = [
    /^https?:\/\/(.*?\.|)craigslist\.org\//,
    /^https?:\/\/(.*?\.|)chase\.com\//,
    /^https?:\/\/(.*?\.|)facebook\.com\//,
    /^https?:\/\/mail\.aol\.com\//,
    /^https?:\/\/(.*?\.|)atmail\.com\//,
    /^https?:\/\/(.*?\.|)contactoffice\.com\//,
    /^https?:\/\/(.*?\.|)fastmail\.fm\//,
    /^https?:\/\/(.*?\.|)webmail\.gandi\.net\//,
    /^https?:\/\/outlook\.live\.com\//,
    /^https?:\/\/(.*?\.|)mail\.live\.com\//,
    /^https?:\/\/post\.pinterest\.com\//,
    /^https?:\/\/mail\.ukr\.net\//,
    /^https?:\/\/plus\.google\.com\//,
    /^https?:\/\/outlook\.office\.com\//,
    /^https?:\/\/accounts\.google\.com\//,
    /^https?:\/\/myaccount\.google\.com\//,
    /^https?:\/\/mail\.google\.com\//,
    /^https?:\/\/inbox\.google\.com\//,
    /^https?:\/\/docs\.google\.com\//,
    /^https?:\/\/gmx\.com\//,
    /^https?:\/\/(.*?\.|)hushmail\.com\//,
    /^https?:\/\/(.*?\.|)laposte\.fr\//,
    /^https?:\/\/mail\.lycos\.com\//,
    /^https?:\/\/(.*?\.|)mail\.com\//,
    /^https?:\/\/(.*?\.|)mail\.ru\//,
    /^https?:\/\/(.*?\.|)opolis\.eu\//,
    /^https?:\/\/(.*?\.|)outlook\.com\//,
    /^https?:\/\/(.*?\.|)nokiamail\.com\//,
    /^https?:\/\/apps\.rackspace\.com\//,
    /^https?:\/\/mail\.rediff\.com\//,
    /^https?:\/\/(.*?\.|)runbox\.com\//,
    /^https?:\/\/mail\.sify\.com\//,
    /^https?:\/\/webmail\.thexyz\.com\//,
    /^https?:\/\/login\.yahoo\.com\//,
    /^https?:\/\/mail\.yahoo\.com\//,
    /^https?:\/\/mail\.yandex\.com\//,
  ];

  /*
    Helper patterns so we can identify URLs and other resources
  */

  const pattern = {
    att: {
      amazonAsin: 'data-fling-asin',
    },
    iframe: {
      youtube: /^(https?:|)\/\/www\.youtube\.com\/embed\//,
      instagram: /^https?:\/\/www\.instagram\.com\/p\//,
      vimeo: /^(https?:|)\/\/player\.vimeo\.com\/video\//,
    },
    img: {
      twitter: /^https?:\/\/pbs\.twimg\.com\/media\//,
      youtube: /^(https?:|)\/\/i.ytimg.com\/vi\//,
    },
    link: {
      youtubeWatch: /^(https?:|)\/\/(www|m)\.youtube\.com\/watch?/,
    },
    page: {
      instagramPage: /^https?:\/\/www\.instagram\.com\//,
      instagramPhoto: /^https?:\/\/www\.instagram\.com\/p\//,
      twitter: /^https?:\/\/twitter\.com\//,
      amazonPage: /^https?:\/\/www\.amazon\.com\//,
      amazonProduct: /^https?:\/\/www\.amazon\.com((\/|.*)\/dp\/)/,
      youtubeWatch: /^https?:\/\/(www|m)\.youtube\.com\/watch?/,
      youtubeMobile: /^https?:\/\/m\.youtube\.com\//,
      googleImageSearch: /^https?:\/\/www\.google\.com\/search(.*tbm=isch.*)/,
    },
    pinterest: {
      pin: /^https?:\/\/(([a-z]{1,3}|latest)\.|)pinterest\.(at|(c(a|h|l|o(\.(kr|uk)|m(|\.(au|mx)))))|d(e|k)|es|fr|i(e|t)|jp|nz|p(h|t)|se|ru)\/pin\//,
    },
  };

  /*
    valid parameter names that may be added to SCRIPT tags calling pinmarklet.js
  */

  const validParams = [
    // send debugging messages to console.log
    'debug',
    // so extensions can send h, g, or r
    'pinMethod',
    // name of a function to call once we have data we want to render
    'render',
    // sent from third-party vendors like addthis, so we can tell it's them
    'via',
    // random user ID generated by pinit.js
    'guid',
    // name of the machine on pinterdev.com we want to test
    'pinbox',
    // don't pop an alert if there's trouble
    'quiet',
    // override config.quality if found
    'quality',
    // don't show the X in the header
    'noCancel',
    // don't show the header
    'noHeader',
    // force pinmarklet to run even though we're on pinterest.com
    'force',
  ];

  /*
    consolidate all configuration into a single object
  */

  const config = {
    // current version for logging
    ver: '2021112901',
    // where to find the unauthed grid
    grid: 'https://assets.pinterest.com/ext/grid.html?' + new Date().getTime(),
    // what to match against when looking for my own script
    me: /\/\/assets\.pinterest\.com\/js\/pinmarklet\.js/,
    // whoat to log under
    logType: 'pinmarklet',
    // where to log
    log: 'https://log.pinterest.com/',
    // how long to wait before rendering what we have
    maxWait: 5000,
    // width of a thumbnail for comparison when determining whether to show an imageless thumb
    thumbSize: 237,
    // max score divided by quality number determines the cutoff
    quality: 30,
    // set this on document.body so we don't try to render the unauthed grid twice
    hazPinningNow: 'data-pinterest-pinmarklet-rendered',
    validParams: validParams,
    hashList: hashList,
    nopeList: nopeList,
    iframeStyle: iframeStyle,
    msg: msg,
    pattern: pattern,
    // when scrubbing URLs, remove parameters and values matching anything on this list
    forbiddenQueryKey: [/password/gi],
    // a random-ish identifier to minimize style collisions
    k: 'PIN_' + new Date().getTime(),
  };

  /*
    export global variable space, some with defaults set
  */

  const global = {
    override: {},
    config: {
      debug: false,
      pinMethod: 'bookmarklet',
      domain: 'www',
      lang: 'en',
    },
    data: {
      img: {},
      link: {},
      meta: {},
      script: [],
    },
    count: {
      imgLoading: 0,
    },
    time: {
      start: new Date().getTime(),
    },
    // default to "headless" client
    client: 'web',
  };

  /*
    Some space for the headless client to run
  */

  const structure = {};

  // send notes to the console

  function debug(o) {
    // console.log only if debug is on
    if (global.config.debug && window.console) {
      if (window.console.log) {
        console.log(o);
      } else {
        // some sites (Twitter) that disable console.log don't know about console.table
        if (window.console.table) {
          window.console.table(o);
        }
      }
    }
  }

  /*
    Return the SHA-1 checksum of a string
  */

  function sha(o) {
    const h = {
      rstr2binb: (input) => {
        let i,
          output = Array(input.length >> 2);
        for (i = 0; i < output.length; i++) {
          output[i] = 0;
        }
        for (i = 0; i < input.length * 8; i += 8) {
          output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << (24 - (i % 32));
        }
        return output;
      },
      binb2rstr: (input) => {
        let i,
          output = '';
        for (i = 0; i < input.length * 32; i += 8) {
          output += String.fromCharCode((input[i >> 5] >>> (24 - (i % 32))) & 0xff);
        }
        return output;
      },
      safe_add: (x, y) => {
        let lsw, msw;
        lsw = (x & 0xffff) + (y & 0xffff);
        msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xffff);
      },
      bit_rol: (num, cnt) => {
        return (num << cnt) | (num >>> (32 - cnt));
      },
      binb_sha1: (x, len) => {
        let a, b, c, d, e, w, i, j, t, oa, ob, oc, od, oe;
        x[len >> 5] |= 0x80 << (24 - (len % 32));
        x[(((len + 64) >> 9) << 4) + 15] = len;
        w = Array(80);
        a = 1732584193;
        b = -271733879;
        c = -1732584194;
        d = 271733878;
        e = -1009589776;
        for (i = 0; i < x.length; i += 16) {
          oa = a;
          ob = b;
          oc = c;
          od = d;
          oe = e;
          for (j = 0; j < 80; j++) {
            if (j < 16) {
              w[j] = x[i + j];
            } else {
              w[j] = h.bit_rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
            }
            t = h.safe_add(
              h.safe_add(h.bit_rol(a, 5), h.sha1_ft(j, b, c, d)),
              h.safe_add(h.safe_add(e, w[j]), h.sha1_kt(j)),
            );
            e = d;
            d = c;
            c = h.bit_rol(b, 30);
            b = a;
            a = t;
          }
          a = h.safe_add(a, oa);
          b = h.safe_add(b, ob);
          c = h.safe_add(c, oc);
          d = h.safe_add(d, od);
          e = h.safe_add(e, oe);
        }
        return Array(a, b, c, d, e);
      },
      sha1_ft: (t, b, c, d) => {
        if (t < 20) return (b & c) | (~b & d);
        if (t < 40) return b ^ c ^ d;
        if (t < 60) return (b & c) | (b & d) | (c & d);
        return b ^ c ^ d;
      },
      sha1_kt: (t) => {
        return t < 20 ? 1518500249 : t < 40 ? 1859775393 : t < 60 ? -1894007588 : -899497514;
      },
      rstr_sha1: (s) => {
        return h.binb2rstr(h.binb_sha1(h.rstr2binb(s), s.length * 8));
      },
      rstr2hex: (input) => {
        let hex_tab, output, x, i;
        hex_tab = '0123456789abcdef';
        output = '';
        for (i = 0; i < input.length; i++) {
          x = input.charCodeAt(i);
          output = output + hex_tab.charAt((x >>> 4) & 0x0f) + hex_tab.charAt(x & 0x0f);
        }
        return output;
      },
    };
    // set up a space to hold these if it doesn't already exist
    if (!global.sha) {
      debug('setting up hash repo');
      global.sha = {};
    }
    // compute and cache results if not found
    if (!global.sha[o.str]) {
      global.sha[o.str] = h.rstr2hex(h.rstr_sha1(o.str));
    }
    // return
    return global.sha[o.str];
  }

  /*
    Send log entries
  */

  function log(o) {
    let k, q;
    q = '?type=' + config.logType + '&v=' + config.ver;
    if (o.reason === 'grid_rendered') {
      // generated by pinit.js
      if (global.config.guid) {
        o.guid = global.config.guid;
      }
    }
    // client will be: web (default), extension, ios, or android
    o.client = global.client;
    // never log an URL that has not been scrubbed
    o.url = global.here;
    for (k in o) {
      if (k !== 'extras') {
        q = q + '&pm' + k.charAt(0).toUpperCase() + k.slice(1) + '=' + encodeURIComponent(o[k]);
      }
    }
    // append any extra keys and values we may have sent that should NOT start with pM
    if (o.extras) {
      for (k in o.extras) {
        if (o.extras[k] && o.extras[k].hasOwnProperty) {
          q = q + '&' + k + '=' + o.extras[k];
        }
      }
    }
    // send the ping by sourcing a new image; no need to add it to the DOM
    new Image().src = config.log + q;
    debug('Logging: ' + q);
  }

  /*
    Check a domain against our list of partial hashes
  */

  function checkDisallowedDomain(o) {
    let h, i, j, p, r, t;
    // what we're returning
    r = false;
    for (i = 0; i < config.nopeList.length; i = i + 1) {
      if (o.url.match(config.nopeList[i])) {
        log({ reason: 'nope_list' });
        return true;
      }
    }
    // get the domain part
    p = o.url.split('/');
    if (p[2]) {
      // split into subcomponents
      p = p[2].split('.');
      // test all possible domains you can make from these components
      if (p.length > 1) {
        // start with the top-level domain, .com
        t = p.pop();
        // test foo.com, then www.foo.com
        for (i = p.length - 1; i > -1; i = i - 1) {
          t = p[i] + '.' + t;
          // get the hash
          h = sha({ str: t });
          // do any of our partial hashes match our domain?
          for (j = config.hashList.length - 1; j > -1; j = j - 1) {
            if (h.match(config.hashList[j])) {
              // return the domain that failed instead of true,
              // so we can pop special alerts for special domains
              return t;
            }
          }
        }
      }
    }
    return r;
  }

  /*
    Handle our exit
  */

  function done() {
    if (global.data.close) {
      // if we've rendered the grid from the extension, close it
      if (typeof global.extendedClose === 'function') {
        global.extendedClose();
      } else {
        // have we been instructed not to say anything?
        if (!global.config.quiet) {
          window.setTimeout(() => {
            window.alert(global.data.close);
          }, 10);
        }
      }
    }
  }

  /*
    Get an attribute from a DOM element
  */

  function get(o) {
    let v = null;
    if (o.el && o.att) {
      if (typeof o.el[o.att] !== 'undefined') {
        v = o.el[o.att];
      } else {
        v = o.el.getAttribute(o.att);
      }
    }
    return v;
  }

  /*
    Return the best guess for a description
  */

  function getDescription(o) {
    let r;
    // if we don't have an input object we're going to look at the page
    o = o || {};
    // don't allow single-word descriptions that appear to be files or URLs
    function filter(str) {
      // we might get undefined
      if (str) {
        // we might get an array if we are looking at a META
        if (typeof str === 'object' && str.length) {
          str = str[0];
        }
        // trim leading and trailing spaces
        str = str.trim();
        // are there zero spaces in the remaining string?
        if (!str.match(/\s/)) {
          // trim hash and query hash
          str = str.split('#')[0].split('?')[0];
          // does it start with an http protocol or end with a file format we know about?
          if (str.match(/^http?s:\/\//) || str.match(/\.(gif|jpeg|jpeg|png|webp)/)) {
            // clear it out
            str = '';
          }
        }
      } else {
        str = '';
      }
      return str;
    }
    // has the reader selected any text?
    r = filter('' + window.getSelection());
    if (!r) {
      // should we look at the image
      if (o.src) {
        // does the image have a data-pin-description?
        r = filter(get({ el: o, att: 'data-pin-description' }));
        // does the image have a title?
        // NOTE we are ignoring alt attributes as of 2019-02-28
        if (!r) {
          r = filter(o.title);
        }
        // does the page have document.title?
        if (!r) {
          r = filter(document.title);
        }
      } else {
        // does the page have a generic meta description or title?
        if (!r) {
          r = filter(global.data.meta.description || global.data.meta.title);
        }
        // does the page have an OG description?
        if (!r) {
          r = filter(global.ogDescription);
        }
        // does the page have document.title?
        if (!r) {
          r = filter(document.title);
          // allow filenames for imageless pins
          if (!r && o.imageless) {
            // split the URL, take last element of path, remove hash, remove query, remove file extension
            r = global.here.split('/').pop().split('#')[0].split('?')[0].split('.')[0];
          }
        }
      }
    }
    return r;
  }

  /*
    Filter images that cannot or should not be saved
  */

  function filterImg(o) {
    // is either dimension under 90
    if (o.width < 90 || o.height < 90) {
      return 'Image dimensions are both too small.';
    }
    // both dimensions under 120
    if (o.width < 120 && o.height < 120) {
      return 'One image dimension is too small.';
    }
    // width is greater than 3x height
    if (o.width > o.height * 3) {
      return 'Image is too wide.';
    }
    // data URIs are not currently allowed in the grid or to be sent to unauthed pin create form
    if (!o.src.match(/^https?:\/\//)) {
      return 'Image source does not begin with http.';
    }
    return false;
  }

  /*
    When an image we've requested has loaded, return its height, width, and src attribute
  */

  function getImgData(o) {
    return {
      status: 'loaded',
      height: o.naturalHeight || 0,
      width: o.naturalWidth || 0,
      src: o.src,
    };
  }

  /*
    reload an image, so we know it exists and has a true height and width
  */

  function loadImg(o) {
    if (o.mod) {
      if (o.mod.url) {
        // are we deep-linking directly to Pinterest?
        if (o.mod.url.match(config.pattern.pinterest.pin)) {
          let t = o.mod.url.split('/pin/');
          // do we have something after /pin/?
          if (t[1]) {
            // remove the trailing slash and anything after it
            let id = t[1].split('/')[0];
            // if we subtract zero, do we get a number?
            if (id - 0) {
              // the string (not id - 0, which may not be the same) is the ID
              o.mod.pinId = id;
              // don't give this image a bonus when ranking
              o.mod.suppressPinIdBonus = true;
            }
          }
          // in cany case don't pin links to existing Pins on Pinterest
          delete o.mod.url;
        }
      }
    }
    if (o.src) {
      if (!checkDisallowedDomain({ url: o.src })) {
        const hash = sha({ str: o.src });
        // don't try to load if we've already got this one
        if (!global.data.img[hash]) {
          // see if we can find the image extension and bail out if it's SVG
          const test = o.src.split('#')[0].split('?')[0].split('.').pop();
          if (test === 'svg') {
            global.data.img[hash] = {
              src: o.src,
              status: 'invalid',
              reason: 'SVG images are not supported on Pinterest',
            };
            return;
          }
          // start a new image
          const img = new Image();
          // increment image-loading count
          global.count.imgLoading = global.count.imgLoading + 1;
          global.data.img[hash] = {
            mod: o.mod || {},
            status: 'loading',
          };
          // did not load property
          img.onerror = (e) => {
            let checkMe;
            // decrement image-loading count
            global.count.imgLoading = global.count.imgLoading - 1;
            // do we need to remove data-pin-media from some other image's mod object?
            for (checkMe in global.data.img) {
              if (global.data.img[checkMe].mod && global.data.img[checkMe].mod.pinMedia === o.src) {
                delete global.data.img[checkMe].mod.pinMedia;
              }
            }
            global.data.img[hash].status = 'error';
          };
          // loaded
          img.onload = () => {
            // get image attributes
            let k,
              upHash,
              data = getImgData(img),
              filterReason = filterImg(data);
            if (o.override) {
              for (k = 0; k < o.override.length; k = k + 1) {
                global.override[o.override[k]] = true;
              }
            }
            if (!filterReason) {
              // prevent imageless pin representations if we have at least one image larger than 237x237
              if (data.height > config.thumbSize && data.width > config.thumbSize) {
                global.override.imageless = true;
              }
              if (o.mod) {
                global.data.img[hash].mod = o.mod;
              }
              for (k in data) {
                // set all properties
                if (data[k]) {
                  global.data.img[hash][k] = data[k];
                }
              }
              if (o.src === global.here) {
                // don't fill in a default description
                k.description = '';
                // don't produce an imageless pin
                global.override.imageless = true;
              }
              // we need to swap out an image found on the page for an image that's been loaded live
              if (o.update) {
                debug('Image source changed from ' + o.update + ' to ' + o.src);
                upHash = sha({ str: o.update });
                global.data.img[upHash] = global.data.img[hash];
                if (o.mod) {
                  global.data.img[upHash].mod = o.mod;
                }
                global.data.img[upHash].src = o.src;
                global.data.img[upHash].height = data.height;
                global.data.img[upHash].width = data.width;
                global.data.img[hash] = global.data.img[upHash];
                global.data.img[hash].status = 'ok';
                delete global.data.img[upHash];
              } else {
                global.data.img[hash].status = 'ok';
              }
            } else {
              // update so we know it was filtered and why
              global.data.img[hash] = {
                status: 'filtered',
                reason: filterReason,
                src: o.src.substr(0, 64),
              };
              // add an ellipsis if we've truncated the source
              if (o.src.length > 64) {
                global.data.img[hash].src = global.data.img[hash].src + '...';
              }
            }
            // decrement image-loading count
            global.count.imgLoading = global.count.imgLoading - 1;
          };
          // setting the source is enough to start modern browsers loading the image
          img.src = o.src;
        }
      }
    }
  }

  /*
    Extract useful parameters from certain iframe embeds
  */

  function handleIframe() {
    let m, i, c, p;
    m = document.getElementsByTagName('IFRAME');
    for (i = 0; i < m.length; i = i + 1) {
      // skip any iframes with nopin or data-pin-nopin
      if (m[i].getAttribute('nopin') || m[i].getAttribute('data-pin-nopin')) {
        continue;
      }
      // nothing happens if we don't have content
      c = m[i].getAttribute('src');
      if (c && c.match(/^(https?:|)\/\//)) {
        c = c.split('#')[0].split('?')[0];
        // youtube
        if (c.match(config.pattern.iframe.youtube)) {
          p = c.split('/');
          if (p[4]) {
            debug('found a YouTube player: ' + m[i].src);
            loadImg({
              src: 'https://img.youtube.com/vi/' + p[4] + '/hqdefault.jpg',
              mod: {
                multimedia: true,
                url: 'https://www.youtube.com/watch?v=' + p[4],
                description: getDescription(),
              },
            });
          }
          continue;
        }
        // instagram
        if (c.match(config.pattern.iframe.instagram)) {
          p = c.split('/');
          if (p[4]) {
            debug('found an Instagram embed: ' + m[i].src);
            loadImg({
              src: 'https://instagram.com/p/' + p[4] + '/media/?size=l',
              mod: {
                url: 'https://www.instagram.com/p/' + p[4] + '/',
                description: getDescription(),
              },
            });
          }
          continue;
        }
      }
    }
    debug(global.data.iframe);
  }

  /*
    find some or all of the images on the page and decide if they are pinnable
  */

  function handleImg() {
    let i,
      m,
      mod,
      order = 0,
      pinMeOnly;
    // we may have found a pinnable image; check to see if it's
    // good and/or deserves special treatment
    const processImage = (img) => {
      let v, a, q;
      // be sure we have a source
      if (img.currentSrc) {
        // save things we want to retain
        mod = {
          description: getDescription(img),
          sourceOrder: order,
        };
        order = order + 1;
        // skip images with inline nopin attributes
        v = img.getAttribute('nopin') || img.getAttribute('data-pin-nopin');
        if (v) {
          return;
        }
        // don't alter links to point to deep-linked images
        a = img.parentNode;
        if (a.tagName === 'A' && a.href) {
          // does this domain match the hosting page's domain?
          if (global.here.split('/')[2] === a.href.split('/')[2]) {
            // are we looking at an image that's deep-linked to another image?
            // does the URL run JavaScript when clicked per BUG-95302?
            if (!a.href.match(/(^javascript|\.gif|\.jpg|\.jpeg|\.png|\.webp)/)) {
              mod.url = a.href;
            }
          }
        }
        // does the site only want us to pin this one thing?
        v = img.getAttribute('data-pin-me-only');
        if (v) {
          mod.pinMeOnly = true;
        }
        // pin ID
        v = img.getAttribute('data-pin-id');
        if (v) {
          mod.pinId = v;
        }
        // suggested default description
        v = img.getAttribute('data-pin-description');
        if (v) {
          mod.pinDescription = v;
        }
        // URL to pin instead of document.URL
        v = img.getAttribute('data-pin-url');
        if (v) {
          mod.pinUrl = v;
        }
        // media to pin instead of this image
        v = img.getAttribute('data-pin-media');
        // do we have data-pin-media?
        if (v) {
          // we have media -- always give the mod boost to increase sort order of data-pin-media
          mod.pinMedia = v;
          // will we need to reload and update?
          if (v === img.currentSrc) {
            // if data-pin-media is the same as the current source, load it without the update flag
            loadImg({ src: img.currentSrc, mod: mod });
          } else {
            // data-pin-media is different so we need to update
            loadImg({ src: v, mod: mod, update: img.currentSrc });
          }
        } else {
          // we do not have media, so load whatever is currently on the screen
          loadImg({ src: img.currentSrc, mod: mod });
        }
        // be nice to Twitter
        if (
          global.here.match(config.pattern.page.twitter) &&
          img.currentSrc.match(config.pattern.img.twitter)
        ) {
          a = img.parentNode;
          while (a.tagName) {
            q = a.getAttribute('data-permalink-path');
            if (q) {
              mod.url = 'https://twitter.com' + q;
              mod.description = a.parentNode.getElementsByTagName('P')[0].textContent;
              a = document.body;
            }
            a = a.parentNode;
          }
        }
        // be nice to YouTube thumbs
        if (img.currentSrc.match(config.pattern.img.youtube)) {
          a = img.currentSrc.split('/vi/');
          if (a.length) {
            q = a[1].split('/')[0];
            if (q) {
              loadImg({
                mod: {
                  multimedia: true,
                  url: 'https://www.youtube.com/watch?v=' + q,
                },
                src: 'https://i.ytimg.com/vi/' + q + '/hqdefault.jpg',
                update: img.currentSrc,
              });
            }
          }
        }
      }
    };
    // Are we using an extension-based Save button or context menu?
    pinMeOnly = document.querySelectorAll('[data-pin-me-only]');
    // if we find exactly one, it's our hoverbutton or context menu image.
    if (
      // is there exactly one?
      pinMeOnly.length === 1
    ) {
      // process this link only
      processImage(pinMeOnly[0]);
    } else {
      // override.og may have been set by a page-level discovery
      if (global.override.og) {
        debug('og overridden');
      } else {
        // be nice to people who share via Open Graph, even though it's kind of a dumpster fire
        if (global.data.meta.og) {
          mod = {};
          debug('og found');
          if (global.data.meta.og.image) {
            // do we have a string value?
            if (typeof global.data.meta.og.image === 'string') {
              debug('og:image found');
              mod.ogMedia = global.data.meta.og.image;
            } else {
              // do we have an array?
              if (global.data.meta.og.image[0]) {
                debug('og:image array found; using the first element');
                q = global.data.meta.og.image[0];
              } else {
                q = global.data.meta.og.image;
              }
              // do we have a strng
              if (typeof q === 'string') {
                debug('og:image found in object');
                mod.ogMedia = q;
              } else {
                // do we have a secure URL?
                if (q.secure_url && typeof q.secure_url === 'string') {
                  debug('og:secure_url found');
                  mod.ogMedia = q.secure_url;
                } else {
                  // has the original value of image been saved as a string in the ~ member because it has children such as height or width?
                  if (q['~'] && typeof q['~'] === 'string') {
                    debug('og:~ found');
                    mod.ogMedia = q['~'];
                  }
                }
              }
            }
            // do we have an URL?
            if (global.data.meta.og.url) {
              if (typeof global.data.meta.og.url === 'string') {
                mod.ogUrl = global.data.meta.og.url;
              } else {
                debug('More than one og:url found');
                mod.ogUrl = global.data.meta.og.url[0];
              }
              debug('og:url found');
            }
            if (global.data.meta.og.site_name) {
              if (typeof global.data.meta.og.site_name === 'string') {
                global.ogSiteName = global.data.meta.og.site_name;
              } else {
                debug('More than one og:site_name found');
                global.ogSiteName = global.data.meta.og.site_name[0];
              }
            }
            if (global.data.meta.og.description || global.data.meta.og.title) {
              debug('og:title or og:description found');
              mod.ogDescription = global.data.meta.og.description || global.data.meta.og.title;
              if (typeof mod.ogDescription === 'string') {
                global.ogDescription = mod.ogDescription;
              } else {
                debug('More than one og:description found');
                global.ogDescription = mod.ogDescription[0];
              }
            }
            debug('loading og:image');
            // load the image we placed in mod.ogMedia, not anything we found in global.data.meta.og.image, which could be an array
            loadImg({ src: mod.ogMedia, mod: mod });
          }
        }
      }
      m = document.getElementsByTagName('IMG');
      for (i = 0; i < m.length; i = i + 1) {
        processImage(m[i]);
      }
    }
  }

  /*
    Locate canonical link
  */

  function handleLink() {
    let m, i;
    m = document.getElementsByTagName('LINK');
    for (i = 0; i < m.length; i = i + 1) {
      // knowing the canonical link will help us identify products on some pages
      if (m[i].rel && m[i].rel.toLowerCase() === 'canonical' && m[i].href) {
        global.data.link.canonical = m[i].href;
        global.data.url = m[i].href;
        break;
      }
    }
  }

  /*
    Process META tags
  */

  function handleMeta() {
    let mod = {},
      arr = [],
      obj = {},
      meta = document.getElementsByTagName('META'),
      key,
      value,
      i,
      j,
      k,
      q,
      z;
    // scrape our META tags, looking for keys and values
    for (i = 0; i < meta.length; i = i + 1) {
      value = meta[i].getAttribute('content');
      if (value) {
        // get the property or name
        key = meta[i].getAttribute('property') || meta[i].getAttribute('name');
        if (key) {
          // instantly short-circuit if we find the nopin meta
          if (key.toLowerCase() === 'pinterest' && value.toLowerCase() === 'nopin') {
            return meta[i].getAttribute('description') || true;
          }
          // ignore any metas with data-pin-nopin
          if (!meta[i].getAttribute('data-pin-nopin')) {
            // push into an array so we can sort it later
            arr.push({ k: key, v: value });
          }
        }
      }
    }
    // sort our array so we don't wind up overwriting things as we split on colons
    arr.sort((a, b) => {
      let r = 0;
      if (a.k > b.k) {
        r = 1;
      } else {
        if (a.k < b.k) {
          r = -1;
        }
      }
      return r;
    });
    // our array now contains objects with keys and values, sorted by key
    for (i = 0; i < arr.length; i = i + 1) {
      // split each key on the colon
      k = arr[i].k.split(':');
      // start at the root of the object we're working on
      z = obj;
      for (j = 0; j < k.length; j = j + 1) {
        if (typeof z[k[j]] === 'undefined') {
          // make a new sub-object
          z[k[j]] = {};
        }
        // go again
        z = z[k[j]];
      }
      // see if we've seen this one before
      q = typeof z['~'];
      if (q === 'undefined') {
        // key does not exist, so add it
        z['~'] = arr[i].v;
      } else {
        // turn existing duplicate strings into arrays
        if (q === 'string') {
          // convert the existing string into the first element of an array
          z['~'] = [z['~']];
        }
        // push the next value onto the array
        z['~'].push(arr[i].v);
      }
    }
    // recursively fix up the naive object so strings show as strings
    // but objects that have both strings and sub-objects aren't lost
    function patch(obj, parentObj, parentKey) {
      for (let k in obj) {
        if (typeof obj[k] === 'object') {
          // is this member zero of an array?
          if (typeof obj[k][0] === 'string') {
            parentObj[parentKey] = obj[k];
          } else {
            patch(obj[k], obj, k);
          }
        } else {
          // if we have only one key, it's the ~, so we can set object[key] equal to its string value
          if (Object.keys(obj).length === 1) {
            parentObj[parentKey] = obj[k];
          }
          // YOLO ALERT: this will deliver misleading results for situations like this:
          //
          //   <meta name="foo" content="woo">
          //   <meta name="foo" content="yay">
          //   <meta name="foo:bar" content="baz">
          //
          // ... where we will get:
          //
          //     foo:["woo","yay"]
          //
          // ... instead of:
          //
          //     foo:{"~":["woo", "yay"],"bar":"baz"}
          //
          // As of right now this is good enough for what we need
        }
      }
      return obj;
    }
    global.data.meta = patch(obj, null, null);
    // we have not found the Pinterest nopin meta, so look for special meta spaces (OG and Pinterest)
    mod = {};
    debug('meta data found');
    debug(global.data.meta);
    // look for Pinterest metas
    if (global.data.meta.pin) {
      debug('data-pin found');
      if (global.data.meta.pin.url) {
        debug('data-pin-url found');
        mod.pinUrl = global.data.meta.pin.url;
        // always override canonical link if we find data-pin-url
        global.override.link = true;
      }
      if (global.data.meta.pin.description) {
        debug('data-pin-description found');
        mod.pinDescription = global.data.meta.pin.description;
      }
      if (global.data.meta.pin.title) {
        debug('data-pin-title found');
        mod.pinTitle = global.data.meta.pin.title;
      }
      if (global.data.meta.pin.id) {
        debug('data-pin-id found');
        mod.pinId = global.data.meta.pin.id;
        // don't show the imageless pin if we have a pin ID
        global.override.imageless = true;
      }
      // don't require pin:media in order for title or description to work
      // we will need these for rich front end whether or not there's media
      if (global.data.meta.pin.media) {
        debug('data-pin-media found');
        mod.pinMedia = global.data.meta.pin.media;
        debug('loading data-pin-media');
        loadImg({ src: global.data.meta.pin.media, mod: mod });
      }
    }
    // seek and report Instagram owner, media ID, and hashtags
    // Instagram username will be deduced from linked data
    if (global.data.meta.instapp) {
      if (global.data.meta.instapp.owner_user_id) {
        if (global.data.meta.al) {
          if (global.data.meta.al.ios) {
            if (global.data.meta.al.ios.url && global.data.meta.al.ios.url.match('=')) {
              global.insta = {
                owner: global.data.meta.instapp.owner_user_id,
                id: global.data.meta.al.ios.url.split('=')[1],
              };
              if (global.data.meta.instapp.hashtags) {
                // toString works on numbers, strings, and arrays
                global.insta.hashtags = global.data.meta.instapp.hashtags.toString();
              }
            }
          }
        }
      }
    }
    // look for Open Graph
    if (global.data.meta.og) {
      // patch for image.secure_url
      if (typeof global.data.meta.og.image === 'object') {
        global.data.meta.og.image = global.data.meta.og.image.secure_url || undefined;
      }
      // fix cases where we've found more than one title, description, url, or image
      k = ['description', 'title', 'url', 'image'];
      for (i = 0; i < k.length; i = i + 1) {
        if (global.data.meta.og[k[i]]) {
          if (typeof global.data.meta.og[k[i]] !== 'string') {
            global.data.meta.og[k[i]] = global.data.meta.og[k[i]][0];
          }
        }
      }
    }
  }

  /*
    Parse linked data inside SCRIPT tags
  */

  function handleScript() {
    let script = document.getElementsByTagName('SCRIPT'),
      i,
      n;
    // scrape our SCRIPT tags
    for (i = 0, n = script.length; i < n; i = i + 1) {
      // do we have a type?
      if (script[i].type) {
        // does the type indidate linked data?
        if (script[i].type === 'application/ld+json') {
          // does the script contain text content?
          if (script[i].innerText) {
            try {
              // stack it on our predefined array of linked data objects
              global.data.script.push(JSON.parse(script[i].innerText));
            } catch (parseError) {
              debug('Could not parse linked data.');
              debug(script[i].innerText);
            }
          }
        }
      }
    }
  }

  /*
    Extract useful parameters from certain pages embeds
  */

  function handlePage() {
    let k, r, p, q, u;
    let thumb, i, img, pinMeOnly;
    r = false;
    // Amazon page on mobile
    if (!r && global.here.match(config.pattern.page.amazonPage)) {
      // grab all images
      k = document.getElementsByTagName('IMG');
      for (q = 0; q < k.length; q = q + 1) {
        // seek the ASIN attribute, currently data-fling-asin
        u = k[q].getAttribute(config.pattern.att.amazonAsin);
        // if we found it and it's in document.URL, we're done
        if (u && global.here.match(u)) {
          loadImg({
            src: k[q].currentSrc,
            // if we successfully load this image, don't offer the imageless pin
            override: ['imageless'],
            mod: {
              // hand-whittle the product URL in case we're on a GP page, which has no canonical URL
              url: 'https://www.amazon.com/dp/' + u + '/',
              description: getDescription(k[q]),
            },
          });
          r = true;
          break;
        }
      }
    }
    // desktop Amazon product page
    if (!r && global.here.match(config.pattern.page.amazonProduct)) {
      k = document.getElementById('imgTagWrapperId');
      if (k) {
        p = k.getElementsByTagName('IMG')[0];
        if (p) {
          loadImg({
            src: p.src,
            // if we successfully load this image, don't offer the imageless pin
            override: ['imageless'],
            mod: {
              url: global.data.link.canonical,
              description: getDescription(p),
            },
          });
          r = true;
        }
      }
    }
    // be nice to Instagram
    // WARNING: this is brittle, has broken in the past, and is guaranteed to break again
    if (!r && global.here.match(config.pattern.page.instagramPage)) {
      debug('On an Instagram property');

      // some Instagram pages (search results, explore) have no og:title
      let instaTitle = document.title;

      if (global.data.meta.og && global.data.meta.og.title) {
        // some people are putting colons in their titles so we need
        // to split on the full `Instagram: “` string
        // watch out: that's a curly quote
        instaTitle = global.data.meta.og.title.split('Instagram: “');
        if (instaTitle[1]) {
          instaTitle = instaTitle[1]
            // drop the last quote
            .substring(0, instaTitle[1].length - 1)
            // trim whitespace
            .trim();
        } else {
          // default to document.title
          instaTitle = document.title;
        }
      }
      if (global.here.match(config.pattern.page.instagramPhoto)) {
        debug('On an Instagram photo URL');

        // find the first image tag inside an element and load it
        // along with its ALT or OG:TITLE
        let getSrc = (el) => {
          q = el.getElementsByTagName('IMG');
          if (q.length) {
            for (k = 0; k < q.length; k = k + 1) {
              loadImg({
                src: q[k].currentSrc,
                override: ['imageless'],
                mod: {
                  url: global.here.split('?')[0],
                  // as of 2018-11-28 we are seeing "no automatic text available" on most Instagram alt attributes, so we're going to ignore it
                  description: instaTitle,
                },
              });
              // only set r to true when we know we have at least one good image
              r = true;
              // 2018-11-26: don't break out of this loop
              // otherwise we wind up with Instagram avatars instead of photos
            }
          }
        };
        // Are we in the main carousel?
        let instaArticle = document.getElementsByTagName('ARTICLE');
        if (instaArticle.length === 2) {
          debug('in main carousel');
          getSrc(instaArticle[1]);
          if (r) {
            debug('Found image in carousel.');
          } else {
            debug('Found carousel but no image.');
          }
        }
        // Are we on a canonical page?
        if (!r) {
          let instaButton = document.querySelectorAll('[role=button]');
          if (instaButton.length) {
            getSrc(instaButton[1]);
            if (r) {
              debug('Found image in button.');
            } else {
              debug('Found button but no image.');
            }
          }
        }
      } else {
        debug('On a non-photo Instagram page');
        // this could be anything; a profile, search results, story, tag explore page
        k = document.getElementsByTagName('IMG');
        for (u = 0; u < k.length; u = u + 1) {
          // save what's currently on the screen
          if (k[u].currentSrc) {
            // if we're in a link, use that for the pin
            q = k[u].parentNode.parentNode.parentNode;
            if (q.tagName === 'A' && q.href && q.href.match(/^https?:\/\//)) {
              // we've found the parent link
              loadImg({
                src: k[u].currentSrc,
                // if we successfully load this image, don't offer the imageless pin
                override: ['imageless'],
                mod: {
                  url: q.href.split('?')[0],
                  // as of 2018-11-28 we are seeing "no automatic text available" on most Instagram alt attributes, so we're going to ignore it
                  // yes, we are kinda screwed here
                  description: instaTitle,
                },
              });
            }
          }
        }
      }
    }
    // YouTube video page
    if (!r && global.here.match(config.pattern.page.youtubeWatch)) {
      p = global.here.split('v=')[1].split('&')[0].split('#')[0];
      if (p) {
        debug('found a YouTube page: ' + global.here);
        loadImg({
          src: 'https://img.youtube.com/vi/' + p + '/hqdefault.jpg',
          // if we successfully load this image, don't offer the imageless pin
          override: ['imageless'],
          mod: {
            description: document.title,
            multimedia: true,
            url: 'https://www.youtube.com/watch?v=' + p,
          },
        });
        r = true;
      }
    }
    // YouTube mobile page
    // if r is true, we've already found a watch page
    if (!r && global.here.match(config.pattern.page.youtubeMobile)) {
      k = document.getElementsByTagName('A');
      for (u = 0; u < k.length; u = u + 1) {
        if (k[u].href && k[u].href.match(config.pattern.link.youtubeWatch)) {
          p = k[u].href.split('v=')[1].split('&')[0].split('#')[0];
          if (p) {
            debug('found a YouTube video: ' + k[u].href);
            loadImg({
              src: 'https://img.youtube.com/vi/' + p + '/hqdefault.jpg',
              // if we successfully load this image, don't offer the imageless pin
              override: ['imageless'],
              mod: {
                description: document.title,
                multimedia: true,
                url: 'https://www.youtube.com/watch?v=' + p,
              },
            });
            r = true;
          }
        }
      }
    }
    // Google Image Search results: find proper links; allow data:URIs
    if (!r && global.here.match(config.pattern.page.googleImageSearch)) {
      /*
        caution: like all DOM-traversing hacks, this is brittle. Symptoms of it breaking may be:
          - we are pinning tiny images that link back to Google Image Search,
          - and their discriptions all say "dog - Google Search"
          - also: sometimes it's the client's fault; some extension pins
            don't run through pinmarklet, so they won't apply any of this logic
      */
      // process a Google Image Search link to get proper image source, URL, and description
      const processGoogleImageSearchResult = function (img) {
        thumb = {
          // original src may be in the dataset sometimes but is usually the tiny Google version
          src: img.dataset['src'] || img.src,
          // things we will update when we go load the image
          mod: {
            // this default description no longer appears in the Pin create UI but may still be useful on the back end
            description: img.alt,
          },
        };
        // as of 2020-09-28, the real href is in the link AFTER the one containing the image
        // find the container
        const linkContainer = ((img.parentNode || {}).parentNode || {}).nextSibling;
        // does it exist?
        if (linkContainer) {
          // does it have a title?
          if (linkContainer.title) {
            // does its title exactly match the image ALT
            if (linkContainer.title === img.alt) {
              // does it have a valid href?
              if (linkContainer.href && linkContainer.href.match(/^http?s:\/\//)) {
                // change the URL we're saving to the URL mentioned here
                thumb.mod.url = linkContainer.href;
              }
            }
          }
        }
        // our modifiers are in, let's go fetch the image
        loadImg(thumb);
        // we've found at least one image so the default image scraping logic should NOT run
        global.override.img = true;
        // we've found at least one image, so do not show the imageless pin
        global.override.imageless = true;
        // let the calling function know we found something on this page
        r = true;
      };
      // Are we using an extension-based Save button or context menu?
      pinMeOnly = document.querySelectorAll('[data-pin-me-only]');
      // if we find exactly one, it's our hoverbutton or context menu image.
      if (
        // is there exactly one?
        pinMeOnly.length === 1
      ) {
        // process this link only
        processGoogleImageSearchResult(pinMeOnly[0]);
      } else {
        // we want to process all the iamges
        img = document.getElementsByTagName('IMG');
        for (i = 0; i < img.length; i = i + 1) {
          // valid search results all have ALT attributes
          if (img[i].alt) {
            processGoogleImageSearchResult(img[i]);
          }
        }
      }
    }
    // return false if we found nothing, true if we found at least one thing
    return r;
  }

  /*
    Report results to Android app if found
  */

  function extend_android() {
    // look for Android callback
    if ((window.JavaScriptInterface || {}).onPinsLoaded) {
      global.config.render = 'openAndroidAppShare';
      window.openAndroidAppShare = () => {
        window.JavaScriptInterface.onPinsLoaded(JSON.stringify(global.data));
      };
      // fire this if global.data.close alerts anything
      global.extendedClose = () => {
        window.JavaScriptInterface.onPinsLoaded(
          JSON.stringify({ pinmarkletClosedReason: global.data.close }),
        );
      };
      debug('Android app found');
      // set client for logging
      global.client = 'android';
      global.extended = true;
      // first pinmarklet experiment: android_load_pinmarklet_on_document_ready_state
      if (typeof window.JavaScriptInterface.isLoadPinmarkletOnDocumentReady === 'function') {
        if (window.JavaScriptInterface.isLoadPinmarkletOnDocumentReady()) {
          // this global will delay our initial scan run until document.readyState shows 'complete'
          global.holdForReadyStateComplete = true;
        }
      }
    }
  }

  /*
    Report results to browser extension if found
  */

  function extend_browser() {
    let b, v, i, p;
    if (typeof chrome !== 'undefined') {
      b = chrome;
    } else {
      if (typeof browser !== 'undefined') {
        b = browser;
      }
    }
    if (b && b.runtime && b.runtime.getManifest && b.runtime.sendMessage) {
      v = b.runtime.getManifest().version;
      p = v.split('.');
      for (i = 0; i < p.length; i = i + 1) {
        p[i] = p[i] - 0;
      }
      // are we on a v2 extension?
      if (p[0] > 1) {
        // this will be overwritten later by getConfig for other clients
        global.config.render = 'openGrid';
        window.openGrid = () => {
          global.data.config = global.config;
          global.data.config.k = config.k;
          // remove unused callback; prevent console spew in Chrome 72
          b.runtime.sendMessage({
            to: 'background',
            act: 'populateGrid',
            data: global.data,
          });
        };
        // fire this if global.data.close alerts anything
        global.extendedClose = () => {
          // remove unused callback; prevent console spew in Chrome 72
          b.runtime.sendMessage({ to: 'background', act: 'closeGrid' });
        };
        debug('advanced browser extension found');
        // only do extended behaviors for v2 extensions
        global.extended = true;
        // set client for logging
        global.client = 'extension';
      }
    }
  }

  /*
    Report results to IOS app if found
  */

  function extend_ios() {
    // look for IOS callback
    if (
      (((window.webkit || {}).messageHandlers || {}).pinmarkletCompletionHandler || {}).postMessage
    ) {
      global.config.render = 'openIOSAppShare';
      window.openIOSAppShare = () => {
        window.webkit.messageHandlers.pinmarkletCompletionHandler.postMessage(global.data);
      };
      global.config.quiet = true;
      // fire this if global.data.close alerts anything
      global.extendedClose = () => {
        window.webkit.messageHandlers.pinmarkletCompletionHandler.postMessage({
          pinmarkletClosedReason: global.data.close,
        });
      };
      debug('IOS app found');
      // set client for logging
      global.client = 'ios';
      global.extended = true;
    }
  }

  /*
    log global trade information number if found
  */

  function getProductData(o) {
    // gtin = "global trade item number"
    let gtin = '';
    function crawl(obj) {
      // if we have not yet found a gtin, keep looking
      if (!gtin) {
        for (const prop in obj) {
          if (typeof obj[prop] == 'object') {
            crawl(obj[prop]);
          } else {
            // have we found a gtin?
            if (prop.match(/^gtin/i)) {
              // strip leading zeroes
              gtin = obj[prop].replace(/^0+/, '');
            }
          }
        }
      }
    }
    // have we found any json+ld scripts?
    if (global.data.script.length) {
      // crawl each script
      global.data.script.forEach((it) => {
        crawl(it);
      });
      if (gtin) {
        // save to global data so clients can see GTIN later
        global.data.gtin = gtin;
        // save to Varnish
        log({
          reason: 'gtin_found',
          gtin: gtin,
        });
      }
    }
  }

  /*
    Make an imageless pin representation
  */

  function makeImageless() {
    // we will pick a background color based on domain
    const domain = global.here.split('/')[2];
    // convert HSV color to RGB triple
    function hsvToRgb(h, s, v) {
      let i, f, p, q, t, r, g, b;
      h = h / 60;
      i = Math.floor(h);
      f = h - i;
      p = v * (1 - s);
      q = v * (1 - s * f);
      t = v * (1 - s * (1 - f));
      switch (i) {
        case 0:
          r = v;
          g = t;
          b = p;
          break;
        case 1:
          r = q;
          g = v;
          b = p;
          break;
        case 2:
          r = p;
          g = v;
          b = t;
          break;
        case 3:
          r = p;
          g = q;
          b = v;
          break;
        case 4:
          r = t;
          g = p;
          b = v;
          break;
        case 5:
          r = v;
          g = p;
          b = q;
          break;
      }
      // convert to two-digit hex value
      function format(n) {
        return ('00' + Math.round(n * 255).toString(16)).substr(-2, 2);
      }
      // format for use on a Web page
      return '#' + format(r) + format(g) + format(b);
    }
    // build and return
    return {
      description: getDescription({ imageless: true }),
      height: config.thumbSize,
      width: config.thumbSize,
      score: config.thumbSize * config.thumbSize,
      url: global.here,
      siteName: global.ogSiteName || domain,
      color: hsvToRgb(parseInt(sha({ str: domain }).substr(0, 3), 16) % 360, 0.25, 0.75),
    };
  }

  /*
    If we're not running an extendedClose function, open the unauthed grid from assets.pinterst.com
  */

  function grid() {
    let k, rule, startTime, renderTime;
    // get the page's current overflow style; we're going to set it to hidden to freeze background scrolling
    global.defaultBodyOverflow = '';
    // don't leave "visible" as an inline style; it's the default
    if (global.defaultBodyOverflow === 'visible') {
      global.defaultBodyOverflow = '';
    }
    // freeze the page underneath the modal
    document.body.style.overflow = 'hidden';
    debug('popping the unauthed grid');
    global.data.config = global.config;
    global.data.hazExtension = get(document.body);
    k = JSON.stringify(global.data);
    structure.grid = document.createElement('IFRAME');
    structure.grid.id = config.k + '_grid';
    structure.grid.src = config.grid;
    structure.grid.frameBorder = '0';
    // style the iframe
    for (rule in config.iframeStyle) {
      if (config.iframeStyle[rule].hasOwnProperty) {
        structure.grid.style[rule] = config.iframeStyle[rule];
      }
    }
    // when we're done
    function closeGrid() {
      document.body.style.overflow = global.defaultBodyOverflow;
      document.body.removeAttribute(config.hazPinningNow);
      if (
        structure.grid &&
        structure.grid.parentNode &&
        structure.grid.parentNode === document.body
      ) {
        document.body.removeChild(structure.grid);
      }
    }
    startTime = new Date().getTime();
    structure.grid.onload = () => {
      renderTime = new Date().getTime() - startTime;
      debug('Grid render time: ' + renderTime);
      log({ reason: 'grid_rendered', time: renderTime });
      global.receiver = structure.grid.contentWindow;
      global.receiver.postMessage(k, structure.grid.src);
      window.addEventListener('message', (e) => {
        window.clearTimeout(global.renderFailed);
        if (e.data === 'x') {
          closeGrid();
        }
      });
      structure.grid.focus();
    };
    document.body.setAttribute(config.hazPinningNow, true);
    document.body.appendChild(structure.grid);
    // iframe has five seconds to reply with "rendered" or we kill it
    global.renderFailed = window.setTimeout(() => {
      log({ reason: 'iframe_timeout' });
      closeGrid();
      global.data.close = global.config.msg.noPinnablesFound;
      done();
    }, config.maxWait);
  }

  /*
    Render found data to correct client
  */

  function render() {
    debug(global.data);
    log({
      reason: 'scan_complete',
      count: global.data.thumb.length,
      time: new Date().getTime() - global.time.start,
    });
    // do we need to close instead of pinning?
    if (global.data.close) {
      done();
    } else {
      // are we using the IOS share extension?
      if (global.config.share) {
        debug('sending results to IOS share extension');
        document.body.setAttribute(global.config.share, JSON.stringify(global.data));
      } else {
        // are we using an extension or mobile app?
        if (typeof window[global.config.render] === 'function') {
          debug('sending results to ' + global.config.render);
          window[global.config.render](global.data);
        } else {
          // default to the iframed grid overlay
          debug('sending results to our default iframe grid overlay');
          grid();
        }
      }
    }
  }

  /*
    Process all images in global.data.img 
  */

  function process() {
    let i,
      n,
      k,
      ch,
      cw,
      mf,
      item,
      arr = [],
      imageless,
      ig;
    for (k in global.data.img) {
      if (global.data.img[k].hasOwnProperty) {
        item = global.data.img[k];
        if (item.status === 'ok') {
          item.url = global.data.url;
          if (!item.mod) {
            item.mod = {};
          }
          // we have successfully loaded and measured this image
          mf = 1;
          ch = item.height;
          cw = item.width;
          if (cw > ch) {
            // trim width on landscape images
            cw = ch;
          } else {
            // trim height on giraffe images
            if (ch > cw * 3) {
              ch = cw * 3;
            }
          }
          // have we changed the description?
          if (item.mod.description) {
            item.description = item.mod.description;
          }
          // check again for ogDescription
          if (item.mod.ogDescription) {
            item.description = item.mod.ogDescription;
          }
          // has the site operator specified a different description?
          if (item.mod.pinDescription) {
            item.description = item.mod.pinDescription;
          }
          // never pass a description with more than 500 characters
          if (item.description && item.description.length > 500) {
            item.description = item.description.substring(0, 500);
          }
          // have we changed the URL?
          if (item.mod.url) {
            item.url = item.mod.url;
          }
          // has the site operator specified a different URL?
          if (item.mod.pinUrl) {
            item.url = item.mod.pinUrl;
          }
          // media has already been loaded into the src attribute and checked for things like pinMedia
          item.media = item.src;
          // fix up multiplication factor
          if (item.mod.multimedia) {
            mf = mf * 3;
          }
          // bump if the operator has suggested an alternate URL or image
          if (item.mod.pinUrl || item.mod.pinMedia) {
            mf = mf * 4;
          }
          // only pin this image
          if (item.mod.pinMeOnly) {
            mf = mf * 1000000;
          }
          // do we have a pin ID?
          if (item.mod.pinId) {
            // if we spotted a deep-link directly to a Pin, don't promote it
            if (!item.mod.suppressPinIdBonus) {
              mf = mf * 10;
            }
            // save this id so we know to repin from the grid
            item.dataPinId = item.mod.pinId;
            // extensions and mobile apps expect data.id
            item.id = item.mod.pinId;
            // don't show the imageless pin if we have a pin ID
            global.override.imageless = true;
          }
          // small images go to the bottom
          if (item.width < config.thumbSize) {
            mf = mf / 2;
          }
          if (item.mod.multimedia) {
            // don't show the imageless pin if we have a video
            global.override.imageless = true;
            mf = mf * 2;
          }
          // a slight adjustment for source order, so identically-sized images show in the order they appear
          item.score = ch * cw * mf - (item.mod.sourceOrder || 0);
          arr.push(item);
        }
      }
    }
    // add the imageless pin representation
    if (!global.override.imageless) {
      imageless = makeImageless();
      global.data.imageless = imageless;
      arr.push(imageless);
      // if all we found is an imageless pin, log it
      if (arr.length === 1) {
        log({ reason: 'imageless_only' });
      }
    }
    // sort by score, in descending order
    arr.sort((a, b) => {
      let v = 0;
      if (a.score < b.score) {
        v = 1;
      } else {
        if (a.score > b.score) {
          v = -1;
        }
      }
      return v;
    });
    // filter any array items whose score is less than the top score divided by 10
    arr = arr.filter((i) => {
      // only return if our score is better than the best score divided by our quality minimum
      return i.score > arr[0].score / config.quality;
    });
    global.data.thumb = arr;
    function addRichData(key, value) {
      // if we don't have a rich data object yet, make one
      if (!global.data.rich) {
        global.data.rich = {};
      }
      // don't overwrite existing values
      if (!global.data.rich[key]) {
        debug('Adding rich data: ' + key + ' ' + value);
        global.data.rich[key] = value;
      } else {
        debug('Ignoring duplicate rich data: ' + key + ' ' + value);
      }
    }
    if (global.data.meta) {
      // check Pinterest METAs first
      if (global.data.meta.pin) {
        if (global.data.meta.pin.title) {
          addRichData('title', global.data.meta.pin.title);
        }
        if (global.data.meta.pin.description) {
          addRichData('description', global.data.meta.pin.description);
        }
        if (global.data.meta.pin.url) {
          addRichData('url', global.data.meta.pin.url);
        }
      }
      // check Open Graph METAs next
      // if we have already found a title, description, or URL, addRichData won't overwrite
      if (global.data.meta.og) {
        if (global.data.meta.og.title) {
          addRichData('title', global.data.meta.og.title);
        }
        if (global.data.meta.og.description) {
          addRichData('description', global.data.meta.og.description);
        }
        if (global.data.meta.og.url) {
          addRichData('url', global.data.meta.og.url);
        }
      }
      // check META name=description
      // if we have already found a description, addRichData won't overwrite
      if (global.data.meta.description && typeof global.data.meta.description === 'string') {
        addRichData('description', global.data.meta.description);
      }
    }
    // check document.title
    // if we have already found a title, addRichData won't overwrite
    if (document.title && typeof document.title === 'string') {
      addRichData('title', document.title);
    }
    // if we have a canonical link, report it as the rich link
    // if we have already found an URL, addRichData won't overwrite
    if (global.data.link) {
      if (global.data.link.canonical) {
        addRichData('url', global.data.link.canonical);
      }
    }
    // got Instagram?
    if (global.insta) {
      // did we find any scripts with linked data?
      for (i = 0, n = global.data.script.length; i < n; i = i + 1) {
        // did we find the author's @-name?
        if (global.data.script[i].author && global.data.script[i].author.alternateName) {
          // save it as usename
          global.insta.username = global.data.script[i].author.alternateName;
        }
      }
      // add me to rich data so clients can save
      global.data.rich.instagram = global.insta;
      // get ready to do a flat request back to log.pinterest.com
      ig = {
        reason: 'insta_found',
        extras: {
          media_id: global.insta.id,
          owner_id: global.insta.owner,
          username: global.insta.username,
        },
      };
      if (global.insta.hashtags) {
        ig.extras.hashtags = global.insta.hashtags;
      }
      // log me
      log(ig);
    }
    // check any script tags we may have loaded for product data
    getProductData();
    render();
  }

  /*
    Choose the right set of strings, using window.navigator.language as a clue
  */

  function strings(o) {
    let i, t, lang, locale;
    t = window.navigator.language.toLowerCase();
    t = t.replace(/[^a-z0-9]/g, ' ');
    t = t.replace(/^\s+|\s+$/g, '');
    t = t.replace(/\s+/g, ' ');
    t = t.split(' ');
    // fix three-parters like bs-latn-ba
    if (t.length > 2) {
      for (i = t.length - 1; i > -1; i = i - 1) {
        if (t[i].length !== 2) {
          t.splice(i, 1);
        }
      }
    }
    lang = t[0];
    if (t[1]) {
      locale = t[0] + '-' + t[1];
    }
    // is there an immediate match for language in strings?
    if (config.msg[locale]) {
      global.config.lang = locale;
    } else {
      if (config.msg[lang]) {
        global.config.lang = lang;
      }
    }
    global.config.msg = config.msg[global.config.lang];
  }

  /*
    Remove a DOM element
  */

  function kill(o) {
    if (typeof o === 'string') {
      o = document.getElementById(o);
    }
    if (o && o.parentNode) {
      o.parentNode.removeChild(o);
    }
  }

  /*
    Get configuration options from the SCRIPT tag matching config.me
  */

  function findMe(o) {
    let i,
      j,
      v,
      s = document.getElementsByTagName('SCRIPT');
    // loop through all SCRIPT tags backwards, so we look at the last one first
    for (i = s.length - 1; i > -1; i = i - 1) {
      // are we on one whose source matches ours?
      if (s[i].src.match(config.me)) {
        // loop through all possible valid config parameters
        for (j = 0; j < config.validParams.length; j = j + 1) {
          v = get({ el: s[i], att: config.validParams[j] });
          if (v) {
            global.config[config.validParams[j]] = v;
          }
        }
        // kill the SCRIPT tag
        kill(s[i]);
        // stop looking for more
        break;
      }
    }
  }

  /*
    scrub forbidden parameters (like "password=something") from URLs
  */

  function scrubUrl(input) {
    let i,
      j,
      param,
      keyval,
      foundForbiddenKey,
      query = '',
      separator = '?',
      // remove anything after the hash and then split into path and query at the ?
      part = input.split('#')[0].split('?');
    // do we have a query?
    if (part[1]) {
      // split query into key/value pairs
      param = part[1].split('&');
      // check each param
      for (i = 0; i < param.length; i = i + 1) {
        // split pair into key and value
        keyval = param[i].split('=');
        // check if we have exactly two
        if (keyval.length === 2) {
          foundForbiddenKey = false;
          // check each bad key pattern
          for (j = 0; j < config.forbiddenQueryKey.length; j = j + 1) {
            // does the name matches a forbiddenQueryKey pattern?
            if (keyval[0].match(config.forbiddenQueryKey[j])) {
              // set the bad flag
              foundForbiddenKey = true;
              // quit checking
              break;
            }
          }
          // if the parameter name does not match one of our bad parameters, add it to the query
          if (!foundForbiddenKey) {
            // append separator, key, equals, and value
            query = query + separator + keyval[0] + '=' + keyval[1];
            // change separator to '&' for second and subsequent parameters
            separator = '&';
          }
        }
      }
    }
    // part[0] contains scheme, domain, and path
    return part[0] + query;
  }

  /*
    Check for various conditions that should cause us to quietly quit; check for clients; start working 
  */

  function init() {
    debug('My key: ' + config.k);
    // don't run if we're already running
    if (!document.body.getAttribute(config.hazPinningNow)) {
      // scrub document.URL for parameters we don't want to log or save
      global.here = scrubUrl(document.URL);
      // do not run on any version of IE below 11
      if (window.navigator.userAgent.match(' MSIE ')) {
        // log that we're on an unsupported version of IE
        log({ reason: 'oldIE' });
      } else {
        // see if any config flags were passed
        findMe();
        // add behaviors for known extensions and apps
        // sets global.client to ios, android, or extension
        if (!global.extended) {
          extend_android();
          extend_browser();
          extend_ios();
        }
        // injected by IOS share extension
        if (typeof DATA_RESULTS_KEY === 'string') {
          global.config.share = DATA_RESULTS_KEY;
          // modify global.client to ios_share if found
          global.client = 'ios_share';
        }
        // don't log pmInit until after we know global.client and global.here
        log({ reason: 'init' });
        // get our strings
        strings();
        if (checkDisallowedDomain({ url: global.here })) {
          // log that we're on an unpinnable domain
          log({ reason: 'domain_not_allowed' });
          global.data.close = global.config.msg.noPinDomain;
          // done will decide whether to pop an alert or not
          done();
        } else {
          // check for linked data
          handleScript();
          // short-curcuit if we find meta name=pinterest content=nopin directive
          const msg = handleMeta();
          if (msg) {
            // log that we're on an unpinnable domain
            log({ reason: 'found_nopin_meta' });
            if (msg === true) {
              global.data.close = global.config.msg.noPinMeta;
            } else {
              global.data.close = msg;
            }
            done();
          } else {
            function go() {
              // successfully gotten past old IE, disallowed domain, and nopin meta tests
              debug('Initing');
              // default the URL we're pinning to document.URL
              global.data.url = global.here;
              // page handler will return true if we find a canonical thing-to-pin
              if (!handlePage()) {
                // handle embedded pages and players
                handleIframe();
                // handle embedded images, unless we've said not to
                if (!global.override.img) {
                  handleImg();
                }
                // check for canonical link before running page handler
                if (!global.override.link) {
                  handleLink();
                }
              }
              // all handlers may have added images to loading stack. Here we try to wait until done
              function checkDone() {
                if (!global.count.imgLoading) {
                  process();
                } else {
                  debug('images left to load: ' + global.count.imgLoading);
                  if (new Date().getTime() < global.time.start + config.maxWait) {
                    window.setTimeout(checkDone, 10);
                  } else {
                    debug('Timed out, rendering what we have.');
                    process();
                  }
                }
              }
              window.setTimeout(checkDone, 100);
            }
            // don't start scanning until we think the page is ready
            const checkReady = function () {
              if (document.readyState === 'complete' || Date.now() - scanStart > config.maxWait) {
                go();
              } else {
                // check again as soon as the browser has a moment to spare
                window.requestAnimationFrame(checkReady);
              }
            };
            const scanStart = Date.now();
            // android_load_pinmarklet_on_document_ready_state will set this
            if (global.holdForReadyStateComplete) {
              debug('Holding for readystate complete');
              checkReady();
            } else {
              debug('Ignoring readystate');
              go();
            }
          }
        }
      }
    }
  }

  init();
})();
