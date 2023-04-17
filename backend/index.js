
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'

import { date, object, string, number} from 'yup';
// import jwtDecode from 'jwt-decode';

const BackendItems = object({
    listName: string().required(),
    listText: string().required(),
    createdOn: date().default(() => new Date()),
    userId: string().required(),
})

const userAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.replace('Bearer ','');
      const token_parsed = jwtDecode(token);
      req.user_token = token_parsed;
    }
    next();
  } catch (error) {
    next(error);
  } 
}
app.use(userAuth)

app.use('/todos', (req, res, next) => {
  if (req.method === "POST") {
      console.log("req: " , req)
      req.body.userId = req.user_token.sub
  } else if (req.method === "GET") {
    console.log("req2: " , req)
      req.query.userId = req.user_token.sub
  }
  next();
})


// test route for https://<PROJECTID>.api.codehooks.io/dev/
app.get('/', (req, res) => {
  res.send('CRUD server ready')
})

app.get("/test", (req, res) => {
  res.json({result: "you did it!"});
});

crudlify(app, { todoLists: BackendItems })

// Use Crudlify to create a REST API for any collection
// crudlify(app)

// bind to serverless runtime
export default app.init();
