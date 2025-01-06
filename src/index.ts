

// class person{
//    name:number=1
//    age:number =2
//    readonly h:string=''
//    constructor(n:string){
//      this.h=n
//    }


//   public sum (){
//         return this.age*2
//    }

//    private logName(){
//       console.log(this.name)
//    }

//    protected multiple(){
//        console.log('multple')

//    }
   

// }

// let aswanth = new person('20')

// console.log(aswanth.h)










// generiks


function get<T>(value:T[]):T {
     return value[0]
}


// let a:number[] = [1,2,3,4]
// let b:string[] = ['a','s,','c'] 

// console.log(get(b))
// console.log(get(a))


//..............................................................................................................

// interface user {
//   name:string
//   age:number
// }


// interface admin extends user{
//      place:string
// }


// const a:admin = {
//      name:'aswanth',
//      age:20,
//      place:''
// }


// import { hello } from "./hi"

// let d= new hello()
// d.welcome()