export default () => {
  const viewHome = `
  <h2 class="text-center">¡Bienvenido a DUKIGRAM!</h2>
  <figure class="text-center">
    <img class="image" src="" alt="pets">
  </figure>
  
  <!-- ADD TASK -->
  <div class="container p-4">
     <div class="row">
       <div class="col-md-6">
         <div class="card">
           <div class="card-body">
 
             <h1 class="h4">Add Task</h1>
 
             <form id="task-form">
               <div class="form-group">
                 <input type="text" id="task-title" class="form-control" class="Task Title" placeholder="Task Title"
                   autofocus>
               </div>
               <div class="form-group">
                 <textarea id="task-description" rows="3" class="form-control" placeholder="Task Description"></textarea>
               </div>
 
               <button class="btn btn-primary" id="btn-task-form">
                 Save
               </button>
 
             </form>
           </div>
         </div>
       </div>
       <!-- Tasks List -->
       <div class="col-md-6" id="tasks-container"></div>
     </div>
   </div>
  
  `;

  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = viewHome;
  const taskContainer = divElemt.querySelector('#tasks-container');

  // Conectando con el firestores
  const db = firebase.firestore();
  const taskForm = divElemt.querySelector('#task-form');

  // Almacenando en una funcion para poder reutilizarla
  const saveTask = (title, description) => db.collection('tasks').doc().set({
    title,
    description,
  });
  // Eliminar tareas
  const deleteTask = (id) => db.collection('tasks').doc(id).delete();
  // Editando tareas
  const updateTask = (id, object) => db.collection('tasks').doc(id).update({
    title: object.title,
    description: object.description,
  })
    .then(() => {
      console.log('Document successfully updated!');
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error('Error updating document: ', error);
    });

  // trayendo los datos
  const getTasks = (callback) => db.collection('tasks')
    .onSnapshot((querySnapshot) => {
      const task = [];
      querySnapshot.forEach((doc) => {
      //  console.log(doc.id);
        const obj = {
          title: doc.data().title,
          description: doc.data().description,
          id: doc.id,
        };

        task.push(obj);
      });
      callback(task);
    });

  // Mostrar en la pantalla las tareas
  const showTasks = (task) => {
    const containerPost = document.createElement('div');
    const post = `<div class="card card-body mt-2 border-primary">
      <h3 class="h5">${task.title}</h3>
      <p>${task.description}</p>
      <div>
      <div id="modify" class="hide">
      <input id="input-task" rows="3" class="form-control" placeholder="Task Description"></textarea>
      <textarea id="description-task" rows="3" class="form-control" placeholder="Task Description"></textarea>
      <button class="btn btn-primary btn-save" data-id="${task.id}">Save</button>
      </div>
      <button class="btn btn-primary btn-delete" data-id="${task.id}">Delete</button>
      <button class="btn btn-secondary btn-edit" data-id="${task.id}" >Edit</button>
      </div>
      </div>`;
    containerPost.innerHTML = post;
    // Elimnando tareas
    const btnsDelete = containerPost.querySelector('.btn-delete');
    btnsDelete.addEventListener('click', (e) => {
      e.preventDefault();
      // console.log(task.id);
      deleteTask(task.id);
      taskContainer.innerHTML = '';
    });

    // Editando post
    const btnsEdit = containerPost.querySelector('.btn-edit');
    btnsEdit.addEventListener('click', (e) => {
      // console.log(task.id);
      containerPost.querySelector('#modify').classList.remove('hide');

      const btnsSave = containerPost.querySelector('.btn-save');
      btnsSave.addEventListener('click', (e) => {
        const title = containerPost.querySelector('#input-task').value;
        const description = containerPost.querySelector('#description-task').value;

        updateTask(task.id, {
          title,
          description,
        });
        taskContainer.innerHTML = '';
      });
    });
    return containerPost;
  };

  //  traer las tareas a la pantalla
  // window.addEventListener('DOMContentLoaded', async (e) => {
  //   const tasks = await getTasks();
  //   console.log(tasks);
  // });

  getTasks((task) => {
    task.forEach((doc) => taskContainer.appendChild(showTasks(doc)));
  });

  // formulario
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = taskForm['task-title'];
    const description = taskForm['task-description'];

    saveTask(title.value, description.value);

    taskContainer.innerHTML = '';

    // showTasks();
    // .then()
    // limpie el form
    taskForm.reset();
    title.focus();
  });

  // Add a new document in collection "cities"
  //   db.collection('tasks').add({
  //     title: title.value,
  //     description: description.value,
  //   })
  //     .then(() => {
  //       console.log('La tarea ha sido creada');
  //     })
  //     .catch((error) => {
  //       console.error('Error writing document: ', error);
  //     });
  // });

  return divElemt;
};
