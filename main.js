function TIAB(str){

    //while there are parentheses left, replace those 'clauses' with the Math.exact result.
    while(str.match(/\(/)) { 
        str.match(/\([^()]*\)/g).forEach(function(item){
            str = str.replace(item, recurse(item.slice(1,-1)) )
        })
    }

    return recurse(str)

}

function add(a,b){


    function getInts(str){
        return str.slice(0,str.indexOf('.') > -1 ? str.indexOf('.') : str.length)
    }

    function getDecs(str){
        return str.indexOf('.') > -1 ? str.slice(str.indexOf('.')) : '0'
    }

    var ints = [a,b].map(getInts)
    var decs = [a,b].map(getDecs)

    var whole = addWhole.apply(null,ints)
    var partials = addDecimals.apply(null,decs)

    if(partials.indexOf('.') > 0){
        whole = addWhole(whole,partials.slice(0,partials.indexOf('.')))
        partials = partials.slice(partials.indexOf('.'))
    }

    return whole+partials

}

//helper functions for add
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

    carry(long)

    return long.join('')

}

function addDecimals(a,b){

    if(a === '0' && b === '0') return ''
    var long, short;
    
    if(a.length > b.length) {long = a; short = b}
    else {short = a; long = b}

    long = long.slice(1).split('').map(Number)
    short = short.slice(1).split('').map(Number)

    short.forEach(function(val,ind){
        long[ind] += val
    })

    carry(long)

    if(long[0] > 9) {long[0]/=10}
    else {long.unshift('.')}

    return long.join('')
}

function multiply(a,b){

    var long, short, longPlace, shortPlace;
    
    if(a.length > b.length) {long = a; short = b}
    else {short = a; long = b}

    if( (longPlace = long.indexOf('.')) > -1 ) {
        longPlace = long.length-1-longPlace
        long = long.replace(/[.]/,'')
    } else {longPlace=0}

    if( (shortPlace = short.indexOf('.')) > -1 ) {
        shortPlace = short.length-1-shortPlace
        short = short.replace(/[.]/,'')
    } else {shortPlace=0}

    long = long.split('').map(Number)
    short = short.split('').map(Number)

    var result = []

    for(var i = 0; i < long.length+short.length-1; i++){
        result.push(0)
    }

    //this is where each part of the multiplication actually happens.
    for(var j = 0; j < long.length; j++){
        var mult = long[j]
        short.forEach(function(val,ind){
            result[ind+j] += mult*val
        })
    }

    carry(result)

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

function carry(result){
    for(var k = result.length-1; k > 0; k--){
        var num = result[k]
        if(Math.floor(num/10)){
            result[k-1]+=Math.floor(num/10)
            result[k]=num%10
        }
    }
}

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
