// Add the travis ci image to the project
var style = window.document.createElement('style');
style.innerHTML = '.travis-ci{z-index:50;overflow:hidden;position:absolute;border-radius:1px;display:inline-block;margin-left:8px;margin-bottom:-1px;opacity:0.9;-moz-transition: all .2s;}';
style.innerHTML += '.travis-ci:hover{background:rgba(0,0,0,0.5);box-shadow: 0 0 3px rgba(0,0,0,1);opacity:1;cursor:pointer;}';
style.innerHTML += '.travis-ci img{display:block;padding:5px;}';
style.innerHTML += 'ul.repositories a.travis-ci.user{position:relative;top:5px}'
style.innerHTML += '.travis-ci.repo{margin:0 0 0 8px}';
var body = window.document.getElementsByTagName('body')[0];
body.appendChild(style);

function isStatusUnknown(img){
  // Cannot compare actual image data through canvas due to Same Origin Policy
  return img.width == 95 && img.height == 13;
}

function insertBuildStatus(el, project, className){
  var img = document.createElement('img');
  img.src = 'https://travis-ci.org' + project + '.png';
  img.alt = 'build status';
  img.onload = function(){
    if(!isStatusUnknown(img)){
      var link = document.createElement('a');
      link.href = 'http://travis-ci.org' + project;
      link.className = 'travis-ci ' + className;

      link.appendChild(img);
      el.appendChild(link);
    }
  }
}

var el = document.querySelector('.entry-title strong');
if(el){
  insertBuildStatus(el, window.location.pathname.split('/').splice(0,3).join('/'), 'repo');
}

// Inject build status to user/organization page
var links = document.querySelectorAll('.repolist li h3');
if(links.length > 0){
  for(i in links){
    if(typeof links[i] == 'object'){
      var project = '/' + links[i].querySelector('a').href.split('/').splice(3,3).join('/');
      insertBuildStatus(links[i], project, 'user');
    }
  }
}

// Add Travis CI button to GitHub
/*<li class="tooltipped leftwards" original-title="Code">

    <a class="js-selected-navigation-item selected" data-selected-links="repo_source repo_downloads repo_commits repo_tags repo_branches /w3c/web-platform-tests" data-pjax="true" data-gotokey="c" href="/w3c/web-platform-tests">
        <span class="octicon octicon-code"></span>
        <span class="full-word">

            Travis CI

        </span>
        <img class="mini-loader" width="16" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" alt="Octocat-spinner-32"></img>
    </a>

</li>*/
let li = window.document.createElement('li');

li.classList.add('tooltipped');
li.classList.add('leftwards');

let a = window.document.createElement('a');
li.classList.add('js-selected-navigation-item');

let spanOcticon = window.document.createElement('span');
let spanWord = window.document.createElement('span');
spanWord.appendChild(document.createTextNode('  Travis  CI  '));

let imgLoader = window.document.createElement('img');

a.appendChild(spanOcticon);
a.appendChild(spanWord);
a.appendChild(imgLoader);
li.appendChild(a);
let code = window.document.querySelector('.tooltipped.leftwards');
code.appendChild(li);



