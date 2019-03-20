import musicModel from '../model/music.js';

// 保存方法
const saveDiscover = discoverList => musicModel.create(discoverList)

// 查找方法
const findAllDiscover = () => musicModel.find()

export {
    saveDiscover,
    findAllDiscover
}