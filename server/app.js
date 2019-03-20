const express = require("express");
import { getDiscoverList } from './main.js'
const port = 3000
const app = express()

app.get('/getAll', async (req, res) => {
    try {
        let result = await getDiscoverList()
        // 结果排序
        result.sort((a, b) => {
            return parseInt(b.playCount) - parseInt(a.playCount)
        })
        res.send(result)
    } catch (error) {
        console.log(error)
    }
})

app.get('/type', async (req, res) => {
    try {
        // 民谣
        let result = await getDiscoverList('%E6%B0%91%E8%B0%A3')
        // 结果排序
        result.sort((a, b) => {
            return parseInt(b.playCount) - parseInt(a.playCount)
        })
        res.send(result)
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
})