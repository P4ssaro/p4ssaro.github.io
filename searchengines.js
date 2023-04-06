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
    '--dggo': 'https://duckduckgo.com',
    '--ddg': 'https://duckduckgo.com',

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

    '--seekr': 'https://www.seekr.com/search',
    '--skr': 'https://www.seekr.com/search',

    '--mwmbl': 'https://mwmbl.org/',

    '--astiango': 'https://astiango.com/search.php',
    '--asg': 'https://astiango.com/search.php',
    
    '--urbandictionary': 'https://www.urbandictionary.com/define.php',
    '--ubd': 'https://www.urbandictionary.com/define.php',
    '--ud': 'https://www.urbandictionary.com/define.php',

    '--torry': 'https://www.torry.io/search/',
    '--trr': 'https://www.torry.io/search/',

    '--onesearch': 'https://www.onesearch.com/yhs/search',
    '--osr': 'https://www.onesearch.com/yhs/search',

    '--monocles': 'https://monocles.de/search',
    '--mnc': 'https://monocles.de/search',

    '--prieco': 'https://search.jojoyou.org/',
    '--prc': 'https://search.jojoyou.org/',

    '--youtube': 'https://www.youtube.com/results',
    '--ytb': 'https://www.youtube.com/results',
    '--yt': 'https://www.youtube.com/results',

    '--andi': 'https://andisearch.com/',
    '--and': 'https://andisearch.com/',

    '--dogpile': 'https://www.dogpile.com/serp',
    '--dgp': 'https://www.dogpile.com/serp',
    '--dp': 'https://www.dogpile.com/serp',
    '--dog': 'https://www.dogpile.com/serp',
  };

  const inputText = input.value.trim();
const [searchEngine, query] = inputText.split(':').map((part) => part.trim().toLowerCase());

if (searchEngine in searchEngineMap) {
  const searchUrl = searchEngineMap[searchEngine];
  let redirectUrl = '';

  if (['--wikipedia', '--wkp', '--wiki'].includes(searchEngine)) {
    const encodedQuery = encodeURIComponent(query).replace(/%20/g, ' ');
    redirectUrl = `${searchUrl}${encodedQuery}`;
  } else {
    const encodedQuery = encodeURIComponent(query).replace(/%20/g, ' ');
    const searchParams = new URLSearchParams();
    if (['--swisscows', '--swc', '--sc', '--seekr', '--skr'].includes(searchEngine)) {
      searchParams.set('query', encodedQuery);
    } else if (['--urbandictionary', '--urd', '--ud'].includes(searchEngine)) {
      searchParams.set('term', encodedQuery);
    } else {
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
