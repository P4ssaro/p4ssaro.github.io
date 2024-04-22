const form = document.querySelector('form');
const input = form.querySelector('input[type="text"]');

form.addEventListener('submit', (event) => {
  event.preventDefault();

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

    '--librey' : 'https://librey.devol.it/search.php',
    '--lby' : 'https://librey.devol.it/search.php',

    '--shuriken' : 'https://shuriken.pm/search.php',
    '--shk' : 'https://shuriken.pm/search.php',

    '--araa' : 'https://araa.extravi.dev/search',
  };

  const inputText = input.value.trim();
  const [searchEngine, query] = inputText.split(':').map((part) => part.trim().toLowerCase());

if (searchEngine in searchEngineMap) {
  const searchUrl = searchEngineMap[searchEngine];
  let redirectUrl = '';

  // FOR SEARCH ENGINES THAT ARE FUCKED UP, THAT I PRETTY MUCH IDK HOW THEY WORK, AND THAT TOOK A LOOOOOOONG WHILE TO FIGURE IT (DO IT YOURSELF IF YOU WANT TO CHANGE IT)
  if (['--wikipedia', '--wkp', '--wiki', '--asg', '--astiango'].includes(searchEngine)) {
    const encodedQuery = encodeURIComponent(query).replace(/%20/g, ' ');
    redirectUrl = `${searchUrl}${encodedQuery}`;
  } 
  
    else {
      const encodedQuery = encodeURIComponent(query).replace(/%20/g, ' ');
      const searchParams = new URLSearchParams();

    // FOR ENGINES THAT USE "QUERY" INSTEAD OF "Q"
    if (['--swisscows', '--swc', '--sc', '--swiss', '--seekr', '--skr'].includes(searchEngine)) {
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

    // FOR ENGINES THAT ARE ABSOLUTELY FUCKED UP LIKE ASTIAN GO AND IDK HOW THEY WORK
    // else if ([].includes(searchEngine)) {
    //  searchParams.set('eingabe', encodedQuery);
    // } 
    
    else {
      searchParams.set('q', encodedQuery);
    }
    redirectUrl = `${searchUrl}?${searchParams.toString()}`;
  }

  window.location.href = redirectUrl;
} else {
  const googleSearchUrl = searchEngineMap['google'];
  const encodedQuery = encodeURIComponent(inputText).replace(/%20/g, '+');
  const searchParams = new URLSearchParams({ q: encodedQuery });
  const redirectUrl = `${googleSearchUrl}?${searchParams.toString()}`;

  window.location.href = redirectUrl;
}
  
});
