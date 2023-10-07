const myForm = document.querySelector('#my-form');
const userList = document.querySelector('#users');
const userList2 = document.querySelector('#users2');

let id;

async function displayOnScreen() {
    try {
        const res = await axios
        .get('https://crudcrud.com/api/91a49c218c794218b7c47f70f98c5273/practice');
        console.log(res);
        userList.innerHTML = '';
        userList2.innerHTML = '';

        res.data.forEach((item) => {
            const li = document.createElement("li");
            li.appendChild(document.createTextNode(`Task to do: ${item.task}, Description: ${item.description}`));
            userList.appendChild(li);

            let donebtn = document.createElement('button');
            donebtn.className = 'btn btn-outline-info btn-sm';
            donebtn.appendChild(document.createTextNode('Done'));
            li.append(donebtn);

            var delbtn = document.createElement('button');
            delbtn.className = 'btn btn-outline-danger btn-sm';
            delbtn.appendChild(document.createTextNode("Delete"));
            li.appendChild(delbtn);

            delbtn.addEventListener('click', () => del(item._id, li));
            donebtn.addEventListener('click',() => done(item, item._id));

            if (item.isDone) {
                userList2.appendChild(li);  // Append to 'Done' list
            } else {
                userList.appendChild(li);  // Append to 'To-Do' list
            }
        });
    } catch (err) {
        console.log(err);
    }
}

myForm.addEventListener('submit', onSubmit);

async function onSubmit(e){
    e.preventDefault();

    const task = e.target.task.value;
    const description = e.target.description.value;
    
    let data={
        task,
        description,
        isDone:false
    }
    console.log(data)
    e.target.task.value='';
    e.target.description.value='';

    try {
        const res = await axios
        .post(`https://crudcrud.com/api/91a49c218c794218b7c47f70f98c5273/practice`,data);
        id = res.data._id;
        console.log(res);
        displayOnScreen();
    } catch (err) {
        document.body.innerHTML=document.body.innerHTML+ "<h4>'Something went wrong'</h4>";
        console.log(err);
    }
}

async function done(item,id){
    //  data={...data,isDone:true};
    try {
        console.log(item)
        console.log(id)

        const res = await axios
        .put(`https://crudcrud.com/api/91a49c218c794218b7c47f70f98c5273/practice/${id}`,{...item,isDone:true});
        console.log(res.data);
        displayOnScreen();
    } catch (err) {
        console.log(err);
    }
}

async function del(id,li){
    li.remove();
    
    try {
        const response = await axios
        .delete(`https://crudcrud.com/api/91a49c218c794218b7c47f70f98c5273/practice/${id}`);
        console.log(response);
    } catch (err) {
        console.log(err);
    }
}

displayOnScreen();

