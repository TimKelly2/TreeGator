
var tester
//changes            Hop38       Hop40                   Hop50                 Touch                   Hope
//                  "html"       "complex"               complexHtml           complexHtml 
//                  "flatHtml"   "simple"                simpleHtml            simpleHtml
//                  "selecHtml"  "discoverRelation"      describeRelation      findPointOfContact
//                  "parameter"  "dimension"             dimension             direction
//                                simplifyRelation       simplifyRelation      simplify
//                                simplerRelation         simplerHtml          simplerHtml
//                                member                  element              element
//                                complexMember           complexElement       complexElement
//                                simpleMember            simpleElement        simpleElement

//                                                        TreeGator56          TreeGator70
//                                                        target               one
//                                                        arrows	           inspirations
//                                 complexMeasure                              revealMeaning
//                                 measure                                     understand
//                              




class Touch {
	constructor(html, direction, selector ){
		if(selector == undefined){
			this.selector = "[dizid="+ direction +"]";
		}else {
			this.selector = selector;
		}
		this.direction = direction;
		this.complexHtml  = this.findPointOfContact(html);
		this.simpleHtml   = this.simplify(this.complexHtml);
		this.setsOfTwins  = this.twinRelation();
	}
	findPointOfContact(html){
		if (Array.isArray(html) ){
			var complexHtml = html;
			return complexHtml.map( (simplerHtml) => this.findPointOfContact(simplerHtml));
		} else if(html instanceof Element){
			var simpleHtml = html;
			return (this.selector == "") ? simpleHtml 
				:  Array.from(simpleHtml.querySelectorAll(this.selector));
		} else if(html instanceof NodeList){
			var complexHtml = Array.from(html);
			return this.findPointOfContact(complexHtml);
		}
	}
	simplify(html){
		if (Array.isArray(html) ){
			var complexHtml = html;
			var simplerHtml = [];
			complexHtml.forEach((element) =>{
				if(Array.isArray(element)){
					var complexElement= element;
					simplerHtml = simplerHtml.concat(this.simplify(complexElement));
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

//See TreeGator56
class TreeGator70  {
	 constructor(){
		 this.dizid = "dizid=";
	 }
	 diz(one, ... inspirations){
		if(one == null || inspirations.length == 0){
			return '';
		} 
		var result = '';
		if(one instanceof NodeList || one instanceof Element){
			inspirations.forEach((inspiration) => {result = this.dizHtmlParameter(one, inspiration);});
		}else if(inspirations[0] instanceof Element || inspirations[0] instanceof NodeList){
			inspirations.forEach((inspiration) => {result = this.dizParameterHtml(one, inspiration);});
		}
		return result;
	}

    revealMeaning (html) {
    	function concatTextNode(accumulator, textNode){
    		return accumulator.concat(textNode.textContent);
    	}
    	//btw - no simple way to recurse from .map(revealMeaning). so i created understand()
    	function understand(html) {
			if(Array.isArray(html)){
		        var complex = html;
				var complexResult =  complex.map(understand);
				return complexResult;
			}else {
				var element = html;
	    	    var textNodes = Array.from(element.childNodes).filter(f => f.nodeName === '#text');
	    		return textNodes.reduce(concatTextNode, '');
			}
    	}
    	return understand(html);
    	
	}; 
	dizParameterHtml(parameter, html){
		if (Array.isArray(parameter)){
	    	var parameters = parameter;
	    	var touch = new Touch(html,"","");
	    	if(touch.setsOfTwins.length == 1){
		    	var twins = touch.setsOfTwins[0];
		    	this.setParameterLength(parameters,twins.length);
		    	for(var i = 0; i< parameters.length; i ++){
		    		parameter[i] = this.dizParameterHtml(parameter[i],twins[i]);   
		    	}
	    	}
	    	return parameter;
	    } else if(typeof parameter == "object"  ){
			for(var member in parameter ){
				var touch = new Touch(html,member,":not(template)>:not(template)["+this.dizid +member +"]"); 
		    	if(touch.setsOfTwins.length == 1){
		    		var twins = touch.setsOfTwins[0]; 
		    		if(twins.length ==1 ){
				        parameter[member] = this.dizParameterHtml(parameter[member],twins[0]);
		    		}else {
		    			parameter[member] = this.dizParameterHtml([parameter[member]],twins);
		    			
		    		}
		    	}else {
		    		console.log("Error: " +parameter+ " has "+ touch.setsOfTwins.length + " sets of twins" )
		    	}
			}
			return parameter;
	    } else {
		    var touch = new Touch(html,"", "");
		    var understanding = this.revealMeaning(touch.complexHtml);
		    if(understanding.length == 1){
		    	return understanding[0];
		    }
		    return understanding;
	    }
	}
	
	dizHtmlParameter(html, parameter){	
		if(Array.isArray(parameter)) {
			var touch = new Touch(html,"","");
			for(var k = 0; k < touch.setsOfTwins.length; k++){
				var twins = touch.setsOfTwins[k];
				this.setTwinsLength(twins, parameter.length);
			    for(var l = 0; l < parameter.length; l++){
			    	var simplerParameter = parameter[l];
			    	this.dizHtmlParameter(twins[l],simplerParameter);
			    }
			}			
		} else if(typeof parameter == "object"  ){
			for(var member in parameter ){
				var simplerParameter = parameter[member];
				var touch = new Touch(html,member,"["+this.dizid +member +"]");
				for(var k = 0; k < touch.setsOfTwins.length; k++){
					var twins = touch.setsOfTwins[k];
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
	    if(length > 0 && firstTwin.parentElement.tagName == "TEMPLATE" ){
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
/*
 * testTreeGator57
constructor()
testTreeGator57.diz()
testTreeGator57.dizParameterArrayHtml()
testTreeGator57.buildHop()
testTreeGator57.dizParameterObjectHtml()
testTreeGator57.dizParameterStringHtml()
testTreeGator57.dizParameterHtml()
testTreeGator57.dizHtmlParameterArray()
testTreeGator57.dizHtmlParameterObject()
testTreeGator57.dizHtmlParameterString()
testTreeGator57.dizHtmlParameter()
testTreeGator57.hide()
testTreeGator57.show()
testTreeGator57.setTwinsLength()
testTreeGator57.setParameterLength()
 */


var test70Title = "test70 'Convert players to array"
	function test70() {
	    var div  = document.createElement('div');
	    var dizzy = {firstName: 'Dizzy'};
	    var paul = {firstName: 'Paul'};
	    var joe  = {firstName: 'Joe'};
	    
	    div.innerHTML = '<div dizid="players"><span dizid="firstName">Dizzy</span></div></div>';
	    var players = {players : {firstName: ''}}; // [{firstName: ''}]
	    tester.diz(players, div);
	    expect(players).toEqual({players: dizzy});
	    

	    div.innerHTML = '<div dizid="players"><span dizid="firstName">Dizzy</span></div><div dizid="players"><span dizid="firstName">Paul</span></div>';
	    players = {players : {firstName: ''}}; // [{firstName: ''}]
	    tester.diz(players, div);
	    expect(players).toEqual({players: [dizzy, paul]});
	    
	    
	}

var test71Title = "test71 'Convert players to two arrays"
	function test71() {
	    var div  = document.createElement('div');
	    var dizzy = {firstName: 'Dizzy'};
	    var paul = {firstName: 'Paul'};
	    var joe  = {firstName: 'Joe'};
	    
	    div.innerHTML = '<div><div dizid="players"><span dizid="firstName">Dizzy</span></div></div></div>' +
	    	            '<div><div dizid="players"><span dizid="firstName">Dizzy</span></div></div></div>';
	    var players = {players : {firstName: ''}}; // [{firstName: ''}]
	    players = tester.diz(players, div);
	    expect(players).toEqual([{players: dizzy},{players: dizzy}]);
	    

//	    div.innerHTML = '<div dizid="players"><span dizid="firstName">Dizzy</span></div><div dizid="players"><span dizid="firstName">Paul</span></div>';
//	    players = {players : {firstName: ''}}; // [{firstName: ''}]
//	    tester.diz(players, div);
//	    expect(players).toEqual({players: [dizzy, paul]});
	    
	    
	}

class Hope {
	constructor(html, direction, selector ){
		if(selector == undefined){
			this.selector = "[dizid="+ direction +"]";
		}else {
			this.selector = selector;
		}
		this.direction = direction;
		this.complexHtml  = this.findPointOfContact(html);
		this.simpleHtml   = this.simplify(this.complexHtml);
		this.setsOfTwins  = this.twinRelation();
	}
	findPointOfContact(html){
		if (Array.isArray(html) ){
			var complexHtml = html;
			return complexHtml.map( (simplerHtml) => this.findPointOfContact(simplerHtml));
		} else if(html instanceof Element){
			var simpleHtml = html;
			return (this.selector == "") ? simpleHtml 
				:  Array.from(simpleHtml.querySelectorAll(this.selector));
		} else if(html instanceof NodeList){
			var complexHtml = Array.from(html);
			return this.findPointOfContact(complexHtml);
		}
	}
	simplify(html){
		if (Array.isArray(html) ){
			var complexHtml = html;
			var simplerHtml = [];
			complexHtml.forEach((element) =>{
				if(Array.isArray(element)){
					var complexElement= element;
					simplerHtml = simplerHtml.concat(this.simplify(complexElement));
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


var test72Title = "test72 duplicateQuestion "
	function test72() {
		function addDizid(element){
			element.setAttribute("dizid", element.tagName)
		}

	    var div  = document.createElement('div');
	    var table = '<table><tbody><th>First</th><th>Last</th> </tr><tr dizid="player"> <td dizid="firstName">Tex</td><td dizid="lastName">Carleton</td></tr><tr dizid="player"> <td dizid="firstName">Ripper</td><td dizid="lastName">Collins</td></tr></tbody></table>'
	    
	    div.innerHTML = table;
		 div.querySelectorAll("table,thead,tbody,tfoot,th,tr,td").forEach(addDizid)
		 var treeAidor = new TreeAidor73()
		 var val1 = {TABLE:{TBODY : {TR :[{TD: ['']}]}}};
		 var result1 = treeAidor.duplicateQuestion(val1)
		 
	     expect(result1).toEqual(val1);
		 val1.TABLE.TBODY.TR[0].TD[0] = 'different'
		 expect(result1).not.toEqual(val1);
				 
		 
		 
		 tab2 = treeAidor.inspire({TABLE:{TBODY : {TR :{TD: ''}}}},div)
		 tab3 = treeAidor.inspire({TABLE : {TR :{TD: ''}}},div)
	    

	    
	}


var test73Title = "test73 'Read from table"
	function test73() {
		function addDizid(element){
			element.setAttribute("dizid", element.tagName)
		}

	    var div  = document.createElement('div');
	    var table = '<table><tbody><th>First</th><th>Last</th> </tr><tr dizid="player"> <td dizid="firstName">Tex</td><td dizid="lastName">Carleton</td></tr><tr dizid="player"> <td dizid="firstName">Ripper</td><td dizid="lastName">Collins</td></tr></tbody></table>'
	    
	    div.innerHTML = table;
		 div.querySelectorAll("table,thead,tbody,tfoot,th,tr,td").forEach(addDizid)
		 var treeAidor = new TreeAidor73()
		 tables = treeAidor.inspire({TABLE:{TBODY : [{TR :[{TD: ['']}]}]}},div)
		 tab2 = treeAidor.inspire({TABLE:{TBODY : {TR :{TD: ''}}}},div)
		 tab3 = treeAidor.inspire({TABLE : {TR :{TD: ''}}},div)
	    

	    
	}
// testTreeGator57.diz()                      
// testTreeGator57.dizParameterArrayHtml()
// testTreeGator57.buildHop()
// testTreeGator57.dizParameterObjectHtml()
// testTreeGator57.dizParameterStringHtml()
// testTreeGator57.dizParameterHtml()
// testTreeGator57.dizHtmlParameterArray()
// testTreeGator57.dizHtmlParameterObject()
// testTreeGator57.dizHtmlParameterString()
// testTreeGator57.dizHtmlParameter()
// testTreeGator57.hide()
// testTreeGator57.show()
// testTreeGator57.setTwinsLength()
// testTreeGator57.setParameterLength()

// testTreeGator71.inspire()                    - trees serve as inspirations to one another
// testTreeGator71.inspireParameter()           - A parameter(s) is affected by html
// testTreeGator71.inspireHtml()                - Html element(s) is affected by parameter. 
// testTreeGator71.revealMeaningOfHtml()        - parameter may be affected by the collection of values/measurements/info of html fragments .
// testTreeGator71.revealMeaningOfParameter()   - html fragments may be affected by the values/measurements/info of parameter .
// testTreeGator71.setTwinsLength()             - html resized to match parameter.
// testTreeGator71.setParameterLength()         - parameter resized to match html.
// Jan 29 1:23 PM 2017

class TreeAidor73  {
	 constructor(){
		 this.dizid = "dizid=";
	 }
	 inspire(oneAnother, ... inspirations){  // refactored from testTreeGator57.diz() 
		if(oneAnother == null || inspirations.length == 0){
			return '';
		} 
		var result = '';
		if(oneAnother instanceof NodeList || oneAnother instanceof Element){
			inspirations.forEach((inspiration) => {result = this.inspireHtml(oneAnother, inspiration);});
		}else if(inspirations[0] instanceof Element || inspirations[0] instanceof NodeList){
			inspirations.forEach((inspiration) => {result = this.inspireParameter(oneAnother, inspiration);});
		}
		return result;
	}
    revealMeaningOfHtml (parameter, html) {
    	// TreeGator does not use the parameter, but another class could.
    	function concatTextNode(string, textNode){
    		return string.concat(textNode.textContent);
    	}
    	//btw - no simple way to recurse from .map(revealMeaning). so i created understand()
    	function understand(html) {
			if(Array.isArray(html)){
		        var complex = html;
				var complexResult =  complex.map(understand);
				return complexResult;
			}else {
				var element = html;
	    	    var textNodes = Array.from(element.childNodes).filter(f => f.nodeName === '#text');
	    		return textNodes.reduce(concatTextNode, '');
			}
    	}
    	return understand(html);
    	
	}; 
	revealMeaningOfParameter(html,parameter){
		html.innerText = parameter;
	}
	duplicateQuestion(original){
		if(typeof original != "object" ) {
			return ''
		} else if(Array.isArray(original) == false){
			var dup = {};
			for(var member in original){
				dup[member] = this.duplicateQuestion(original[member])
			}
			return dup;
		}else if (original.length == 0){
			return [];
		}else 
			return [this.duplicateQuestion(original[0])];
	}
	inspireParameter(parameter, html){
		var localThis = this;
		function isSingleHome(hope){
			return hope.setsOfTwins.length == 1
		}

		function inspireFromHome(setOfTwins){
			var home = setOfTwins[0].parentElement;
			return localThis.inspireParameter(localThis.duplicateQuestion(parameter), home);
		}
		if (Array.isArray(parameter)){        //...                                                             // could be refactored like testTreeGator57.dizParameterArrayHtml()
	    	var parameters = parameter;
	    	var hope = new Hope(html,"","");
	    	if(isSingleHome(hope)){
		    	var twins = hope.setsOfTwins[0];
		    	this.setParameterLength(parameters,twins.length);
		    	for(var i = 0; i< parameters.length; i ++){
		    		parameter[i] = this.inspireParameter(parameter[i],twins[i]);   
		    	}
	    	}else {// ignore previous hope, we have to restart with multiple Homes.
        		return hope.setsOfTwins.map(inspireFromHome); // each home inspires.
	    	}
	    	return parameter;
	    } else if(typeof parameter == "object"  ){
	    	var tuples = [];                           //...                                                     // could be refactored testTreeGator57.dizParameterObjectHtml()                                
			for(var member in parameter ){
				if(/^\d/.test(member)){
					console.log('WTF ' + member);
				}
				var hope = new Hope(html,member,":not(template)>:not(template)["+this.dizid +member +"]");//... // could be refactored like testTreeGator57.buildHop()
		    	if(hope.setsOfTwins.length == 1){
		    		tuples.push([member,hope]);
		    	}else if(hope.setsOfTwins.length > 1){// ignore previous hopes, we have to restart from home
		    		return hope.setsOfTwins.map(inspireFromHome);
		    	}
			}
			var tup
	    	for(tup of tuples ){
	    		var member = tup[0]
	    		var hope = tup[1]
	    		var twins = hope.setsOfTwins[0]; 
	    		if(twins.length ==1 ){
			        parameter[member] = this.inspireParameter(parameter[member],twins[0]);
	    		}else {
	    			parameter[member] = this.inspireParameter([parameter[member]],twins);
	    		}
			}
			return parameter;
	    } else {     
		    var hope = new Hope(html,"", "");                                  //...                            // could be refactored like testTreeGator57.dizParameterStringHtml()
		    var understanding = this.revealMeaningOfHtml(parameter, hope.complexHtml);
		    if(understanding.length == 1){
		    	return understanding[0];
		    }
		    return understanding;
	    }
	}
	
	inspireHtml(html, parameter){	
		if(Array.isArray(parameter)) {
			var hope = new Hope(html,"","");     //...                                                          // could be refactored like testTreeGator57.dizHtmlParameterArray()
			for(var k = 0; k < hope.setsOfTwins.length; k++){
				var twins = hope.setsOfTwins[k];
				this.setTwinsLength(twins, parameter.length);
			    for(var l = 0; l < parameter.length; l++){
			    	var simplerParameter = parameter[l];
			    	this.inspireHtml(twins[l],simplerParameter);
			    }
			}			
		} else if(typeof parameter == "object"  ){
			for(var member in parameter ){                                   //...                              // could be refactored like testTreeGator57.dizHtmlParameterObject()
				var simplerParameter = parameter[member];
				var hope = new Hope(html,member,"["+this.dizid +member +"]");//...                              // could be refactored like testTreeGator57.buildHop()
				for(var k = 0; k < hope.setsOfTwins.length; k++){
					var twins = hope.setsOfTwins[k];
					this.inspireHtml(twins,simplerParameter )
				}
			}
		} else if(Array.isArray(html)){
			html.forEach((simplerHtml)=> this.inspireHtml(simplerHtml,parameter));
		} else {
			this.revealMeaningOfParameter(html, parameter);                 //...                               // equivalent to testTreeGator57.dizHtmlParameterString()
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
		var imitateFirst = () => { return this.duplicateQuestion(parameters[0])};
		var imitateNothing = () => {return ''}; 
		var imitate = parameters.length > 0?  imitateFirst : imitateNothing;
		while(parameters.length < length){
			parameters.push(imitate());	
		}
		while(parameters.length > length){
			parameters.pop();	
		}
	}
}
/*
describe("Test Dizzy Suite 51-60", function() {

	tester7 = new TreeAidor73(true);
    it(test72Title, test72);
    it(test73Title, test73);
});	 
*/
 