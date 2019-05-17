var tester6;
var test61Title = "test27 Test Array/objects"
	function test61() {
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
    tester6.diz(div, team);

   // expect(div.innerHTML).toEqual('<div dizid="players"><div name="rowdiv"> <span dizid="firstName">Dizzy</span> <span dizid="position">pitcher</span> </div> </div>');

    var teamQuery = {
    	players:[{firstName:'', position:''}]
    }
    tester6.diz(teamQuery,div);

    expect(teamQuery).toEqual(teamQuery);
    console.log(teamQuery.html);
    console.log(teamQuery.showPlayers(0));
    console.log(teamQuery.players[0].html);
    console.log(teamQuery.players[0].firstNameHtml);
    console.log(teamQuery.players[0].positionHtml);
}

function initCap(str){
	return  str[0].toUpperCase() +str.slice(1);
}
function createIndexedHtml ( member){
	function memberHtml( index) {
		debugger;
	    return this[member][index].html;
	}
	return memberHtml;
}

class Communicator extends TreeGator57 {
	constructor(shouldAddShow){
		super();
		this.shouldAddShow = shouldAddShow;
	}
	dizParameterObjectHtml(parameter, html){
		parameter["html"] = html;
		for(var member in parameter ){
			var hop = new Hop55(html,member,":not(template)>:not(template)["+this.dizid +member +"]"); 
	    	if(hop.setsOfTwins.length == 1){
			    parameter[member] = this.dizParameterHtml(parameter[member],hop.setsOfTwins[0]);  
	    	}
			if( hop.simpleHtml.length >0 ){
				if(Array.isArray(parameter[member]) ){
					if(this.shouldAddShow ){
					    parameter["show"+initCap(member)] = createIndexedHtml(member);
					}
				} else {
				    parameter[member+"Html"] = hop.simpleHtml[0];
				}
			}
		}
		return parameter;
	}
}


var test62Title = "test62 Test Navigator"
	function test62() {
	   var testerNavigator = new Navigator();
	   var div  = document.createElement('div');
	   div.innerHTML = '<trunk><branch><twig></twig></branch></trunk>';
	   testerNavigator.diz(div,{twig:[ 'apple', 'banana', 'cherry']});
       expect(div.innerHTML.toString()).toBe('<trunk><branch><twig>apple</twig><twig>banana</twig><twig>cherry</twig></branch></trunk>');
       var twig2 ={twig:[]};
       testerNavigator.diz(twig2,div);
       expect(twig2).toEqual({twig:[ 'apple', 'banana', 'cherry']});
       
}
class Navigator extends  TreeGator57 {
	buildHop(html,parameter, member, settingHtml){
		if(settingHtml){
			return new Hop56(html, member,member);
		}else {
			return new Hop56(html, member,":not(template)>:not(template) "+member );
		}
	}
}

/*
 * 	buildHop(html,parameter, member, settingHtml){
		if(settingHtml){
			return new Hop56(html, member,"["+this.dizid +member +"]");
		}else {
			return new Hop56(html, member,":not(template)>:not(template)["+this.dizid +member +"]");
		}
	}
 */



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
	tester6 = new Communicator(true);
    it(test61Title, test61);
});	 