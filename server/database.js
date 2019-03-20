import mongoose from 'mongoose'

// 设置数据库默认连接
const mongoDB = 'mongodb://127.0.0.1/music'
mongoose.connect(mongoDB)

// 让mongoose使用全局的promise库
mongoose.Promise = global.Promise

// 取得默认连接
const db = mongoose.connection

db.once('open', function() {
    console.log('连接正常！')
})
db.on('error', console.error.bind(console, 'MongoDB 连接出错！'))

export default mongoose

