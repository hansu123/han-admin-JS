export function deepClone(data) {
  var obj = Array.isArray(data) ? [] : {};
  if (Array.isArray(data)) {
    for (let i in data) {
      obj[i] = deepClone(data[i])
    }
    return obj;
  }
  else if (data instanceof Object) {
    for (let i of Object.keys(data)) {
      obj[i] = deepClone(data[i])
    }
    return obj;
  }
  else {
    return data
  }
}

export function emitTree(array,id,pid) {

  let parentNodes = array.filter((elem) => {
    return elem[pid] <= 0
  })
  let childrenNodes = array.filter((elem) => {
    return elem[pid] > 0
  });


  function buildMenu(pNodes, cNodes) {
    if (pNodes) {
      // console.log(pNodes);
      // console.log("cNodes初始数量" + cNodes.length)
        pNodes.forEach((pElem, i) => {
          // console.log(pElem)
          cNodes.forEach((cElem, j) => {
            if (cElem[pid] == pElem[id]) {
              if (!pNodes[i].children) {
                pNodes[i].children = []
              }
              pNodes[i].children.push(cElem)
              // console.log(cNodes[j])
              delete cNodes[j]
            }
          })
          cNodes = cNodes.filter((elem) => {
            return elem != undefined;
          })
          // console.log(cNodes)
          // console.log("cNodes变化后数量" + cNodes.length)
          buildMenu(pElem.children, cNodes);
        })
      }
    else {
      return
    }
  }
  buildMenu(parentNodes, childrenNodes);

  return parentNodes;
}


export function handleTreeData(data, key) {
  let list = [];
  key = key || 'children';

  function analysis(data) {
    if (Object.prototype.toString.call(data) != "[object Array]") return;
    data.forEach(val => {
      let obj = {};
      for (let o in val) {
        if (o == key && Object.prototype.toString.call(val[o]) == '[object Array]' && JSON.stringify(val[o]) != '[]') {
          analysis(val[o])
        } else {
          if (o !== key) {
            obj[o] = val[o];
          }
        }
      }
      list.push(obj)
    })
  };
  analysis(data)
  return list;
}


