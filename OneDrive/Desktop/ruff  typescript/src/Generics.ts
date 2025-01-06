

// What Are Generics?

// Generics provide a way to create reusable and flexible code by using a "type parameter.
// " They allow you to define components (functions, classes, interfaces) that work with a 
// variety of types without sacrificing type safety.



// Basic Function with Generics.......................................................................................................................

function hello<T>(value:T):T{
         return value
}



// function that works with arrays of generic types.........................................................................


  function hi<T>(arry:T[]):void{
       console.log(arry)
  }


// arrow function that works with arrays of generic................................................................................


  const arrow = <T>(products:T[]):T =>{
     
     return products[1]

  } 


// Generic Interfaces..............................................................................................................

  interface User<k,v> {
    key:k
    value:v
  }



  // Generic Classes ............................................................................................................

  class Stack<T> {
    private items: T[] = [];
    
    push(item: T): void {
      this.items.push(item);
    }
    
    pop(): T | undefined {
      return this.items.pop();
    }
  }
  


