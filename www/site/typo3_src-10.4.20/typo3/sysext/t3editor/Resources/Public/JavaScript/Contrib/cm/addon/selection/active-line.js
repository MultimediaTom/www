!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}((function(e){"use strict";var t="CodeMirror-activeline-background";function i(e){for(var i=0;i<e.state.activeLines.length;i++)e.removeLineClass(e.state.activeLines[i],"wrap","CodeMirror-activeline"),e.removeLineClass(e.state.activeLines[i],"background",t),e.removeLineClass(e.state.activeLines[i],"gutter","CodeMirror-activeline-gutter")}function n(e,n){for(var r=[],o=0;o<n.length;o++){var a=n[o],s=e.getOption("styleActiveLine");if("object"==typeof s&&s.nonEmpty?a.anchor.line==a.head.line:a.empty()){var c=e.getLineHandleVisualStart(a.head.line);r[r.length-1]!=c&&r.push(c)}}(function(e,t){if(e.length!=t.length)return!1;for(var i=0;i<e.length;i++)if(e[i]!=t[i])return!1;return!0})(e.state.activeLines,r)||e.operation((function(){i(e);for(var n=0;n<r.length;n++)e.addLineClass(r[n],"wrap","CodeMirror-activeline"),e.addLineClass(r[n],"background",t),e.addLineClass(r[n],"gutter","CodeMirror-activeline-gutter");e.state.activeLines=r}))}function r(e,t){n(e,t.ranges)}e.defineOption("styleActiveLine",!1,(function(t,o,a){var s=a!=e.Init&&a;o!=s&&(s&&(t.off("beforeSelectionChange",r),i(t),delete t.state.activeLines),o&&(t.state.activeLines=[],n(t,t.listSelections()),t.on("beforeSelectionChange",r)))}))}));