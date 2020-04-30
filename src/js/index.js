/**
 * 注释
 * 
 */
const $ = require('jquery')

let a = 0

class Person {
  constructor(){
    this.name = "123456789"
    this.ajasData = null
  }

  init(){
    
  }

  getName(){
    return this.name
  }

  setName(name){
    this.name = name
  }

  ajax(option){
    //setTimeout(()=>{
      this.ajasData = 1
      return this
    //},3000)
  }
  then(next){
    console.log(typeof next)
    next && next(this.ajasData)
    return this
  }
  
}

let p = new Person('haha')

class son extends Person{
  constructor(props){
    super(props)
    this.name = props.name
  }

  getName(){
    return this.name
  }
  setName(name){
    this.name = name
  }
}

let s = new son('lll')

console.log("p:"+p.getName())
s.setName('张三')
console.log("s:"+s.getName())
// console.log("s:"+s.ajax().then(res => {console.log(res)}))

s.ajax().then(res => {
  console.log("res1:",res)
  return 5
}).then(res =>{
  console.log("res2:",res)
})
