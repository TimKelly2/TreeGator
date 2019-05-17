
var diz;

function diz11(html, parameter){

	if(html == null) {
		return '';
	}
	if(html instanceof NodeList && Array.isArray(parameter)  && parameter.length >0){
		var nodeList = html;
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
		for(var k = 0; k < setsOfTwins.length; k++){
		    var twins = setsOfTwins[k];
		    while(twins.length > parameter.length){
		    	var lastTwin = twins.pop();
		    	lastTwin.parentElement.removeChild(lastTwin);
		    }
		    var firstTwin = twins[0];
		    var lastTwin = twins[twins.length - 1];
		    while(twins.length < parameter.length){
		    	var clone = firstTwin.cloneNode(true);
		    	lastTwin.insertAdjacentElement("afterend",clone);
		    	twins.push(clone);
		    	lastTwin = clone;
		    }
		    for(var l = 0; l < parameter.length; l++){
		    	diz(twins[l],parameter[l]);
		    }
		}		
	} else if(html instanceof NodeList){
		var nodeList = html;
		for(var i = 0; i < nodeList.length; i++  ){
			var node = nodeList[i];
			diz(node,parameter);
		}
		
	}else if(Array.isArray(parameter) && parameter.length >0){
		var parameters = parameter;
		var parentElement = html.parentElement;
		var insertionPoint = html.nextSibling;
		for(var i = 1; i < parameters.length; i++){
			var sib = html.cloneNode(true);
			diz(sib,parameters[i]);
			if(insertionPoint == null){
				parentElement.appendChild(sib);
			} else {
				parentElement.insertBefore(sib, insertionPoint);
			}
		}
		diz(html,parameters[0]);
		
	}else if(typeof parameter == "object"  ){
		for(var member in parameter ){
			var list = html.querySelectorAll("[dizid= "+member +"]");
			if(list.length > 0){
				diz(list, parameter[member]);
			}
		}
	} else 	{
	    html.innerText = parameter;
	}
}
var test11Title = "test11: 'Null Test' says that an empty object template and with no html parameters produces an empty string"
function test11() {
	 expect(diz(null, null)).toBe("");
}



function diz12(target, arrow){
	if(target == null || arrow == null){
		return '';
	}
	if(target instanceof NodeList || target instanceof Element){
		return dizHtmlParameter(target,arrow);
	}else if(arrow instanceof Element){
		return dizParameterHtml(target,arrow);
	}else {
		return '';
	}
    function dizParameterHtml(parameter, html){
    	return html.innerText;
    }
	function dizHtmlParameter(html, parameter){
	
		if(html == null) {
			return '';
		}
		if(html instanceof NodeList && Array.isArray(parameter)  && parameter.length >0){
			var nodeList = html;
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
			for(var k = 0; k < setsOfTwins.length; k++){
			    var twins = setsOfTwins[k];
			    while(twins.length > parameter.length){
			    	var lastTwin = twins.pop();
			    	lastTwin.parentElement.removeChild(lastTwin);
			    }
			    var firstTwin = twins[0];
			    var lastTwin = twins[twins.length - 1];
			    while(twins.length < parameter.length){
			    	var clone = firstTwin.cloneNode(true);
			    	lastTwin.insertAdjacentElement("afterend",clone);
			    	twins.push(clone);
			    	lastTwin = clone;
			    }
			    for(var l = 0; l < parameter.length; l++){
			    	dizHtmlParameter(twins[l],parameter[l]);
			    }
			}		
		} else if(html instanceof NodeList){
			var nodeList = html;
			for(var i = 0; i < nodeList.length; i++  ){
				var node = nodeList[i];
				dizHtmlParameter(node,parameter);
			}
			
		}else if(Array.isArray(parameter) && parameter.length >0){
			var parameters = parameter;
			var parentElement = html.parentElement;
			var insertionPoint = html.nextSibling;
			for(var i = 1; i < parameters.length; i++){
				var sib = html.cloneNode(true);
				dizHtmlParameter(sib,parameters[i]);
				if(insertionPoint == null){
					parentElement.appendChild(sib);
				} else {
					parentElement.insertBefore(sib, insertionPoint);
				}
			}
			dizHtmlParameter(html,parameters[0]);
			
		}else if(typeof parameter == "object"  ){
			for(var member in parameter ){
				var list = html.querySelectorAll("[dizid= "+member +"]");
				if(list.length > 0){
					dizHtmlParameter(list, parameter[member]);
				}
			}
		} else 	{
		    html.innerText = parameter;
		}
	}
}	
var test12Title = "test12 'Single Element, Single String' says that a  <span>arrow</span> +  'target' ==> 'arrow' ";
	
	function test12() {
	     var arrow  = document.createElement('span');
	     arrow.innerHTML = 'arrow';
	     var result = diz("target", arrow);
		 expect(result).toBe("arrow");
	}




function diz13(target, arrow){
	if(target == null || arrow == null){
		return '';
	}
	if(target instanceof NodeList || target instanceof Element){
		return dizHtmlParameter(target,arrow);
	}else if(arrow instanceof NodeList || arrow instanceof Element ){
		return dizParameterHtml(target,arrow);
	}else {
		return '';
	}
    function dizParameterHtml(parameter, html){
        if(html instanceof NodeList){
        	var nodeList = html;
        	if( nodeList.length > 0){
        		var node = nodeList[0];
        		return dizParameterHtml(parameter,node);
        	}
        }
    	return html.innerText;
    }
	function dizHtmlParameter(html, parameter){
	
		if(html == null) {
			return '';
		}
		if(html instanceof NodeList && Array.isArray(parameter)  && parameter.length >0){
			var nodeList = html;
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
			for(var k = 0; k < setsOfTwins.length; k++){
			    var twins = setsOfTwins[k];
			    while(twins.length > parameter.length){
			    	var lastTwin = twins.pop();
			    	lastTwin.parentElement.removeChild(lastTwin);
			    }
			    var firstTwin = twins[0];
			    var lastTwin = twins[twins.length - 1];
			    while(twins.length < parameter.length){
			    	var clone = firstTwin.cloneNode(true);
			    	lastTwin.insertAdjacentElement("afterend",clone);
			    	twins.push(clone);
			    	lastTwin = clone;
			    }
			    for(var l = 0; l < parameter.length; l++){
			    	dizHtmlParameter(twins[l],parameter[l]);
			    }
			}		
		} else if(html instanceof NodeList){
			var nodeList = html;
			for(var i = 0; i < nodeList.length; i++  ){
				var node = nodeList[i];
				dizHtmlParameter(node,parameter);
			}
			
		}else if(Array.isArray(parameter) && parameter.length >0){
			var parameters = parameter;
			var parentElement = html.parentElement;
			var insertionPoint = html.nextSibling;
			for(var i = 1; i < parameters.length; i++){
				var sib = html.cloneNode(true);
				dizHtmlParameter(sib,parameters[i]);
				if(insertionPoint == null){
					parentElement.appendChild(sib);
				} else {
					parentElement.insertBefore(sib, insertionPoint);
				}
			}
			dizHtmlParameter(html,parameters[0]);
			
		}else if(typeof parameter == "object"  ){
			for(var member in parameter ){
				var list = html.querySelectorAll("[dizid= "+member +"]");
				if(list.length > 0){
					dizHtmlParameter(list, parameter[member]);
				}
			}
		} else 	{
		    html.innerText = parameter;
		}
	}
}
var test13Title = "test13 'Double Element, Single String' says that a  <span>arrow</span><span>arrow</span> +  'target' ==> 'arrow' ";

function test13() {
     var div  = document.createElement('div');
     div.innerHTML = '<span>arrow</span><span>arrow</span>';
     var arrows = div.querySelectorAll("span");
     var result = diz("target", arrows);
	 expect(result).toBe("arrow");
}


var test14Title = "test14 'HTML Tree ,Object' says <span dizid=firstName>Dizzy</span> {firstName: } ==> Dizzy  "
	function test14() {
	     var div  = document.createElement('div');
	     div.innerHTML = '<span dizid=firstName>Dizzy</span>';
	     var target = {firstName: 'no one'}; 
         diz(target,div);
		 expect(target.firstName).toBe("Dizzy");
	}

function diz14(target, arrow){
	if(target == null || arrow == null){
		return '';
	}
	if(target instanceof NodeList || target instanceof Element){
		return dizHtmlParameter(target,arrow);
	}else if(arrow instanceof NodeList || arrow instanceof Element ){
		return dizParameterHtml(target,arrow);
	}else {
		return '';
	}
    function dizParameterHtml(parameter, html){
        if(html instanceof NodeList){
        	var nodeList = html;
        	if( nodeList.length > 0){
        		var node = nodeList[0];
        		return dizParameterHtml(parameter,node);
        	}
        } else if(typeof parameter == "object"  ){
			for(var member in parameter ){
				var list = html.querySelectorAll("[dizid= "+member +"]");
				if(list.length > 0){
					parameter[member] = dizParameterHtml(parameter[member], list);
				}
			}
			// not required yet return parameter;
			
		}
    	return html.innerText;
    }
	function dizHtmlParameter(html, parameter){
	
		if(html == null) {
			return '';
		}
		if(html instanceof NodeList && Array.isArray(parameter)  && parameter.length >0){
			var nodeList = html;
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
			for(var k = 0; k < setsOfTwins.length; k++){
			    var twins = setsOfTwins[k];
			    while(twins.length > parameter.length){
			    	var lastTwin = twins.pop();
			    	lastTwin.parentElement.removeChild(lastTwin);
			    }
			    var firstTwin = twins[0];
			    var lastTwin = twins[twins.length - 1];
			    while(twins.length < parameter.length){
			    	var clone = firstTwin.cloneNode(true);
			    	lastTwin.insertAdjacentElement("afterend",clone);
			    	twins.push(clone);
			    	lastTwin = clone;
			    }
			    for(var l = 0; l < parameter.length; l++){
			    	dizHtmlParameter(twins[l],parameter[l]);
			    }
			}		
		} else if(html instanceof NodeList){
			var nodeList = html;
			for(var i = 0; i < nodeList.length; i++  ){
				var node = nodeList[i];
				dizHtmlParameter(node,parameter);
			}
			
		}else if(Array.isArray(parameter) && parameter.length >0){
			var parameters = parameter;
			var parentElement = html.parentElement;
			var insertionPoint = html.nextSibling;
			for(var i = 1; i < parameters.length; i++){
				var sib = html.cloneNode(true);
				dizHtmlParameter(sib,parameters[i]);
				if(insertionPoint == null){
					parentElement.appendChild(sib);
				} else {
					parentElement.insertBefore(sib, insertionPoint);
				}
			}
			dizHtmlParameter(html,parameters[0]);
			
		}else if(typeof parameter == "object"  ){
			for(var member in parameter ){
				var list = html.querySelectorAll("[dizid= "+member +"]");
				if(list.length > 0){
					dizHtmlParameter(list, parameter[member]);
				}
			}
		} else 	{
		    html.innerText = parameter;
		}
	}
}
var test15Title = "test15 'Multiple Elements, Array' says that a <span>Hello</span><span>Goodbye</span> + []  ==> ['Hello', 'GoodBye'] "
	function test15() {
	     var div  = document.createElement('div');
	     var span = document.createElement('span');
	     div.appendChild(span);
	     var arrow = ["Hello","Goodbye"]
	     diz(span,["Hello","Goodbye"]);
		 expect(div.innerHTML).toBe("<span>Hello</span><span>Goodbye</span>");
	     var target2 = [];
	     diz(target2, div.querySelectorAll('span'));
	     expect(target2).toEqual(arrow);
	     
	}
function diz15(target, arrow){
	if(target == null || arrow == null){
		return '';
	}
	if(target instanceof NodeList || target instanceof Element){
		return dizHtmlParameter(target,arrow);
	}else if(arrow instanceof NodeList || arrow instanceof Element ){
		return dizParameterHtml(target,arrow);
	}else {
		return '';
	}
    function dizParameterHtml(parameter, html){
    	if(Array.isArray(parameter) ){
			var parameters = parameter;
			var length = (html instanceof NodeList) ? html.length : 1;
			while(parameters.length < length){
				parameters.push('');	
			}
			if(html instanceof NodeList){
				for(var i = 0; i < html.length; i++){
					parameters[i] = dizParameterHtml(parameters[i],html[i]);
				}
			}else {
				parameters[0] = dizParameterHtml(parameters[0],html);
			}
			return parameters;
    	} else if(html instanceof NodeList){
        	var nodeList = html;
        	if( nodeList.length > 0){
        		var node = nodeList[0];
        		return dizParameterHtml(parameter,node);
        	}
        } else if(typeof parameter == "object"  ){
			for(var member in parameter ){
				var list = html.querySelectorAll("[dizid= "+member +"]");
				if(list.length > 0){
					parameter[member] = dizParameterHtml(parameter[member], list);
				}
			}
			return parameter;
		}
    	return html.innerText;
    }
	function dizHtmlParameter(html, parameter){
	
		if(html == null) {
			return '';
		}
		if(html instanceof NodeList && Array.isArray(parameter)  && parameter.length >0){
			var nodeList = html;
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
			for(var k = 0; k < setsOfTwins.length; k++){
			    var twins = setsOfTwins[k];
			    while(twins.length > parameter.length){
			    	var lastTwin = twins.pop();
			    	lastTwin.parentElement.removeChild(lastTwin);
			    }
			    var firstTwin = twins[0];
			    var lastTwin = twins[twins.length - 1];
			    while(twins.length < parameter.length){
			    	var clone = firstTwin.cloneNode(true);
			    	lastTwin.insertAdjacentElement("afterend",clone);
			    	twins.push(clone);
			    	lastTwin = clone;
			    }
			    for(var l = 0; l < parameter.length; l++){
			    	dizHtmlParameter(twins[l],parameter[l]);
			    }
			}		
		} else if(html instanceof NodeList){
			var nodeList = html;
			for(var i = 0; i < nodeList.length; i++  ){
				var node = nodeList[i];
				dizHtmlParameter(node,parameter);
			}
			
		}else if(Array.isArray(parameter) && parameter.length >0){
			var parameters = parameter;
			var parentElement = html.parentElement;
			var insertionPoint = html.nextSibling;
			for(var i = 1; i < parameters.length; i++){
				var sib = html.cloneNode(true);
				dizHtmlParameter(sib,parameters[i]);
				if(insertionPoint == null){
					parentElement.appendChild(sib);
				} else {
					parentElement.insertBefore(sib, insertionPoint);
				}
			}
			dizHtmlParameter(html,parameters[0]);
			
		}else if(typeof parameter == "object"  ){
			for(var member in parameter ){
				var list = html.querySelectorAll("[dizid= "+member +"]");
				if(list.length > 0){
					dizHtmlParameter(list, parameter[member]);
				}
			}
		} else 	{
		    html.innerText = parameter;
		}
	}
}

var test16Title = "test16 'Add 3 Players, and query 3 Players"
	function test16() {
	    var div  = document.createElement('div');
	    div.innerHTML = '<div dizid=players><span dizid=firstName></span></div>';
	    var dizzy = {firstName: 'Dizzy'};
	    var paul = {firstName: 'Paul'};
	    var joe  = {firstName: 'Joe'};


	    diz(div,{players:[dizzy]} );
	    expect(div.innerHTML.toString()).toBe('<div dizid="players"><span dizid="firstName">Dizzy</span></div>');
	    diz(div,{players:[dizzy,paul]} );
	    expect(div.innerHTML.toString()).toBe('<div dizid="players"><span dizid="firstName">Dizzy</span></div><div dizid="players"><span dizid="firstName">Paul</span></div>');

	    diz(div,{players:[dizzy,paul,joe]} );
	    expect(div.innerHTML.toString()).toBe('<div dizid="players"><span dizid="firstName">Dizzy</span></div><div dizid="players"><span dizid="firstName">Paul</span></div><div dizid="players"><span dizid="firstName">Joe</span></div>');
        
	    var players = {players : [{firstName: ''}]};
	    diz(players, div);
	    expect(players).toEqual({players: [dizzy, paul, joe]});
	    // Now remove paul and joe from document
	    diz(div,{players:[dizzy]} );
	    diz(players, div); // update javascript
	    expect(players).toEqual({players: [dizzy]});
	    
	}

function diz16(target, arrow){
	if(target == null || arrow == null){
		return '';
	}
	if(target instanceof NodeList || target instanceof Element){
		return dizHtmlParameter(target,arrow);
	}else if(arrow instanceof NodeList || arrow instanceof Element ){
		return dizParameterHtml(target,arrow);
	}else {
		return '';
	}
    function dizParameterHtml(parameter, html){
    	if(Array.isArray(parameter) ){
			var parameters = parameter;
			var clone0 = () => { return Object.assign({},parameters[0])};
			var noClone = () => '';
			var cloneSomething = parameters.length > 0?  clone0 : noClone;
			var length = (html instanceof NodeList) ? html.length : 1;
			while(parameters.length < length){
				parameters.push(cloneSomething());	
			}
			while(parameters.length > length){
				parameters.pop();	
			}
			if(html instanceof NodeList){
				for(var i = 0; i < html.length; i++){
					parameters[i] = dizParameterHtml(parameters[i],html[i]);
				}
			}else {
				parameters[0] = dizParameterHtml(parameters[i],html);
			}
			return parameters;
    	} else if(html instanceof NodeList){
        	var nodeList = html;
        	if( nodeList.length > 0){
        		var node = nodeList[0];
        		return dizParameterHtml(parameter,node);
        	}
        } else if(typeof parameter == "object"  ){
			for(var member in parameter ){
				var list = html.querySelectorAll("[dizid= "+member +"]");
				if(list.length > 0){
					parameter[member] = dizParameterHtml(parameter[member], list);
				}
			}
			return parameter;
		}
    	return html.innerText;
    }
	function dizHtmlParameter(html, parameter){
	
		if(html == null) {
			return '';
		}
		if(html instanceof NodeList && Array.isArray(parameter)  && parameter.length >0){
			var nodeList = html;
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
			for(var k = 0; k < setsOfTwins.length; k++){
			    var twins = setsOfTwins[k];
			    while(twins.length > parameter.length){
			    	var lastTwin = twins.pop();
			    	lastTwin.parentElement.removeChild(lastTwin);
			    }
			    var firstTwin = twins[0];
			    var lastTwin = twins[twins.length - 1];
			    while(twins.length < parameter.length){
			    	var clone = firstTwin.cloneNode(true);
			    	lastTwin.insertAdjacentElement("afterend",clone);
			    	twins.push(clone);
			    	lastTwin = clone;
			    }
			    for(var l = 0; l < parameter.length; l++){
			    	dizHtmlParameter(twins[l],parameter[l]);
			    }
			}		
		} else if(html instanceof NodeList){
			var nodeList = html;
			for(var i = 0; i < nodeList.length; i++  ){
				var node = nodeList[i];
				dizHtmlParameter(node,parameter);
			}
			
		}else if(Array.isArray(parameter) && parameter.length >0){
			var parameters = parameter;
			var parentElement = html.parentElement;
			var insertionPoint = html.nextSibling;
			for(var i = 1; i < parameters.length; i++){
				var sib = html.cloneNode(true);
				dizHtmlParameter(sib,parameters[i]);
				if(insertionPoint == null){
					parentElement.appendChild(sib);
				} else {
					parentElement.insertBefore(sib, insertionPoint);
				}
			}
			dizHtmlParameter(html,parameters[0]);
			
		}else if(typeof parameter == "object"  ){
			for(var member in parameter ){
				var list = html.querySelectorAll("[dizid= "+member +"]");
				if(list.length > 0){
					dizHtmlParameter(list, parameter[member]);
				}
			}
		} else 	{
		    html.innerText = parameter;
		}
	}
}

var test17Title = "test17 'Player Gone but not Forgotten'"
	function test17() {
	    var div  = document.createElement('div');
	    div.innerHTML = '<div dizid=players><span dizid=firstName>Ted</span></div>';
	    var dizzy = {firstName: 'Dizzy'};
	    var paul = {firstName: 'Paul'};
	    var joe  = {firstName: 'Joe'};


        var players = {players : [{firstName: 'ignoredname'}]};
        diz(players,div);
        expect(players).toEqual({players : [{firstName: 'Ted'}]});
        diz(div, {players:[]} );
        expect(div.innerHTML).toEqual("<template></template>");
        diz(players, div);
        expect(players).toEqual({players : []});
        diz(div, {players:[paul]});
        expect(div.innerHTML).toEqual('<div dizid="players"><span dizid="firstName">Paul</span></div>');
        
        /*
	    diz(div,{players:[dizzy]} );
	    expect(div.innerHTML.toString()).toBe('<div dizid="players"><span dizid="firstName">Dizzy</span></div>');
	    diz(div,{players:[dizzy]} );
	    expect(div.innerHTML.toString()).toBe('<div dizid="players"><span dizid="firstName">Dizzy</span></div>');
	    diz(div,{players:[dizzy,paul]} );
	    expect(div.innerHTML.toString()).toBe('<div dizid="players"><span dizid="firstName">Dizzy</span></div><div dizid="players"><span dizid="firstName">Paul</span></div>');

	    diz(div,{players:[dizzy,paul,joe]} );
	    expect(div.innerHTML.toString()).toBe('<div dizid="players"><span dizid="firstName">Dizzy</span></div><div dizid="players"><span dizid="firstName">Paul</span></div><div dizid="players"><span dizid="firstName">Joe</span></div>');
        
	    var players = {players : [{firstName: ''}]};
	    diz(players, div);
	    expect(players).toEqual({players: [dizzy, paul, joe]});
	    // Now remove paul and joe from document
	    diz(div,{players:[dizzy]} );
	    diz(players, div); // update javascript
	    expect(players).toEqual({players: [dizzy]});
	    */
	    
	}

function diz17(target, arrow){
	if(target == null || arrow == null){
		return '';
	}
	if(target instanceof NodeList || target instanceof Element){
		return dizHtmlParameter(target,arrow);
	}else if(arrow instanceof NodeList || arrow instanceof Element ){
		return dizParameterHtml(target,arrow);
	}else {
		return '';
	}
    function dizParameterHtml(parameter, html){
    	if(Array.isArray(parameter) ){
			var parameters = parameter;
			var clone0 = () => { return Object.assign({},parameters[0])};
			var noClone = () => '';
			var cloneSomething = parameters.length > 0?  clone0 : noClone;
			var length = (html instanceof NodeList) ? html.length : 1;
			while(parameters.length < length){
				parameters.push(cloneSomething());	
			}
			while(parameters.length > length){
				parameters.pop();	
			}
			if(html instanceof NodeList){
				for(var i = 0; i < html.length; i++){
					parameters[i] = dizParameterHtml(parameters[i],html[i]);
				}
			}else {
				parameters[0] = dizParameterHtml(parameters[i],html);
			}
			return parameters;
    	} else if(html instanceof NodeList){
        	var nodeList = html;
        	if( nodeList.length > 0){
        		var node = nodeList[0];
        		return dizParameterHtml(parameter,node);
        	}
        } else if(typeof parameter == "object"  ){
			for(var member in parameter ){
				var list = html.querySelectorAll(":not(template)>:not(template)[dizid= "+member +"]");
				parameter[member] = dizParameterHtml(parameter[member], list);
			}
			return parameter;
		}
    	return html.innerText;
    }
	function dizHtmlParameter(html, parameter){
	
		if(html == null) {
			return '';
		}
		if(html instanceof NodeList && Array.isArray(parameter)){
			var nodeList = html;
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
			for(var k = 0; k < setsOfTwins.length; k++){
				var twins = setsOfTwins[k];
			    if(parameter.length == 0){
			        var twin = twins.pop();
			        var parentElement = twin.parentElement;
			        var htmlTemplate =  document.createElement('template');
					parentElement.insertBefore(htmlTemplate, twin);
			        parentElement.removeChild(twin);
			        htmlTemplate.appendChild(twin);

			        
			    }
				while(twins.length > parameter.length){
			    	var lastTwin = twins.pop();
			    	lastTwin.parentElement.removeChild(lastTwin);
			    }
			    var firstTwin = twins[0];
			    if(/*firstTwin.parentElement != null && twins.length == 1 &&*/ parameter.length > 0 && firstTwin.parentElement.tagName == "TEMPLATE" ){
			    	// show twin. (unhide)
			    	var parent = firstTwin.parentElement;
			    	var grandparent = parent.parentElement;
			    	if(grandparent != null){
			    		grandparent.insertBefore(firstTwin,parent);  // interesting: for a moment twin and parent become siblings.
			    		grandparent.removeChild(parent);
			    	}
			    	
			    }
			    var lastTwin = twins[twins.length - 1];
			    while(twins.length < parameter.length){
			    	var clone = firstTwin.cloneNode(true);
			    	lastTwin.insertAdjacentElement("afterend",clone);
			    	twins.push(clone);
			    	lastTwin = clone;
			    }
			    for(var l = 0; l < parameter.length; l++){
			    	dizHtmlParameter(twins[l],parameter[l]);
			    }
			   
			}		
		} else if(html instanceof NodeList){
			var nodeList = html;
			for(var i = 0; i < nodeList.length; i++  ){
				var node = nodeList[i];
				dizHtmlParameter(node,parameter);
			}
			
		}else if(Array.isArray(parameter) && parameter.length >0){
			var parameters = parameter;
			var parentElement = html.parentElement;
			var insertionPoint = html.nextSibling;
			for(var i = 1; i < parameters.length; i++){
				var sib = html.cloneNode(true);
				dizHtmlParameter(sib,parameters[i]);
				if(insertionPoint == null){
					parentElement.appendChild(sib);
				} else {
					parentElement.insertBefore(sib, insertionPoint);
				}
			}
			dizHtmlParameter(html,parameters[0]);
		}else if(typeof parameter == "object"  ){
			for(var member in parameter ){
				var list = html.querySelectorAll("[dizid= "+member +"]");
				if(list.length > 0){
					dizHtmlParameter(list, parameter[member]);
				}
			}
		} else 	{
		    html.innerText = parameter;
		}
	}
}


// <div dizid=players><template><span dizid=firstName>Ted</span></template></div>


var test18Title = "test18 'Player Gone but not Forgotten'"
	function test18() {
	    var div  = document.createElement('div');
	    div.innerHTML = '<div dizid=players><span dizid=firstName>Ted</span></div>';
	    var dizzy = {firstName: 'Dizzy'};
	    var paul = {firstName: 'Paul'};
	    var joe  = {firstName: 'Joe'};


        var players = {players : [{firstName: 'ignoredname'}]};
        diz(players,div);
        expect(players).toEqual({players : [{firstName: 'Ted'}]});
        diz(div, {players:[]} );
        expect(div.innerHTML).toEqual("<template></template>");
        diz(players, div);
        expect(players).toEqual({players : []});
        diz(div, {players:[paul]});
        expect(div.innerHTML).toEqual('<div dizid="players"><span dizid="firstName">Paul</span></div>');
        
   
	}


describe("Test Dizzy Suite 11-20", function() {
	  diz = diz11;
	  it(test11Title, test11);
	  
	  diz = diz12;
	  it(test11Title, test11);
	  it(test12Title, test12);
	  diz = diz13;
	  it(test11Title, test11);
	  it(test12Title, test12);
	  it(test13Title, test13);

	  diz = diz14;
	  it(test11Title, test11);
	  it(test12Title, test12);
	  it(test13Title, test13);
	  it(test14Title, test14);

	  diz = diz14;

	  it(test11Title, test11);
	  it(test12Title, test12);
	  it(test13Title, test13);
	  it(test14Title, test14);
	  diz = diz15;

	  it(test11Title, test11);
	  it(test12Title, test12);
	  it(test13Title, test13);
	  it(test14Title, test14);
	  it(test15Title, test15);
	  diz = diz16;

	  it(test11Title, test11);
	  it(test12Title, test12);
	  it(test13Title, test13);
	  it(test14Title, test14);
	  it(test15Title, test15);
	  it(test16Title, test16);
	  diz = diz17;

	  it(test11Title, test11);
	  it(test12Title, test12);
	  it(test13Title, test13);
	  it(test14Title, test14);
	  it(test15Title, test15);
	  it(test16Title, test16);
	  it(test17Title, test17);
	  

	  //diz = diz18;

	  it(test11Title, test11);
	  it(test12Title, test12);
	  it(test13Title, test13);
	  it(test14Title, test14);
	  it(test15Title, test15);
	  it(test16Title, test16);
	  it(test17Title, test17);
	  it(test18Title, test18);
});