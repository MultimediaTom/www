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
var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};define(["require","exports","jquery","nprogress","TYPO3/CMS/Backend/ActionButton/DeferredAction","TYPO3/CMS/Backend/Modal","TYPO3/CMS/Backend/Notification","TYPO3/CMS/Backend/Severity","TYPO3/CMS/Backend/Input/Clearable"],(function(e,t,a,s,l,n,i,r){"use strict";var d;a=__importDefault(a),s=__importDefault(s),function(e){e.searchForm="#recycler-form",e.searchText="#recycler-form [name=search-text]",e.searchSubmitBtn="#recycler-form button[type=submit]",e.depthSelector="#recycler-form [name=depth]",e.tableSelector="#recycler-form [name=pages]",e.recyclerTable="#itemsInRecycler",e.paginator="#recycler-index nav",e.reloadAction="a[data-action=reload]",e.massUndo="button[data-action=massundo]",e.massDelete="button[data-action=massdelete]",e.toggleAll=".t3js-toggle-all"}(d||(d={}));class o{constructor(){this.elements={},this.paging={currentPage:1,totalPages:1,totalItems:0,itemsPerPage:TYPO3.settings.Recycler.pagingSize},this.markedRecordsForMassAction=[],this.allToggled=!1,this.handleCheckboxSelects=e=>{const t=a.default(e.currentTarget),s=t.parents("tr"),l=s.data("table")+":"+s.data("uid");if(t.prop("checked"))this.markedRecordsForMassAction.push(l),s.addClass("warning");else{const e=this.markedRecordsForMassAction.indexOf(l);e>-1&&this.markedRecordsForMassAction.splice(e,1),s.removeClass("warning")}if(this.markedRecordsForMassAction.length>0){this.elements.$massUndo.hasClass("disabled")&&this.elements.$massUndo.removeClass("disabled").removeAttr("disabled"),this.elements.$massDelete.hasClass("disabled")&&this.elements.$massDelete.removeClass("disabled").removeAttr("disabled");const e=this.createMessage(TYPO3.lang["button.undoselected"],[this.markedRecordsForMassAction.length]),t=this.createMessage(TYPO3.lang["button.deleteselected"],[this.markedRecordsForMassAction.length]);this.elements.$massUndo.find("span.text").text(e),this.elements.$massDelete.find("span.text").text(t)}else this.resetMassActionButtons()},this.deleteRecord=e=>{if(TYPO3.settings.Recycler.deleteDisable)return;const t=a.default(e.currentTarget).parents("tr"),s="TBODY"!==t.parent().prop("tagName");let i,d;if(s)i=this.markedRecordsForMassAction,d=TYPO3.lang["modal.massdelete.text"];else{const e=t.data("uid"),a=t.data("table"),s=t.data("recordtitle");i=[a+":"+e],d="pages"===a?TYPO3.lang["modal.deletepage.text"]:TYPO3.lang["modal.deletecontent.text"],d=this.createMessage(d,[s,"["+i[0]+"]"])}n.confirm(TYPO3.lang["modal.delete.header"],d,r.error,[{text:TYPO3.lang["button.cancel"],btnClass:"btn-default",trigger:function(){n.dismiss()}},{text:TYPO3.lang["button.delete"],btnClass:"btn-danger",action:new l(()=>Promise.resolve(this.callAjaxAction("delete",i,s)))}])},this.undoRecord=e=>{const t=a.default(e.currentTarget).parents("tr"),s="TBODY"!==t.parent().prop("tagName");let i,d,o;if(s)i=this.markedRecordsForMassAction,d=TYPO3.lang["modal.massundo.text"],o=!0;else{const e=t.data("uid"),a=t.data("table"),s=t.data("recordtitle");i=[a+":"+e],o="pages"===a,d=o?TYPO3.lang["modal.undopage.text"]:TYPO3.lang["modal.undocontent.text"],d=this.createMessage(d,[s,"["+i[0]+"]"]),o&&t.data("parentDeleted")&&(d+=TYPO3.lang["modal.undo.parentpages"])}let c=null;c=o?a.default("<div />").append(a.default("<p />").text(d),a.default("<div />",{class:"checkbox"}).append(a.default("<label />").append(TYPO3.lang["modal.undo.recursive"]).prepend(a.default("<input />",{id:"undo-recursive",type:"checkbox"})))):a.default("<p />").text(d),n.confirm(TYPO3.lang["modal.undo.header"],c,r.ok,[{text:TYPO3.lang["button.cancel"],btnClass:"btn-default",trigger:function(){n.dismiss()}},{text:TYPO3.lang["button.undo"],btnClass:"btn-success",action:new l(()=>Promise.resolve(this.callAjaxAction("undo","object"==typeof i?i:[i],s,c.find("#undo-recursive").prop("checked"))))}])},a.default(()=>{this.initialize()})}static refreshPageTree(){top.TYPO3&&top.TYPO3.Backend&&top.TYPO3.Backend.NavigationContainer&&top.TYPO3.Backend.NavigationContainer.PageTree&&top.TYPO3.Backend.NavigationContainer.PageTree.refreshTree()}getElements(){this.elements={$searchForm:a.default(d.searchForm),$searchTextField:a.default(d.searchText),$searchSubmitBtn:a.default(d.searchSubmitBtn),$depthSelector:a.default(d.depthSelector),$tableSelector:a.default(d.tableSelector),$recyclerTable:a.default(d.recyclerTable),$tableBody:a.default(d.recyclerTable).find("tbody"),$paginator:a.default(d.paginator),$reloadAction:a.default(d.reloadAction),$massUndo:a.default(d.massUndo),$massDelete:a.default(d.massDelete),$toggleAll:a.default(d.toggleAll)}}registerEvents(){this.elements.$searchForm.on("submit",e=>{e.preventDefault(),""!==this.elements.$searchTextField.val()&&this.loadDeletedElements()}),this.elements.$searchTextField.on("keyup",e=>{""!==a.default(e.currentTarget).val()?this.elements.$searchSubmitBtn.removeClass("disabled"):(this.elements.$searchSubmitBtn.addClass("disabled"),this.loadDeletedElements())}),this.elements.$searchTextField.get(0).clearable({onClear:()=>{this.elements.$searchSubmitBtn.addClass("disabled"),this.loadDeletedElements()}}),this.elements.$depthSelector.on("change",()=>{a.default.when(this.loadAvailableTables()).done(()=>{this.loadDeletedElements()})}),this.elements.$tableSelector.on("change",()=>{this.paging.currentPage=1,this.loadDeletedElements()}),this.elements.$recyclerTable.on("click","[data-action=undo]",this.undoRecord),this.elements.$recyclerTable.on("click","[data-action=delete]",this.deleteRecord),this.elements.$reloadAction.on("click",e=>{e.preventDefault(),a.default.when(this.loadAvailableTables()).done(()=>{this.loadDeletedElements()})}),this.elements.$paginator.on("click","a[data-action]",e=>{e.preventDefault();const t=a.default(e.currentTarget);let s=!1;switch(t.data("action")){case"previous":this.paging.currentPage>1&&(this.paging.currentPage--,s=!0);break;case"next":this.paging.currentPage<this.paging.totalPages&&(this.paging.currentPage++,s=!0);break;case"page":this.paging.currentPage=parseInt(t.find("span").text(),10),s=!0}s&&this.loadDeletedElements()}),TYPO3.settings.Recycler.deleteDisable?this.elements.$massDelete.remove():this.elements.$massDelete.show(),this.elements.$recyclerTable.on("show.bs.collapse hide.bs.collapse","tr.collapse",e=>{let t,s,l=a.default(e.currentTarget).prev("tr").find("[data-action=expand]").find(".t3-icon");switch(e.type){case"show":t="t3-icon-pagetree-collapse",s="t3-icon-pagetree-expand";break;case"hide":t="t3-icon-pagetree-expand",s="t3-icon-pagetree-collapse"}l.removeClass(t).addClass(s)}),this.elements.$toggleAll.on("click",()=>{this.allToggled=!this.allToggled,a.default('input[type="checkbox"]').prop("checked",this.allToggled).trigger("change")}),this.elements.$recyclerTable.on("change","tr input[type=checkbox]",this.handleCheckboxSelects),this.elements.$massUndo.on("click",this.undoRecord),this.elements.$massDelete.on("click",this.deleteRecord)}initialize(){s.default.configure({parent:".module-loading-indicator",showSpinner:!1}),this.getElements(),this.registerEvents(),TYPO3.settings.Recycler.depthSelection>0?this.elements.$depthSelector.val(TYPO3.settings.Recycler.depthSelection).trigger("change"):a.default.when(this.loadAvailableTables()).done(()=>{this.loadDeletedElements()})}resetMassActionButtons(){this.markedRecordsForMassAction=[],this.elements.$massUndo.addClass("disabled").attr("disabled",!0),this.elements.$massUndo.find("span.text").text(TYPO3.lang["button.undo"]),this.elements.$massDelete.addClass("disabled").attr("disabled",!0),this.elements.$massDelete.find("span.text").text(TYPO3.lang["button.delete"])}loadAvailableTables(){return a.default.ajax({url:TYPO3.settings.ajaxUrls.recycler,dataType:"json",data:{action:"getTables",startUid:TYPO3.settings.Recycler.startUid,depth:this.elements.$depthSelector.find("option:selected").val()},beforeSend:()=>{s.default.start(),this.elements.$tableSelector.val(""),this.paging.currentPage=1},success:e=>{const t=[];this.elements.$tableSelector.children().remove(),a.default.each(e,(e,s)=>{const l=s[0],n=s[1],i=(s[2]?s[2]:TYPO3.lang.label_allrecordtypes)+" ("+n+")";t.push(a.default("<option />").val(l).text(i))}),t.length>0&&(this.elements.$tableSelector.append(t),""!==TYPO3.settings.Recycler.tableSelection&&this.elements.$tableSelector.val(TYPO3.settings.Recycler.tableSelection))},complete:()=>{s.default.done()}})}loadDeletedElements(){return a.default.ajax({url:TYPO3.settings.ajaxUrls.recycler,dataType:"json",data:{action:"getDeletedRecords",depth:this.elements.$depthSelector.find("option:selected").val(),startUid:TYPO3.settings.Recycler.startUid,table:this.elements.$tableSelector.find("option:selected").val(),filterTxt:this.elements.$searchTextField.val(),start:(this.paging.currentPage-1)*this.paging.itemsPerPage,limit:this.paging.itemsPerPage},beforeSend:()=>{s.default.start(),this.resetMassActionButtons()},success:e=>{this.elements.$tableBody.html(e.rows),this.buildPaginator(e.totalItems)},complete:()=>{s.default.done()}})}callAjaxAction(e,t,l,n=!1){let r={records:t,action:""},d=!1;if("undo"===e)r.action="undoRecords",r.recursive=n?1:0,d=!0;else{if("delete"!==e)return;r.action="deleteRecords"}return a.default.ajax({url:TYPO3.settings.ajaxUrls.recycler,type:"POST",dataType:"json",data:r,beforeSend:()=>{s.default.start()},success:e=>{e.success?i.success("",e.message):i.error("",e.message),this.paging.currentPage=1,a.default.when(this.loadAvailableTables()).done(()=>{this.loadDeletedElements(),l&&this.resetMassActionButtons(),d&&o.refreshPageTree(),this.allToggled=!1})},complete:()=>{s.default.done()}})}createMessage(e,t){return void 0===e?"":e.replace(/\{([0-9]+)\}/g,(function(e,a){return t[a]}))}buildPaginator(e){if(0===e)return void this.elements.$paginator.contents().remove();if(this.paging.totalItems=e,this.paging.totalPages=Math.ceil(e/this.paging.itemsPerPage),1===this.paging.totalPages)return void this.elements.$paginator.contents().remove();const t=a.default("<ul />",{class:"pagination pagination-block"}),s=[],l=a.default("<li />").append(a.default("<a />",{"data-action":"previous"}).append(a.default("<span />",{class:"t3-icon fa fa-arrow-left"}))),n=a.default("<li />").append(a.default("<a />",{"data-action":"next"}).append(a.default("<span />",{class:"t3-icon fa fa-arrow-right"})));1===this.paging.currentPage&&l.disablePagingAction(),this.paging.currentPage===this.paging.totalPages&&n.disablePagingAction();for(let e=1;e<=this.paging.totalPages;e++){const t=a.default("<li />",{class:this.paging.currentPage===e?"active":""});t.append(a.default("<a />",{"data-action":"page"}).append(a.default("<span />").text(e))),s.push(t)}t.append(l,s,n),this.elements.$paginator.html(t)}}return a.default.fn.disablePagingAction=function(){a.default(this).addClass("disabled").find(".t3-icon").unwrap().wrap(a.default("<span />"))},new o}));