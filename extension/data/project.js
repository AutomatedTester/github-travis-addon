var sites = [];


var buildUI = function (prefs) {
  console.log("buildUI called with prefs: " + prefs);
  if (prefs == null){
    prefs  = document.getElementById('projectUrl').value;
    sites.push(prefs);
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
  var travisURL = 'https://travis-ci.org/' + project 
  img.setAttribute('src', travisURL + '.png');
  img.setAttribute('alt', 'build status');
  
  /* Create the link element and populate */
  var travisLink = window.document.createElement('a');
  travisLink.href = travisURL;
  travisLink.appendChild(img); 
                             
  /* Create the link element and populate */
  var link = window.document.createElement('a');
  link.href = prefs;
  var text = document.createTextNode(project);
  link.appendChild(text); 

  /* Insert items into cells and then into the row */
  td1.appendChild(link);
  td2.appendChild(travisLink);

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
  
  sites = data.sites;

  sites.forEach(function (site){
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
window.document.addEventListener('click', function(event) {
  var t = event.target;
  if (t.nodeName == 'A' || t.nodeName == 'IMG'){
    event.preventDefault();
    var url = '';
    if (t.nodeName == 'A'){
      url = t.toString();
    } else {
      url = t.src.toString().substring(0, t.src.toString().length - 4);
    }
    self.port.emit('clickLink', url);
    return false;
  }
  return false;
}, false);

var rebuildUI = function(sites){
  var oldTable = document.getElementById("currentProjects");
  var tableParent = oldTable.parentNode;

  var table = document.createElement('table');
  table.id = 'currentProjects';
  
  tableParent.removeChild(oldTable);
  tableParent.appendChild(table);

  sites.forEach(function (site){
    buildUI(site);
  });
}


var reloadInterval = window.setInterval(rebuildUI, 1000*60*5, sites);
