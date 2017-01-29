var player = { player: { firstName: "Dizzy", lastName:  "Dean", position:  "Pitcher" }}
		 
var template 

var diz  = function (){
	return ""
}
var test1Title = "test1: 'Null Test' says that an empty html template and with no parameters produces an empty document"
function test1() {
	 expect(diz(null, null)).toBe("")
}

var test2Title = "test2 'Single Element, Single String' says that a <span> +  'Hello World' ==> <span>Hello World</span> "
	function test2() {
	     var div  = document.createElement('div')
	     var span = document.createElement('span')
	     div.appendChild(span)
	     diz(span,"Hello World")
		 expect(div.innerHTML).toBe("<span>Hello World</span>")
	}

describe("Test Dizzy Suite 1", function() {
  it(test1Title, test1)
})

diz = function (htmlElement, parameter){
	if(htmlElement == null) {
		return ''
	}
	htmlElement.innerText = parameter
}

describe("Test Dizzy Suite 2", function() {
	  it(test1Title, test1)
	  it(test2Title, test2)
	})

var test3Title = "test3 'Double Element, Single String' says that a <span><span> +  'Hello World' ==> <span>Hello World</span><span>Hello World</span>  "
	function test3() {
	     var div  = document.createElement('div')
	     var span1 = document.createElement('span')
	     var span2 = document.createElement('span')
	     div.appendChild(span1)
	     div.appendChild(span2)
	     var spans = div.querySelectorAll("span")
	     diz(spans,"Hello World")
		 expect(div.innerHTML).toBe("<span>Hello World</span><span>Hello World</span>")
	}
// search "javascript test type of object" http://javascript.info/tutorial/type-detection
// search "NodeList" https://developer.mozilla.org/en-US/docs/Web/API/NodeList
diz = function (html, parameter){
	if(html == null) {
		return ''
	}
	if(html instanceof NodeList){
		var nodeList = html
		for(var i = 0; i < nodeList.length; i++  ){
			var node = nodeList[i]
			diz(node,parameter)
		}
		
	} else {
	    html.innerText = parameter
	}
}

describe("Test Dizzy Suite 3", function() {
	 it(test1Title, test1)
	 it(test2Title, test2)
	 it(test3Title, test3)
	})

var test4Title = "test4 'HTML Tree ,Object' says <span dizid=firstName/> {firstName: Dizzy} ==> <span dizid=firstName>Dizzy</span>  "
	function test4() {
	     var div  = document.createElement('div')
	     div.innerHTML = '<span dizid=firstName></span>'
         diz(div,{firstName: 'Dizzy'} )
         var check = div.innerHTML.toString()
		 expect(div.innerHTML.toString()).toBe("<span dizid=\"firstName\">Dizzy</span>")
	}
diz = function (html, parameter){
	if(html == null) {
		return ''
	}
	if(html instanceof NodeList){
		var nodeList = html
		for(var i = 0; i < nodeList.length; i++  ){
			var node = nodeList[i]
			diz(node,parameter)
		}
		
	} else if(typeof parameter == "object"  ){
		for(var member in parameter ){
			var list = html.querySelectorAll("[dizid= "+member +"]")
			if(list.length > 0){
				diz(list, parameter[member])
			}
		}
	} else 	{
	    html.innerText = parameter
	}
}
describe("Test Dizzy Suite 4", function() {
	 it(test1Title, test1)
	 it(test2Title, test2)
	 it(test3Title, test3)
	 it(test4Title, test4)
	})

var test5Title = "test5 'Single Element, Array' says that a <span> +  ['Hello', 'GoodBye'] ==> <span>Hello</span><span>Goodbye</span> "
	function test5() {
	     var div  = document.createElement('div')
	     var span = document.createElement('span')
	     div.appendChild(span)
	     diz(span,["Hello","Goodbye"])
		 expect(div.innerHTML).toBe("<span>Hello</span><span>Goodbye</span>")
	}

//search ' detect array in javascript'
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
diz = function (html, parameter){
	if(html == null) {
		return ''
	}
	if(html instanceof NodeList){
		var nodeList = html
		for(var i = 0; i < nodeList.length; i++  ){
			var node = nodeList[i]
			diz(node,parameter)
		}
		
	}else if(Array.isArray(parameter) && parameter.length >0){
		var parameters = parameter
		var parentElement = html.parentElement
		var insertionPoint = html.nextSibling
		for(var i = 1; i < parameters.length; i++){
			var sib = html.cloneNode(true)
			diz(sib,parameters[i])
			if(insertionPoint == null){
				parentElement.appendChild(sib)
			} else {
				parentElement.insertBefore(sib, insertionPoint)
			}
		}
		diz(html,parameters[0])
		
	}else if(typeof parameter == "object"  ){
		for(var member in parameter ){
			var list = html.querySelectorAll("[dizid= "+member +"]")
			if(list.length > 0){
				diz(list, parameter[member])
			}
		}
	} else 	{
	    html.innerText = parameter
	}
}
describe("Test Dizzy Suite 5", function() {
	 it(test1Title, test1)
	 it(test2Title, test2)
	 it(test3Title, test3)
	 it(test4Title, test4)
	 it(test5Title, test5)
	})

var test6Title = "test6 'Add 3 Players, Remove 3 Players"
function test6() {
    var div  = document.createElement('div')
    div.innerHTML = '<div dizid=players><span dizid=firstName></span></div>'
    diz(div,{players:[{firstName: 'Dizzy'}]} )
    expect(div.innerHTML.toString()).toBe('<div dizid="players"><span dizid="firstName">Dizzy</span></div>')
    diz(div,{players:[{firstName: 'Dizzy'},{firstName: 'Paul'}]} )
    expect(div.innerHTML.toString()).toBe('<div dizid="players"><span dizid="firstName">Dizzy</span></div><div dizid="players"><span dizid="firstName">Paul</span></div>')

    diz(div,{players:[{firstName: 'Dizzy'},{firstName: 'Paul'},{firstName: 'Joe'}]} )
    expect(div.innerHTML.toString()).toBe('<div dizid="players"><span dizid="firstName">Dizzy</span></div><div dizid="players"><span dizid="firstName">Paul</span></div><div dizid="players"><span dizid="firstName">Joe</span></div>')

}

diz = function (html, parameter){
	if(html == null) {
		return ''
	}
	if(html instanceof NodeList){
		var nodeList = html
		for(var i = 0; i < nodeList.length; i++  ){
			var node = nodeList[i]
			diz(node,parameter)
		}
		
	}else if(Array.isArray(parameter) && parameter.length >0){
		var parameters = parameter
		var parentElement = html.parentElement
		var insertionPoint = html.nextSibling
		for(var i = 1; i < parameters.length; i++){
			var sib = html.cloneNode(true)
			diz(sib,parameters[i])
			if(insertionPoint == null){
				parentElement.appendChild(sib)
			} else {
				parentElement.insertBefore(sib, insertionPoint)
			}
		}
		diz(html,parameters[0])
		
	}else if(typeof parameter == "object"  ){
		for(var member in parameter ){
			var list = html.querySelectorAll("[dizid= "+member +"]")
			if(list.length > 0){
				diz(list, parameter[member])
			}
		}
	} else 	{
	    html.innerText = parameter
	}
}
describe("Test Dizzy Suite 6", function() {
	 it(test1Title, test1)
	 it(test2Title, test2)
	 it(test3Title, test3)
	 it(test4Title, test4)
	 it(test5Title, test5)
     it(test6Title, test6)

	})

var test7Title = "test7 'Apple, Banana, Cherry Tree'"
	function test7() {
	    var div  = document.createElement('div')
	    div.innerHTML = '<trunk><branch><twig></twig><twig></twig></branch><branch><twig></twig><twig></twig></branch></trunk>'
	    var twigs = div.querySelectorAll('twig')
	    diz(twigs,['apple', 'banana', 'cherry'] )
	    var fruitTwigs = div.querySelectorAll('twig')
	   
	    expect(div.innerHTML.toString()).toBe('<trunk><branch><twig>apple</twig><twig>banana</twig><twig>cherry</twig></branch><branch><twig>apple</twig><twig>banana</twig><twig>cherry</twig></branch></trunk>')
	   
	}
console.log('report')
var data  = '	Tex Carleton	 \n' +
'	Ripper Collins	 \n' +
'	Pat Crawford	 \n' +
'	Kiddo Davis	 \n' +
'	Spud Davis	 \n' +
'	Dizzy Dean 	 \n' +
'	Paul Dean	 \n' +
'	Bill DeLancey	 \n' +
'	Leo Durocher 	 \n' +
'	Frankie Frisch 	 \n' +
'	Chick Fullis	 \n' +
'	Burleigh Grimes 	 \n' +
'	Jesse Haines 	 \n' +
'	Bill Hallahan	 \n' +
'	Francis Healy	 \n' +
'	Clarence Heise	 \n' +
'	Jim Lindsey	 \n' +
'	Pepper Martin	 \n' +
'	Joe Medwick 	 \n' +
'	Buster Mills	 \n' +
'	Jim Mooney	 \n' +
'	Gene Moore	 \n' +
'	Ernie Orsatti	 \n' +
'	Flint Rhem	 \n' +
'	Lew Riggs	 \n' +
'	Jack Rothrock	 \n' +
'	Dazzy Vance 	 \n' +
'	Bill Walker	 \n' +
'	Burgess Whitehead	 \n' +
'	Jim Winford	 \n' +
'	Red Worthington	 \n' 
var names = data.split(/\n/)
for(var i = 0; i < names.length; i++){
	var line = names[i]
	var n = line.trim(). split(' ')
//	console. log("{firstName : '" +n[0] +"' lastName : '" + n[1] + "' },")
	
}

var roster = {player : [
{firstName : 'Tex' , lastName : 'Carleton' },
{firstName : 'Ripper' , lastName : 'Collins' },
{firstName : 'Pat' , lastName : 'Crawford' },
{firstName : 'Kiddo' , lastName : 'Davis' },
{firstName : 'Spud' , lastName : 'Davis' },
{firstName : 'Dizzy' , lastName : 'Dean', quotes : ['Sin Tax. Those fellers in Washington will tax anything', ]},
{firstName : 'Paul' , lastName : 'Dean' },
{firstName : 'Bill' , lastName : 'DeLancey' },
{firstName : 'Leo' , lastName : 'Durocher' },
{firstName : 'Frankie' , lastName : 'Frisch' },
{firstName : 'Chick' , lastName : 'Fullis' },
{firstName : 'Burleigh' , lastName : 'Grimes' },
{firstName : 'Jesse' , lastName : 'Haines' },
{firstName : 'Bill' , lastName : 'Hallahan' },
{firstName : 'Francis' , lastName : 'Healy' },
{firstName : 'Clarence' , lastName : 'Heise' },
{firstName : 'Jim' , lastName : 'Lindsey' },
{firstName : 'Pepper' , lastName : 'Martin' },
{firstName : 'Joe' , lastName : 'Medwick' },
{firstName : 'Buster' , lastName : 'Mills' },
{firstName : 'Jim' , lastName : 'Mooney' },
{firstName : 'Gene' , lastName : 'Moore' },
{firstName : 'Ernie' , lastName : 'Orsatti' },
{firstName : 'Flint' , lastName : 'Rhem' },
{firstName : 'Lew' , lastName : 'Riggs' },
{firstName : 'Jack' , lastName : 'Rothrock' },
{firstName : 'Dazzy' , lastName : 'Vance' },
{firstName : 'Bill' , lastName : 'Walker' },
{firstName : 'Burgess' , lastName : 'Whitehead' },
{firstName : 'Jim' , lastName : 'Winford' },
{firstName : 'Red' , lastName : 'Worthington' }] }

var test8Title = "test8 '1934 Cardinals"
	function test8() {
	    var div  = document.createElement('div')

	    div.innerHTML = '<h3>Cardinals of 1934</h3><table><th>First</th><th>Last</th> <tr dizid=player> <td dizid=firstName> <td dizid=lastName> </tr></table>'
	    diz(div, roster )
	    console.log(div.innerHTML)
	    //expect(div.innerHTML.toString()).toBe('<trunk><branch><twig>apple</twig><twig>banana</twig><twig>cherry</twig></branch><branch><twig>apple</twig><twig>banana</twig><twig>cherry</twig></branch></trunk>')
	   
	}
    

	diz = function (html, parameter){

		if(html == null) {
			return ''
		}
		if(html instanceof NodeList && Array.isArray(parameter)  && parameter.length >0){
			var nodeList = html
			var setsOfTwins =[]
			// build sets of twins
			for(var i = 0; i < nodeList.length; i++  ){
				var node = nodeList[i]
				var isMatchingTwin = false
				for(var j = 0; j< setsOfTwins.length && isMatchingTwin == false; j++){
					var twins = setsOfTwins[j]
					var firstTwin = twins[0]
					if(node.tagName == firstTwin.tagName && node.parentElement == firstTwin.parentElement  ){
						twins.push(node)
						isMatchingTwin = true
					}
				}
				if(isMatchingTwin == false){
					setsOfTwins.push([node])
				}
			}
			for(var k = 0; k < setsOfTwins.length; k++){
			    var twins = setsOfTwins[k]
			    while(twins.length > parameter.length){
			    	var lastTwin = twins.pop()
			    	lastTwin.parentElement.removeChild(lastTwin)
			    }
			    var firstTwin = twins[0]
			    var lastTwin = twins[twins.length - 1]
			    while(twins.length < parameter.length){
			    	var clone = firstTwin.cloneNode(true)
			    	lastTwin.insertAdjacentElement("afterend",clone)
			    	twins.push(clone)
			    	lastTwin = clone
			    }
			    for(var l = 0; l < parameter.length; l++){
			    	diz(twins[l],parameter[l])
			    }
			}		
		} else if(html instanceof NodeList){
			var nodeList = html
			for(var i = 0; i < nodeList.length; i++  ){
				var node = nodeList[i]
				diz(node,parameter)
			}
			
		}else if(Array.isArray(parameter) && parameter.length >0){
			var parameters = parameter
			var parentElement = html.parentElement
			var insertionPoint = html.nextSibling
			for(var i = 1; i < parameters.length; i++){
				var sib = html.cloneNode(true)
				diz(sib,parameters[i])
				if(insertionPoint == null){
					parentElement.appendChild(sib)
				} else {
					parentElement.insertBefore(sib, insertionPoint)
				}
			}
			diz(html,parameters[0])
			
		}else if(typeof parameter == "object"  ){
			for(var member in parameter ){
				var list = html.querySelectorAll("[dizid= "+member +"]")
				if(list.length > 0){
					diz(list, parameter[member])
				}
			}
		} else 	{
		    html.innerText = parameter
		}
	}
	describe("Test Dizzy Suite 7", function() {
		 it(test1Title, test1)
		 it(test2Title, test2)
		 it(test3Title, test3)
		 it(test4Title, test4)
		 it(test5Title, test5)
		 it(test6Title, test6)
		 it(test7Title, test7)
		 test8();	
		})
	
	
	
function f1() {
	return " result of f1 "
	
}	

var F1 = new Function( 'return "RESULT OF F1"')
console.log(F1())



//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
var Shape = Function
function Rectangle() {
	  Function.call(this, 'console.log("Shape called"); return "RESULT OF Shape"'); // call super constructor.
	  this.width = 10
	  this.height = 20
	}

	// subclass extends superclass
	Rectangle.prototype = Object.create(Function.prototype)
	//Rectangle.prototype.constructor = Rectangle


	var rect = new Rectangle()

//console.log(rect())
// Rectangles as Objects without classes
// width as property
// height
	
function createRectangle(){
	var width = 10
	var height = 20
	function defaultFunction(w, h) {
		if(w != undefined){
			width = w
		}
		if(h != undefined){
			height = h
		}
		return( width * height)
	}
	function area() {
		return width * height
	}
	defaultFunction.area = area

	defaultFunction.width = () => width
	defaultFunction.height = () => height

	return defaultFunction
	
}
var rectangle = createRectangle()
console.log(rectangle())
console.log(rectangle.area())
console.log(rectangle.width())
console.log(rectangle.height())
console.log(rectangle(5,8))
console.log(rectangle.area())
console.log(rectangle.width())
console.log(rectangle.height())








