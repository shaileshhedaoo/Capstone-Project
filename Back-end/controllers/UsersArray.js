const express = require('express');

const router = express.Router();

let users=[
    {
        id:"1",
        username:"admin1",
        password:"admin827",
        role:"admin"
      },
      {
        id:"2",
        username:"admin2",
        password:"admin327",
        role:"admin"
      },
      {
        id:"3",
        username:"user1",
        password:"user827",
        role:"user"
      },
      {
        id:"4",
        username:"user2",
        password:"user327",
        role:"user"
      }
]

router.get('/',(request,response)=>{
    response.send(users);
})

router.get('/:id',(request,response)=>{
    let id=request.params.id;
    let filteredUsers=users.filter((user)=>user.id==id)
    response.send(filteredUsers);
})

router.get('/username/:username',(request,response)=>{
    let username=request.params.username;
    let filteredUsers=users.filter((user)=>user.username==username)
    response.send(filteredUsers);
})

router.delete('/:id',(request,response)=>{
    let id=request.params.id;
    users=users.filter(user=>user.id!==id);
    response.send(`User with id ${id} deleted...`)
})

router.delete('/:username',(request,response)=>{
    let username=request.params.username;
    users=users.filter(user=>user.username!=username);
    response.send(`User ${id} deleted...`)
})

router.post('/',(request,response)=>{
    users.push(
        {
        "id": request.body.id,
        "username":request.body.username,
        "password":request.body.password,
        "role":request.body.role
        }
    )
    response.send('User added successfully...')
})
router.put('/:id',(request,response)=>{
    let id=request.params.id;
    let filteredUsers=users.filter(user=>user.id == id);
    if(filteredUsers.length>0){
        let filteredUser=filteredUsers[0];
        let username=request.body.username;
        let password=request.body.password;
        let role=request.body.role;
        if(username){
            filteredUser.username=username;
        }
        if(password){
            filteredUser.password=password;
        }
        if(role){
            filteredUser.role=role;
        }
        users = users.filter(user => user.id!=id);
        users.push(filteredUser);
        response.send("User updated successfully...");
    }
})

module.exports = router;