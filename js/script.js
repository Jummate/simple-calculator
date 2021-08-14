
const _ = elem => document.querySelector(elem);			//this shortens the document.querySelector command

let lnk = _("#page-link");
let on = _("#on");
let off = _("#off");
let bottomDisplay = _(".bottom-display");
let topDisplay = _(".top-display span");


let clearEntry = _(".clear-entry");
let clear = _(".clear");
let del = _(".delete");
let factorial = _(".factorial");
let sqrt = _(".sqrt");
let seven = _(".seven");
let eight = _(".eight");
let nine = _(".nine");
let division = _(".division");
let anySqrt = _(".any-sqrt");
let four = _(".four");
let five = _(".five");
let six = _(".six");
let multiply = _(".multiply");
let pi = _(".pi");
let one = _(".one");
let two = _(".two");
let three = _(".three");
let minus = _(".minus");
let square = _(".square");
let dot = _(".dot");
let zero = _(".zero");
let equal = _(".equal");
let plus = _(".plus");
let anySquare = _(".any-square");

let pressed = 0;
let finalResult = "";
let entry = "";
let combinedEntry = "";
let pressSqrt = false;
let numSqrt = "";
let pressSqr = false;
let numSqr = "";
let pressEqual = false;

//get and display the number entered for operation
function getNumber(num){
	if(pressEqual){
		numSqrt = "";
	}
	entry+= num;
	bottomDisplay.value = entry;
	pressEqual = false;
}
//compute the facorial of any desired number
function fact(num){
	let total = 1;
	for(let x = 2; x <= num; x++){
		total*= x;
	}
	pressEqual = false;
	return total;
}
//perform arithmetic operations based on the operator selected
const arithmeticOperation = function (operator){
	//change the operator selected if the user chooses to
	if(!entry && combinedEntry){
		let lastValue = combinedEntry[combinedEntry.length - 1];
		//change the operator entered last if the user wishes to
		if(["+","-","x","/"].indexOf(lastValue) != -1){
			combinedEntry = combinedEntry.substring(0, combinedEntry.length - 1) + operator;
			topDisplay.innerHTML = combinedEntry;
		}
	}
	else {
		//if the user wishes to carry out further arithmetic operations after getting the result for the previous
		entry = pressEqual ? finalResult : entry;	
		if(entry == finalResult){					// if the result was got by pressing "equal" button
			combinedEntry= entry + operator;		//initiate a new combined entry							
			topDisplay.innerHTML = combinedEntry;
		}
		if(entry != finalResult){					//if this result was from chained computations
			combinedEntry+= entry + operator;		//chain the new entry to the result					
			topDisplay.innerHTML = combinedEntry;
		}
		if(pressed == 0){							//if no entry had ever been made
			pressed++;
			finalResult = entry;
			entry = "";
			bottomDisplay.value = "";
		}
		else{
			let tempNumForCalc = "";
			let indexForCalc = combinedEntry.length-2;
			let numForCalc = "";
			while(true){
				//keep collecting all the numbers until an alphabet or any symbol not decimal point is met
				let y = Number(combinedEntry[indexForCalc]);		//coerce each entry to number to allow only numbers
				if(y == y || combinedEntry[indexForCalc] == "."){ 	
					tempNumForCalc+= combinedEntry[indexForCalc];	//collect in reverse, all the number-entries including decimal point
				}
				else{
					break;		//an alphabet or any symbol not decimal point was met
				}
				indexForCalc--;
			}
			//reverse the collected numbers to the required numbers for operation
			for(let x = tempNumForCalc.length - 1; x >= 0; x--){
				numForCalc+= tempNumForCalc[x];
			}
			//for chained computations
			if(combinedEntry[indexForCalc] === "x"){					//if the while loop above was broken by a multiplication sign
				finalResult = Number(finalResult) * Number(numForCalc);
				}
			if(combinedEntry[indexForCalc] === "/"){					//or by division sign
				finalResult = Number(finalResult) / Number(numForCalc);
				}
			if(combinedEntry[indexForCalc] === "+"){					//or by addition sign
				finalResult = Number(finalResult) + Number(numForCalc);
				}
			if(combinedEntry[indexForCalc] === "-"){					//or by minus sign
				finalResult = Number(finalResult) - Number(numForCalc);
				}
			entry = "";
			bottomDisplay.value = finalResult;
		}
	}
	pressEqual = false;													//the result was got from chained computation and not by pressing "equal" button
}
//clear all entries only
clearEntry.addEventListener("click", function(){
	entry= "";
	combinedEntry = "";
	topDisplay.innerHTML = "";
	pressEqual = false;
});
//start afresh by clearing all entries and results
clear.addEventListener("click", function(){
	entry= "";
	combinedEntry = "";
	finalResult = "";
	pressed = 0;
	bottomDisplay.value = "";
	topDisplay.innerHTML = "";
	pressEqual = false;
});
//delete the new entries one after the other
del.addEventListener("click", function(){
	entry = entry.substring(0, entry.length -1);
	bottomDisplay.value = entry;
	pressEqual = false;
});
//compute the factorial of the current result or new entry
factorial.addEventListener("click", function(){
	if(entry || finalResult){
		entry = pressEqual ? finalResult : entry;
		combinedEntry+= entry+ "!";
		topDisplay.innerHTML = combinedEntry;
		if(entry){
			let num = Number(entry);
			finalResult = fact(num);
			entry = finalResult;
			bottomDisplay.value = finalResult;
		}
	}
	pressEqual = false;
});
sqrt.addEventListener("click", function(){
	if(entry || finalResult){
		entry = pressEqual ? finalResult : entry;
		combinedEntry= entry;
		topDisplay.innerHTML = "√"+combinedEntry;
		if(entry){
			let num = Number(entry);
			finalResult = Math.sqrt(num);
			entry = finalResult;
			bottomDisplay.value = finalResult;
		}
	}
	pressEqual = false;
});
seven.addEventListener("click", function(){
	getNumber(7);
});
eight.addEventListener("click", function(){
	getNumber(8);
});
nine.addEventListener("click", function(){
	getNumber(9);
});
division.addEventListener("click", function(){arithmeticOperation("/");
});
//compute the nth root of the current result or new entry
anySqrt.addEventListener("click", function(){
	if(entry || finalResult){
		entry = pressEqual ? finalResult : entry;	//new entry or result got by pressing "equal" button?
		combinedEntry+= entry;
		topDisplay.innerHTML = "<small><sup>y</sup></small>√"+combinedEntry;
		numSqrt = entry || finalResult;				//the root of this number will be computed using the next number entry
		entry = "";
		finalResult = "";
	}
	pressSqrt = true;								// this button was pressed
	pressEqual = false;
});
four.addEventListener("click", function(){
	getNumber(4);
});
five.addEventListener("click", function(){
	getNumber(5);
});
six.addEventListener("click", function(){
	getNumber(6);
});
multiply.addEventListener("click", function(){arithmeticOperation("x");
});
pi.addEventListener("click", function(){
	entry = Math.PI;							//the value of pi always overrides the current/new entry
	bottomDisplay.value = entry;
});
one.addEventListener("click", function(){
	getNumber(1);
});
two.addEventListener("click", function(){
	getNumber(2);
});
three.addEventListener("click", function(){
	getNumber(3);
});
minus.addEventListener("click", function(){arithmeticOperation("-");
});
square.addEventListener("click", function(){
	if(entry || finalResult){
		entry = pressEqual ? finalResult : entry;
		combinedEntry= entry;
		topDisplay.innerHTML = combinedEntry+"<small><sup>2</sup></small>";
		if(entry){							//anything to carry out this operation on at all?
			let num = Number(entry);
			finalResult = Math.pow(num, 2);
			entry = finalResult;
			bottomDisplay.value = finalResult;
		}
	}
	pressEqual = false;						//equal button was not used to get the result
});
dot.addEventListener("click", function(){
	if(entry.indexOf(".") == -1){		 //prevent "dot" from appearing more than once in an entry
		entry+= ".";
		bottomDisplay.value = entry;
	}
	pressEqual = false;
});
zero.addEventListener("click", function(){
	getNumber(0);
});
equal.addEventListener("click", function(){
	//for unit computations
	if(entry){
		if(combinedEntry[combinedEntry.length - 1] == "x"){
			finalResult = Number(finalResult) * Number(entry);
		}
		else if(combinedEntry[combinedEntry.length - 1] == "/"){
			finalResult = Number(finalResult) / Number(entry);
		}
		else if(combinedEntry[combinedEntry.length - 1] == "+"){
			finalResult = Number(finalResult) + Number(entry);
		}
		else if(combinedEntry[combinedEntry.length - 1] == "-"){
			finalResult = Number(finalResult) - Number(entry);
		}
		else if(pressSqrt){												
			finalResult = Math.pow(Number(numSqrt), 1/Number(entry));	//square root button was pressed
		}
		else if(pressSqr){												
			finalResult = Math.pow(Number(numSqr), Number(entry));		//square button was pressed
		}
	}
	//reset all entries and results except the current result
	bottomDisplay.value = finalResult;
	entry = "";
	numSqrt = "";
	pressed = 0;
	combinedEntry = "";
	topDisplay.innerHTML = "";
	pressEqual = true;
});
plus.addEventListener("click", function(){arithmeticOperation("+");
});
anySquare.addEventListener("click", function(){
	if(entry || finalResult){
		entry = pressEqual ? finalResult : entry;
		combinedEntry+= entry;
		topDisplay.innerHTML = combinedEntry+"<small><sup>y</sup></small>";
		numSqr = entry || finalResult;
		entry = "";
		finalResult = "";
	}
	pressSqr = true;
	pressEqual = false;
});

//light mode
off.addEventListener("click", ()=>{
	off.style.borderBottom = "4px solid blue";
	on.style.borderBottom = "0px";
	lnk.href = "css/lightmode.css"		
});

//dark mode
on.addEventListener("click", ()=>{
	on.style.borderBottom = "4px solid blue";
	off.style.borderBottom = "0px";
	lnk.href = "css/darkmode.css"	
});