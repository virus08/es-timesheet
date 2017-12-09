/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
/*
 Copyright 2013 jQuery Foundation and other contributors
 Released under the MIT license.
 http://jquery.org/license
*/
define(["ojs/ojcore","jquery","ojs/ojcomponentcore"],function(a,g){(function(){a.hb("oj.ojTrain",g.oj.baseComponent,{version:"1.0.0",defaultElement:"\x3cdiv\x3e",widgetEventPrefix:"oj",options:{steps:[],selected:"",selectedStep:"",beforeDeselect:null,deselect:null,beforeSelect:null,select:null},$l:0,Qc:null,qc:function(){this._super();this.qsa()},qsa:function(){var a=this.options,b=a.steps;this.$l=b.length;this.wn=g("\x3cdiv class\x3d'oj-train-wrapper'\x3e\x3c/div\x3e");this.wn.appendTo(this.element);
this.zQ=g("\x3cdiv class\x3d'oj-train-connector-wrapper'\x3e\x3c/div\x3e");this.zQ.appendTo(this.wn);var d=this.element.attr("class");(this.Nsa=null!=d&&0<=d.indexOf("oj-train-stretch"))&&this.zQ.css("padding","0 "+100/(2*this.$l)+"%");this.Pha=g("\x3cdiv class\x3d'oj-train-connector'\x3e\x3c/div\x3e");this.Pha.appendTo(this.zQ);this.Nh=g("\x3cul\x3e");this.Nh.addClass("oj-train-step-list");this.Z0=g("\x3cdiv class\x3d'oj-train-connector-fill'\x3e\x3c/div\x3e");this.Z0.appendTo(this.zQ);this.nYa();
this.qn=this.iE(a.selectedStep||a.selected);-1===this.qn&&b[0]&&b[0].id&&(this.qn=0,a.selectedStep=b[0].id,a.selected=b[0].id);for(a=0;a<this.$l;a++)b=g("\x3cli\x3e").addClass("oj-train-step-list-item").attr({id:this.Qc[a][1]}),d=this.Qc[a][4],"confirmation"===d?b.addClass("oj-confirmation"):"info"===d?b.addClass("oj-info"):"error"===d||"fatal"===d?b.addClass("oj-invalid"):"warning"===d&&b.addClass("oj-warning"),b.appendTo(this.Nh),this.vLa(a),this.yLa(a),this.uLa(a),this.tLa(a),this.zLa(a),this.wLa(a),
this.Nsa&&b.css("width",100/this.$l+"%");this.Z0.css({width:(this.$l-1===this.qn?100:100/(2*(this.$l-1))+this.qn/(this.$l-1)*100)+"%"});this.Nh.appendTo(this.wn);this.element.addClass("oj-train")},nYa:function(){var a=this.options;this.Qc=[];for(var b=0;b<this.$l;b++){var d=a.steps[b];this.Qc[b]=Array(5);this.Qc[b][0]=d.label?d.label:null;this.Qc[b][1]=d.id?d.id:null;this.Qc[b][2]=d.disabled?!0:!1;this.Qc[b][3]=d.visited?!0:!1;this.Qc[b][4]=d.messageType?d.messageType:null}},tLa:function(a){var b=
g("\x3cdiv/\x3e").addClass("oj-train-button"),d=g("\x3cspan/\x3e"),e=this,f="";if(this.Qc[a]){var h=this.Qc[a][3],k=this.Qc[a][2];this.qn===a?(b.addClass("oj-selected"),f=" current "):h&&!k?(b.addClass("oj-visited"),f=" visited "):h||k?b.addClass("oj-disabled"):(b.addClass("oj-default"),f=" not visited ");this.Qc[a][2]||this.qn===a||(this.xg(b),this.Cl(b),b.on("click"+this.eventNamespace,function(a){e.h2(this.parentNode.parentNode.id,a);e.refresh()}));h=this.Nh.children().eq(a).find(".oj-train-button-connector");
1<=h.length&&h.children().remove();h.append(b);d.text(f);d.addClass("oj-helper-hidden-accessible");this.Nh.children().eq(a).find("a").append(d)}},wLa:function(a){if(this.Qc[a]&&this.Qc[a][4]){var b=g("\x3cdiv/\x3e").addClass("oj-train-icon oj-component-icon").attr("aria-hidden","true"),d=g("\x3cspan/\x3e"),e="",f=this,h=this.Qc[a][4];"confirmation"===h?(b.addClass("oj-confirmation"),e=" Confirmation "):"info"===h?(b.addClass("oj-info"),e=" Info "):"error"===h?(b.addClass("oj-error"),e=" Error "):
"fatal"===h?(b.addClass("oj-error"),e=" Error "):"warning"===h&&(b.addClass("oj-warning"),e=" Warning ");var k=this.Nh.children().eq(a).find(".oj-train-button");2<=k.children().length&&k.children()[1].remove();if(!this.Qc[a][2]&&this.qn!==a)b.on("click"+this.eventNamespace,function(a){f.h2(this.parentNode.parentNode.parentNode.id,a);f.refresh()});null!=h&&(d.text(e),d.addClass("oj-helper-hidden-accessible"),this.Nh.children().eq(a).find("a").append(d),k.append(b))}},Nja:function(a,b,d){var e={fromStep:this.getStep(a),
toStep:this.getStep(b),optionMetadata:{writeback:d?"shouldWrite":"shouldNotWrite"}};!1!==this._trigger("beforeDeselect",d,e)&&!1!==this._trigger("beforeSelect",d,e)&&(a=this.iE(a),-1!==a&&(this.options.steps[a].visited=!0),this._trigger("deselect",d,e),this.options.selectedStep&&this.option("selectedStep",b,{_context:{originalEvent:d,mb:!0}}),this.options.selected&&this.option("selected",b,{_context:{originalEvent:d,mb:!0}}),this._trigger("select",d,e))},zLa:function(a){var b=g("\x3cdiv/\x3e").addClass("oj-train-button-text");
b.append((a+1).toString());this.Nh.children().eq(a).find(".oj-train-button").append(b)},uLa:function(a){if(a!=this.$l-1){var b=g("\x3cdiv/\x3e").addClass("oj-train-step-individual-connector");this.Nh.children().eq(a).prepend(b)}},yLa:function(a){var b=g("\x3cdiv/\x3e");b.addClass("oj-train-button-connector");this.Qc[a]&&(a<=this.qn&&b.addClass("oj-train-fill"),a=this.Nh.children().eq(a).children(),b.insertBefore(a))},vLa:function(a){var b=this;if(this.Qc[a]){var d=g("\x3cdiv/\x3e").addClass("oj-train-label-wrapper"),
e=g("\x3ca\x3e");e.text(this.Qc[a][0]);var f=this.Qc[a][2];d.append(e);e.addClass("oj-train-label");a===this.qn?e.addClass("oj-selected"):this.Qc[a][3]&&!f?e.addClass("oj-visited"):f&&e.addClass("oj-disabled");f||(e.attr("href","#"),this.xg(e),this.Cl(e),e.on("click keydown"+this.eventNamespace,function(a){if(a.keyCode===g.ui.keyCode.ENTER||"click"===a.type)a.preventDefault(),b.h2(this.parentNode.parentNode.id,a),b.refresh(),a.keyCode===g.ui.keyCode.ENTER&&b.rn(this.parentNode.parentNode.id)}));e=
this.Nh.children().eq(a).children();2<=e.length&&e[1].remove();this.Nh.children().eq(a).append(d)}},iE:function(a){for(var b=0;b<this.$l;b++)if(this.Qc[b]&&this.Qc[b][1]===a)return b;return-1},getStep:function(a){for(var b=0;b<this.$l;b++)if(this.Qc[b]&&this.Qc[b][1]===a)return g.extend({},this.options.steps[b]);return null},nextSelectableStep:function(){return this.getNextSelectableStep()},previousSelectableStep:function(){return this.getPreviousSelectableStep()},getNextSelectableStep:function(){for(var a=
this.iE(this.options.selectedStep||this.options.selected);a<this.$l;a++)if(a+1<this.$l&&this.Qc[a+1]&&!this.Qc[a+1][2])return this.Qc[a+1][1];return null},getPreviousSelectableStep:function(){for(var a=this.iE(this.options.selectedStep||this.options.selected);0<=a;a--)if(this.Qc[a-1]&&!this.Qc[a-1][2])return this.Qc[a-1][1];return null},setStep:function(a){a.id&&this.updateStep(a.id,a)},updateStep:function(a,b){if(a){var d=this.getStep(a),e=this.iE(a);-1!==e&&(e=this.options.steps[e],b.label&&(d[0]=
b.label,e.label=b.label),"string"===typeof b.id&&(d[1]=b.id,e.id=b.id),"boolean"===typeof b.disabled&&(d[2]=b.disabled,e.disabled=b.disabled),"boolean"===typeof b.visited&&(d[3]=b.visited,e.visited=b.visited),b.messageType&&(d[4]=b.messageType,e.messageType=b.messageType),this.refresh())}},_setOptions:function(a){this._super(a);this.refresh()},_setOption:function(a,b,d){("selectedStep"==a||"selected"==a)&&this.Qc&&this.Qc[this.qn]?b!=this.Qc[this.qn][1]&&this.Nja(this.Qc[this.qn][1],b,null):this._super(a,
b,d)},refresh:function(){this._super();this._destroy();this.qsa()},_destroy:function(){this.Nh.children().each(function(){g(this).remove()});this.element.removeClass("oj-train");this.element.find(".oj-train-wrapper").remove();this.element.find(".oj-train-connector-wrapper").remove();this.element.find(".oj-train-step-list").remove();this.element.find(".oj-train-step-list").remove();this._super()},h2:function(a,b){var d=this.Qc[this.qn][1];d!=a&&this.Nja(d,a,b)},rn:function(a){a=this.iE(a);this.Nh.children().eq(a).find(".oj-train-label").focus()},
getNodeBySubId:function(a){if(null===a)return this.element?this.element[0]:null;var b=a.index;if("number"!==typeof b||0>b||b>=this.$l)return null;switch(a.subId){case "oj-train-step":return this.Nh.children().eq(b)[0];case "oj-train-button":return this.Nh.children().eq(b).find(".oj-train-button")[0];case "oj-train-button-connector":return this.Nh.children().eq(b).find(".oj-train-button-connector")[0];case "oj-train-connector":return this.Pha;case "oj-train-connector-fill":return this.Z0;case "oj-train-icon":return this.Nh.children().eq(b).find(".oj-train-icon")[0];
case "oj-train-label":return this.Nh.children().eq(b).find(".oj-train-label")[0]}return null},getSubIdByNode:function(a){for(var b=this.Qc?this.Qc.length:0,d=0;d<b;d++){var e={subId:"oj-train-step",index:d};if(0<g(a).closest(this.getNodeBySubId(e)).length)return e}return null}})})();a.J.Ua("oj-train","baseComponent",{properties:{selectedStep:{type:"string",writeback:!0},steps:{type:"Array\x3cobject\x3e"}},methods:{getStep:{},getNextSelectableStep:{},getPreviousSelectableStep:{},updateStep:{}},extension:{Xa:"ojTrain"},
events:{select:{},deselect:{},beforeDeselect:{},beforeSelect:{}}});a.J.register("oj-train",{metadata:a.J.getMetadata("oj-train")})});