const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const app = express();
app.use(express.json());

// Initialize Telegram bot
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.post('/tradingview-webhook', async (req, res) => {
    try {
        const { symbol, entry, stopLoss, takeProfit } = req.body;

        // Validate required fields
        if (!symbol || !entry || !stopLoss || !takeProfit) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Format message
        const message = `🚨 *New Trade Alert* 🚨\n\n` +
            `Asset: ${symbol}\n` +
            `Entry: $${entry}\n` +
            `Stop Loss: $${stopLoss}\n` +
            `Take Profit: $${takeProfit}`;

        // Send to Telegram
        await bot.sendMessage(TELEGRAM_CHAT_ID, message, { parse_mode: 'Markdown' });

        res.json({ success: true });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});