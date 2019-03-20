import mongoose from 'mongoose'

// 定义一个模式，mongoose.model将模式编译为模型
var Schema = mongoose.Schema

var MusicSchema = new Schema({
    list: [ 
        {
            playCount: String,
            imgUrl: String,
            discoverTitle: String,
            playUrl: String,    
            author: String
        }
    ],
})

// 使用模式编译模型
export default mongoose.model('music', MusicSchema)


