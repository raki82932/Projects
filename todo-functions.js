//Fetch existing todos from local storage
// getSavedTodos

const getSavedTodos=function(){
    const todoJSON = localStorage.getItem('todos')
    if(todoJSON!=null){
    return JSON.parse(todoJSON)
    }else{
        return []
    }


}

//Save todos to local storage
//saveTodos

const saveTodos=function(todos){
    localStorage.setItem('todos',JSON.stringify(todos))
}

//Remove Todo by id
const removeTodo=function(id){
    const todoIndex=todos.findIndex(function(todo){
        return todo.id===id;
    })

    if(todoIndex>-1){
        todos.splice(todoIndex,1)
    }
}


//toggle the completed values for a given todo

const toggleTodo=function(id){
    const todo=todos.find(function(todo){
        return todo.id===id
    })
    if (todo!==undefined){
        todo.completed =!todo.completed
    }
}


//Render application Todos based on filters
//RenderTodos

const renderTodos = function(todos,filters){
    const filteredTodos=todos.filter(function(todo){

        const searchTextMatch=todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch=!filters.hideCompleted || !todo.completed
        
        return searchTextMatch && hideCompletedMatch
        
    })
    
  

    const inCompleteTodos = filteredTodos.filter(function(todo){
        return !todo.completed
    })
    
    document.querySelector('#todos').innerHTML=''
    document.querySelector('#todos').appendChild(generateSummaryDOM(inCompleteTodos))

    

    filteredTodos.forEach(function(todo){
        
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    
    })
   
}


//Get the DOM elements for an individual note
//generate TodoDOM

const generateTodoDOM=function(todo){
   const todoEl=document.createElement('div')
   const checkbox=document.createElement('input')
   const todoText=document.createElement('span')
   const removeElement=document.createElement('button')

   //setup todo checkbox
   checkbox.setAttribute('type','checkbox')
   checkbox.checked=todo.completed
   todoEl.appendChild(checkbox)
   checkbox.addEventListener('change',function(){
       toggleTodo(todo.id)
       saveTodos(todos)
       renderTodos(todos,filters)

   })

   //setup todo text

   todoText.textContent=todo.text
   todoEl.appendChild(todoText)

   //setup the remove button

   removeElement.textContent='x'
   todoEl.appendChild(removeElement)
   removeElement.addEventListener('click',function(){
       removeTodo(todo.id)
       saveTodos(todos)
       renderTodos(todos,filters)
   })

   return todoEl


}

//Get the DOM elements for list summery
//Generate summery DOM

const generateSummaryDOM=function(inCompleteTodos){
    const summary=document.createElement('h2')
    summary.textContent=`You have ${inCompleteTodos.length} todos left`
    return summary
    

}



