
//存储
export const saveData=(key,value)=>{
    localStorage.setItem(key,JSON.stringify(value)) //localstorage 只能存储字符串
}
//获取
export const getData = (key)=>{
    return JSON.parse(localStorage.getItem(key))  //字符串=》js对象
}
//删除
export const deleteData = (key)=>{
    return localStorage.removeItem(key)
}