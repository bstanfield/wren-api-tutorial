const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

const token = process.env.WREN_API_TOKEN;
const url = 'https://www.wren.co/api';


// Retrieve carbon offset options from Wren's portfolio and get the price to offset one ton of 
// CO2 from the porfolio called 'Community Tree Planting'
fetch(`${url}/portfolios`)
  .then(res => res.json())
  .then(json => console.log('Portfolios: ', json))


// Based on the response from /portfolios, we know the project we want to use, 'Community 
// Tree Planting', costs $15.63 per ton of CO2 and has a portfolio ID of 2.

// Let's create a sample offset order of 1 ton of CO2 from 'Community Tree Planting'!
fetch(`${url}/offset-orders`, {
  method: 'post',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    portfolioId: 2,
    tons: 1,
    dryRun: true
  })
})
  .then(res => res.json())
  .then(json => console.log('Offset Order: ', json))


// Response: 
// {
//   dryRun: true,
//   amountCharged: 1563, (Counted in cents) 
//   currency: 'USD',
//   tons: 1,
//   portfolio: {
//     id: 2,
//     name: 'Community tree planting',
//     costPerTon: 15.63,
//     ...
//   }
// }
