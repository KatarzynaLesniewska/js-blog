'use strict';

{

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

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

  function generateTitleLinks(customSelector = '') {
    console.log('generateTitleLinks- czy została wykonana?');

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector).innerHTML;

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log('customSelector:', customSelector);

    for (let article of articles) {
      article.classList.contains('post');

      /* get the article id, zapisz do const (clickedElement tutaj jest ok??) */
      const articleId = clickedElement.getAttribute('id');
      console.log('clickedElementsAttribute:', articleId);

      /* find the title element, zapisz do const */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* get the title from the title element, zapisz do const */


      /* create HTML of the link, zapisz do const */
      /*
      const linkHTML = '<li><a href="#"><span></span></a></li>';
      const linkHTML = '<li><a href="#' + '"><span>' + '</span></a></li>';
      */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
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

  function generateTags() {
    /* find all articles */
    const articles = document.querySelectorAll('.post');

    /* START LOOP: for every article: */
    for (let article of articles) {
      article.classList.contains('post');

      /* find tags wrapper */
      const titleList = article.querySelector(optArticleTagsSelector).innerHTML;

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      // get 'data-tags' from the article
      const articleTags = article.getAttribute('data-tags');
      console.log('articleTags:', articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log('articleTagsArray:', articleTagsArray);

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        console.log('tag:', tag);

        /* generate HTML of the link */

        /* add generated code to html variable */
        const TagHTMLLink = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
        console.log('TagHTMLLink:', TagHTMLLink);

        /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */
      titleList.innerHTML = titleList.innerHTML + TagHTMLLink;

      /* END LOOP: for every article: */
    }
  }

  generateTags();

  //W tym celu dodaj na końcu pliku następujący szablon:

  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    console.log('preventDefault- czy działa?');

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('Link was clicked!');
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
    // wywołujemy tą funkcję w 2 miejscach?
    generateTitleLinks('[data-tags~="' + tag + '"]');

  }

  function addClickListenersToTags(){
    /* find all links to tags */
    const links = document.querySelectorAll('#href a');
    console.log('links:', links);

    /* START LOOP: for each link; add tagClickHandler as event listener for that link */
    for(let link of links){
      link.addEventListener('click', tagClickHandler);
    }
    /* END LOOP: for each link */
  }

  addClickListenersToTags();



}
