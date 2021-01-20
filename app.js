const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

const token = process.env.WREN_API_TOKEN;
const url = 'https://wren.co/api';

// Retrieve carbon offset options from Wren's portfolio
// and get the price to offset one ton of CO2 from the porfolio
// called 'Community Tree Planting'
fetch(`${url}/portfolios`)
  .then(res => res.json())
  .then(json => console.log('data: ', json))

// Based on the response of the GET request to /portfolios,
// we know the project we want to use, 'Community Tree Planting',
// costs $12.50 per ton of CO2 and has a portfolio `ID` of 2 in the API.

// Let's create a sample offset order of 1 ton of CO2 to 'Community Tree Planting'!
fetch(`${url}/offset-orders`, {
  method: 'post',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    portfolioId: 2,
    tons: 1,
    dryRun: true,
  })
})
  .then(res => res.json())
  .then(json => console.log('json: ', json))

// Response: 
// {
//   dryRun: false,
//   amountCharged: 1250,
//   currency: 'USD',
//   tons: 1,
//   portfolio: {
//     id: 2,
//     name: 'Community tree planting',
//     costPerTon: 12.5,
//     description: 'Support a community focused afforestation program that sponsors tree planting and workshops for farmers in East Africa.'
//   }
// }
