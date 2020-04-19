'use strict';

{

    const titleClickHandler = function(event){
        event.preventDefault();
        //console.log('preventDefault- czy działa??');

        const clickedElement = this;
        console.log('Link was clicked!');
        console.log('event:', event);
    
        /* [DONE] remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll('.titles a.active');

        for(let activeLink of activeLinks){
            activeLink.classList.remove('active');
        }
    
        /* [DONE] add class 'active' to the clicked link */
        console.log('clickedElement:', clickedElement);
        console.log('clickedElement (with plus): ' + clickedElement);

        clickedElement.classList.add('active');
    
        /* [DONE] remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll('.posts article.active');

        for(let activeArticle of activeArticles){
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
    }
    
    const links = document.querySelectorAll('.titles a');
    
    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    }

    // Część samodzielna looool 

    /* Tym razem zastosujemy dobrą praktykę, którą jest 
    zapisanie "ustawień" skryptu w stałych. Dzięki temu 
    będzie można łatwo przystosować kod np. do zmiany 
    nazewnictwa klas w kodzie HTML. Aby odróżnić te stałe, 
    ich nazwy zaczniemy od prefiksu opt – skrót od options.
    */

    const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

    function generateTitleLinks(){
        console.log('generateTitleLinks- czy została wykonana?');

        /* remove contents of titleList */
        const titleList = document.querySelector(optTitleListSelector).innerHTML;

        function clearMessages(){
            document.getElementById('messages').innerHTML = '';
        } 

        clearMessages(); 

        /* for each article */ 
        const articles = document.querySelectorAll('.post');

        for(let article of articles){
            article.classList.contains('post');
        }

            /* get the article id, zapisz do const (clickedElement tutaj jest ok??) */
            const articleId = clickedElement.getAttribute('id');
            console.log('clickedElementsAttribute:', articleId);

            for(let article of articles){
                article.classList.contains('id');
            }

            /* find the title element, zapisz do const */
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;

            for(let article of articles){
                article.classList.contains(optTitleSelector);
            }

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


            
    }

    // wywołanie, Ta funkcja ma uruchamiać się od razu po odświeżeniu strony,
    generateTitleLinks();

}   
