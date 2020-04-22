'use strict';

{

  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#templates.tagCloudLink').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#templates.authorLink').innerHTML)
  }

  const opt {
    articleSelector: '.post',
    titleSelector: '.post-title',
    titleListSelector: '.titles',
    articleTagsSelector: '.post-tags .list',
    articleAuthorSelector: '.post-author',
    tagsListSelector: '.tags.list', //coś innego w html <ul class="list tags">
    cloudClassCount: '5',
    cloudClassPrefix: 'tag-size-',
    authorsListSelector: '.list .authors'
  };

  /*
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    //coś innego w html <ul class="list tags">
    optCloudClassCount = '5',
    optCloudClassPrefix = 'tag-size-',
    optAuthorsListSelector = '.list .authors';
  */

  const titleClickHandler = function (event) {
    event.preventDefault();
    //console.log('preventDefault- czy działa??');

    const clickedElement = this;
    console.log('Link was clicked!');
    console.log('event:', event);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    console.log('clickedElement (with plus): ' + clickedElement);

    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log('clickedElementsAttribute:', articleSelector);

    /* [DONE] find the clicked article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log('targetArticle:', targetArticle);

    /* [DONE] add class 'active' to the clicked article */
    targetArticle.classList.add('active');
  };

  /* Ten kod kazali z dokładnie tego miejsca przeniesc w inne, żeby naprawić buga
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);

  for(let link of links){
      link.addEventListener('click', titleClickHandler);
  }
  */

  // Część samodzielna looool

  /* Tym razem zastosujemy dobrą praktykę, którą jest
  zapisanie "ustawień" skryptu w stałych. Dzięki temu
  będzie można łatwo przystosować kod np. do zmiany
  nazewnictwa klas w kodzie HTML. Aby odróżnić te stałe,
  ich nazwy zaczniemy od prefiksu opt – skrót od options.
  */

  function generateTitleLinks(customSelector = '') {
    console.log('generateTitleLinks- czy została wykonana?');

    /* remove contents of titleList */
    const titleList = document.querySelector(opt.titleListSelector).innerHTML;

    /* for each article */
    const articles = document.querySelectorAll(opt.articleSelector + customSelector);
    console.log('customSelector:', customSelector);

    for (let article of articles) {
      article.classList.contains('post');

      /* get the article id, zapisz do const (clickedElement tutaj jest ok??) */
      const articleId = clickedElement.getAttribute('id');
      console.log('clickedElementsAttribute:', articleId);

      /* find the title element, zapisz do const */
      const articleTitle = article.querySelector(opt.titleSelector).innerHTML;

      /* get the title from the title element, zapisz do const */


      /* create HTML of the link, zapisz do const */
      /*
      const linkHTML = '<li><a href="#"><span></span></a></li>';
      const linkHTML = '<li><a href="#' + '"><span>' + '</span></a></li>';
      */

      /* linijkę 122 mam zmienić na to co jest teraz w 123 i 124
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>'; */
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
      console.log('linkHTML:', linkHTML);

      /* insert link into titleList, lewa colm */
      titleList.innerHTML = titleList.innerHTML + linkHTML;
    }

    /*
    Dwa sposoby optymalizacji kodu

    1) PRZYLEGŁY HTML insertAdjacentHTML

    https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
    element.insertAdjacentHTML(position, text);

    linkHTML.insertAdjacentHTML('afterbegin', articleId);

    linkHTML.insertAdjacentHTML('beforeend', articleTitle);
    */

    /* Zbudowanie kodu HTML wszystkich linków; jak działa zakres zmiennych (ang. variable scope)

        const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';

        function generateTitleLinks(){

            *remove contents of titleList *
            * const titleList = document.querySelector(optTitleListSelector).innerHTML;

                function clearMessages(){
                    document.getElementById('messages').innerHTML = '';
                }

                clearMessages();
            *

            * find all the articles and save them to variable: articles *
            * const articles = document.querySelectorAll('.post');
            *

            let html = '';

            for(let article of articles){
                * get the article id *
                * const articleId = clickedElement.getAttribute('id');
                *

                * find the title element *
                * const articleTitle = article.querySelector(optTitleSelector).innerHTML;
                *

                * get the title from the title element *
                * ... *

                * create HTML of the link *
                * const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
                console.log('linkHTML:', linkHTML);
                *

                * insert link into html variable *
                html = html + linkHTML;

                console.log('html:', html);
            }

            titleList.innerHTML = html;
        }

        generateTitleLinks();
    */

    // Przywrócenie funkcjonalności klikania linków

    /* Dlatego kod odpowiedzialny za powiązanie kliknięcia w linki z
    funkcją titleClickHandler musimy przenieść na sam koniec
    funkcji generateTitleLinks.
    */
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }

  }

  // wywołanie, Ta funkcja ma uruchamiać się od razu po odświeżeniu strony,
  generateTitleLinks();

  function calculateTagsParams(tags) {
    for (let tag in tags) {
      console.log(tag + ' is used ' + tags[tag] + ' times');

      if (tags[tag] > params.max) {
        params.max = tags[tag];
      }

      if (tags[tag] > params.min) {
        params.min = tags[tag];
      }

    }
    return params;

  }

  function calculateTagClass(count, params) {

    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (opt.cloudClassCount - 1) + 1);

    /* classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * optCloudClassCount + 1 ); */
    return opt.cloudClassPrefix;
  }

  // wywołać ?? calculateTagClass(count, params);

  function generateTags() {
    /* {O} [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll('.post');

    /* START LOOP: for every article: */
    for (let article of articles) {
      article.classList.contains('post');

      /* find tags wrapper */
      const titleList = article.querySelector(opt.articleTagsSelector).innerHTML;

      /* make html variable with empty string */
      let html = '';

      /* 1. get tags from data-tags attribute */
      // get 'data-tags' from the article
      const articleTags = article.getAttribute('data-tags');
      console.log('articleTags:', articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log('articleTagsArray:', articleTagsArray);

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        console.log('tag:', tag);

        /* 2. generate HTML of the link */

        /* add generated code to html variable */
        /* linijkę 278 mam zmienić na to co jest teraz w 280 i 281
        const TagHTMLLink = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>'; */
        const linkHTMLData = {id: tag, title: tag};
        const TagHTMLLink = templates.articleLink(linkHTMLData);
        console.log('TagHTMLLink:', TagHTMLLink);

        /* 3. {O} [NEW] check if this link is NOT already in allTags */
        if (!allTags[tag]) {
          /* 4. {O} [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

        /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */
      titleList.innerHTML = titleList.innerHTML + TagHTMLLink;

      /* END LOOP: for every article: */
    }

    /* 5.a [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    /*
    i dodajemy do niej wszystkie linki znajdujące się w tablicy
    allTagsLinks, łącząc je ze sobą za pomocą spacji
    (kod pod komentarzem  [NEW] add html from allTags to tagList).
    */

    /* zamiana tego fragmentu na ten co jest pod (z 6 linijek ponizej)
     5.b {O} [NEW] add html from allTags to tagList
    // tagList.innerHTML = allTags.join(' ');
    console.log(allTags);
    */

    // dodanie kodu przed let allTagsHTML
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    /* ZAMIENIONY FRAGMENT [NEW] create variable for all links HTML code */
    /* zmieniamy linię 322 na linie 324 i
    let allTagsHTML = ''; */
    const allTagsData = {tags: []};

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
      /* allTagsHTML += tag + ' (' + allTags[tag] + ') '; */

      const tagLinkHTML = '<li>' + calculateTagClass(allTags[tag], tagsParam) + '</li>';
      console.log('tagLinkHTML:', tagLinkHTML);

      /* teraz tą linie mam zmienić na to co poniżej
      allTagsHTML += '<li><a class="calculateTagClass" href="#tag-' + tag + '"><span> (' + allTags[tag] + ')' + '</span></a></li>';
      */
      /* allTagsHTML += tagLinkHTML;
      console.log('allTagsHTML:', allTagsHTML); */

      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });

    }

    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    /* tagList.innerHTML = allTagsHTML; */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log('allTagsData:', allTagsData);

  }

  generateTags();

  //W tym celu dodaj na końcu pliku następujący szablon:

  function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    console.log('preventDefault- czy działa?');

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('tagLink was clicked!');
    console.log('event:', event);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('clickedElementsAttribute:', clickedElement);

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log('activeTagLinks:', activeTagLinks);

    /* START LOOP: for each active tag link; remove class active */
    for (let activeTagLink of activeTagLinks) {
      activeTagLink.classList.remove('active');
    }
    /* END LOOP: for each active tag link */

    /* find all tag links with "href" attribute equal to the "href" constant */
    const equalHrefTagLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log('equalHrefTagLinks:', equalHrefTagLinks);

    /* START LOOP: for each found tag link; add class active */
    for (let equalHrefTagLink of equalHrefTagLinks) {
      equalHrefTagLink.classList.add('active');
    }
    /* END LOOP: for each found tag link */

    /* execute function "generateTitleLinks" with article selector as argument */
    // wywołujemy tą funkcję w 2 miejscach? - teraz już w 3 miejscach
    generateTitleLinks('[data-tags~="' + tag + '"]');

  }

  function addClickListenersToTags() {
    /* find all links to tags */
    const links = document.querySelectorAll('#href a');
    console.log('tagslinks:', links);

    /* START LOOP: for each link; add tagClickHandler as event listener for that link */
    for (let link of links) {
      link.addEventListener('click', tagClickHandler);
    }
    /* END LOOP: for each link */
  }

  addClickListenersToTags();

  ////////////////////////////// Authors' List

  function calculateAuthorsParams(authors) {
    for (let author in authors) {
      console.log(author + ' is used ' + authors[author] + ' times');

      if (authors[author] > params.max) {
        params.max = authors[author];
      }

      if (authors[author] > params.min) {
        params.min = authors[author];
      }

    }
    return params;

  }

  function calculateAuthorClass(count, params) {

    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (opt.cloudClassCount - 1) + 1);

    /* classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * optCloudClassCount + 1 ); */
    return opt.cloudClassPrefix;
  }

  // wywołać ?? calculateAuthorClass(count, params);

  function generateAuthors() {
    /* {O} [NEW] create a new variable allAuthors with an empty object */
    let allAuthors = {};

    /* find all authors */
    const authors = document.querySelectorAll(opt.articleAuthorSelector);

    /* START LOOP: for every author: */
    for (let author of authors) {
      author.classList.contains('.post-author');

      /* find authors wrapper */
      const authorList = author.querySelector(opt.articleAuthorSelector).innerHTML;

      /* make html variable with empty string */
      let html = '';

      /* 1. get authors from data-author attribute */
      // get 'data-author'attribute from the article
      const articleAuthors = author.getAttribute('data-author');
      console.log('articleAuthors:', articleAuthors);

      /* split tags into array */ // tu nie trzeba
      /* START LOOP: for each tag */ // bez pętli po tagach
      /* generate HTML of the link & add generated code to html variable */
      /* linijkę 464 mam zmienić na to co jest teraz w 465 i 466
      const authorHTMLLink = '<li><a href="#post-author-' + author + '"><span>' + author + '</span></a></li>'; */
      const linkHTMLData = {id: author, title: author};
      const authorHTMLLink = templates.articleLink(linkHTMLData);
      console.log('authorHTMLLink:', authorHTMLLink);

      /* 3. {O} [NEW] check if this link is NOT already in allAuthors */
      if (!allAuthors[authorHTMLLink]) {
        /* 4. {O} [NEW] add tag to allAuthors object */
        allAuthors[authorHTMLLink] = 1;
      } else {
        allAuthors[authorHTMLLink]++;
      }

      /* insert HTML of all the links into the authors wrapper */
      authorList.innerHTML = authorList.innerHTML + authorHTMLLink;

      /* 5.a [NEW] find list of authors in right column */
      const authorList2 = document.querySelector(opt.authorsListSelector);

      /*
      i dodajemy do niej wszystkie linki znajdujące się w tablicy
      allAuthorsLinks, łącząc je ze sobą za pomocą spacji
      (kod pod komentarzem  [NEW] add html from allAuthorss to authorList).
      */

      /* zamiana tego fragmentu na ten co jest pod (z 6 linijek ponizej)
      5.b {O} [NEW] add html from allAuthors to authorList
      // authorList.innerHTML = allAuthors.join(' ');
      console.log(allAuthors);
      */

      // dodanie kodu przed let allAuthorsHTML
      const authorsParams = calculateAuthorsParams(allAuthors);
      console.log('authorsParams:', authorsParams);

      /* ZAMIENIONY FRAGMENT [NEW] create variable for all links HTML code */
      /* zmieniam to na poniższe
      let allAuthorsHTML = ''; */
      const allAuthorsData = {authors: []};

      /* [NEW] START LOOP: for each author in allAuthors: */
      for (let author in allAuthors) {
        /* [NEW] generate code of a link and add it to allAuthorsHTML */
        /* allAuthorsHTML += author + ' (' + allAuthors[author] + ') '; */

        const authorLinkHTML = '<li>' + calculateAuthorClass(allAuthors[author], authorsParams) + '</li>';
        console.log('authorLinkHTML:', authorLinkHTML);

        /* teraz tą linie mam zmienić na to co poniżej
        allAuthorsHTML += '<li><a class="calculateAuthorClass" href="#tag-' + author + '"><span> (' + allAuthors[author] + ')' + '</span></a></li>';
        */
        /* allAuthorsHTML += authorLinkHTML;
        console.log('allAuthorsHTML:', allAuthorsHTML); */

        allAuthorsData.authors.push({
          tag: author,
          count: allAuthors[author],
          className: calculateAuthorClass(allAuthors[author], authorsParams)
        });

      }

      /* [NEW] END LOOP: for every author: */
    }

    /*[NEW] add HTML from allAuthorsHTML to authorList */
    /* authorList.innerHTML = allAuthorsHTML; */
    authorList.innerHTML = templates.authorLink(allAuthorsData);
    console.log('allAuthorsData:', allAuthorsData);

  }

  generateAuthors();

  function authorClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    console.log('preventDefault- czy działa?');

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('authorLink was clicked!');
    console.log('event:', event);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('clickedElementsAttribute:', clickedElement);

    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#post-author-', '');

    /* find all author links with class active */
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#post-author-"]');
    console.log('activeAuthorLinks:', activeAuthorLinks);

    /* START LOOP: for each active author link; remove class active */
    for (let activeAuthorLink of activeAuthorLinks) {
      activeAuthorLink.classList.remove('active');
    }
    /* END LOOP: for each active author link */

    /* find all author links with "href" attribute equal to the "href" constant */
    const equalHrefAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log('equalHrefAuthorLinks:', equalHrefAuthorLinks);

    /* START LOOP: for each found author link; add class active */
    for (let equalHrefAuthorLink of equalHrefAuthorLinks) {
      equalHrefAuthorLink.classList.add('active');
    }
    /* END LOOP: for each found author link */

    /*
    Nie musisz w żaden sposób zmieniać funkcji generateTitleLinks
    – wystarczy, że w funkcji authorClickHandler wywołasz ją z
    odpowiednim argumentem. Pamiętaj, że w tym wypadku w
    selektorze atrybutu użyjesz łącznika = zamiast ~=.
    */
    generateTitleLinks('[data-author="' + author + '"]');

  }

  function addClickListenersToAuthors() {
    /* find all links to authors */
    const links = document.querySelectorAll('#href a');
    console.log('authorslinks:', links);

    /* START LOOP: for each link; add authorClickHandler as event listener for that link */
    for (let link of links) {
      link.addEventListener('click', authorClickHandler);
    }
    /* END LOOP: for each link */
  }

  addClickListenersToAuthors();

}
