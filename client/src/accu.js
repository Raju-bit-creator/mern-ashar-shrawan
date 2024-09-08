const cart =[
    {price:10, qty: 2},
    {price:15, qty: 2},
    {price:2, qty: 2}
]
const Total= cart.reduce((acc, curr)=> acc + curr.price * curr.qty, 0)
// console.log("this is our total", Total);
 const value= cart.slice(0, 2).map(e=>{
    return e.price
 })
console.log(value);

