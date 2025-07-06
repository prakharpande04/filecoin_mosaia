const dotenv = require('dotenv');
const express = require('express');
const { handler } = require('../dist/index');

dotenv.config();

const app = express();

const { FILECOIN_TESTNET_API_KEY, PORT } = process.env;

if(FILECOIN_TESTNET_API_KEY === undefined) {
    console.log('Error: FILECOIN_TESTNET_API_KEY not set.');
    console.log('To fix this:');
    console.log('1. Create a .env file in the project root');
    console.log('2. Add the following line to your .env file:');
    console.log('   FILECOIN_TESTNET_API_KEY=your_api_key_here');
    console.log('\nGet your API key from: https://api.calibration.node.glif.io/');
    process.exit(1);
}

app.get('/', async (req, res) => {
    const { wallet_address } = req.query;

    if (!wallet_address) {
        return res.status(400).send({
            error: 'wallet_address parameter is required'
        });
    }

    const event = {
        body: JSON.stringify({
            args: {
                wallet_address
            },
            secrets: {
                FILECOIN_TESTNET_API_KEY
            }
        })
    }

    const result = await handler(event)

    res.status(result.statusCode).send(result.body);
});

const port = PORT || 3000;
app.listen(port, () => {
    console.log(`Local development server running on port ${port}`);
    console.log(`Test the API with: curl -XGET "http://localhost:${port}?wallet_address=t1..."`);
});
