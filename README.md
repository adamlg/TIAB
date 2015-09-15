
## Overview

TIAB stands for "To Infinity And Beyond."  JavaScript's representation of numbers, both small and large, has limitations.  Large numbers return "Infinity," and due to binary representation of decimals there are some inaccuracies (run 0.1+0.7 in your console, for example).  TIAB uses string manipulation to break expressions down into pieces small enough to run accurately, then return the correct answer.

## Usage

Just include TIAB.js in whatever file you're developing in, and pass in a string representing the math you want to do:

	TIAB('13.4+52.7') 
	//'66.1'

Please note that TIAB returns a string, not a number.

## Current Limitations

I've only been working on this for a couple of days, so as of now the only expressions that can be used are parentheses, multiplication, and addition of positive numbers.  There is also no syntax error checking, so any error handling is entirely accidental.

##To-dos (i.e. wish list):

* Substraction
* Division
* Exponents
* Negative numbers
* Rounding
* Add tests
* General code cleanup
* Update 0 and decimal cleanup
* Variable handling
* Error handling

## Examples

For each example, I'll list the normal JavaScript result as well as the TIAB result.

	99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999+1
	//Infinity

	TIAB('99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999+1')
	//"100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"

	0.1+0.7
	//0.7999999999999999

	TIAB('0.1+0.7')
	"0.8"

	1.23456789*9.87654321
	//12.193263111263525

	TIAB('1.23456789*9.87654321')
	//"12.1932631112635269"

	0.9999999999999999999999999999999999999999999999*0.44444444444444444444444444444444444444444444444444444
	//0.4444444444444444

	TIAB('0.9999999999999999999999999999999999999999999999*0.44444444444444444444444444444444444444444444444444444')
	//"0.444444444444444444444444444444444444444444444399999995555555555555555555555555555555555555555555556"

	(.10142341+2)+((12837132.123983+1297.1234)*(.1200381723981723981723971235+.123981723981723981236))
	//3132834.2760504405
	
	TIAB('(.10142341+2)+((12837132.123983+1297.1234)*(.1200381723981723981723971235+.123981723981723981236))')
	//"3132834.2760504407205396745010464871028005"

## Contributing

There's no formal process at the moment, so just add issues or make a pull request.  Any feedback or contributions are much appreciated.  
