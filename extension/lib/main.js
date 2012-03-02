var pageMod = require("page-mod")
  , widgets = require("widget")
  , data = require("self").data;

exports.main = function(options, callbacks){
  pageMod.PageMod({
    include: "https://github.com/*",
    constentScriptWhen: 'ready',
    contentScriptFile: data.url("pageupdate.js"), 
  });

  widgets.Widget({
    id: "travis",
    label: "travis",
    contentURL: data.url("travis.png"),
  });
};
