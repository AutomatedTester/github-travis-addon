// Add the travis ci image to the project
var style = window.document.createElement('style');
style.innerHTML = '.travis-ci{z-index:50;overflow:hidden;position:absolute;border-radius:1px;display:inline-block;margin-left:8px;margin-bottom:-1px;opacity:0.9;-moz-transition: all .2s;}';
style.innerHTML += '.travis-ci:hover{background:rgba(0,0,0,0.5);box-shadow: 0 0 3px rgba(0,0,0,1);opacity:1;cursor:pointer;}';
style.innerHTML += '.travis-ci img{display:block;padding:5px;}';
style.innerHTML += 'ul.repositories a.travis-ci.user{position:relative;top:5px}'
style.innerHTML += '.travis-ci.repo{margin:0 0 0 8px}';
var body = window.document.getElementsByTagName('body')[0];
body.appendChild(style);
      
/*
  css.insertRule('.travis-ci:hover{opacity:1;cursor:pointer}', 1);
  css.insertRule('.travis-ci img{position:relative;left:-53px;-o-transition:all .3s}', 1);
  css.insertRule('.travis-ci:hover img{left:0}', 1);
*/
function isStatusUnknown(img){
    // Cannot compare actual image data through canvas due to Same Origin Policy
    return img.width == 95 && img.height == 13;
  }

function insertBuildStatus(el, project, className){
  var img = document.createElement('img');
  img.src = 'https://secure.travis-ci.org' + project + '.png';
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

var el = document.querySelector('.title-actions-bar h1 strong');
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

// Adding a build tab
var buildTab = window.document.createElement('li');
buildTab.addEventListener('click', function(){
  var container = window.document.getElementById("js-repo-pjax-container");
  container.style.display = 'none';
  var selectedTab = window.document.querySelectorAll('a.selected.tabnav-tab')[0];
  selectedTab.classList.remove("selected");
  
  var buildLink = window.document.getElementById('travisBuildLink');
  buildLink.classList.add("selected");

  var travisContainer = window.document.createElement('div');
  travisContainer.id = 'travisContainer';
  var table = window.document.createElement('table');
  var tableHead = window.document.createElement('thead');
  var tableHeadRow = window.document.createElement('tr');
  var tableHeadCol1 = window.document.createElement('td');
  tableHeadCol1.innerHTML = 'Build';
  tableHeadRow.appendChild(tableHeadCol1);

  var tableHeadCol2 = window.document.createElement('td');
  tableHeadCol2.innerHTML = 'Branch';
  tableHeadRow.appendChild(tableHeadCol2);
  
  var tableHeadCol3 = window.document.createElement('td');
  tableHeadCol3.innerHTML = 'Message';
  tableHeadRow.appendChild(tableHeadCol3);
  
  var tableHeadCol4 = window.document.createElement('td');
  tableHeadCol4.innerHTML = 'Duration';
  tableHeadRow.appendChild(tableHeadCol4);
  
  var tableHeadCol5 = window.document.createElement('td');
  tableHeadCol5.innerHTML = 'Finished';
  tableHeadRow.appendChild(tableHeadCol5);

  tableHead.appendChild(tableHeadRow)
  table.appendChild(tableHead);
  travisContainer.appendChild(table);
  var containerParent = container.parentNode;
  containerParent.insertBefore(travisContainer, container);
  
  createAddonStyles();

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      //TODO(David) Add in the building the rest of the table
      alert(xhr.responseText)
    }
  }
  xhr.open("GET", "https://api.travis-ci.org/builds/", true);
  xhr.send();
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
if (tabs){
  var parentEl = tabs[4].parentNode;
  parentEl.parentNode.insertBefore(buildTab, tabs[4].parentNode.nextSibling);
}

var createAddonStyles = function() {
  var travisStyle = window.document.createElement('style');
  travisStyle.innerHTML = 'th { font-size: 13px; color: rgb(102,102,102); }';
  travisStyle.innerHTML += 'td, th { padding: 5px 10px;';
  travisStyle.innerHTML += 'border-bottom: 2px solid white; }';
  var body = window.document.getElementsByTagName('body')[0];
  body.appendChild(travisStyle);
};
