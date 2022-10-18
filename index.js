import { saveTask,
   getTasks, 
   onGetTasks,
   deleteTask,
   getTask,
   updateTask,
   addDoc,
   collection,
   db
} from './firebase.js'


const taskForm = document.querySelector('#task-form')
const taskContainer = document.querySelector('#tasks-container')
const btnSave = document.querySelector('#btn-task-save')



let editStatus = false
let id = ''

let tenso = ''

window.addEventListener('DOMContentLoaded', async ()=>{
  console.log('tentar buscar o bichao');
  
  
  /* versão 1 sem atualizacao em tempo real */
  /* const tasks = await getTasks()

  let html = ''

  tasks.forEach(e => {
    const task = e.data()
    html += `
      <div>
        <h3>${task.title}</h3>
        <p>${task.description}</p>
      </div>
    `
  })

  taskContainer.innerHTML = html */



  onGetTasks(( querySnapshot ) => {
    let html = ''

    querySnapshot.forEach(e => {
      const task = e.data()
      html += `
        <div class="card card-body mt-2 border-primary">
          <h3 class="h5">${task.title}</h3>
          <p>${task.description}</p>
          <div>
            <button class="btn-delete btn btn-warning" data-id="${e.id}"> Delete</button>
            <button class="btn-edit btn btn-primary" data-id="${e.id}"> Edit</button>
          </div>
        </div>
      `
    })

    taskContainer.innerHTML = html
    const btnsDelete = taskContainer.querySelectorAll('.btn-delete')
    btnsDelete.forEach( btn => {
      btn.addEventListener('click', (e) => {
          console.log(e.target.dataset.id)
          deleteTask(e.target.dataset.id)
      })
    })

    const btnsEdit = taskContainer.querySelectorAll('.btn-edit')
    btnsEdit.forEach( (btn) => {
      btn.addEventListener('click', async(e) => {
        console.log(btnSave)
        console.log(e.target.dataset.id)
         const doc = await getTask(e.target.dataset.id)
         const task = doc.data()

         taskForm['task-title'].value = task.title
         taskForm['task-description'].value = task.title

         editStatus = true
         id = doc.id

         taskForm['btn-task-save'].innerText = 'Update'

        
      })
    })


  })

  

  
})


taskForm.addEventListener('submit', async(e) => {
  e.preventDefault()
  const title = taskForm['task-title']
  const description = taskForm['task-description']
  
  
  if(!editStatus){
  
    //saveTask(title.value, description.value)
    const refSalvo =  await addDoc(collection(db, "tasks"), { title: 'novo titulo', description: 'super descipt'})
    console.log(refSalvo.id);
  }else{
    
    updateTask(id, {title: title.value, description: description.value})
    editStatus = false
  }
  
  taskForm.reset()
  taskForm['btn-task-save'].innerText = 'Save'
  
})