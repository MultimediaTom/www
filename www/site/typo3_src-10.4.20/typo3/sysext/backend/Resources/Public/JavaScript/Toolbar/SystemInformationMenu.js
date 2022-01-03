/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};define(["require","exports","jquery","TYPO3/CMS/Core/Ajax/AjaxRequest","../Icons","../Storage/Persistent","../Viewport"],(function(e,t,o,n,r,a,s){"use strict";var i;o=__importDefault(o),function(e){e.containerSelector="#typo3-cms-backend-backend-toolbaritems-systeminformationtoolbaritem",e.toolbarIconSelector=".toolbar-item-icon .t3js-icon",e.menuContainerSelector=".dropdown-menu",e.moduleLinks=".t3js-systeminformation-module",e.counter=".t3js-systeminformation-counter"}(i||(i={}));class l{constructor(){this.timer=null,this.updateMenu=()=>{const e=o.default(i.toolbarIconSelector,i.containerSelector),t=e.clone(),a=o.default(i.containerSelector).find(i.menuContainerSelector);null!==this.timer&&(clearTimeout(this.timer),this.timer=null),r.getIcon("spinner-circle-light",r.sizes.small).then(t=>{e.replaceWith(t)}),new n(TYPO3.settings.ajaxUrls.systeminformation_render).get().then(async e=>{a.html(await e.resolve()),l.updateCounter(),o.default(i.moduleLinks).on("click",this.openModule)}).finally(()=>{o.default(i.toolbarIconSelector,i.containerSelector).replaceWith(t),this.timer=setTimeout(this.updateMenu,3e5)})},s.Topbar.Toolbar.registerEvent(this.updateMenu)}static updateCounter(){const e=o.default(i.containerSelector).find(i.menuContainerSelector).find(".t3js-systeminformation-container"),t=o.default(i.counter),n=e.data("count"),r=e.data("severityclass");t.text(n).toggle(parseInt(n,10)>0),t.removeClass(),t.addClass("t3js-systeminformation-counter toolbar-item-badge badge"),""!==r&&t.addClass(r)}openModule(e){e.preventDefault(),e.stopPropagation();let t={};const n={},r=o.default(e.currentTarget).data("modulename"),i=o.default(e.currentTarget).data("moduleparams"),l=Math.floor((new Date).getTime()/1e3);a.isset("systeminformation")&&(t=JSON.parse(a.get("systeminformation"))),n[r]={lastAccess:l},o.default.extend(!0,t,n);a.set("systeminformation",JSON.stringify(t)).done(()=>{TYPO3.ModuleMenu.App.showModule(r,i),s.Topbar.refresh()})}}return new l}));