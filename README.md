# TradingView to Telegram Webhook

This webhook receives alerts from TradingView and forwards them to a Telegram channel.

## Setup

1. Create a Telegram bot using [@BotFather](https://t.me/botfather) and get the bot token
2. Add the bot to your Telegram group and get the chat ID
3. Copy `.env.example` to `.env` and fill in your bot token and chat ID
4. Install dependencies: `npm install`
5. Start the server: `npm start`

## TradingView Alert Format

Set up your TradingView alert with a webhook URL and the following JSON payload:

\```json
{
    "symbol": "{{ticker}}",
    "entry": "{{close}}",
    "stopLoss": "YOUR_STOP_LOSS",
    "takeProfit": "YOUR_TAKE_PROFIT"
}
\```

## Deployment

Deploy to any Node.js hosting platform (Heroku, DigitalOcean, Railway, etc.). Make sure to:

1. Set environment variables (TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID)
2. Use the provided webhook URL in your TradingView alerts
3. Ensure your hosting platform supports incoming webhooks

## Testing

You can test the webhook using curl:

\```bash
curl -X POST http://localhost:3000/tradingview-webhook \
-H "Content-Type: application/json" \
-d '{"symbol":"GC","entry":"1920.50","stopLoss":"1910.00","takeProfit":"1935.00"}'
\```