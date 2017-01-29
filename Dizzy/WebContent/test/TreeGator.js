class TreeGator  {
	 constructor(){
		 this.dizid = "dizid=";
	 }
	 inspire(one, ... inspirations){
		if(one == null || inspirations.length == 0){
			return '';
		} 
		var result = '';
		if(one instanceof NodeList || one instanceof Element){
			inspirations.forEach((inspiration) => {result = this.inspireHtml(one, inspiration);});
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
	inspireParameter(parameter, html){
		var localThis = this;
		function inspireParameterFromMom(setOfTwins){
			var momOfTwins = setOfTwins[0].parentElement;
			return localThis.inspireParameter(Object.assign({},parameter), momOfTwins);
		}
		if (Array.isArray(parameter)){
	    	var parameters = parameter;
	    	var hope = new Hope(html,"","");
	    	if(hope.setsOfTwins.length == 1){
		    	var twins = hope.setsOfTwins[0];
		    	this.setParameterLength(parameters,twins.length);
		    	for(var i = 0; i< parameters.length; i ++){
		    		parameter[i] = this.inspireParameter(parameter[i],twins[i]);   
		    	}
	    	}else {// ignore previous hopes, we have to restart with Mom.
        		return hope.setsOfTwins.map(inspireParameterFromMom);
	    	}
	    	return parameter;
	    } else if(typeof parameter == "object"  ){
	    	var hopes = [];
			for(var member in parameter ){
				var hope = new Hope(html,member,":not(template)>:not(template)["+this.dizid +member +"]");
		    	if(hope.setsOfTwins.length == 1){
		    		hopes.push(hope);
		    	}else {// ignore previous hopes, we have to restart with Mom.
		    		return hope.setsOfTwins.map(inspireParameterFromMom);
		    	}
			}
	    	for(hope of hopes ){
				if(hope.setsOfTwins.length == 1){
		    		var twins = hope.setsOfTwins[0]; 
		    		if(twins.length ==1 ){
				        parameter[member] = this.inspireParameter(parameter[member],twins[0]);
		    		}else {
		    			parameter[member] = this.inspireParameter([parameter[member]],twins);
		    		}
		    	}else {
		    		console.log("Error: " +parameter+ " has "+ hope.setsOfTwins.length + " sets of twins" )
		    		var lambdaThis = this;
		    		function dizTwin(twins){
		    			return lambdaThis.inspireParameter(parameter.clone(true), twins) ;
		    		}
		    		parameter = hope.setsOfTwins.map(dizTwin);
		    	}
			}
			return parameter;
	    } else {
		    var hope = new Hope(html,"", "");
		    var understanding = this.revealMeaning(hope.complexHtml);
		    if(understanding.length == 1){
		    	return understanding[0];
		    }
		    return understanding;
	    }
	}
	
	inspireHtml(html, parameter){	
		if(Array.isArray(parameter)) {
			var hope = new Hope(html,"","");
			for(var k = 0; k < hope.setsOfTwins.length; k++){
				var twins = hope.setsOfTwins[k];
				this.setTwinsLength(twins, parameter.length);
			    for(var l = 0; l < parameter.length; l++){
			    	var simplerParameter = parameter[l];
			    	this.inspireHtml(twins[l],simplerParameter);
			    }
			}			
		} else if(typeof parameter == "object"  ){
			for(var member in parameter ){
				var simplerParameter = parameter[member];
				var hope = new Hope(html,member,"["+this.dizid +member +"]");
				for(var k = 0; k < hope.setsOfTwins.length; k++){
					var twins = hope.setsOfTwins[k];
					this.inspireHtml(twins,simplerParameter )
				}
			}
		} else if(Array.isArray(html)){
			html.forEach((simplerHtml)=> this.inspireHtml(simplerHtml,parameter));
			
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
