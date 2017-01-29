var testGator;
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// ECMAScript 2015

"use scrict"




var test31Title = "test31: TreeGator produces an end"
	function test31() {
	     var msg = "";
	     var listener = (event) => {msg = event;}
	     testGator.gait(null, null, listener)
		 expect(msg.eventType).toEqual("End");
	}
class TreeGator31 {
    constructor(dizid){
   	 this.dizid = (dizid != undefined) ? dizid : "dizid=";
    } 
    gait(parameter, html,listener){
    	listener({eventType :"End"});
    	
    }
}

var test32Title = "test32: TreeGator finds a twig and an apple"
function test32() {
    var twig  = document.createElement('twig');

    
    var eventQueue = [];
    var listener = (event) => {eventQueue.push( event)};
    
    testGator.gait("apple", twig, listener);
	var event1 = eventQueue[0];
	var event2 = eventQueue[1];
    
	expect(event1.eventType).toBe("twig");
	expect(event1.html).toBe(twig);
	expect(event1.parameter).toBe("apple");
}

class TreeGator32 {
    constructor(dizid){
   	 this.dizid = (dizid != undefined) ? dizid : "dizid=";
    } 
    gait(parameter, html,listener){
    	listener({eventType :"twig", parameter: parameter, html: html})
    	listener({eventType :"End"});
    	
    }
}

var test33Title = "test33: TreeGator finds a twigs and an apple"
	function test33() {
	    var div  = document.createElement('div');
	    div.innerHTML = "<span></span><span></span>";
	    var spanNodeList = div.querySelectorAll("span");
	    var eventQueue = [];
	    var listener = (event) => {eventQueue.push( event)};
	    
	    testGator.gait("apple", spanNodeList, listener);
		var event1 = eventQueue[0];
		var event2 = eventQueue[1];
	    
		expect(event1.eventType).toBe("branch");
		expect(event1.html).toBe(spanNodeList);
		expect(event1.parameter).toBe("apple");
	}
class TreeGator33 {
    constructor(dizid){
   	 this.dizid = (dizid != undefined) ? dizid : "dizid=";
    } 
    gait(parameter, html, listener){
	    function g(parameter,html,path){
	    	if(parameter == null || html == null){
	    	    listener({eventType :"End"});
	    	} else if(html instanceof NodeList || Array.isArray(parameter) || typeof parameter == "object" ){
	    		var branch = {};
//	    		if(Array.isArray(parameter)) {
//	    			branch.eventType = 'branch-lists';
//	    			branch.html = html;
//	    			branch.parameter = parameter;
//	    			listener.(branch);
//	    		} 
	    		if(html instanceof NodeList){
	    			var branch = {
	    				eventType : 'branch',
	    				html      : html,
	    				parameter : parameter // does parameter need to be converted from scalar to array.
	    			};
	    			listener(branch);
	    		}
	    	} else {
	    	    listener({eventType :"twig", parameter: parameter, html: html})
	    	}
    	}
	    g(parameter, html);
    	
    }
}
var test34Title = "test34 'HTML Tree ,Object' says <span dizid=firstName/> {firstName: Dizzy} ==> <span dizid=firstName>Dizzy</span>  "
	function test34() {
	     var div  = document.createElement('div');
	     div.innerHTML = '<span dizid=firstName></span>';
         var eventQueue = [];
	     var listener = (event) => {eventQueue.push( event)};
	     
	     testGator.gait({firstName: 'Dizzy'}, div, listener);
		 var event1 = eventQueue[0];
         expect(event1.eventType).toBe("branch");
         expect(event1.html).toBe(div);
 		 expect(event1.parameter).toEqual({firstName: 'Dizzy'});
 		 expect(event1[0].name).toEqual('firstName');
 		 expect(event1[0].htmls[0]).toBe(div.children[0]);
	     
 
	 
		 
	}

class TreeGator34 {
    constructor(dizid){
   	 this.dizid = (dizid != undefined) ? dizid : "dizid=";
    } 
    gait(parameter, html, listener){
	    function g(parameter,html,path){
	    	if(parameter == null || html == null){
	    	    listener({eventType :"End"});
	    	} else if(html instanceof NodeList || Array.isArray(parameter) || typeof parameter == "object" ){
	    		
//	    		if(Array.isArray(parameter)) {
//	    			branch.eventType = 'branch-lists';
//	    			branch.html = html;
//	    			branch.parameter = parameter;
//	    			listener.(branch);
//	    		} 
	    		if(html instanceof NodeList){
	    			var branch = {
	    				eventType : 'branch',
	    				html      : html,
	    				parameter : parameter // does parameter need to be converted from scalar to array.
	    			};
	    			listener(branch);
	    		} else if(typeof parameter == "object" ){
	    			var branch = [];
	    			branch.eventType = 'branch';
	    			branch.html = html;
	    			branch.parameter = parameter;
	    			var i = 0; 
	    			for(var member in parameter ){
	    				var list = html.querySelectorAll("[dizid= "+member +"]");
	    				if(list.length > 0){
	    					var crossRef = {
	    						name :  member,
	    						htmls : list	
	    					};
	    					branch.push(crossRef);
	    					listener(branch);
	    				}
	    			}
	    		}
	    	} else {
	    	    listener({eventType :"twig", parameter: parameter, html: html})
	    	}
    	}
	    g(parameter, html);
    	
    }
}
var test35Title = "test35 'Single Element, Array' says that a <span> +  ['Hello', 'GoodBye'] ==> branch with span and ['Hello', 'GoodBye'] "
function test35() {
	
    var div  = document.createElement('div');
    var span = document.createElement('span');

    var eventQueue = [];
    var listener = (event) => {eventQueue.push( event)};
    div.appendChild(span);
    testGator.gait(['Hello', 'Goodbye'],span,listener);
	var event1 = eventQueue[0];
    
	expect(event1.eventType).toBe("branch");
	expect(event1.html).toBe(span);
	expect(event1.parameter).toEqual(['Hello', 'Goodbye']);
     
     /*
	    var div  = document.createElement('div');
	    div.innerHTML = "<span></span><span></span>";
	    var spanNodeList = div.querySelectorAll("span");
	    var eventQueue = [];
	    var listener = (event) => {eventQueue.push( event)};
	    
	    testGator.gait("apple", spanNodeList, listener);
		var event1 = eventQueue[0];
	    
		expect(event1.eventType).toBe("branch");
		expect(event1.html).toBe(spanNodeList);
		expect(event1.parameter).toBe("apple");
    */	
}
class TreeGator35 {
    constructor(dizid){
   	 this.dizid = (dizid != undefined) ? dizid : "dizid=";
    } 
    gait(parameter, html, listener){
	    function g(parameter,html,path){
	    	if(parameter == null || html == null){
	    	    listener({eventType :"End"});
	    	} else if(html instanceof NodeList || Array.isArray(parameter) || typeof parameter == "object" ){
	    		
	    		if(Array.isArray(parameter)) {
	    			var branch = {
		    				eventType : 'branch',
		    				html      : html,
		    				parameter : parameter // does parameter need to be converted from scalar to array.
		    		};
	    			listener(branch);
	    		} else if(html instanceof NodeList){
	    			var branch = {
	    				eventType : 'branch',
	    				html      : html,
	    				parameter : parameter // does parameter need to be converted from scalar to array.
	    			};
	    			listener(branch);
	    		} else if(typeof parameter == "object" ){
	    			var branch = [];
	    			branch.eventType = 'branch';
	    			branch.html = html;
	    			branch.parameter = parameter;
	    			var i = 0; 
	    			for(var member in parameter ){
	    				var list = html.querySelectorAll("[dizid= "+member +"]");
	    				if(list.length > 0){
	    					var crossRef = {
	    						name :  member,
	    						htmls : list	
	    					};
	    					branch.push(crossRef);
	    					listener(branch);
	    				}
	    			}
	    		}
	    	} else {
	    	    listener({eventType :"twig", parameter: parameter, html: html})
	    	}
    	}
	    g(parameter, html);
    	
    }
}
var test36Title = "test36 'Single Element, Array' says that a <span> +  ['Hello', 'GoodBye'] ==> branch with span and ['Hello', 'GoodBye'] "
	function test36() {
		
	    var div  = document.createElement('div');
	    div.innerHTML = '<title >ignore this</title><div dizid=team> <div dizid=player><span dizid=firstName>Dizzy</span></div> <div dizid=player><span dizid=firstName>Paul</span></div> </div>';
	    var teamDiv = div.children[1].children[0];
	    var dizzyDiv = teamDiv.children[0];
	    var paulDiv = teamDiv.children[1];
	    // table - row - colum    table ID.caption
	    // row[0].column
	    
	    var teamQuery = {
	        	player:[{firstName:'', position:''}]
	        };
        
	    var eventQueue = [];
	    var listener = (event) => {eventQueue.push( event)};

	    
	    testGator.gait(teamQuery,div,listener);
		var event1 = eventQueue[0];
	    
		expect(event1.eventType).toBe("branch");
		expect(event1.html).toEqual(div);
		expect(event1.parameter).toEqual(teamQuery);
		// Two players =>
		expect(eventQueue[2].crossRef[0].htmls[0].innerText).toEqual("Dizzy");
		expect(eventQueue[3].crossRef[0].htmls[0].innerText).toEqual("Paul");
		

		var event2 = eventQueue[1];
		expect(event2.eventType).toBe("branch");
	     
	     /*
   var div  = document.createElement('div');
    div.innerHTML = '<div dizid=players><span dizid=firstName></span></div>';
    diz(div,{players:[{firstName: 'Dizzy'}]} );
    expect(div.innerHTML.toString()).toBe('<div dizid="players"><span dizid="firstName">Dizzy</span></div>');
    diz(div,{players:[{firstName: 'Dizzy'},{firstName: 'Paul'}]} );
    expect(div.innerHTML.toString()).toBe('<div dizid="players"><span dizid="firstName">Dizzy</span></div><div dizid="players"><span dizid="firstName">Paul</span></div>');

    diz(div,{players:[{firstName: 'Dizzy'},{firstName: 'Paul'},{firstName: 'Joe'}]} );
    expect(div.innerHTML.toString()).toBe('<div dizid="players"><span dizid="firstName">Dizzy</span></div><div dizid="players"><span dizid="firstName">Paul</span></div><div dizid="players"><span dizid="firstName">Joe</span></div>');

	    */	
	}
class TreeGator36 {
    constructor(dizid){
   	 this.dizid = (dizid != undefined) ? dizid : "dizid=";
    } 
    gait(parameter, html, listener){
	    function g(parameter,html,path){
	    	if(parameter == null || html == null){
	    	    listener({eventType :"End"});
	    	} else if(html instanceof NodeList || Array.isArray(parameter) || typeof parameter == "object" ){
	    		
	    		if(Array.isArray(parameter)) {
	    			var branch = {
		    				eventType : 'branch',
		    				html      : html,
		    				parameter : parameter, // does parameter need to be converted from scalar to array.
		    				path      : path.slice(0)
		    		};
	    			listener(branch);
	    			if(parameter.length > 0 && typeof parameter[0] == "object" ){
	    				for(var i = 0; i < parameter.length; i++){
	    					path.push ('[' + i + ']');
	    					g(parameter[i],html,path);
	    					path.pop();
	    				}
	    			}
	    		} else if(html instanceof NodeList){
	    			if(typeof parameter == "object" ){
	    				var nodeList = html;
	    				for (var nodeid=0; nodeid < nodeList.length; nodeid++){
	    					path.push("node(" + nodeid+1 +")" );
	    					g(parameter, nodeList[nodeid], path);
	    					path.pop();
	    				}
	    			}else {
		    			var branch = {
		    				eventType : 'branch',
		    				html      : html,
		    				parameter : parameter, // does parameter need to be converted from scalar to array.
		    				path      : path.slice(0)
		    			};
		    			listener(branch);
	    			}
	    		} else if(typeof parameter == "object" ){
	    			var branch = {
		    				eventType : 'branch',
		    				html      : html,
		    				parameter : parameter, // does parameter need to be converted from scalar to array.
		    				path      : path.slice(0),
		    				crossRef  : []
		    			};
	    			var i = 0; 
	    			for(var member in parameter ){
	    				var list = html.querySelectorAll("[dizid= "+member +"]");
	    				if(list.length > 0){
	    					var crossRef = {
	    						member :  member,
	    						htmls : list
	    					};
	    					branch.crossRef.push(crossRef);
	    				}
	    			}
					listener(branch);
					for(let crossRef of branch.crossRef ){
	    				if(typeof parameter[crossRef.member] == "object" || Array.isArray(parameter[crossRef.member])){
	    					path.push(crossRef.member);
	    					g(parameter[crossRef.member],crossRef.htmls, path);
	    					path.pop();
	    				}
	    			}
	    		}
	    	} else {
	    	    listener({eventType :"twig", parameter: parameter, html: html})
	    	}
    	}
	    g(parameter, html,[]);
    	
    }
}
function decodeParm(p){
	if(Array.isArray (p) && p.length > 1) {
		return "[0] " + decodeParm( p[0]) + " ..."
	}
	var msg = ''
	for (prop in msg ){
		msg+ prop + ": " +decodeParm(msg[prop]);
	}
	return p.toString();
}
var hops = 0;
function printHop(title, hop ){
	if(hop != undefined ){
		var pathMsg = "";
		if(hop.memberHtmls != undefined ){
			for(var memberHtml of hop.memberHtmls){
				pathMsg += memberHtml.member + ' was "' +hop.parameter[memberHtml.member] + "' = "+ memberHtml.htmls[0].innerHTML + "\n";
			}
		} else if(hop.html instanceof NodeList) {
			for(var i = 0; i < hop.html.length; i++){
				pathMsg = pathMsg +"\n ...";
				pathMsg = pathMsg + hop.html[i].outerHTML;
			}
		}
		
		var msg = hops + " "+ title + " " + hop.landingTree[0]+ " "  + hop. branchType[0]+ " "  + JSON.stringify(hop.parameter) + JSON.stringify(hop.path) + " "+   pathMsg ;
		console.log(msg);
	}
}
var test37Title = "test3 'prinvar hops = 1;t hops "
	function test37() {
		
	    var div  = document.createElement('div');
	    div.innerHTML = '<title >ignore this</title><div dizid=team><span dizid=teamName>Carinals</span><div dizid=coach><span dizid=firstName>Frank</span> <span dizid=lastName>Frisch</span>  </div>  <div dizid=player><span dizid=firstName>Dizzy</span></div> <div dizid=player><span dizid=firstName>Paul</span></div> </div>';
	    var teamDiv = div.children[1].children[0];
	    var dizzyDiv = teamDiv.children[0];
	    var paulDiv = teamDiv.children[1];
	    // table - row - colum    table ID.caption
	    // row[0].column
	    
	    var teamQuery = {
	        	teamName: '',
	        	coach: [{firstName:'', lastName:''}],
	    		player:[{firstName:'', position:''}]
	            
	        };
        

	    var listener = (hopFrom, hopTo) => {
	    	hops++;
	    	//printHop("from", hopFrom);
	    	printHop("to  ", hopTo);
	    	console.log("");
	   	    
	    };

	    
	    testGator.gait(teamQuery,div,listener);
	    
	    /*
	     * a.forEach(function(element) {
    console.log(element);
});

	     */
	     
	}
var ground         = [["ground"], ["Ground"]];
var parameterTree  = [["parameter"], ["Tree"]];
var htmlTree       = [["html"],[ "Tree"]];
var arrayBranch    = [["array"],[ "Branch"]];
var objectBranch   = [["object"],[ "Branch"]];
var nodeListBranch = [["nodeList"],[ "Branch"]];

	
class Hop {
	// landingTree = parmTree, htmlTree
	constructor(landingTree, branchType, html, parameter, path ){
		this.landingTree = (landingTree === ground || landingTree === parameterTree || landingTree === htmlTree) ? landingTree : null;
		this.branchType  = (branchType === ground ||branchType === arrayBranch ||branchType === objectBranch ||branchType === nodeListBranch) ? branchType: null ;
		this.html = html;
		this.parameter = parameter;
		this.path = path.slice(0);
		if(branchType === objectBranch ){
			var htmlList = [];
			if(html instanceof Element) {
				htmlList = [html]
			}
			if(html instanceof NodeList){
				htmlList = html;
			}
			var items = [];
			for(var htmlOfList of htmlList ) {
				for(var member in parameter){
					var list = htmlOfList.querySelectorAll("[dizid= "+member +"]");
					if(list.length > 0){
						items.push({member :  member,htmls : list});
					}
				}
			}
			if(items.length > 0) {
			    this.memberHtmls = items;
			}
		}
		this.children = [];
	}
	hop( childIndex){
		return(this.children[childIndex]);
	}
	hops(){
		return this.children;
	}
}
 var hoppingfromTo = (hopFrom, hopTo) => {
	 if(hopFrom != null && hopTo != null) { 
		 hopFrom.children.push(hopTo); 
     }
 };
class TreeGator37 {
    constructor(dizid){
		this.dizid = (dizid != undefined) ? dizid : "dizid=";
		this.gait = this.climb;
		this.hopListeners = [hoppingfromTo];
    } ;
    
    broadcast(hopfrom, hopTo){
    	for(var i = 0; i < this.hopListeners.length; i++ ){
    		this.hopListeners[i](hopfrom, hopTo);
    	}
    }
    climb(parameter, html, hopListener){
    	if(parameter == null || html == null){
    		return '';
    	}
    	if(hopListener != null){
    		this.hopListeners.push(hopListener);
    	}
    	var firstHop = new Hop(ground,ground,html,parameter, [] );
    	var lastHop = this.climbing(firstHop);
    	this.broadcast(lastHop, null);
    	return lastHop;
    }
    climbing(lastHop){
    	
/*
 * container logic
 * - create Hop for container.
 * - filter HTML for this container
 * -      Arrays create sets of twins
 * -      objects create memberlists
 *   if no-children broadcast(last hop, container hop, only hop)
 *   else 
 * - broadcast(last Hop, to <container>Hop, begin - the listener can adjust HTML
 * - for each child with html
 * -  modify <container>Hop path for child
 * -  climb( childHop )
 * - broadcast(last Hop, to <container>Hop, end 
 *    
 * scalar logic
 * - create Hop for scalar
 * - broadcast(last Hop, to <scalar> Hop only hop
 */    	
        if(lastHop.html instanceof NodeList || Array.isArray(lastHop.parameter) || typeof lastHop.parameter == "object" ){
    		if(Array.isArray(lastHop.parameter)) {
    			var arrayHop = new Hop(parameterTree,arrayBranch, lastHop.html, lastHop.parameter, lastHop.path );
                this.broadcast(lastHop, arrayHop);// A listener can resize the array.
                lastHop = null;
                // are there complex children of Array?
    			if(arrayHop.parameter.length > 0 && typeof arrayHop.parameter[0] == "object" ){
    				for(var i = 0; i < arrayHop.parameter.length; i++){
    					var elementHop = new Hop(parameterTree, objectBranch, arrayHop.html, arrayHop.parameter[i], arrayHop.path );
    					elementHop.path.push ( i );
    					this.broadcast(arrayHop, elementHop);
    					if(elementHop.memberHtmls != undefined ){
    					    this.climbing(elementHop);
    					}
    				}
    			}
    			this.broadcast(arrayHop, null);
    		} else if(lastHop.html instanceof NodeList){
    			var nodeListHop = new Hop(htmlTree,nodeListBranch,lastHop.html, lastHop.parameter, lastHop.path );
    			this.broadcast(lastHop, nodeListHop);
    			lastHop = null;
    			if(typeof nodeListHop.parameter == "object" ){
    				var nodeList = nodeListHop.html;
    				for (var nodeid=0; nodeid < nodeList.length; nodeid++){
    					var elementHop = new Hop(parameterTree, objectBranch, nodeList[nodeid],nodeListHop.parameter, nodeListHop.path );
    					elementHop.path.push( nodeid );
    					this.broadcast(nodeListHop,elementHop);
    					this.climbing(elementHop);
    					if(elementHop.memberHtmls.length > 0){
    					    this.climbing(elementHop);
    					}
    				}
    			}
    			this.broadcast(nodeListHop, null);
    		} else if(typeof lastHop.parameter == "object" ){
    			var objectHop;
    			if (lastHop.landingTree == ground){ 
    				// First object
    				objectHop = new Hop(parameterTree, objectBranch, lastHop.html, lastHop.parameter, lastHop.path);
    				if(objectHop.memberHtmls.length > 0){
    				    this.broadcast(lastHop, objectHop);
    				}
    			} else {
    				objectHop = lastHop;
    			}
    			lastHop = null;
				for(let memberHtmls of objectHop.memberHtmls ){
    				if(typeof objectHop.parameter[memberHtmls.member] == "object" || Array.isArray(objectHop.parameter[memberHtmls.member])){
    					// objectHop.parameter "{"teamName":"","coach":[{"firstName":"","lastName":""}],"player":[{"firstName":"","position":""}]}"
    					// coach is an array.
    					var memberHop = new Hop(parameterTree, objectBranch,  memberHtmls.htmls, objectHop.parameter[memberHtmls.member], objectHop.path);
    					memberHop.path.push(memberHtmls.member);
    					this.broadcast(objectHop, memberHop);
    					this.climbing(memberHop);
    				}
    			}
				if(objectHop.memberHtmls.length > 0){
				    this.broadcast(objectHop, null);
				}
    		}
    	} 
	}
    	
}
var test38Title = "test3 'element1.element2.element3";

	function test38() {
		
	    var div  = document.createElement('div');
	    div.innerHTML = '<dimension1><dimension2><dimension3>baby</dimension3></dimension2></dimension1>';
	    var child0 = div.children[0];
	    var grandchild0 = child0.children[0];
	    var greatgrandchild0 = grandchild0.children[0];

	    
	    var query1 = {
	        	dimension1: ''
	            
	        };
	    var query2 = {
	        	dimension1: {dimension2: ''}
	            
	        };

	    var query3 = {
	        	dimension1: {dimension2: {dimension3: ''}}
	            
	        };
        
        var hopQueue = [];
	    var listener = (hopFrom, hopTo) => {
	    	hops++;
	    	//printHop("from", hopFrom);
	    	printHop("to  ", hopTo);
	    	console.log("");
	    	hopQueue.push(hopTo);
	   	    
	    };

	    
	    var hop1 = new Hop38(div, "dimension1","dimension1");
	    expect(hop1.dimension).toBe("dimension1");
	    expect(hop1.html[0]).toBe(div.children[0]);
	    
	    var hop2 = new Hop38(hop1.html, "dimension2", "dimension2");
	    expect(hop2.dimension).toBe("dimension2");
	    expect(hop2.html[0][0]).toBe(div.children[0].children[0]);
	    
	    var hop3 = new Hop38(hop2.html, "dimension3", "dimension3");
	    expect(hop3.dimension).toBe("dimension3");
	    expect(hop3.html[0][0][0]).toBe(div.children[0].children[0].children[0]);
    

 	}
	var test39Title = "14 nodes	";
// Title: The Complete Idiot's Guide to Projection of a Function of Space of Dimension M to a Universe of Dimension N Producing a Function of Space of Dimension N+1: Tregation.
// A Treegation is the relationship function of N dimensional space. The example:treeGator has N+1 dimensions that is 4 dimensions.
// SubTitle: The Complete Idiot's Guide to Treegation.	
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array	
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections	
function test39() {	
	// Example where N is 3 and M is not specified.
	
	//                Universe M                                                                   Universe of N dimensions 
	//               /         \                   ... other dimensions ...
	//            1               8               dimension 1 has Two measurements                      [1, 8]
	//          /   \           /    \            ... other dimensions ...
	//        2      3        9       10          dimension 2 has Four measurements          [ [2,   3]        [9, 10] ]  
	//       /\      /\      /\       /\          ... other dimensions ...                 
	//      4  5    6  7    11 12   13  14        dimension 3 has Eight measurements  [  [ [4,5] [6, 7] ]   [  [11, 12] [13, 14] ]  ]
	
	//  This tree has been copyrighted, just kidding.
	//

	// *****First measurments**             ***** Last measurements****  
	// hop1[0]                == 1          hop1[1]            == 8
	// hop2[0][0]             == 2          hop2[1][1]         == 10
	// hop3[0][0][0]          == 4          hop3[1][1][1]      == 14
	
	// treeGator = new TreeGator([hop1, hop2, hop3])
	// measure(treeGator[0][0])              == 1
	// measure(treeGator[1][0][0])           == 2
	// measure(treeGator[2][0][0][0])        == 4
    var div  = document.createElement('div');
    div.innerHTML =	"<div>Universe M" + 
	"  <otherdimension1>" + 
	"  <dimension1>1 " + 
	"      <otherdimension2>" + 
	"	  <dimension2>2 " + 
	"	     <otherdimension3>" + 
	"		 <dimension3>4</dimension3> " + 
	"		 <dimension3>5</dimension3>" + 
	"		 </otherdimension3>" + 
	"		 </dimension2> " + 
	"	  <dimension2>3" + 
	"	     <otherdimension4>" + 
	"		 <span dizid=dimension3>6</span>" + 
	"		 <span dizid=dimension3>7</span>" + 
	"		 </otherdimension4>" + 
	"	  </dimension2>" + 
	"	  </otherdimension2>" + 
	"  </dimension1>" + 
	"  <dimension1>8 " + 
	"	  <dimension2>9 " + 
	"		 <dimension3>11</dimension3> " + 
	"		 <dimension3>12</dimension3></dimension2> " + 
	"	  <dimension2>10" + 
	"		 <dimension3>13</dimension3>" + 
	"		 <dimension3>14</dimension3>" + 
	"	  </dimension2>" + 
	"  </dimension1>" + 
	"  </otherdimension1>" + 
	"</div>";
	console.log(div.innerText); 
	var measure = (node) => {
		  const nodes = Array.from(node.childNodes).filter(f => f.nodeName === '#text');
		  return nodes.length ? nodes[0].textContent.trim() : '';
		}
    var hop1 = new Hop38(div      , "dimension1","dimension1");
    var hop2 = new Hop38(hop1.html, "dimension2","dimension2");
    var hop3 = new Hop38(hop2.html, "dimension3","dimension3");
    // *******FIRST MEASUREMENT **************                *******LAST MEASUREMENT **************                                
    expect(measure(hop1.html[0]))      .toEqual( "1" );       expect(measure(hop1.html[1])).toEqual       (  "8" );                           
    expect(measure(hop2.html[0][0]))   .toEqual( "2" );       expect(measure(hop2.html[1][1])).toEqual    ( "10" );                          
    expect(measure(hop3.html[0][0][0])).toEqual( "4" );       expect(measure(hop3.html[1][1][1])).toEqual ( "14" );    
    
    // test 40: Can we measure the bottom row?
    //expect(hop3.flatHtml.map(measure).toEqual( [ "4", "5", '6', '7', '11', '12', '13', '14' ] );      
	
}

	
function nodeListToArray( nodeList){
	var array=[];
	nodeList.forEach((node) => array.push(node));
	return array;
	
}	
class Hop38 {
		constructor(htmlPool, parameter, selector ){
			if(selector == undefined){
				this.selector = "[dizid="+ parameter +"]";
			}else {
				this.selector = selector;
			}
			this.dimension = parameter;
			this.html = this.selectHtml(htmlPool);
		}
		selectHtml(htmlPool){
			if(htmlPool instanceof Element){
				return nodeListToArray(htmlPool.querySelectorAll(this.selector));
			}else if (Array.isArray(htmlPool) ){
				return htmlPool.map( (smallerPool) => this.selectHtml(smallerPool));
			}
		}

}	
	

var test40Title = "Simple and complex relationships	";
//Title: The Complete Idiot's Guide to "Projection of a Tree of Dimension M to a Tree of Dimension N Producing a Function of Space of Dimension N aka Treegation".
//A Treegation is the relationships in N dimensional space. 
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array	
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections	
function test40() {	
	// Example where N is 3 and M is not specified.
	
	//                Universe M                                                                   Universe of N dimensions 
	//               /           \                 ... other dimensions ...
	//            1               8              dimension 1 has Two measurements                      [1, 8]
	//          /   \           /   \            ... other dimensions ...
	//        2      3        9      10          dimension 2 has Four measurements          [ [2,   3]        [9, 10] ]  
	//       /\      /\      /\      /\          ... other dimensions ...                 
	//      4  5    6  7    11 12  13  14        dimension 3 has Eight measurements  [  [ [4,5] [6, 7] ]   [  [11, 12] [13, 14] ]  ]
	
	//  This tree has been copyrighted, just kidding.
	//

	// *****First measurments**             ***** Last measurements****  
	// hop1[0]                == 1          hop1[1]            == 8
	// hop2[0][0]             == 2          hop2[1][1]         == 10
	// hop3[0][0][0]          == 4          hop3[1][1][1]      == 14
	
	// treegation = new TreeGator(hop1, hop2, hop3)
	// measure( treegation(0)     )          == 1
	// measure( treegation(0,0)   )          == 2
	// measure( treegation(0,0,0) )          == 4
 var div  = document.createElement('div');
 div.innerHTML =	"<div>Universe M" + 
	"  <otherdimension1>" + 
	"  <dimension1>1 " + 
	"      <otherdimension2>" + 
	"	  <dimension2>2 " + 
	"	     <otherdimension3>" + 
	"		 <dimension3>4</dimension3> " + 
	"		 <dimension3>5</dimension3>" + 
	"		 </otherdimension3>" + 
	"		 </dimension2> " + 
	"	  <dimension2>3" + 
	"	     <otherdimension4>" + 
	"		 <dimension3>6</dimension3>" + 
	"		 <dimension3>7</dimension3>" + 
	"		 </otherdimension4>" + 
	"	  </dimension2>" + 
	"	  </otherdimension2>" + 
	"  </dimension1>" + 
	"  <dimension1>8 " + 
	"	  <dimension2>9 " + 
	"		 <dimension3>11</dimension3> " + 
	"		 <dimension3>12</dimension3></dimension2> " + 
	"	  <dimension2>10" + 
	"		 <dimension3>13</dimension3>" + 
	"		 <dimension3>14</dimension3>" + 
	"	  </dimension2>" + 
	"  </dimension1>" + 
	"  </otherdimension1>" + 
	"</div>";
	console.log(div.innerText); 
	var measure = (node) => {
		  const nodes = Array.from(node.childNodes).filter(f => f.nodeName === '#text');
		  return nodes.length ? nodes[0].textContent.trim() : '';
		};
	var complexMeasure =(html) => {
		if(Array.isArray(html)){
			var complex = html;
			var complexResult =  complex.map(complexMeasure);
			return complexResult;
			
		}else {
			var simple = html;
			return measure (simple);
		}
	};
	
	function  jsonExpect(value, expectedValue){
		var valueJson = JSON.stringify(value);
		var expectedJson = JSON.stringify(expectedValue);
		expect(valueJson).toEqual(expectedJson);
	}
 var hop1 = new Hop40(div         , "dimension1","dimension1");
 var hop2 = new Hop40(hop1.complex, "dimension2","dimension2");
 var hop3 = new Hop40(hop2.complex, "dimension3","dimension3");
 // *******FIRST MEASUREMENT **************                   *******LAST MEASUREMENT **************                                
 expect(measure(hop1.complex[0]))      .toEqual( "1" );       expect(measure(hop1.complex[1])).toEqual       (  "8" );                           
 expect(measure(hop2.complex[0][0]))   .toEqual( "2" );       expect(measure(hop2.complex[1][1])).toEqual    ( "10" );                          
 expect(measure(hop3.complex[0][0][0])).toEqual( "4" );       expect(measure(hop3.complex[1][1][1])).toEqual ( "14" );    
 // complex measurement
 
 expect(complexMeasure(hop1.complex) )     .toEqual(           [ "1",                             "8" ] );                           
 expect(complexMeasure(hop2.complex) )     .toEqual(     [ ["2",       "3"],              ["9",          "10"] ]   );                           
 expect(complexMeasure(hop3.complex) )     .toEqual([  [ ['4','5'], ['6', '7'] ],   [  ['11', '12'], ['13', '14'] ]  ] );                           
 
 // simple measurements
 expect(hop1.simple.map(measure)).toEqual( [        "1",                      "8"           ] ); 
 expect(hop2.simple.map(measure)).toEqual( [   "2",        "3",         '9',         '10'    ] ); 
 expect(hop3.simple.map(measure)).toEqual( [ "4", "5",   '6', '7',   '11', '12',  '13', '14' ] );        
	
}

//line 726  Hop 38 has "html" which has the html and "flatHtml" which also has the html.
//What is the difference?  "html" includes the Relation from dimension2 to dimension3. "flatHtml" removes that information.
//OK. Hop39 changes "html"     "complex" 
//                "flatHtml"   "simple" 
//                "selecHtml"  "discoverRelation"
//                "parameter"  "dimension"
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



class TreeGator41 {
    constructor(dizid){
		this.dizid = (dizid != undefined) ? dizid : "dizid=";
		this.gait = this.climb;
		this.hopListeners = [hoppingfromTo];
    } ;
    
    broadcast(hopfrom, hopTo){
    	for(var i = 0; i < this.hopListeners.length; i++ ){
    		this.hopListeners[i](hopfrom, hopTo);
    	}
    }
    climb(parameter, html, hopListener){
    	if(parameter == null || html == null){
    		return '';
    	}
    	if(hopListener != null){
    		this.hopListeners.push(hopListener);
    	}
    	
    	var firstHop = new Hop38(ground,ground,html.querySelectorAll(':root'),parameter, [] );
    	var lastHop = this.climbing(firstHop);
    	this.broadcast(lastHop, null);
    	return lastHop;
    }    
    climbing(lastHop , childPath, childNodeList, childParameter){
    	
    	/*
    	 * container logic
    	 * - create Hop for container.
    	 * - filter HTML for this container
    	 * -      Arrays create sets of twins
    	 * -      objects create memberlists
    	 *   if no-children broadcast(last hop, container hop, only hop)
    	 *   else 
    	 * - broadcast(last Hop, to <container>Hop, begin - the listener can adjust HTML
    	 * - for each child with html
    	 * -  modify <container>Hop path for child
    	 * -  climb( childHop )
    	 * - broadcast(last Hop, to <container>Hop, end 
    	 *    
    	 * scalar logic
    	 * - create Hop for scalar
    	 * - broadcast(last Hop, to <scalar> Hop only hop
    	 */    	
    }	


    
}
describe("Test Dizzy Suite 31-40", function() {
//	testGator = new TreeGator31();
//    it(test31Title, test31);
//    
//    testGator = new TreeGator32();
//    it(test31Title, test31);
//    it(test32Title, test32);
//    testGator = new TreeGator33();
//    it(test31Title, test31);
//    it(test32Title, test32);
//    it(test33Title, test33);

//    testGator = new TreeGator34(); 
//    it(test31Title, test31);
//    it(test32Title, test32);
//    it(test33Title, test33);   
//    it(test34Title, test34);  
//    it(test35Title, test35);
//    testGator = new TreeGator35(); 
//    it(test31Title, test31);
//    it(test32Title, test32);
//    it(test33Title, test33);   
//    it(test34Title, test34);  
//    it(test35Title, test35);
//
//    testGator = new TreeGator36(); 
//
//    it(test31Title, test31);
//    it(test32Title, test32);
//    it(test33Title, test33);   
//    it(test35Title, test35);
//    it(test36Title, test36);

   // testGator = new TreeGator38(); 

//    it(test31Title, test31);
//    it(test32Title, test32);
//    it(test33Title, test33);   
//    it(test35Title, test35);
//    it(test36Title, test36);
//    it(test37Title, test37);
    it(test38Title, test38);
    it(test39Title, test39);
    it(test40Title, test40);
    
});	