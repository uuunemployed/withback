const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const path = require('path');
const app = express();

const publicKey = 'sandbox_i54302443569';
const privateKey = 'sandbox_CFt2SHAf9WgJu7f4Hejaus2QBOgNQw9W2e2y6fpw';

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.post('/create-payment', (req, res) => {
    const amount = req.body.amount;

    const order = {
        public_key: publicKey,
        version: '3',
        action: 'pay',
        amount: amount,
        currency: 'UAH',
        description: 'Тестова оплата',
        order_id: 'test-' + Date.now(),
        language: 'uk',
        result_url: 'https://example.com/success'
    };

    const data = Buffer.from(JSON.stringify(order)).toString('base64');
    const signature = crypto
        .createHash('sha1')
        .update(privateKey + data + privateKey)
        .digest('base64');

    res.json({ data, signature });
});

app.listen(3000, () => console.log('✅ Сервер працює: http://localhost:3000'));