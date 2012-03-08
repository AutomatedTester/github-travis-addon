var addNewProject = function(){
  var projectUrl = document.getElementById('projectUrl');
  var table = document.getElementById("currentProjects");
  var tr = document.createElement('tr');
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');
  var project = projectUrl.value.split('/').splice(3,4).join('/');
  var img = document.createElement('img');
  var text = document.createTextNode(project);

  img.setAttribute('src', 'https://secure.travis-ci.org/' + project + '.png');
  img.setAttribute('alt', 'build status');
                             
  /* Create the link element. */
  var link = window.document.createElement('a');
  link.href = projectUrl.value;
  link.appendChild(text); 

  td2.appendChild(img);
  td1.appendChild(link);
  tr.appendChild(td1);
  tr.appendChild(td2);

  table.appendChild(tr);
}
var button = window.document.getElementById('add');
button.addEventListener('click', addNewProject, false);
