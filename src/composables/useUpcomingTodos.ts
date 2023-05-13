import {useTodoListsStore} from "@/store/useTodoListsStore";


function formatDate(date, format) {
  const map = {
    mm: date.getMonth()+ 1 ,
    dd: date.getDate(),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear()
  }
  if(date.getMonth()+ 1 < 10){
    map.mm  = '0' + (date.getMonth()+ 1 ).toString()
  }

  return format.replace(/yyyy|mm|dd/gi, matched => map[matched])
}
export const  getTodayTodos = ()=>{
  const todoListsStore = useTodoListsStore()
  const  todoLists  = todoListsStore.todoLists

  let todayTodos = []
  todoLists.forEach((ls)=>{
    ls.items.forEach(item =>{
      console.log(item.due,  formatDate(new Date(), 'yyyy-mm-dd' ))
      if (item.due === formatDate(new Date(),  'yyyy-mm-dd' ) && !item.complete){
        todayTodos.push(item)
      }
    })
  })
  return todayTodos
}
