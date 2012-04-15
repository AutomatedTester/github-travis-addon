//var prefs = require("api-utils/preferences-service");


var addNewProject = function(){
  var projectUrl = document.getElementById('projectUrl');
  var table = document.getElementById("currentProjects");
  var project = projectUrl.value.split('/').splice(3,4).join('/');

  /* Create table row and cells */
  var tr = document.createElement('tr');
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');

  /* Create image element and populate */
  var img = document.createElement('img');
  img.setAttribute('src', 'https://secure.travis-ci.org/' + project + '.png');
  img.setAttribute('alt', 'build status');
                             
  /* Create the link element and populate */
  var link = window.document.createElement('a');
  link.href = projectUrl.value;
  var text = document.createTextNode(project);
  link.appendChild(text); 

  /* Insert items into cells and then into the row */
  td1.appendChild(link);
  td2.appendChild(img);

  tr.appendChild(td1);
  tr.appendChild(td2);

  /* Insert table row onto the page and cleanup */
  table.appendChild(tr);
  projectUrl.value = '';

  self.port.emit('addProject', link.href);
}

var button = window.document.getElementById('add');
button.addEventListener('click', addNewProject, false);
