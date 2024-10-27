const form = document.querySelector('form');
const input = form.querySelector('input[type="text"]');

async function handleIsbnSearch(isbn) {
  try {
    const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`);
    const data = await response.json();
    const book = data[`ISBN:${isbn}`];

    if (book) {
      const detailsDiv = document.getElementById("isbn-details");
      const coverImg = document.getElementById("isbn-cover");

      coverImg.src = book.cover ? book.cover.medium : '';
      coverImg.alt = "Cover N/A";

      detailsDiv.innerHTML = `
        <p id="isbn-title"><span onclick="closebox()" id="isbn-x">x</span> <b>${book.title || 'N/A'}</b></p>
        <p><i>Author:</i> <span id="isbn-text">${book.authors ? book.authors.map(a => a.name).join(', ') : 'Unknown'}</span></p>
        <p><i>Date:</i> <span id="isbn-text">${book.publish_date || 'N/A'}</span></p>
        <p><i>Publisher:</i> <span id="isbn-text">${book.publishers ? book.publishers.map(p => p.name).join(', ') : 'N/A'}</span></p>
        <p><i>Location:</i> <span id="isbn-text">${book.publish_places ? book.publish_places.map(p => p.name).join(', ') : 'N/A'}</span></p>
        <p><i>Pages:</i> <span id="isbn-text">${book.number_of_pages || 'N/A'}</span></p>
        <p><i>ISBN:</i> <span id="isbn-text">${isbn}</span></p> 
          <a href="https://www.goodreads.com/search?q=${isbn}" target="_blank">Goodreads</a> | 
          <a href="https://books.google.com/books?vid=ISBN${isbn}" target="_blank">Google Books</a> | 
          <a href="https://www.worldcat.org/isbn/${isbn}" target="_blank">WorldCat</a>
        </p>
      `;

      document.getElementById("isbn-info").classList.add('show');
    } else {
      window.location.href = '404';
    }
  } catch (error) {
    console.error("error fetching isbn - ", error);
    window.location.href = '404';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const inputText = input.value.trim();
  const [searchEngine, query] = inputText.split(':').map((part) => part.trim().toLowerCase());

  if (searchEngine === '--isbn') {
    handleIsbnSearch(query);
    return;
  }

  const searchEngineMap = {
    '--google': 'https://www.google.com/search',
    '--ggl': 'https://www.google.com/search',

    '--bing': 'https://www.bing.com/search',
    '--bng': 'https://www.bing.com/search',

    '--brave': 'https://search.brave.com/search',
    '--bravesearch': 'https://search.brave.com/search',
    '--brs': 'https://search.brave.com/search',

    '--yahoo': 'https://search.yahoo.com/search',
    '--yho': 'https://search.yahoo.com/search',

    '--duckduckgo': 'https://duckduckgo.com',
    '--duck': 'https://duckduckgo.com',
    '--ddg': 'https://duckduckgo.com',
    '--ddgo': 'https://duckduckgo.com',

    '--wikipedia': 'https://wikipedia.org/wiki/Special:Search?go=Go&search=',
    '--wiki': 'https://wikipedia.org/wiki/Special:Search?go=Go&search=',
    '--wkp': 'https://wikipedia.org/wiki/Special:Search?go=Go&search=',

    '--wiby': 'https://wiby.me/',
    '--wby': 'https://wiby.me/',

    '--mojeek': 'https://www.mojeek.com/search',
    '--mjk': 'https://www.mojeek.com/search',

    '--startpage': 'https://www.startpage.com/sp/search',
    '--stp': 'https://www.startpage.com/sp/search',
    '--sp': 'https://www.startpage.com/sp/search',

    '--aol': 'https://search.aol.co.uk/aol/search',
    
    '--excite': 'https://results.excite.com/serp',
    '--exc': 'https://results.excite.com/serp',

    '--lycos': 'https://search.lycos.com/web/',
    '--lyc': 'https://search.lycos.com/web/',

    '--you': 'https://you.com/search',

    '--yep': 'https://yep.com/web',
    
    '--gibiru': 'https://gibiru.com/results.html',
    '--gbr': 'https://gibiru.com/results.html',

    '--reddit': 'https://www.reddit.com/search/',
    '--rdd': 'https://www.reddit.com/search/',
    '--red': 'https://www.reddit.com/search/',

    '--neeva': 'https://neeva.com/search',
    '--nva': 'https://neeva.com/search',
    
    '--searchencrypt': 'https://www.searchencrypt.com/search',
    '--scr': 'https://www.searchencrypt.com/search',
    '--se': 'https://www.searchencrypt.com/search',

    '--swisscows': 'https://swisscows.com/en/web',
    '--swc': 'https://swisscows.com/en/web',
    '--sc': 'https://swisscows.com/en/web',
    '--swiss': 'https://swisscows.com/en/web',

    '--ecosia': 'https://www.ecosia.org/search',
    '--ecs': 'https://www.ecosia.org/search',

    '--qmamu': 'https://qmamu.com/search',
    '--qmm': 'https://qmamu.com/search',

    '--givewater': 'https://search.givewater.com/serp',
    '--gvw': 'https://search.givewater.com/serp',
    '--gw': 'https://search.givewater.com/serp',

    '--github': 'https://github.com/search',
    '--gth': 'https://github.com/search',

    '--presearch': 'https://presearch.com/search',
    '--prs': 'https://presearch.com/search',

    '--googleschoolar': 'https://scholar.google.com/scholar',
    '--ggs': 'https://scholar.google.com/scholar',
    '--gs': 'https://scholar.google.com/scholar',

    '--seekr': 'https://news.seekr.com/search',
    '--skr': 'https://news.seekr.com/search',

    '--mwmbl': 'https://mwmbl.org/',

    '--astiango': 'https://astiango.co/search/web=',
    '--asg': 'https://astiango.co/search/web=',
    
    '--urbandictionary': 'https://www.urbandictionary.com/define.php',
    '--ubd': 'https://www.urbandictionary.com/define.php',
    '--ud': 'https://www.urbandictionary.com/define.php',

    '--torry': 'https://www.torry.io/search/',
    '--trr': 'https://www.torry.io/search/',

    '--onesearch': 'https://www.onesearch.com/yhs/search',
    '--osr': 'https://www.onesearch.com/yhs/search',

    '--monocles': 'https://monocles.de/search',
    '--mnc': 'https://monocles.de/search',

    '--prieco': 'https://prieco.net/',
    '--prc': 'https://prieco.net/',

    '--youtube': 'https://www.youtube.com/results',
    '--ytb': 'https://www.youtube.com/results',
    '--yt': 'https://www.youtube.com/results',

    '--andi': 'https://andisearch.com/',
    '--and': 'https://andisearch.com/',

    '--dogpile': 'https://www.dogpile.com/serp',
    '--dgp': 'https://www.dogpile.com/serp',
    '--dp': 'https://www.dogpile.com/serp',

    '--metager': 'https://metager.org/meta/meta.ger3',
    '--mtg': 'https://metager.org/meta/meta.ger3',
    '--mg': 'https://metager.org/meta/meta.ger3',

    '--bearblog': 'https://bearblog.dev/search',
    '--brb': 'https://bearblog.dev/search',
    '--bb': 'https://bearblog.dev/search',
    '--bear': 'https://bearblog.dev/search',

    '--yandex' : 'https://yandex.com/search',
    '--ydx' : 'https://yandex.com/search',
    '--ya' : 'https://yandex.com/search',
    '--Яндекс' : 'https://yandex.com/search',

    '--shuriken' : 'https://shuriken.pm/search.php',
    '--shk' : 'https://shuriken.pm/search.php',

    '--araa' : 'https://araa.extravi.dev/search',

    '--stract' : 'https://stract.com/search',
    '--str' : 'https://stract.com/search',

    '--tempest' : 'https://www.tempest.com/search',
    '--tmp' : 'https://www.tempest.com/search',

    '--4get' : 'https://4get.ca/web',
    '--4' : 'https://4get.ca/web',
    
    '--ggsearch' : 'https://ggsearch.eu.org/search',
    '--ggs' : 'https://ggsearch.eu.org/search',

    '--hearchco' : 'https://hearch.co/search',
    '--hch' : 'https://hearch.co/search',
    '--hearch' : 'https://hearch.co/search',

    '--fileinfo' : 'https://fileinfo.com/extension/',
    '--flnf' : 'https://fileinfo.com/extension/',
    '--file' : 'https://fileinfo.com/extension/',

    '--metasearch' : 'https://s.matdoes.dev/search',
    '--mts' : 'https://s.matdoes.dev/search',
    '--meta' : 'https://s.matdoes.dev/search',

    '--marginalia' : 'https://search.marginalia.nu/search',
    '--mgn' : 'https://search.marginalia.nu/search',

    '--exa' : 'https://exa.ai/search',
    
    '--perplexity' : 'https://perplexity.ai/search',
    '--pxt' : 'https://perplexity.ai/search',

    '--phind' : 'https://www.phind.com/search',
    '--phd' : 'https://www.phind.com/search',

    '--morphic' : 'https://www.morphic.sh/search',
    '--mph' : 'https://www.morphic.sh/search',

    '--searchmysite' : 'https://searchmysite.net/search/',
    '--sms' : 'https://searchmysite.net/search/',

    '--teclis' : 'https://teclis.com/search',
    '--tcl' : 'https://teclis.com/search',

    '--secretsearchenginelabs' : 'http://www.secretsearchenginelabs.com/find/',
    '--ssel' : 'http://www.secretsearchenginelabs.com/find/',

    '--tusk' : 'https://tusksearch.com/search',
    '--tsk' : 'https://tusksearch.com/search',

    '--heexy' : 'https://heexy.org/search',
    '--hxy' : 'https://heexy.org/search',
    
    // SEARXNG INSTANCES

    '--xng-privau' : 'https://priv.au/search',
    '--xng-inetol' : 'https://search.inetol.net/search',
    '--xng-hu' : 'https://searx.hu/search',
    '--xng-searxngsite' : 'https://searxng.site/search',
    '--xng-rhscz' : 'https://search.rhscz.eu/search',
    '--xng-indst' : 'https://search.indst.eu/search',    
    '--xng-paulgo' : 'https://paulgo.io/search',
    '--xng-hbubli' : 'https://search.hbubli.cc/search',
    '--xng-bushitme' : 'https://search.bus-hit.me/search',
    '--xng-opn' : 'https://opnxng.com/search',
    '--xng-idne' : 'https://search.idne.xyz/search',
    '--xng-dresden' : 'https://searx.dresden.network/search',
    '--xng-catfluori' : 'https://searx.catfluori.net/search',
    '--xng-inspace' : 'https://search.im-in.space/search',
    '--xng-sapti' : 'https://search.sapti.me/search',    
    '--xng-tuxcloud' : 'https://searx.tuxcloud.net/search',
    '--xng-rowie' : 'https://search.rowie.at/search',
    '--xng-leptons' : 'https://search.leptons.xyz/search',
    '--xng-mdosch' : 'https://search.mdosch.de/search',
    '--xng-gruble' : 'https://gruble.de/search',
    '--xng-ooglester' : 'https://ooglester.com/search',
    '--xng-citwlgbt' : 'https://search.citw.lgbt/search',
    '--xng-fossfamily' : 'https://searx.foss.family/search',
    '--xng-segfau' : 'https://search.projectsegfau.it/search',    
    '--xng-copp' : 'https://copp.gg/search',
    '--xng-work' : 'https://searx.work/search',
    '--xng-ari' : 'https://search.ari.it/search',
    '--xng-online' : 'https://searxng.online/search',
    '--xng-daetalytica' : 'https://searx.daetalytica.io/search',
    '--xng-ononoki' : 'https://search.ononoki.org/search',
    '--xng-perennialte' : 'https://searx.perennialte.ch/search',
    '--xng-skyrimhater' : 'https://skyrimhater.com/search',
    '--xng-xowtf' : 'https://xo.wtf/search',    
    '--xng-ngntf' : 'https://search.ngn.tf/search',
    '--xng-baresearch' : 'https://baresearch.org/search',
    '--xng-incogniweb' : 'https://search.incogniweb.net/search',
    '--xng-disroot' : 'https://search.disroot.org/search',
    '--xng-ca' : 'https://searxng.ca',
    '--xng-be' : 'https://searx.be/search',

    // LIBREY INSTANCES

    '--lby-revvy' : 'https://search.revvy.de/search.php',
    '--lby-ahwx' : 'https://search.ahwx.org/search.php',
    '--lby-ahwx2' : 'https://search2.ahwx.org/search.php',
    '--lby-davidovski' : 'https://search.davidovski.xyz/search.php',
    '--lby-owo' : 'https://ly.owo.si/search.php',
    '--lby-org' : 'https://librey.org/search.php',
    '--lby-milivojevic' : 'https://librey.milivojevic.in.rs/search.php',
    '--lby-franklyflawless' : 'https://librey.franklyflawless.org/search.php',
    '--lby-glassprpl' : 'https://glass.prpl.wtf/search.php',
    '--lby-uk' : 'https://librex.uk.to/search.php',
    '--lby-ixtc' : 'https://librey.ix.tc/search.php',
    '--lby-yuru' : 'https://search.funami.tech/search.php',
    '--lby-retrohax' : 'https://librex.retro-hax.net/search.php',
    '--lby-nohost' : 'https://librex.nohost.network/search.php',
    '--lby-pabloferreiro' : 'https://search.pabloferreiro.es/search.php',
    '--lby-baczek' : 'https://librey.baczek.me/search.php',
    '--lby-benike' : 'https://lx.benike.me/search.php',
    '--lby-seitan' : 'https://search.seitan-ayoub.lol/search.php',
    '--lby-myroware' : 'https://librey.myroware.net/search.php',
    '--lby-nezumi' : 'https://librey.nezumi.party/search.php',
    '--lby-zeroish' : 'https://search.zeroish.xyz/search.php',
    '--lby-nirn' : 'https://librey.nirn.quest/search.php',
    '--lby-devol' : 'https://librey.devol.it/search.php',
    '--lby-castor' : 'https://librex.yogeshlamichhane.com.np/search.php',

    // LIBREX INSTANCES
    // BY THE WAY, LIBREX IS DEPRECATED AND ONLY DECENTRALA IS STILL RUNNING IT. THE OTHER URLS ARE KEPT UP FOR ARCHIVING PURPOSES.

    '--lbx-zzls' : 'https://librex.zzls.xyz/search.php',
    '--lbx-me' : 'https://librex.me/search.php',
    '--lbx-dyox' : 'https://s.dyox.in/search.php',
    '--lbx-spaceint' : 'https://search.spaceint.fr/search.php',
    '--lbx-medreyk' : 'https://search.madreyk.xyz/search.php',
    '--lbx-pabloferreiro' : 'https://search.pabloferreiro.es/search.php',
    '--lbx-pufe' : 'https://librex.pufe.org/search.php',
    '--lbx-ratakor' : 'https://librex.ratakor.com/search.php',
    '--lbx-tildevarsh' : 'https://search.tildevarsh.in/search.php',
    '--lbx-myroware' : 'https://librex.myroware.eu/search.php',
    '--lbx-bloatcat' : 'https://librex.bloatcat.tk/search.php',
    '--lbx-retrohax' : 'https://librex.retro-hax.net/search.php',
    '--lbx-zeroish' : 'https://search.zeroish.xyz/search.php',
    '--lbx-baczek' : 'https://librex.baczek.me/search.php',
    '--lbx-benike' : 'https://lx.benike.monster/search.php',
    '--lbx-decentrala' : 'https://search.decentrala.org/search.php',
  
    // 4GET INSTANCES

    '--4get-ggtyler' : 'https://4g.ggtyler.dev/web',
    '--4get-hbubli' : 'https://4get.hbubli.cc/web',
    '--4get-zzls' : 'https://4getus.zzls.xyz/web',
    '--4get-zzls2' : 'https://4get.zzls.xyz/web',
    '--4get-ch' : 'https://4get.ch/web',
    '--4get-lunar' : 'https://4get.lunar.icu/web',
    '--4get-sijh' : 'https://4get.sijh.net/web',
    '--4get-ca' : 'https://4get.ca/web',
    '--4get-sudovanilla' : 'https://4get.sudovanilla.org/web',
    '--4get-neco' : 'https://4get.neco.lol/web',
    '--4get-kizuki' : 'https://4get.kizuki.lol/web',
    '--4get-sillycomputer' : 'https://4get.silly.computer/web',
    '--4get-edmateo' : 'https://4get.edmateo.site/web',
    '--4get-ducksparty' : 'https://4get.ducks.party/web',

    // ARAA INSTANCES

    '--araa-extravi' : 'https://araa.extravi.dev/search',
    '--araa-tailsx' : 'https://tailsx.com/search',
    '--araa-sudovanilla' : 'https://as.sudovanilla.org/search',
    
  };

if (searchEngine in searchEngineMap) {
  const searchUrl = searchEngineMap[searchEngine];
  let redirectUrl = '';

  // FOR SEARCH ENGINES THAT ARE FUCKED UP, THAT I PRETTY MUCH IDK HOW THEY WORK, AND THAT TOOK A LOOOOOOONG WHILE TO FIGURE IT (DO IT YOURSELF IF YOU WANT TO CHANGE IT)
  if (['--wikipedia', '--wkp', '--wiki', '--asg', '--astiango', '--flnf', '--fileinfo', '--file', '--secretsearchenginelabs', '--ssel'].includes(searchEngine)) {
    const encodedQuery = encodeURIComponent(query).replace(/%20/g, ' ');
    redirectUrl = `${searchUrl}${encodedQuery}`;
  } 
  
    else {
      const encodedQuery = encodeURIComponent(query).replace(/%20/g, ' ');
      const searchParams = new URLSearchParams();

    // FOR ENGINES THAT USE "QUERY" INSTEAD OF "Q"
    if (['--swisscows', '--swc', '--sc', '--swiss', '--seekr', '--skr', '--mgn', '--marginalia'].includes(searchEngine)) {
      searchParams.set('query', encodedQuery);
    } 

    // FOR ENGINES THAT USE "TERM" INSTEAD OF "Q"
    else if (['--urbandictionary', '--urd', '--ud'].includes(searchEngine)) {
      searchParams.set('term', encodedQuery);
    } 

    // FOR ENGINES THAT USE "EINGABE" INSTEAD OF "Q"
    else if (['--metager', '--mtg', '--mg'].includes(searchEngine)) {
      searchParams.set('eingabe', encodedQuery);
    } 

    // FOR ENGINES THAT USE "TEXT" INSTEAD OF "Q"
    else if (['--yandex', '--ydx', '--ya', '--Яндекс'].includes(searchEngine)) {
      searchParams.set('text', encodedQuery);
    }

    // FOR ENGINES THAT USE "S" INSTEAD OF "Q"
    else if (['--4get', '--4'].includes(searchEngine)) {
      searchParams.set('s', encodedQuery);
    }
      
    else {
      searchParams.set('q', encodedQuery);
    }
    redirectUrl = `${searchUrl}?${searchParams.toString()}`;
  }

  window.location.href = redirectUrl;
} else {
  const braveSearchUrl = searchEngineMap['--brave'];
  const encodedQuery = encodeURIComponent(inputText).replace(/%20/g, '+');
  const searchParams = new URLSearchParams({ q: encodedQuery });
  const redirectUrl = `${braveSearchUrl}?${searchParams.toString()}`;

  window.location.href = redirectUrl;
}
  
});

async function closebox() {
  document.getElementById("isbn-info").classList.toggle('show');
}
