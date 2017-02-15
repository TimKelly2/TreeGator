/**
 * 
 */


function addDizid(element){
	element.setAttribute("dizid", element.tagName.toLowerCase())
}

var tables
var tab2 
var tab3
var tab4
function doStats(){
	 document.documentElement.querySelectorAll("table,thead,tbody,tfoot,th,tr,td").forEach(addDizid)
	 var treeAidor = new TreeAidor73()
	 //tables = treeAidor.inspire({table:{tbody : [{tr :[{td: ['']}]}]}},document.documentElement)
	 //tab2 = treeAidor.inspire({table:{tbody : {tr :{td: ''}}}},document.documentElement)
	 //tab3 = treeAidor.inspire({table : {tr :{td: ''}}},document.documentElement)
	 
	 tab4 = {    table:{   thead : {  tr :{td: '',th:''}  },tbody : {  tr :{td: '',th:''}  }   }    }
	 tab4 = treeAidor.inspire(tab4,document.documentElement)
	 
}