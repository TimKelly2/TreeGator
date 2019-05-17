var testGator;
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// ECMAScript 2015

"use strict"
//line 726  Hop 38 has "html" which has the html and "flatHtml" which also has the html.
//What is the difference?  "html" includes the Relation from dimension2 to dimension3. "flatHtml" removes that information.
//OK. Hop39 changes "html"     "complex" 
//              "flatHtml"   "simple" 
//              "selecHtml"  "discoverRelation"
//              "parameter"  "dimension"
//
//new function Array.from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
//new function Array.concat https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
class Hop40 {
	constructor(html, dimension, selector ){
		if(selector == undefined){
			this.selector = "[dizid="+ dimension +"]";
		}else {
			this.selector = selector;
		}
		this.dimension = dimension;
		this.complex =  this.discoverRelation(html);
		this.simple   = this.simplifyRelation(this.complex);
	}
	discoverRelation(html){
		if (Array.isArray(html) ){
			var complexRelation = html;
			return complexRelation.map( (simplerRelation) => this.discoverRelation(simplerRelation));
		} else if(html instanceof Element){
			var simpleRelation = html;
			return Array.from(simpleRelation.querySelectorAll(this.selector));
		}
	}
	simplifyRelation(html){
		if (Array.isArray(html) ){
			var complexRelation = html;
			var simplerRelation = [];
			complexRelation.forEach((member) =>{
				if(Array.isArray(member)){
					var complexMember= member;
					simplerRelation = simplerRelation.concat(this.simplifyRelation(complexMember));
				}else { 
					var simpleMember = member;
					simplerRelation.push(simpleMember);
				}
			});
			return simplerRelation;
			
		} else {
			var noRelationExceptSelf = html; 
			return [noRelationExceptSelf];
		}
	}
}

//line TestDizzy4.js 726  Hop 38 has "html" which has the html and "flatHtml" which also has the html.
//What is the difference?  "html" includes the Relation from dimension2 to dimension3. "flatHtml" removes that information.
//changes            Hop38   Hop40                   Hop50 
//                "html"   "complex"               complexHtml
//            "flatHtml"   "simple"                simpleHtml  
//            "selecHtml"  "discoverRelation"      describeRelation
//            "parameter"  "dimension"             dimension
//                         simplifyRelation        simplifyRelation
//                         simplerRelation         simplerHtml
//                         member                  element
//                         complexMember           complexElement
//                         simpleMember            simpleElement

//
//new function Array.from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
//new function Array.concat https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
class Hop50 {
	constructor(html, dimension, selector ){
		if(selector == undefined){
			this.selector = "[dizid="+ dimension +"]";
		}else {
			this.selector = selector;
		}
		this.dimension = dimension;
		this.complexHtml =  this.describeRelation(html);
		this.simpleHtml   = this.simplifyRelation(this.complexHtml);
	}
	describeRelation(html){
		if (Array.isArray(html) ){
			var complexRelation = html;
			return complexRelation.map( (simplerRelation) => this.describeRelation(simplerRelation));
		} else if(html instanceof Element){
			var simpleRelation = html;
			return Array.from(simpleRelation.querySelectorAll(this.selector));
		}
	}
	
	simplifyRelation(html){
		if (Array.isArray(html) ){
			var complexHtml = html;
			var simplerHtml = [];
			complexHtml.forEach((element) =>{
				if(Array.isArray(element)){
					var complexElement= element;
					simplerHtml = simplerHtml.concat(this.simplifyRelation(complexElement));
				}else { 
					var simpleElement = element;
					simplerHtml.push(simpleMember);
				}
			});
			return simplerHtml;			
		} else {
			var noRelationExceptSelf = html; 
			return [noRelationExceptSelf];
		}
	}
}

// See TestDizzy3 test 21- 27
var test21Title = "test21: 'Null Test' says that an empty object template and with no html parameters produces an empty string"
	function test21() {
		 expect(tester.diz(null, null)).toBe("");
	}

class TreeGator51 {
	diz(){
		return "";
	}
}


var test22Title = "test22 'Single Element, Single String' says that a  <span>arrow</span> +  'target' ==> 'arrow' ";

function test22() {
     var arrow  = document.createElement('span');
     arrow.innerHTML = 'arrow';
     var result = tester.diz("target", arrow);
	 expect(result).toBe("arrow");
	 tester.diz(arrow, "arrow2");
	 expect(arrow.innerHTML).toEqual( 'arrow2');
}


class TreeGator52  {
	 constructor(){
		 this.dizid = "dizid=";
	 }
	 
	 diz(target, ... arrows){
		if(target == null || arrows.length == 0){
			return '';
		} 
		var result = '';
		if(target instanceof NodeList || target instanceof Element){
			arrows.forEach((arrow) => {result = this.dizHtmlParameter(target, arrow);});
		}else if(arrows[0] instanceof Element || arrows[0] instanceof NodeList){
			arrows.forEach((arrow) => {result = this.dizParameterHtml(target, arrow);});
		}
		return result;
	}
	dizParameterHtml(parameter, html){
		return html.innerText;
	}
	dizHtmlParameter(html, parameter){	
		html.innerText = parameter;
		
		
	}
}
var test23Title = "test23 'Double Element, Single String' says that a  <span>arrow</span><span>arrow</span> +  'target' ==> 'arrow' ";

function test23() {
     var div  = document.createElement('div');
     div.innerHTML = '<span>arrow</span><span>arrow</span>';
     var arrows = div.querySelectorAll("span");
     var result = tester.diz("target", arrows);
	 expect(result).toBe("arrow");
}
class TreeGator53  {
	 constructor(){
		 this.dizid = "dizid=";
	 }
	 
	 diz(target, ... arrows){
		if(target == null || arrows.length == 0){
			return '';
		} 
		var result = '';
		if(target instanceof NodeList || target instanceof Element){
			arrows.forEach((arrow) => {result = this.dizHtmlParameter(target, arrow);});
		}else if(arrows[0] instanceof Element || arrows[0] instanceof NodeList){
			arrows.forEach((arrow) => {result = this.dizParameterHtml(target, arrow);});
		}
		return result;
	}
	dizParameterHtml(parameter, html){
		var hop = new Hop51(html,"", "");
		return hop.simpleHtml[0].innerText;
	}
	dizHtmlParameter(html, parameter){	
		var hops 
		html.innerText = parameter;
		
		
	}
}

var test24Title = "test24 'HTML Tree ,Object' says <span dizid=firstName>Dizzy</span> {firstName: } ==> Dizzy  "
	function test24() {
	     var div  = document.createElement('div');
	     div.innerHTML = '<span dizid=firstName>Dizzy</span>';
	     var target = {firstName: 'no one'}; 
	     tester.diz(target,div);
		 expect(target.firstName).toBe("Dizzy");
	}


class TreeGator54  {
	 constructor(){
		 this.dizid = "dizid=";
	 }
	 
	 diz(target, ... arrows){
		if(target == null || arrows.length == 0){
			return '';
		} 
		var result = '';
		if(target instanceof NodeList || target instanceof Element){
			arrows.forEach((arrow) => {result = this.dizHtmlParameter(target, arrow);});
		}else if(arrows[0] instanceof Element || arrows[0] instanceof NodeList){
			arrows.forEach((arrow) => {result = this.dizParameterHtml(target, arrow);});
		}
		return result;
	}
	dizParameterHtml(parameter, html){
		if(typeof parameter == "object"  ){
			for(var member in parameter ){
				//TODO1: do not query for elements in template
				//TODO2: test objects as well as simple strings
				// var list = html.querySelectorAll(":not(template)>:not(template)["+this.dizid +member +"]");
				// parameter[member] = this.dizParameterHtml(parameter[member], list);
				var hop = new Hop51(html,member);
				parameter[member] = hop.simpleHtml[0].innerText;
			}
			return parameter;
	    } else {
		    var hop = new Hop51(html,"", "");
		    return hop.simpleHtml[0].innerText;
	    }
	}
	dizHtmlParameter(html, parameter){	
		var hops 
		html.innerText = parameter;
		
		
	}
}

class Hop51 {
	constructor(html, dimension, selector ){
		if(selector == undefined){
			this.selector = "[dizid="+ dimension +"]";
		}else {
			this.selector = selector;
		}
		this.dimension = dimension;
		this.complexHtml =  this.describeRelation(html);
		this.simpleHtml   = this.simplifyRelation(this.complexHtml);
	}
	describeRelation(html){
		if (Array.isArray(html) ){
			var complexHtml = html;
			return complexHtml.map( (simplerHtml) => this.describeRelation(simplerHtml));
		} else if(html instanceof Element){
			var simpleHtml = html;
			return (this.selector == "") ? simpleHtml 
				:  Array.from(simpleHtml.querySelectorAll(this.selector));
		} else if(html instanceof NodeList){
			var complexHtml = Array.from(html);
			return this.describeRelation(complexHtml);
		}
	}
	
	simplifyRelation(html){
		if (Array.isArray(html) ){
			var complexHtml = html;
			var simplerHtml = [];
			complexHtml.forEach((element) =>{
				if(Array.isArray(element)){
					var complexElement= element;
					simplerHtml = simplerHtml.concat(this.simplifyRelation(complexElement));
				}else { 
					var simpleElement = element;
					simplerHtml.push(simpleElement);
				}
			});
			return simplerHtml;			
		} else {
			var noRelationExceptSelf = html; 
			return [noRelationExceptSelf];
		}
	}
}

var test25Title = "test25 'Multiple Elements, Array' says that a <span>Hello</span><span>Goodbye</span> + []  ==> ['Hello', 'GoodBye'] "
	function test25() {
	     var div  = document.createElement('div');
	     var span = document.createElement('span');
	     div.appendChild(span);
	     var arrow = ["Hello","Goodbye"]
	     tester.diz(span,["Hello","Goodbye"]);
		 expect(div.innerHTML).toBe("<span>Hello</span><span>Goodbye</span>");
	     var target2 = [];
	     tester.diz(target2, div.querySelectorAll('span'));
	     expect(target2).toEqual(arrow);
	     
	}


class Hop55 {
	constructor(html, dimension, selector ){
		if(selector == undefined){
			this.selector = "[dizid="+ dimension +"]";
		}else {
			this.selector = selector;
		}
		this.dimension = dimension;
		this.complexHtml  = this.describeRelation(html);
		this.simpleHtml   = this.simplifyRelation(this.complexHtml);
		this.setsOfTwins  = this.twinRelation();
	}
	describeRelation(html){
		if (Array.isArray(html) ){
			var complexHtml = html;
			return complexHtml.map( (simplerHtml) => this.describeRelation(simplerHtml));
		} else if(html instanceof Element){
			var simpleHtml = html;
			return (this.selector == "") ? simpleHtml 
				:  Array.from(simpleHtml.querySelectorAll(this.selector));
		} else if(html instanceof NodeList){
			var complexHtml = Array.from(html);
			return this.describeRelation(complexHtml);
		}
	}
	
	simplifyRelation(html){
		if (Array.isArray(html) ){
			var complexHtml = html;
			var simplerHtml = [];
			complexHtml.forEach((element) =>{
				if(Array.isArray(element)){
					var complexElement= element;
					simplerHtml = simplerHtml.concat(this.simplifyRelation(complexElement));
				}else { 
					var simpleElement = element;
					simplerHtml.push(simpleElement);
				}
			});
			return simplerHtml;			
		} else {
			var noRelationExceptSelf = html; 
			return [noRelationExceptSelf];
		}
	}
    twinRelation(){
    	var nodeList = this.simpleHtml;
		var setsOfTwins =[];
		// build sets of twins
		for(var i = 0; i < nodeList.length; i++  ){
			var node = nodeList[i];
			var isMatchingTwin = false;
			for(var j = 0; j< setsOfTwins.length && isMatchingTwin == false; j++){
				var twins = setsOfTwins[j];
				var firstTwin = twins[0];
				if(node.tagName == firstTwin.tagName && node.parentElement == firstTwin.parentElement  ){
					twins.push(node);
					isMatchingTwin = true;
				}
			}
			if(isMatchingTwin == false){
				setsOfTwins.push([node]);
			}
		}
		return setsOfTwins;
    }
}


class TreeGator55  {
	 constructor(){
		 this.dizid = "dizid=";
	 }
	 
	 diz(target, ... arrows){
		if(target == null || arrows.length == 0){
			return '';
		} 
		var result = '';
		if(target instanceof NodeList || target instanceof Element){
			arrows.forEach((arrow) => {result = this.dizHtmlParameter(target, arrow);});
		}else if(arrows[0] instanceof Element || arrows[0] instanceof NodeList){
			arrows.forEach((arrow) => {result = this.dizParameterHtml(target, arrow);});
		}
		return result;
	}
	 
	dizParameterHtml(parameter, html){
		if (Array.isArray(parameter)){
	    	var parameters = parameter;
	    	var hop = new Hop55(html,"","");
	    	if(hop.setsOfTwins.length == 1){
		    	var twins = hop.setsOfTwins[0];
		    	this.setParameterLength(parameters,twins.length);
		    	for(var i = 0; i< parameters.length; i ++){
		    		parameter[i] = twins[i].innerText;
		    	}
	    	}
	    } else if(typeof parameter == "object"  ){
			for(var member in parameter ){
				//TODO1: do not query for elements in template
				//TODO2: test objects as well as simple strings
				// var list = html.querySelectorAll(":not(template)>:not(template)["+this.dizid +member +"]");
				// parameter[member] = this.dizParameterHtml(parameter[member], list);
				var hop = new Hop55(html,member);
		    	if(hop.setsOfTwins.length == 1){
				    parameter[member] = hop.simpleHtml[0].innerText;
		    	}
			}
			return parameter;
	    } else {
		    var hop = new Hop55(html,"", "");
		    return hop.simpleHtml[0].innerText;
	    }
	}
	dizHtmlParameter(html, parameter){	
		if(Array.isArray(parameter)) {
			var hop = new Hop55(html,"","");
			for(var k = 0; k < hop.setsOfTwins.length; k++){
				var twins = hop.setsOfTwins[k];
				this.setTwinsLength(twins, parameter.length);
			    for(var l = 0; l < parameter.length; l++){
			    	this.dizHtmlParameter(twins[l],parameter[l]);
			    }
			}			
		} else {
			html.innerText = parameter;
		}
	}
	setTwinsLength(twins, length){
		if(length == 0){
			// if we are erasing all twins, then hide the first one in a template Element.
	        var twin = twins.pop();
	        var parentElement = twin.parentElement;
	        var htmlTemplate =  document.createElement('template');
			parentElement.insertBefore(htmlTemplate, twin);
	        parentElement.removeChild(twin);
	        htmlTemplate.appendChild(twin);
	    }
		while(twins.length > length){
	    	var lastTwin = twins.pop();
	    	lastTwin.parentElement.removeChild(lastTwin);
	    }
	    var firstTwin = twins[0];
	    if(/*firstTwin.parentElement != null && twins.length == 1 &&*/ length > 0 && firstTwin.parentElement.tagName == "TEMPLATE" ){
	    	// show twin. (unhide)
	    	var parent = firstTwin.parentElement;
	    	var grandparent = parent.parentElement;
	    	if(grandparent != null){
	    		grandparent.insertBefore(firstTwin,parent);  // interesting: for a moment twin and parent become siblings.
	    		grandparent.removeChild(parent);
	    	}
	    }
	    var lastTwin = twins[twins.length - 1];
	    while(twins.length < length){
	    	var clone = firstTwin.cloneNode(true);
	    	lastTwin.insertAdjacentElement("afterend",clone);
	    	twins.push(clone);
	    	lastTwin = clone;
	    }
	}
	setParameterLength(parameters, length){
		var clone0 = () => { return Object.assign({},parameters[0])};
		var noClone= () => {return ''}; 
		var cloneSomething = parameters.length > 0?  clone0 : noClone;
		while(parameters.length < length){
			parameters.push(cloneSomething());	
		}
		while(parameters.length > length){
			parameters.pop();	
		}
	}
}

var test26Title = "test26 'Add 3 Players, and query 3 Players"
	function test26() {
	    var div  = document.createElement('div');
	    div.innerHTML = '<div dizid=players><span dizid=firstName></span></div>';
	    var dizzy = {firstName: 'Dizzy'};
	    var paul = {firstName: 'Paul'};
	    var joe  = {firstName: 'Joe'};

	    tester.diz(div,{players:[dizzy]} );
	    expect(div.innerHTML.toString()).toBe('<div dizid="players"><span dizid="firstName">Dizzy</span></div>');
	    tester.diz(div,{players:[dizzy,paul]} );
	    expect(div.innerHTML.toString()).toBe('<div dizid="players"><span dizid="firstName">Dizzy</span></div><div dizid="players"><span dizid="firstName">Paul</span></div>');

	    tester.diz(div,{players:[dizzy,paul,joe]} );
	    expect(div.innerHTML.toString()).toBe('<div dizid="players"><span dizid="firstName">Dizzy</span></div><div dizid="players"><span dizid="firstName">Paul</span></div><div dizid="players"><span dizid="firstName">Joe</span></div>');
        
	    var players = {players : [{firstName: ''}]}; // [{firstName: ''}]
	    tester.diz(players, div);
	    expect(players).toEqual({players: [dizzy, paul, joe]});
	    // Now remove paul and joe from document
	    tester.diz(div,{players:[dizzy]} );
	    tester.diz(players, div); // update javascript
	    expect(players).toEqual({players: [dizzy]});
	}
class TreeGator56  {
	 constructor(){
		 this.dizid = "dizid=";
	 }
	 
	 diz(target, ... arrows){
		if(target == null || arrows.length == 0){
			return '';
		} 
		var result = '';
		if(target instanceof NodeList || target instanceof Element){
			arrows.forEach((arrow) => {result = this.dizHtmlParameter(target, arrow);});
		}else if(arrows[0] instanceof Element || arrows[0] instanceof NodeList){
			arrows.forEach((arrow) => {result = this.dizParameterHtml(target, arrow);});
		}
		return result;
	}

	 
	dizParameterHtml(parameter, html){
		if (Array.isArray(parameter)){
	    	var parameters = parameter;
	    	var hop = new Hop55(html,"","","["+this.dizid +member +"]");
	    	if(hop.setsOfTwins.length == 1){
		    	var twins = hop.setsOfTwins[0];
		    	this.setParameterLength(parameters,twins.length);
		    	for(var i = 0; i< parameters.length; i ++){
		    		parameter[i] = this.dizParameterHtml(parameter[i],twins[i]);   // todo create unit test for dizParameterHtml(twins[i])
		    	}
	    	}
	    	return parameter;
	    } else if(typeof parameter == "object"  ){
			for(var member in parameter ){
				//TODO1: do not query for elements in template
				//TODO2: test objects as well as simple strings
				// var list = html.querySelectorAll(":not(template)>:not(template)["+this.dizid +member +"]");
				// parameter[member] = this.dizParameterHtml(parameter[member], list);
				var hop = new Hop55(html,member,":not(template)>:not(template)["+this.dizid +member +"]"); // "["+this.dizid +member +"]"
		    	if(hop.setsOfTwins.length == 1){
				    parameter[member] = this.dizParameterHtml(parameter[member],hop.setsOfTwins[0]);  
		    	}else {
		    		console.log("Error: " +parameter+ " has "+ hop.setsOfTwins.length + " sets of twins" )
		    	}
			}
			return parameter;
	    } else {
		    var hop = new Hop55(html,"", "");
		    if(hop.simpleHtml.length == 1){
		        return hop.simpleHtml[0].innerText;
		    }
		    return hop.simpleHtml.map((h) => h.innerText);
	    }
	}
	
	dizHtmlParameter(html, parameter){	
		if(Array.isArray(parameter)) {
			var hop = new Hop55(html,"","");
			for(var k = 0; k < hop.setsOfTwins.length; k++){
				var twins = hop.setsOfTwins[k];
				this.setTwinsLength(twins, parameter.length);
			    for(var l = 0; l < parameter.length; l++){
			    	var simplerParameter = parameter[l];
			    	this.dizHtmlParameter(twins[l],simplerParameter);
			    }
			}			
		} else if(typeof parameter == "object"  ){
			for(var member in parameter ){
				var simplerParameter = parameter[member];
				var hop = new Hop55(html,member,"["+this.dizid +member +"]");
				for(var k = 0; k < hop.setsOfTwins.length; k++){
					var twins = hop.setsOfTwins[k];
					this.dizHtmlParameter(twins,simplerParameter )
				}
			}
		} else if(Array.isArray(html)){
			html.forEach((simplerHtml)=> this.dizHtmlParameter(simplerHtml,parameter));
			
		} else {
			html.innerText = parameter;
		}
	}
	
	setTwinsLength(twins, length){
		if(length == 0){
			// if we are erasing all twins, then hide the first one in a template Element.
	        var twin = twins.pop();
	        var parentElement = twin.parentElement;
	        var htmlTemplate =  document.createElement('template');
			parentElement.insertBefore(htmlTemplate, twin);
	        parentElement.removeChild(twin);
	        htmlTemplate.appendChild(twin);
	    }
		while(twins.length > length){
	    	var lastTwin = twins.pop();
	    	lastTwin.parentElement.removeChild(lastTwin);
	    }
	    var firstTwin = twins[0];
	    if(/*firstTwin.parentElement != null && twins.length == 1 &&*/ length > 0 && firstTwin.parentElement.tagName == "TEMPLATE" ){
	    	// show twin. (unhide)
	    	var parent = firstTwin.parentElement;
	    	var grandparent = parent.parentElement;
	    	if(grandparent != null){
	    		grandparent.insertBefore(firstTwin,parent);  // interesting: for a moment twin and parent become siblings.
	    		grandparent.removeChild(parent);
	    	}
	    }
	    var lastTwin = twins[twins.length - 1];
	    while(twins.length < length){
	    	var clone = firstTwin.cloneNode(true);
	    	lastTwin.insertAdjacentElement("afterend",clone);
	    	twins.push(clone);
	    	lastTwin = clone;
	    }
	}
	setParameterLength(parameters, length){
		var clone0 = () => { return Object.assign({},parameters[0])};
		var noClone= () => {return ''}; 
		var cloneSomething = parameters.length > 0?  clone0 : noClone;
		while(parameters.length < length){
			parameters.push(cloneSomething());	
		}
		while(parameters.length > length){
			parameters.pop();	
		}
	}
}
var test27Title = "test27 Test Array/objects"
	function test27() {
	    // arrays of strings     <table> <tr> <td>        ['apple', 'banana']
	    // arrays of objects
	    // objects with arrays
	    // <span>arrow</span> +  'target' ==> 'arrow' ";
	    // <span><span> +  'Hello World' ==> <span>Hello World</span><span>Hello World</span> 
	    // <span dizid=firstName/> {firstName: Dizzy} ==> <span dizid=firstName>Dizzy</span> 
	    //  <span> +  ['Hello', 'GoodBye'] ==> <span>Hello</span><span>Goodbye</span>
	
	var team ={
		//teamName : "Cardinals",
		players: [{ firstName : 'Dizzy', position : "pitcher"},{ firstName : 'Paul', position : "pitcher"},{ firstName : 'Joe', position : "shortstop"}]
	};
	var div  = document.createElement('div');
    div.innerHTML = '<div dizid=players><div name="rowdiv"> <span dizid=firstName>iFirst</span> <span dizid=position>ipos</span> </div> </div>';
	// unnamed div.
    tester.diz(div, team);

   // expect(div.innerHTML).toEqual('<div dizid="players"><div name="rowdiv"> <span dizid="firstName">Dizzy</span> <span dizid="position">pitcher</span> </div> </div>');

    var teamQuery = {
    	players:[{firstName:'', position:''}]
    }
    tester.diz(teamQuery,div);

    expect(teamQuery).toEqual(team);
	
}

/* Twins can be found under TEMPLATE.
 * 
 * 
 */
class Hop56 {
	constructor(html, dimension, selector ){
		if(selector == undefined){
			this.selector = "[dizid="+ dimension +"]";
		}else {
			this.selector = selector;
		}
		this.dimension = dimension;
		this.complexHtml  = this.describeRelation(html);
		this.simpleHtml   = this.simplifyRelation(this.complexHtml);
		this.setsOfTwins  = this.twinRelation();
	}
	describeRelation(html){
		if (Array.isArray(html) ){
			var complexHtml = html;
			return complexHtml.map( (simplerHtml) => this.describeRelation(simplerHtml));
		} else if(html instanceof Element){
			var simpleHtml = html;
			return (this.selector == "") ? simpleHtml 
				:  Array.from(simpleHtml.querySelectorAll(this.selector));
		} else if(html instanceof NodeList){
			var complexHtml = Array.from(html);
			return this.describeRelation(complexHtml);
		}
	}
	
	simplifyRelation(html){
		if (Array.isArray(html) ){
			var complexHtml = html;
			var simplerHtml = [];
			complexHtml.forEach((element) =>{
				if(Array.isArray(element)){
					var complexElement= element;
					simplerHtml = simplerHtml.concat(this.simplifyRelation(complexElement));
				}else { 
					var simpleElement = element;
					simplerHtml.push(simpleElement);
				}
			});
			return simplerHtml;			
		} else {
			var noRelationExceptSelf = html; 
			return [noRelationExceptSelf];
		}
	}
	realParent(html){
		if(html && html.parentElement) {
			return (html.parentElement.tagName != "TEMPLATE") ? html.parentElement : html.parentElement.parentElement;
		}
		return null;
	}
    twinRelation(){
    	var nodeList = this.simpleHtml;
		var setsOfTwins =[];
		// build sets of twins
		for(var i = 0; i < nodeList.length; i++  ){
			var node = nodeList[i];
			var isMatchingTwin = false;
			for(var j = 0; j< setsOfTwins.length && isMatchingTwin == false; j++){
				var twins = setsOfTwins[j];
				var firstTwin = twins[0];
				if(node.tagName == firstTwin.tagName && this.realParent(node) == this.realParent(firstTwin)  ){
					twins.push(node);
					isMatchingTwin = true;
				}
			}
			if(isMatchingTwin == false){
				setsOfTwins.push([node]);
			}
		}
		return setsOfTwins;
    }
}
class TreeGator57  {
	 constructor(){
		 this.dizid = "dizid=";
	 }
	 
	 diz(target, ... arrows){
		if(target == null || arrows.length == 0){
			return '';
		} 
		var result = '';
		if(target instanceof NodeList || target instanceof Element){
			arrows.forEach((arrow) => {result = this.dizHtmlParameter(target, arrow);});
		}else if(arrows[0] instanceof Element || arrows[0] instanceof NodeList){
			arrows.forEach((arrow) => {result = this.dizParameterHtml(target, arrow);});
		}
		return result;
	}
	dizParameterArrayHtml(parameters, hop){
		if(hop.setsOfTwins.length == 1){
	    	var twins = hop.setsOfTwins[0];
	    	this.setParameterLength(parameters,twins.length);
	    	for(var i = 0; i< parameters.length; i ++){
	    		parameters[i] = this.dizParameterHtml(parameters[i],twins[i]);   // todo create unit test for dizParameterHtml(twins[i])
	    	}
    	}
    	return parameters;		
	}
	buildHop(html,parameter, member, settingHtml){
		if(settingHtml){
			return new Hop56(html, member,"["+this.dizid +member +"]");
		}else {
			return new Hop56(html, member,":not(template)>:not(template)["+this.dizid +member +"]");
		}
	}
	
	dizParameterObjectHtml(parameter, html){
		for(var member in parameter ){
			//TODO1: do not query for elements in template
			//TODO2: test objects as well as simple strings
			// var list = html.querySelectorAll(":not(template)>:not(template)["+this.dizid +member +"]");
			// parameter[member] = this.dizParameterHtml(parameter[member], list);

//			var selector = this.getSelector(html,parameter, member, false);
//			var hop = new Hop56(html,member,selector); 
			var hop = this.buildHop(html,parameter, member, false);
	    	if(hop.setsOfTwins.length == 1){
			    parameter[member] = this.dizParameterHtml(parameter[member],hop.setsOfTwins[0]);  
	    	}
		}
		return parameter;
	} 
	dizParameterStringHtml(parameter, hop){
	    return hop.simpleHtml[0].innerText;		
	}
	dizParameterHtml(parameter, html){
		if (Array.isArray(parameter)){
	    	var parameters = parameter;
	    	return this.dizParameterArrayHtml(parameter,new Hop55(html,"","") );
	    } else if(typeof parameter == "object"  ){
	    	return this.dizParameterObjectHtml(parameter, html);
	    } else {
	    	return this.dizParameterStringHtml(parameter,new Hop55(html,"","") );
	    }
	}
//----------------------------------------------------------------------------------------------------------------------------------------	
	
	dizHtmlParameterArray(hop, parameters){
		for(var k = 0; k < hop.setsOfTwins.length; k++){
			var twins = hop.setsOfTwins[k];
			this.setTwinsLength(twins, parameters.length);
		    for(var l = 0; l < parameters.length; l++){
		    	var simplerParameter = parameters[l];
		    	this.dizHtmlParameter(twins[l],simplerParameter);
		    }
		}
	}
	dizHtmlParameterObject(html, parameter){
		for(var member in parameter ){
			var simplerParameter = parameter[member];
			var hop = this.buildHop(html,parameter, member, true);
			for(var k = 0; k < hop.setsOfTwins.length; k++){
				var twins = hop.setsOfTwins[k];
				this.dizHtmlParameter(twins,simplerParameter )
			}
		}		
	}
	dizHtmlParameterString(html, parameter){
		html.innerText = parameter;
	}
	dizHtmlParameter(html, parameter){	
		if(Array.isArray(parameter)) {
			var hop = new Hop55(html,"","");
			this.dizHtmlParameterArray(hop, parameter);
		} else if(typeof parameter == "object"  ){
			this.dizHtmlParameterObject(html, parameter);
		} else if(Array.isArray(html)){
			html.forEach((simplerHtml)=> this.dizHtmlParameter(simplerHtml,parameter));
		} else {
			this.dizHtmlParameterString(html,parameter);
		}
	}
	hide(html){
		if(html && html.parentElement && html.parentElement.tagName != "TEMPLATE" ){
	        var parentElement = html.parentElement;
	        var htmlTemplate =  document.createElement('template');
			parentElement.insertBefore(htmlTemplate, html);
	        parentElement.removeChild(html);
	        htmlTemplate.appendChild(html);
		}
	}
	show(html) {
		if(html && html.parentElement && html.parentElement.parentElement && html.parentElement.tagName == "TEMPLATE" ){
	    	var parent = html.parentElement;
	    	var grandparent = parent.parentElement;
	    	grandparent.insertBefore(firstTwin,parent);  // interesting: for a moment twin and parent become siblings.
	    	grandparent.removeChild(parent);

		}
	}
	setTwinsLength(twins, length){
		while(twins.length > length){
	    	this.hide( twins.pop());
	    }
		if(length > 0 ){
			twins.slice(0,length).forEach((twin)=> this.show(twin));
		    var lastTwin = twins[twins.length - 1];
		    var firstTwin = twins[0];
		    while(twins.length < length){
		    	var clone = firstTwin.cloneNode(true);
		    	lastTwin.insertAdjacentElement("afterend",clone);
		    	twins.push(clone);
		    	lastTwin = clone;
		    }
		}
	}
	setParameterLength(parameters, length){
		var clone0 = () => { return Object.assign({},parameters[0])};
		var noClone= () => {return ''}; 
		var cloneSomething = parameters.length > 0?  clone0 : noClone;
		while(parameters.length < length){
			parameters.push(cloneSomething());	
		}
		while(parameters.length > length){
			parameters.pop();	
		}
	}
}	
var test72Title = "test72 'Read from table"
	function test72() {
		function addDizid(element){
			element.setAttribute("dizid", element.tagName)
		}

	    var div  = document.createElement('div');
	    var table = '<table><tbody><tr><th>First</th><th>Last</th> </tr><tr dizid="player"> <td dizid="firstName">Tex</td><td dizid="lastName">Carleton</td></tr><tr dizid="player"> <td dizid="firstName">Ripper</td><td dizid="lastName">Collins</td></tr></tbody></table>'
	    
	    div.innerHTML = table;
		 div.querySelectorAll("table,thead,tbody,tfoot,th,tr,td").forEach(addDizid)
//		 var treeAidor = new TreeAidor()
//		 tables = treeAidor.inspire({TABLE:{TBODY : [{TR :[{TD: ['']}]}]}},div)
//		 tab2 = treeAidor.inspire({TABLE:{TBODY : {TR :{TD: ''}}}},div)
//		 tab3 = treeAidor.inspire({TABLE : {TR :{TD: ''}}},div)
		 
		 tables = tester.diz({TABLE:{TBODY : [{TR :[{TD: ['']}]}]}},div)
		 tab2 = tester.diz({TABLE:{TBODY : {TR :{TD: ''}}}},div)
		 tab3 = tester.diz({TABLE : {TR :{TD: ''}}},div)
	    

	    
	}

describe("Test Dizzy Suite 51-60", function() {
//	tester = new TreeGator51();
//    it(test21Title, test21);
//	tester = new TreeGator52();
//    it(test22Title, test22);

//	tester = new TreeGator53();
//    it(test21Title, test21);
//    it(test22Title, test22);
//    it(test23Title, test23);
//	tester = new TreeGator54();
//    it(test21Title, test21);
//    it(test22Title, test22);
//    it(test23Title, test23);
//    it(test24Title, test24);
    

//	tester = new TreeGator55();
//    it(test21Title, test21);
//    it(test22Title, test22);
//    it(test23Title, test23);
//    it(test24Title, test24);
//    it(test25Title, test25);
	tester = new TreeGator56();
//    it(test21Title, test21);
//    it(test22Title, test22);
//    it(test23Title, test23);
//    it(test24Title, test24);
//    it(test25Title, test25);
    it(test26Title, test26);
//  it(test27Title, test27);
    it(test72Title, test72);
    
});	  