function addWhole(a,b){

    if(a === '0' && b === '0') return '0'
    var long, short;
    
    if(a.length > b.length) {long = a; short = b}
    else {short = a; long = b}

    long = long.split('').map(Number)
    short = short.split('').map(Number)

    short.forEach(function(val,ind){
        long[long.length-short.length+ind] += val
    })

    for(var j = long.length-1; j > 0; j--){
        var num = long[j]
        if(Math.floor(num/10)){
            long[j-1]+=Math.floor(num/10)
            long[j]=num%10
        }
    }

    return long.join('')

}

//addWhole('99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999','1')==="100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"

function addDecimals(a,b){
    //assuming the decimals come in with decimal points

    if(a === '0' && b === '0') return ''
    var long, short;
    
    if(a.length > b.length) {long = a; short = b}
    else {short = a; long = b}

    long = long.slice(1).split('').map(Number)
    short = short.slice(1).split('').map(Number)

    short.forEach(function(val,ind){
        long[ind] += val
    })

    for(var j = long.length-1; j > 0; j--){
        var num = long[j]
        if(Math.floor(num/10)){
            long[j-1]+=Math.floor(num/10)
            long[j]=num%10
        }
    }

    if(long[0] > 9) {long[0]/=10}
    else {long.unshift('.')}

    return long.join('')
}

//addDecimals('.2','.1')==.3

function add(a,b){

    //will probably rewrite these with .map, and use .apply for final return
    var ints = [a.slice(0,a.indexOf('.') > -1 ? a.indexOf('.') : a.length),b.slice(0,b.indexOf('.') > -1 ? b.indexOf('.') : b.length)]
    var decs = [a.indexOf('.') > -1 ? a.slice(a.indexOf('.')) : '0', b.indexOf('.') > -1 ? b.slice(b.indexOf('.')) : '0']

    var whole = addWhole(ints[0],ints[1])
    var partials = addDecimals(decs[0],decs[1])

    if(partials.indexOf('.') > 0){
        whole = addWhole(whole,partials.slice(0,partials.indexOf('.')))
        partials = partials.slice(partials.indexOf('.'))
    }

    return whole+partials

}

function multiply(a,b){
    var long, short, longPlace, shortPlace;
    
    if(a.length > b.length) {long = a; short = b}
    else {short = a; long = b}

    if((longPlace=long.indexOf('.'))>-1) {
        longPlace=long.length-1-longPlace
        long = long.replace(/[.]/,'')
    } else {longPlace=0}

    if((shortPlace=short.indexOf('.'))>-1) {
        shortPlace=short.length-1-shortPlace
        short = short.replace(/[.]/,'')
    } else {shortPlace=0}

    long = long.split('').map(Number)
    short = short.split('').map(Number)

    var result = []

    for(var i = 0; i < long.length+short.length-1; i++){
        result.push(0)
    }

    for(var j = 0; j < long.length; j++){
        var mult = long[j]
        short.forEach(function(val,ind){
            result[ind+j] += mult*val
        })
    }

    for(var k = result.length-1; k > 0; k--){
        var num = result[k]
        if(Math.floor(num/10)){
            result[k-1]+=Math.floor(num/10)
            result[k]=num%10
        }
    }

    var place = longPlace+shortPlace;

    while(result.length < place+1){result.unshift(0)}

    if(place){
        result = result.slice(0,-place).concat('.',result.slice(-place))

        //this while loop is just for cleanup.
        while(result.slice(-1)[0]===0 && result.slice(-1)[0]!=='.'){result.pop()}
        if(result.slice(-1)[0]==='.'){result.pop()}
    }

    while(result[0]==='0' && result[1]!=='.'){result.shift()}

    return result.join('')

}

//multiply('1.01','.02')==.0202

// //this one is old - should probably delete it.
// function check(str){
//     if((str[0]+str.slice(-1)).search(/[*+-]/) > -1) return false
//     //return some other function result
// }

//this one works, but it's for the old logic.
// function test(a){
//     if( (a[0]+a.slice(-1)).match(/[+-/*]/) ){
//         return a
//     }
// //     need to define this first.
// //     return Math.exact(a)
// }

// function takeApart(str){
//     //this keeps the delimiters in the array.
//     str.split(/([+-/*])/g)
// }

//need to use while loop to parse string, and do str.replace.
// function parens(str){
//     var start = 0, end
//     while(++start < str.length) {
//         if(str[start]==='(')
//     }

//     //this searches a string for stuff inside parentheses without nested parens.
// //     a.match(/\([^()]*\)/g)

// }

//this eventually needs to be changed to use entire Math.exact function.
function recurse(str){

    function checkMult(item){
        if(item.match(/\*/)){
            return item.split('*').reduce(multiply)
        } else {
            return item
        }
    }

    return str.split('+').map(checkMult).reduce(add)

}

function test(str){

    while(str.match(/\(/)) { //while there are parentheses left, replace those 'clauses' with the Math.exact result.
        str.match(/\([^()]*\)/g).forEach(function(item){
            str = str.replace(item, recurse(item.slice(1,-1)) )
        })
    }

    return recurse(str)

}

// test('(1+2)+((3+4)*(5+6))')==='80' //IT'S ALIIIIIIIIIIIIIIIVE
test('(.3+.6)+((.3+.4)*(.5+.6))')==='01.67' //need to move zero/decimal check into appropriate add/multiply functions.
//first, do parentheses
    //split by + and -
    //for each item, split by '*'
    //at some point, split again then run division on each newly split item as needed
    //reduce item-array by multiplying
    //join overall array again, then split by +
    //reduce add(subtract(a),subtract(b)) on overall array

//need to add substraction, division, and variable support

//...or should it be TIAF, for "to infinity and beyond"?
Math.exact = test

function substract(a,b){
    //need to figure out which number is larger and do sign stuff; probably use some kind of map/reduce


    
}