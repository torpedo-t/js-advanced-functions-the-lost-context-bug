let configuration = {
  frontContent: "Happy Birthday, Odin One-Eye!",
  insideContent: "From Asgard to Nifelheim, you're the best all-father ever.\n\nLove,",
  closing: {
      "Thor": "Admiration, respect, and love",
      "Loki": "Your son"
  },
  signatories: [
      "Thor",
      "Loki"
  ]
}


// Here we have logged 'this' in our console in a couple different places
// when we run our tests we notice that 'this' inside our forEach loop that 'this' is actually [object Window]
// instead of the configuartion object we used as a this argument when calling the function printCard.
let printCard = function() {
  console.log(this.frontContent)
  console.log(this.insideContent)

  console.log("Debug Before forEach: " + this)
  this.signatories.forEach(function(signatory){
      console.log("Debug Inside: " + this)
      // let message = `${this.closing[signatory]}, ${signatory}`
      // console.log(message)
  })
}

printCard.call(configuration)


// remember the rules of function invocation. A function defaults to getting the global scope as 
// execution context when it is called without 'anything to the left of a dot.'
// it does not get its parent function's execution context automatically.
// here we pass a thisArg on line 42.
let printCard = function() {
  console.log(this.frontContent)
  console.log(this.insideContent)

  this.signatories.forEach(function(signatory){
      let message = `${this.closing[signatory]}, ${signatory}`
      console.log(message)
  }, this)
}

printCard.call(configuration)


// remember the rules of function invocation. A function defaults to getting the global scope as 
// execution context when it is called without 'anything to the left of a dot.'
// it does not get its parent function's execution context automatically.
// here we invoke bind on the function expression in the forEach
let printCard = function() {
  console.log(this.frontContent)
  console.log(this.insideContent)
  let contextBoundForEachExpr = function(signatory){
      let message = `${this.closing[signatory]}, ${signatory}`
      console.log(message)
  }.bind(this)

  this.signatories.forEach(contextBoundForEachExpr)
}

printCard.call(configuration)

// here we 'point-to' that context
// we assign 'this' value to a variable and leverage function-level scope and closures to regain access to the outer context
let printCard = function() {
  console.log(this.frontContent)
  console.log(this.insideContent)

  let outerContext = this

  this.signatories.forEach(function(signatory){
      let message = `${outerContext.closing[signatory]}, ${signatory}`
      console.log(message)
  })
}

printCard.call(configuration)


// here we utilized an arrow function expression to create a function without it's own context
// this function is automatically bound to it's parents context
let printCard = function() {
  console.log(this.frontContent)
  console.log(this.insideContent)
  // Wow! Elegant! And notice the arrow function's `this` is the same
  // this that printCard has by virtue of configuration being passed
  // in as a thisArg
  this.signatories.forEach(s => console.log(`${this.closing[s]}, ${s}`)
  )
}

printCard.call(configuration)



// what is the job of this function? is it supposed to return a string, modify an array?

// each function needs a single, clear purpose...............................................

// what data/info does it need in order to do it's job? what arguments, parameters is necessary?

// what am i expecting as a return value? Should be pretty distinct