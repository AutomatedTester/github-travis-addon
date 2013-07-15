"use strict";

let project = window.location.pathname.split('/').splice(0,3).join('/');
const PASSED = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Ij4NCjxwYXRoIGZpbGw9IiMwRDgxMzYiIGQ9Ik01LDBDMi4yMzksMCwwLDIuMjQsMCw1YzAsMi43NjIsMi4yMzksNSw1LDVjMi43NjIsMCw1LTIuMjM4LDUtNUMxMCwyLjI0LDcuNzYyLDAsNSwwIE00LjUzNSw3LjgyNA0KCUwyLjEzOSw1LjQyNUwzLjY1LDMuOTE0bDAuODg1LDAuODg1bDIuMDQ0LTIuMDQ1bDEuNTEsMS41MTNMNC41MzUsNy44MjR6Ii8+DQo8L3N2Zz4NCg==';
const GREY = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Ij4NCjxwYXRoIGZpbGw9IiNBOEE4QTkiIGQ9Ik01LDBDMi4yMzksMCwwLDIuMjQsMCw1YzAsMi43NjIsMi4yMzgsNSw1LDVjMi43NjEsMCw1LTIuMjM4LDUtNUMxMCwyLjI0LDcuNzYyLDAsNSwwIE01Ljg2Niw3LjZINC4xMzQNCglWNi43MzJoMS43MzFWNy42eiBNNS43NDcsNS40NDFDNS43MDIsNS42NzUsNS40Nyw1Ljg2Niw1LjIzMiw1Ljg2Nkg0Ljc3Yy0wLjIzOCwwLTAuNDctMC4xOS0wLjUxNi0wLjQyNUwzLjc1MSwyLjgyOA0KCUMzLjcwOCwyLjU5MiwzLjg2NiwyLjQwMSw0LjEwNCwyLjQwMWgxLjc5M2MwLjIzNiwwLDAuMzk2LDAuMTkxLDAuMzUyLDAuNDI3TDUuNzQ3LDUuNDQxeiIvPg0KPC9zdmc+DQo=';
// Add the travis ci image to the project
var style = window.document.createElement('style');
style.innerHTML = '.travis-ci{z-index:50;overflow:hidden;position:absolute;border-radius:1px;display:inline-block;margin-left:8px;margin-bottom:-1px;opacity:0.9;-moz-transition: all .2s;}';
style.innerHTML += '.travis-ci:hover{background:rgba(0,0,0,0.5);box-shadow: 0 0 3px rgba(0,0,0,1);opacity:1;cursor:pointer;}';
style.innerHTML += '.travis-ci img{display:block;padding:5px;}';
style.innerHTML += 'ul.repositories a.travis-ci.user{position:relative;top:5px}'
style.innerHTML += '.travis-ci.repo{margin:0 0 0 8px}';
style.innerHTML += '.list{margin:25px 0px 0px 12px;border-spacing:0px;};'
style.innerHTML += '.tth{font-size: 13px; color: rgb(102, 102, 102); white-space: nowrap; border-bottom: 2px solid rgb(255, 255, 255);}';
style.innerHTML += '.tdmessage {overflow: hidden; text-overflow: ellipsis; white-space: normal;}';
style.innerHTML += ".greyStatus {background-image: url( " + GREY + ");}"
style.innerHTML += ".greenStatus {background-image: url(" + PASSED + ");}"
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
  insertBuildStatus(el, project, 'repo');
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

// Add Travis CI Tab to GitHub

let li = document.createElement('li');

li.classList.add('tooltipped');
li.classList.add('leftwards');

let a = document.createElement('a');
a.classList.add('js-selected-navigation-item');
a.href = '#';
let spanOcticon = document.createElement('span');
let spanWord = document.createElement('span');
spanWord.appendChild(document.createTextNode('  Travis  CI  '));

spanWord.addEventListener('click', function(){
    let selectedItem = document.querySelector('a.selected');
    selectedItem.classList.remove('selected');
    selectedItem.classList.remove('js-selected-navigation-item');
    a.classList.add('selected');
    let codeBody = document.getElementById('js-repo-pjax-container');
    codeBody.style = 'display:none;';

    //lets having the loading icon until we are ready to go.
    let loading = createLoading();
    codeBody.parentNode.appendChild(loading);
    let apiURL = "https://api.travis-ci.org/repos/" + project + "/builds";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", apiURL, true);
    xhr.onload = function(data) {
      loading.style = "display:none;";
      if (xhr.status == 200) {
        let responseText = JSON.parse(xhr.responseText);
        if (responseText.length !== 0) {
          let table = document.createElement('table');
          table.classList.add('list');
          let thead = document.createElement('thead');
          let thtr = document.createElement('tr');
          let thtd1 = document.createElement('th');
          thtd1.classList.add('tth');
          let thtd2 = document.createElement('th');
          thtd2.classList.add('tth')
          let thtd3 = document.createElement('th');
          thtd3.classList.add('tth')
          let thtd4 = document.createElement('th');
          thtd4.classList.add('tth')
          thtd1.appendChild(document.createTextNode('Number'));
          thtd2.appendChild(document.createTextNode('Commit'));
          thtd3.appendChild(document.createTextNode('Finished At'));
          thtd4.appendChild(document.createTextNode('Message'));
          thtr.appendChild(thtd1);
          thtr.appendChild(thtd2);
          thtr.appendChild(thtd3);
          thtr.appendChild(thtd4);
          thead.appendChild(thtr);
          table.appendChild(thead);
          let tbody = document.createElement('tbody');
          for (var i = 0; i < responseText.length; i++) {
            let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            let td3 = document.createElement('td');
            let td4 = document.createElement('td');
            let resspan = document.createElement('span');
            let aTravis = document.createElement('a');
            aTravis.href = 'https://travis-ci.org' + project + '/builds/' + responseText[i].id;
            aTravis.appendChild(document.createTextNode(responseText[i].number));
            td1.appendChild(aTravis);
            td2.appendChild(document.createTextNode(responseText[i].commit.substring(0, 7) + " (" + responseText[i].branch + ")"));
            td3.appendChild(document.createTextNode(responseText[i].finished_at));
            td4.appendChild(document.createTextNode(responseText[i].message));
            td4.classList.add('tdmessage');
            if (responseText[i].state === 'finished') {
              resspan.classList.add('greenStatus');
            }else {
              resspan.classList.add('greyStatus');
            }
            td1.appendChild(resspan);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            tbody.appendChild(tr);
          };
          table.appendChild(tbody);
          codeBody.parentNode.appendChild(table);
        }
        else {
          let noBuilds = document.createElement('div');
          noBuilds.appendChild(document.createTextNode("Unfortunately No Data was returned from Travis CI, maybe set up your project there?"));
          codeBody.parentNode.appendChild(noBuilds);
        }
      } else {
        let errorDiv = document.createElement('div');
        errorDiv.appendChild(document.createTextNode('Unfortunately there has been an error'));
        codeBody.parentNode.appendChild(errorDiv);
      }
    };
    xhr.send();
});

let imgLoader = document.createElement('img');

a.appendChild(spanOcticon);
a.appendChild(spanWord);
a.appendChild(imgLoader);
li.appendChild(a);

let code = document.querySelector('.tooltipped.leftwards');
code.appendChild(li);

var createLoading = function() {
  let loading = document.createElement('div');
  loading.classList.add('large-loading-area');
  let loadingImg = document.createElement('img');
  loadingImg.src = "https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-64.gif";
  loadingImg.height = 32;
  loadingImg.width = 32;
  loading.appendChild(loadingImg);
  return loading;
}

