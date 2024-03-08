

let items = JSON.parse(localStorage.getItem('customers')) || [];

  function getNextId() {
    let maxId = Math.max(...items.map(item => item.id));
    return maxId >= 0 ? maxId + 1 : 0;
  }
  
  export function getAll(){
    return items;
    }

  export function post(item) {
    let nextid = getNextId();
    item.id = nextid;
    items[items.length] = item;
    updateLocalStorage();
    }
      
  export function put(id, item) {
    for( let i = 0; i < items.length; i++){
    if(items[i].id === id){
    items[i] = item;
    updateLocalStorage();
    return;
    }
  }
  }

  export function deleteById(id){
    items = items.filter(item => item.id !== id);
    updateLocalStorage();
  }
  
  function updateLocalStorage() {
    localStorage.setItem('customers', JSON.stringify(items));
  }
  
export default items;



