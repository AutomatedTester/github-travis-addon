var buildUI = function (prefs) {
  if (prefs == null){
    prefs  = document.getElementById('projectUrl').value;
    document.getElementById('projectUrl').value = '';
  }

  var table = document.getElementById("currentProjects");
  var project = prefs.split('/').splice(3,4).join('/');

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
  link.href = prefs;
  var text = document.createTextNode(project);
  link.appendChild(text); 

  /* Insert items into cells and then into the row */
  td1.appendChild(link);
  td2.appendChild(img);

  tr.appendChild(td1);
  tr.appendChild(td2);

  /* Insert table row onto the page and cleanup */
  table.appendChild(tr);

  var insertProjects = window.document.getElementById('insertProjects');
  insertProjects.style.display = 'none';
  
  return link.href;
}

var addNewProject = function () {
  var link = buildUI();
  self.port.emit('addProject', link);
};

self.port.on("show", function (data) {
  if (!data.hasOwnProperty("sites")){
    return;
  }
  data.sites.forEach(function (site){
    buildUI(site);
  });
});

self.port.on("hide", function () {
  var insertProjects = window.document.getElementById('insertProjects');
  insertProjects.style.display = 'none';
});

var button = window.document.getElementById('addProject');
button.addEventListener('click', addNewProject, false);

var showAddProject = function () {
  var insertProjects = window.document.getElementById('insertProjects');
  insertProjects.style.display = 'block';
}

var add = window.document.getElementById('add');
add.addEventListener('click', showAddProject, false);

var clearInput = function(){
  var input = window.document.getElementById("projectUrl");
  input.value = '';
}

var populateInput = function(){
  var input = window.document.getElementById("projectUrl");
  if (input.value == ''){
    input.value = 'https://github.com/travis-ci/travis-ci';
  }
}

var input = window.document.getElementById("projectUrl");
input.addEventListener('focus', clearInput, true);
input.addEventListener('blur', populateInput, true);
