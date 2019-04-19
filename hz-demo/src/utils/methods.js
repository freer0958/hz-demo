function ergodicData (filterData) {
  var tempData = []
  filterData.forEach(item => {
    tempData.push(item)
    if (item.children && item.children.length > 0) {
      tempData.push(...ergodicData(item.children))
    }
  })
  return tempData
}
export {
  ergodicData
}

