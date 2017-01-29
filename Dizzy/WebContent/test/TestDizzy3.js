var tester;
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// ECMAScript 2015

class TreeGator21{
	//constructor(height, width){
	//	this.height = height;
	//}
	diz() {
		return '';
	}
}


var test21Title = "test21: 'Null Test' says that an empty object template and with no html parameters produces an empty string"
	function test21() {
		 expect(tester.diz(null, null)).toBe("");
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
class TreeGator22  {
	 constructor(){
		 this.dizid = "dizid=";
	 }
	 diz(target, ... arrows){
		if(target == null || arrows.length == 0){
			return super.diz();
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
					parameters[i] = this.dizParameterHtml(parameters[i],html[i]);
				}
			}else {
				parameters[0] = this.dizParameterHtml(parameters[i],html);
			}
			return parameters;
    	} else if(html instanceof NodeList){
        	var nodeList = html;
        	if( nodeList.length > 0){
        		var node = nodeList[0];
        		return this.dizParameterHtml(parameter,node);
        	}
        } else if(typeof parameter == "object"  ){
			for(var member in parameter ){
				var list = html.querySelectorAll(":not(template)>:not(template)[dizid= "+member +"]");
				parameter[member] = this.dizParameterHtml(parameter[member], list);
			}
			return parameter;
		}
    	return html.innerText;
	}

	dizHtmlParameter(html, parameter){	
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
			    	this.dizHtmlParameter(twins[l],parameter[l]);
			    }
			   
			}		
		} else if(html instanceof NodeList){
			var nodeList = html;
			for(var i = 0; i < nodeList.length; i++  ){
				var node = nodeList[i];
				this.dizHtmlParameter(node,parameter);
			}
			
		}else if(Array.isArray(parameter) && parameter.length >0){
			var parameters = parameter;
			var parentElement = html.parentElement;
			var insertionPoint = html.nextSibling;
			for(var i = 1; i < parameters.length; i++){
				var sib = html.cloneNode(true);
				this.dizHtmlParameter(sib,parameters[i]);
				if(insertionPoint == null){
					parentElement.appendChild(sib);
				} else {
					parentElement.insertBefore(sib, insertionPoint);
				}
			}
			this.dizHtmlParameter(html,parameters[0]);
		}else if(typeof parameter == "object"  ){
			for(var member in parameter ){
				var list = html.querySelectorAll("[dizid= "+member +"]");
				if(list.length > 0){
					this.dizHtmlParameter(list, parameter[member]);
				}
			}
		} else 	{
		    html.innerText = parameter;
		}

	}
}




//#1 setParameterLength(length)
/*
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
*/
//#2 getValueOfHTML(html)
/*
html.innerText
*/
//#3 setValueOfHTML(html, parameter)
/*
html.innerText = parameter
*/

//# setTwinLength(length)
/*
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
    if( parameter.length > 0 && firstTwin.parentElement.tagName == "TEMPLATE" ){
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

    
*/

class TreeGator23 {
     constructor(dizid){
    	 this.dizid = (dizid != undefined) ? dizid : "dizid=";
     } 
//diz	 
	 diz(target, ... arrows){
		if(target == null || arrows.length == 0){
			'';
		} 
		var result = '';
		if(target instanceof NodeList || target instanceof Element){
			arrows.forEach((arrow) => {result = this.dizHtmlParameter(target, arrow);});
		}else if(arrows[0] instanceof Element || arrows[0] instanceof NodeList){
			arrows.forEach((arrow) => {result = this.dizParameterHtml(target, arrow);});
		}
		return result;
	}
//setParameterLength
	setParametersLength(parameters, length){
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
	getValueOfHTML(html){
		return html.innerText;
	}
	setValueOfHTML(html, parameter){
		html.innerText = parameter;
	}
	singleObjectHTML(html, parameter){
		for(var member in parameter ){
			var list = html.querySelectorAll("["+this.dizid +member +"]");
			if(list.length > 0){
				this.dizHtmlParameter(list, parameter[member]);
			}
		}
	}
	dizParameterHtml(parameter, html){
		if(Array.isArray(parameter) ){
			var length = (html instanceof NodeList) ? html.length : 1;
			var parameters = parameter;
			this.setParametersLength(parameters,length);
			if(html instanceof NodeList){
				for(var i = 0; i < length; i++){
					parameters[i] = this.dizParameterHtml(parameters[i],html[i]);
				}
			}else {
				parameters[0] = this.dizParameterHtml(parameters[i],html);
			}
			return parameters;
   	} else if(html instanceof NodeList){
       	var nodeList = html;
       	if( nodeList.length > 0){
       		var node = nodeList[0];
       		return this.dizParameterHtml(parameter,node);
       	}
    } else if(typeof parameter == "object"  ){
			for(var member in parameter ){
				var list = html.querySelectorAll(":not(template)>:not(template)["+this.dizid +member +"]");
				parameter[member] = this.dizParameterHtml(parameter[member], list);
			}
			return parameter;
	}
   	return this.getValueOfHTML(html);
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
	dizHtmlParameter(html, parameter){	
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
				this.setTwinsLength(twins, parameter.length);
			    for(var l = 0; l < parameter.length; l++){
			    	this.dizHtmlParameter(twins[l],parameter[l]);
			    }
			}		
		} else if(html instanceof NodeList){
			var nodeList = html;
			for(var i = 0; i < nodeList.length; i++  ){
				var node = nodeList[i];
				this.dizHtmlParameter(node,parameter);
			}
		}else if(Array.isArray(parameter) && parameter.length >0){
			var parameters = parameter;
			var parentElement = html.parentElement;
			var insertionPoint = html.nextSibling;
			for(var i = 1; i < parameters.length; i++){
				var sib = html.cloneNode(true);
				this.dizHtmlParameter(sib,parameters[i]);
				if(insertionPoint == null){
					parentElement.appendChild(sib);
				} else {
					parentElement.insertBefore(sib, insertionPoint);
				}
			}
			this.dizHtmlParameter(html,parameters[0]);
		}else if(typeof parameter == "object"  ){
			this.singleObjectHTML(html, parameter);
		} else 	{
		    this.setValueOfHTML(html,parameter);
		}
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

var test24Title = "test24 'HTML Tree ,Object' says <span dizid=firstName>Dizzy</span> {firstName: } ==> Dizzy  "
	function test24() {
	     var div  = document.createElement('div');
	     div.innerHTML = '<span dizid=firstName>Dizzy</span>';
	     var target = {firstName: 'no one'}; 
	     tester.diz(target,div);
		 expect(target.firstName).toBe("Dizzy");
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
        
	    var players = {players : [{firstName: ''}]};
	    tester.diz(players, div);
	    expect(players).toEqual({players: [dizzy, paul, joe]});
	    // Now remove paul and joe from document
	    tester.diz(div,{players:[dizzy]} );
	    tester.diz(players, div); // update javascript
	    expect(players).toEqual({players: [dizzy]});
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
	    
	
describe("Test Dizzy Suite 21-30", function() {
	 tester = new TreeGator21();
     it(test21Title, test21);
    // var gator = new TreeGator22(); 
    // diz = ( ... parms) => { return gator.treediz.apply(gator, parms); }
     tester = new TreeGator22();
     it(test22Title, test22);
     it(test23Title, test23);
     it(test24Title, test24);

     it(test25Title, test25);
     it(test26Title, test26);

     // diz = ( ... parms) => { return gator.treediz.apply(gator, parms); }
      tester = new TreeGator23();
      it(test22Title, test22);
      it(test23Title, test23);
      it(test24Title, test24);

      it(test25Title, test25);
      it(test26Title, test26);
      it(test27Title, test27);
 
});	  