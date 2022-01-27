const numArray = ["2021-09-16", "2016-07-27", "2021-01-20"]

function orderNum(dateArr) {
    let arr = []
    for (let i = 0; i < dateArr.length; i++) {
        dateString = dateArr[i].replaceAll("-", "")
        date = Number(dateString)
        arr.push(date)
    }
    return arr
}

console.log(orderNum(numArray))
