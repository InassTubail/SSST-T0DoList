(function() {
  var container = document.getElementById('todo-container');
  var addTodoForm = document.getElementById('add-todo');
  var state = [{id:0, description:"One", done:false}];

  var createTodoNode = function(todo) {
        var todoNode = document.createElement('li');
        var SpanDescription = document.createElement('span') ;
        SpanDescription.textContent = todo.description ;

        var markButtonNode = document.createElement('button');
        markButtonNode.className = 'mark' ;
        markButtonNode.innerText="Mark";

        markButtonNode.addEventListener('click', function(event) {
          var newState = todoFunctions.markTodo(state, todo.id);
          newState = todoFunctions.sortTodos(newState);
          update(newState);
        });
        if(todo.done){
          markButtonNode.innerText="Unmark";
          SpanDescription.classList.toggle('todo-checked');
          todoNode.classList.toggle('li-marked');
        }
        else markButtonNode.innerText="Mark";

        var deleteButtonNode = document.createElement('button');
        deleteButtonNode.className="delete";
        deleteButtonNode.innerText="Delete";
        deleteButtonNode.addEventListener('click', function(event) {
          var newState = todoFunctions.deleteTodo(state, todo.id);
          newState = todoFunctions.sortTodos(newState);
          update(newState);
        });

        todoNode.id=todo.id;
        todoNode.appendChild(SpanDescription);
        todoNode.appendChild(deleteButtonNode);
        todoNode.appendChild(markButtonNode);
        return todoNode;
    };

  if (addTodoForm) {
    addTodoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var inputSelect = document.querySelector('input[name=description]');
    var description = {description: inputSelect.value};
    if(description.description.trim()!==""){
      var newState = todoFunctions.addTodo(state, description);
      newState = todoFunctions.sortTodos(newState);
      inputSelect.value =  "";
      update(newState);
    }
      else alert("Soooooo, You gonna do nothing? interesting!");
    });
  }

  var update = function(newState) {
    state = newState;
    renderState(state);
  };

  var renderState = function(state) {
    var todoListNode = document.createElement('ul');

    state.forEach(function(todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });

    container.replaceChild(todoListNode, container.firstChild);
  };

  if (container) renderState(state);
})();
