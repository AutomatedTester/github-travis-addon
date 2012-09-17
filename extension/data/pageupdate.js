// Add the travis ci image to the project
var style = window.document.createElement('style');
style.innerHTML = '#travis-ci{border-radius:1px;display:inline-block;margin-left:8px;margin-bottom:-1px;opacity:0.9;-moz-transition: all .2s;}';
style.innerHTML += '#travis-ci:hover{background:rgba(0,0,0,0.5);box-shadow: 0 0 3px rgba(0,0,0,1);opacity:1;cursor:pointer;}';
style.innerHTML += '#travis-ci img{display:block;}';
      
var tab = window.document.getElementsByClassName('title-actions-bar')[0];
var h1 = tab.getElementsByTagName('h1')[0];
var strong = h1.getElementsByTagName('strong')[0];
          
var project = window.location.pathname.split('/').splice(0,3).join('/');
var img = window.document.createElement('img');
            
img.setAttribute('src', 'https://secure.travis-ci.org' + project + '.png');
img.setAttribute('alt', 'build status');
              
/* Create the link element. */
var link = window.document.createElement('a');
link.href = 'http://travis-ci.org/#!' + project;
link.id = 'travis-ci';
                  
/* Insert the elements into the DOM. */
link.appendChild(img);
strong.appendChild(style);
strong.appendChild(link);

// Adding a build tab
var buildTab = window.document.createElement('li');
buildTab.addEventListener('click', function(){
  var container = window.document.getElementById("js-repo-pjax-container");
  container.style.display = 'none';
  var selectedTab = window.document.querySelectorAll('a.selected.tabnav-tab')[0];
  selectedTab.classList.remove("selected");
  
  var buildLink = window.document.getElementById('travisBuildLink');
  buildLink.classList.add("selected");

  //TODO(David) Add code to pull build status from Travis API
})

// Adding the link
var buildLink = window.document.createElement('a');
buildLink.id = 'travisBuildLink';
buildLink.href = '#';
buildLink.innerHTML = "Builds";
buildLink.classList.add('tabnav-tab');
buildTab.appendChild(buildLink);

// Attaching to the DOM
var tabs = window.document.getElementsByClassName('tabnav-tab');
var parentEl = tabs[4].parentNode;
parentEl.parentNode.insertBefore(buildTab, tabs[4].parentNode.nextSibling);

