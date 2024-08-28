const cart =[
    {price:10, qty: 2}, 20
    {price:15, qty: 2},
    {price:2, qty: 2}
]
const Total= cart.reduce((acc, curr)=> acc + curr.price * curr.qty, 0)
console.log("this is our total", Total);
