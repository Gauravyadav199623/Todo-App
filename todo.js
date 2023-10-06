const myForm=document.querySelector('#my-form');
// const name=document.querySelector('#username');
// const email=document.querySelector('#email');
const userList=document.querySelector('#users');
const userList2=document.querySelector('#users2');






window.addEventListener('DOMContentLoaded',()=>{
    axios
        .get('https://crudcrud.com/api/8d1f966f7e364388a2857180936ee286/practice')
        .then((res)=>{
            console.log(res)
            userList.innerHTML='';
            

            res.data.forEach((item)=>{
                const li=document.createElement("li");
                li.appendChild(document.createTextNode(`Task to do: ${item.task}, Description: ${item.description}`))
                userList.appendChild(li)
                const li2=document.createElement("li");
                li2.appendChild(document.createTextNode(`Task to do: ${item.task}, Description: ${item.description}`))

                
                
                
                let done=document.createElement('button');
                done.className='btn btn-outline-info btn-sm'
                done.appendChild(document.createTextNode('Done'));
                li.append(done)

                done.addEventListener('click',()=>{
                    
                    li.remove()
                    userList2.appendChild(li2)

                    // let updatedData = { name: e.target.username.value, email: e.target.email.value };

            
                    axios
                    .delete(`https://crudcrud.com/api/8d1f966f7e364388a2857180936ee286/practice/${item._id}`)
                    .then((res)=>{
                        console.log(res)
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                    // let name=document.querySelector('#task');
                    // let email=document.querySelector('#description');
                    // task.value=item.task;
                    // description.value=item.description
                  })
                
                
                
                
                
                
                
                var del = document.createElement('button');
                del.className='btn btn-outline-danger btn-sm'
                del.appendChild(document.createTextNode("Delete"));
                li.appendChild(del);

                del.addEventListener('click', () => {
                    axios
                    .delete(`https://crudcrud.com/api/8d1f966f7e364388a2857180936ee286/practice/${item._id}`)
                    .then((response) => {
                        console.log(response);
                        li.remove();
                    })
                    .catch((err) => {
                        console.log(err);
                    });      
                   
                  });

                  
                

            })
        })
})
myForm.addEventListener('submit', onSubmit)

function onSubmit(e){
    e.preventDefault();

    const task=e.target.task.value;
    const description=e.target.description.value;
    



    const li=document.createElement('li')
    li.appendChild(document.createTextNode(`task to do:${e.target.task.value}, description:${e.target.description.value}`))

    
    const li2=document.createElement('li')
    li2.appendChild(document.createTextNode(`task to do:${e.target.task.value}, description:${e.target.description.value}`))
    //userList.appendChild(li);
    




    let done=document.createElement('button');
    done.className='btn btn-outline-info btn-sm'
    done.appendChild(document.createTextNode('Done'));
    li.append(done)


    let del=document.createElement('button');
    del.className='btn btn-outline-danger btn-sm'
    del.appendChild(document.createTextNode('Delete'));
    li.append(del)
    //userList.appendChild(li)
    

    
    
    userList.appendChild(li)

    
    const data={
        task,
        description,
    }
    console.log(data)
    e.target.task.value='';
    e.target.description.value=''

    
    done.addEventListener('click',()=>{
        userList2.appendChild(li2)

        li.remove()
        // let updatedData = { name: e.target.username.value, email: e.target.email.value };

        axios
        .delete(`https://crudcrud.com/api/8d1f966f7e364388a2857180936ee286/practice/${data.id}`)
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
        
        // e.target.task.value=data.task;
        // e.target.description.value=data.description
      })
    
    del.addEventListener('click', () => {
        li.remove();

        axios.delete(`https://crudcrud.com/api/8d1f966f7e364388a2857180936ee286/practice/${data.id}`)
                .then((response) => {
                    console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                });      
       
      });
      
    

      axios
        .post(`https://crudcrud.com/api/8d1f966f7e364388a2857180936ee286/practice`,data)
        .then((res)=>{
            // li.setAttribute("data-id", res.data._id)
            data.id = res.data._id;

            console.log(res)
            console.log(data.id)
        })
        .catch((err)=>{
            document.body.innerHTML=document.body.innerHTML+ "<h4>'Something went wrong'</h4>"
              console.log(err)
        })

}


