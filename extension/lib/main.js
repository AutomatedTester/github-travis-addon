"use strict";

var pageMod = require("page-mod")
  , widgets = require("widget")
  , panel = require("panel")
  , self = require("self")
  , prefs = require("api-utils/preferences-service");

const MODIFIED_PREFS_PREF = "extensions." + self.id + ".modifiedPrefs";
const TRAVIS_CI_PREF = "travis_ci.projects";


exports.main = function(options, callbacks){
  pageMod.PageMod({
    include: "https://github.com/*",
    constentScriptWhen: 'ready',
    contentScriptFile: self.data.url("pageupdate.js"), 
  });

  var prefPanel = panel.Panel({
    height: 200,
    width: 350,
    contentURL: self.data.url("projects.html"),
  });

  var widget = widgets.Widget({
    id: "travis",
    label: "travis",
    contentURL: self.data.url("travis.png"),
    panel: prefPanel,
  });

  prefPanel.port.on("addProject", function (url) {
    var travisPref = JSON.parse(prefs.get(TRAVIS_CI_PREF, "{}"));
    if (travisPref.sites === undefined){
      travisPref.sites = [];
    }
    travisPref.sites.push(url);
    prefs.set(TRAVIS_CI_PREF, JSON.stringify(travisPref));
  });
};

exports.onUnload = function(reason) {
  // Reset anything I touch!
  if (reason === 'disable' || reason === 'uninstall'){
    var modifiedPrefs = JSON.parse(prefs.get(MODIFIED_PREFS_PREF, "{}"));
    for (var pref in modifiedPrefs){
      prefs.set(pref, modifiedPrefs[pref]);
    }
    prefs.reset(MODIFIED_PREFS_PREF);
    prefs.reset(TRAVIS_CI_PREF);
  }
};
