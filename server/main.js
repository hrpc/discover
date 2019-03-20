const axios = require('axios');
const cheerio = require('cheerio');

// 当前页数
let total = 0
let $ = ''
// 结果数组
let resultArr = []
// 总共的页数
let point = false
// 每次发送的请求数
const EVERY_COUNT = 5

export const getDiscoverList = function(type = '%E5%85%A8%E9%83%A8') {
    return new Promise((resolve, reject) => {
        getData(0, type).then(res => {
            point = getBreakPoints(res)
            // 发满每次EVERY_COUNT的次数
            let axiosCount = Math.floor(point / EVERY_COUNT)
            // 剩余次数
            let leftCount = point % EVERY_COUNT
        
            let promise1 = asyncRequestBaseParams(EVERY_COUNT, axiosCount, type)
            if (leftCount !== 0) {
                let promise2 = asyncRequestBaseParams(leftCount - 1, 1, type)
                promise1.push(promise2)
            }
            Promise.all(promise1).then(res2 => {
                res2.forEach(element => {
                    element.forEach(ele => {
                        let resList = versionDom(ele)
                        if (resList !== undefined && resList.length > 0) {
                            resultArr = resultArr.concat(resList)
                        }
                    });
                });
                resolve(resultArr)
            }).catch(e => {
                reject(e)
            })
        }).catch(e => {
            reject(e)
        })
    })
}
// requestCount --- 每次请求数量
// loopCount --- 请求函数需要循环多少次
// type --- 歌单类型
function asyncRequestBaseParams(requestCount, loopCount, type) {
    let requestList = []
    let promiseList = []
    for (let i = 0; i < loopCount; i++) {
        // 每一次请求数组单独作为一个数组
        let list = []
        // 组装请求数组
        for (let i = 1; i < requestCount + 1; i++) {
            list.push(getData(++total * 35, type))
        }
        requestList.push(list)
        const promise = axios.all(
            list
        )
        promiseList.push(promise)
    }
    return promiseList
}
function getData(offset, type) {
    let url = `https://music.163.com/discover/playlist?order=hot&cat=${type}&limit=35&offset=`
    console.log(url + offset)
    return axios.get(url + offset)
}
// 获取循环终结点
function getBreakPoints(res) {
    $ = cheerio.load(res.data);
    let pagesCount
    let pages = $('#m-pl-pager .zpgi')
    pages.each(function(index) {
        pagesCount = $(this).text()
    })
    return pagesCount
}
// 组装需要数据
function versionDom(res) {
    let _resultArr = []
    let els = ''
    if (res.data) {
        let $ = cheerio.load(res.data);
        // 获取歌单各个信息
        els = $('#m-pl-container li')
    }
    if (els.length) {
        els.each(function(index) {
            // 播放量
            let playCount = $(this).find('.nb').text()
            // 图片地址
            let imgUrl = $(this).find('.j-flag').attr('src')
            // 歌单标题
            let discoverTitle = $(this).find('.msk').attr('title')
            // 歌单播放地址
            let playUrl = 'https://music.163.com' + $(this).find('.msk').attr('href')
            if (playCount.indexOf('万') > 0 && parseInt(playCount) > 500) {
                _resultArr.push({
                    playCount,
                    imgUrl,
                    discoverTitle,
                    playUrl
                })
            }
        })
        return _resultArr
    }
}
