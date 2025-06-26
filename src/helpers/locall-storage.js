//localStorage ga data saqlaydi
export const setItem = (key, data) => {
    try {
        localStorage.setItem(key , data)
    } catch (error) {
        console.log("Eroor data");
        
    }
}
//localStorage dan data olib beradi
export const  getItem = key => {
    try {
      return  localStorage.getItem(key)
    } catch (error) {
        console.log("Error get data");
        
    }
}

//localStoragdan datani olib tashlaydi 
export const removeItem = (key) => {
    try {
        localStorage.removeItem(key)
    } catch (error) {
        console.log('Error removing data');
        
    }
}