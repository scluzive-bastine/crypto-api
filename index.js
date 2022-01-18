const PORT = 2000
const express = require('express')
const axios = require('axios')
const CoinGecko = require('coingecko-api')
const CoinGeckoClient = new CoinGecko()

const app = express()

const listCoins = async () => {
  params = {
    per_page: 50,
  }
  return await CoinGeckoClient.coins.all(params)
}

let coins = []
let CoinGeckodata = []

app.get('/', (req, res) => {
  res.json('Welcome to crypto api')
})

app.get('/coins', async (req, res) => {
  const response = await listCoins()
  CoinGeckodata = response.data

  CoinGeckodata.forEach((coin) => {
    coins.push({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: {
        thumb: coin.image.thumb,
        small: coin.image.small,
        large: coin.image.large,
      },
      marketData: {
        currentPrice: coin.market_data.current_price.usd,
        marketCap: coin.market_data.market_cap.usd,
        rank: coin.market_data.market_cap_rank,
        totalVolume: coin.market_data.total_volume.usd,
        totalSupply: coin.market_data.total_supply,
        circulatingSupply: coin.market_data.circulating_supply,
        priceChange24H: coin.market_data.price_change_24h,
        priceChangePercentage24Hrs: coin.market_data.price_change_percentage_24h,
        priceChangePercentage7Days: coin.market_data.price_change_percentage_7d,
        priceChangePercentage14Days: coin.market_data.price_change_percentage_14d,
        priceChangePercentage30Days: coin.market_data.price_change_percentage_30d,
        priceChangePercentage60Days: coin.market_data.price_change_percentage_60d,
        priceChangePercentage200Days: coin.market_data.price_change_percentage_200d,
        priceChangePercentage1Year: coin.market_data.price_change_percentage_1y,
      },
    })
  })
  res.json(coins)
})

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
