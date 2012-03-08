var pageMod = require("page-mod")
  , widgets = require("widget")
  , panel = require("panel")
  , data = require("self").data;

exports.main = function(options, callbacks){
  pageMod.PageMod({
    include: "https://github.com/*",
    constentScriptWhen: 'ready',
    contentScriptFile: data.url("pageupdate.js"), 
  });

  var prefPanel = panel.Panel({
    height: 200,
    width: 350,
    contentURL: data.url("projects.html"),
  });

  widgets.Widget({
    id: "travis",
    label: "travis",
    contentURL: data.url("travis.png"),
    panel: prefPanel,
  });
};
