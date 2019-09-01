const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const knex = require('knex');
const bcrypt=require('bcrypt-nodejs')

const postgres=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '',
    database : ''
  }
});
//console.log(postgres.select('*').from('users'));

//postgres.select().table('users').then(data=>{
//    console.log(data);
//});

//const database={
//  users:[
//      {
//          name:"john",
//          id:123, 
//          email:"john@gmail.com",
//          password:"cookies",
//          entries:0,
//          joined:new Date(),
//      },
//      {
//          name:"sally",
//          id:124,
//          email:"sally@gmail.com",
//          password:"bananas",
//          entries:0,
//          joined:new Date(),
//      }
//  ]  
//};
const app=express();
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send(database.users);
});

app.post('/signin',(req,res)=>{
    postgres.select('email','passwordhash').from('login').where('email','=',req.body.email).then(data=>{
        if(data.length===0){
            res.status(400).json('wrong credentials');
        }
        else{
            const isValid=bcrypt.compareSync(req.body.password, data[0].passwordhash);
            if(isValid){
                return postgres.select('*').from('users').where('email','=',req.body.email).then(user=>res.json(user[0]));
            }
            else{
                res.status(400).json('wrong credentials');
            }
        }
    }).catch(err=>res.status(404).json('wrong credentials'));
    
});

app.post('/register',(req,res)=>{
    const {name,email,password} = req.body;
//    const newUser={
//        name:name,
//        id:125,
//        email:email,
//        password:password,
//        joined:new Date(),
//		entries:0
//    };
//    database.users.push(newUser);
	//console.log(newUser);
    const passHash = bcrypt.hashSync(password);

    postgres.transaction(trx=>{
        trx.insert({
            email:email,
            passwordhash:passHash}).into('login').returning('email')
            .then(loginEmail=>{
            return trx('users').returning('*').insert({                      ////////////return
                    name:name,
                    email:loginEmail[0],
                    joined:new Date()}).then(newUser=>{res.json(newUser[0])})
        }).then(trx.commit).catch(trx.rollback);
    }).catch(err=>res.status(400).json('unable to register'));
            
});

app.get('/profile/:id',(req,res)=>{
    const  id  =parseInt(req.params.id);
    database.users.forEach(user=>{
        if(user.id===id){
            return res.json(user);
        }
    });
    
    return res.json("no such user");
})

app.put('/scoreUpdate',(req,res)=>{
    const id=parseInt(req.body.id);
    postgres('users').where('id' ,'=',id).increment('entries',1).returning('entries').then(entryCount=>{
        if(entryCount.length===0)
            res.status(400).json('user not found');
        else
        res.json(entryCount);
    }).catch(err=>{
        res.status(400).json('unable to update score');
    });
//    database.users.forEach(user=>{
//        if(user.id===id){
//            console.log("found");
//            user.entries++;
//            return res.json(user.entries);
//        }
//    });
//    return res.status(404).json("no such user");
});

app.listen(3000,()=>{
    console.log("app is running on port 3000");
})



/*

/  --> GET --> this is working
/signin -->POST --> success/fail
/register --> POST --> user
/profile --> GET --> user
/scoreUpdate --> PUT --> upadated score

*/