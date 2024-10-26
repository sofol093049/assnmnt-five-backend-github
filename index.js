const express = require ("express");
const cors=require ("cors");

require("dotenv").config();
const app=express();
const port=process.env.PORT||5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
app.use(cors());
app.use(express.json());
// const book_data=require("./data/book.json");
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
 

  next();
 });

 const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_SECRET}@cluster0.oru3s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    
const userCollection=client.db('bootcampDB').collection('users');
const categoryCollection=client.db('bootcampDB').collection('category');
const productCollection=client.db('bootcampDB').collection('products');
const usertypeCollection=client.db('bootcampDB').collection('usertype');
const userproductCollection=client.db('bootcampDB').collection('productuser');
// User type functions

app.post("/newusertype", async (req, res) => {
  const usertypeadd = req.body;
  
  const resultProducts = await usertypeCollection.insertOne(usertypeadd);
  res.send(resultProducts);
});
app.get("/allusertype", async (req, res) => {
  const query = usertypeCollection.find();
  const result = await query.toArray();
  console.log(result);
  res.send(result);
});
app.delete("/usertypedelete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  
   const query = { _id: new ObjectId(id) };
   const result = await usertypeCollection.deleteOne(query);
   res.send(result);
});
app.put("/usertypeedit/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const name = req.body;
  
   console.log(name);

  const filter = { _id: new ObjectId(id) };
  const option = { upsert: true };

  const updatedUser = {
    $set: {
      catgname: name.name,
     
    },
  };

  const result = await usertypeCollection.updateOne(
    filter,
    updatedUser,
    option
  );
  res.send(result);
});
// Products functions

app.post("/productadd", async (req, res) => {
  const products = req.body;
  
  const resultProducts = await productCollection.insertOne(products);
  res.send(resultProducts);
});
app.get("/productadd", async (req, res) => {
  const query = productCollection.find();
  const result = await query.toArray();
  console.log(result);
  res.send(result);
});
app.delete("/productdelete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  
   const query = { _id: new ObjectId(id) };
   const result = await productCollection.deleteOne(query);
   res.send(result);
});
app.put("/productedit/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const name = req.body;
  
   console.log(name);

  const filter = { _id: new ObjectId(id) };
  const option = { upsert: true };

  const updatedUser = {
    $set: {
      title: name.name,
      assessments:name.assessments,
      price:name.price,
      details:name.details,
      level:name.level,
      author:name.author,
      category:name.category,
      student:name.student,
      lession:name.lession,
     
    },
  };

  const result = await productCollection.updateOne(
    filter,
    updatedUser,
    option
  );
  res.send(result);
});
// category functions
  app.post("/category", async (req, res) => {
    const categoryproduct = req.body;
    console.log(categoryproduct);
    const resultCategory = await categoryCollection.insertOne(categoryproduct);
    res.send(resultCategory);
  });
  app.get("/category", async (req, res) => {
    const query = categoryCollection.find();
    const result = await query.toArray();
    console.log(result);
    res.send(result);
  });

  app.delete("/category/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    
     const query = { _id: new ObjectId(id) };
     const result = await categoryCollection.deleteOne(query);
     res.send(result);
  });
  app.put("/catg/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const name = req.body;
    
     console.log(name);

    const filter = { _id: new ObjectId(id) };
    const option = { upsert: true };

    const updatedUser = {
      $set: {
        catgname: name.name,
       
      },
    };

    const result = await categoryCollection.updateOne(
      filter,
      updatedUser,
      option
    );
    res.send(result);
  });
  // User functions
  app.get("/users", async (req, res) => {
    const query = userCollection.find();
    const result = await query.toArray();
    console.log(result);
    res.send(result);
  });
app.post("/users", async (req, res) => {
    const users = req.body;
    console.log(users);
    const result = await userCollection.insertOne(users);
    res.send(result);
  });
  app.delete("/user/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    
     const query = { _id: new ObjectId(id) };
     const result = await userCollection.deleteOne(query);
     res.send(result);
  });
  app.get("/user/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const query = { _id: new ObjectId(id) };
    const result = await userCollection.findOne(query);
    console.log(result);
    res.send(result);
  });
  app.put("/user/:id", async (req, res) => {
    const id = req.params.id;
    const user = req.body;
    console.log(id, user);

    const filter = { _id: new ObjectId(id) };
    const option = { upsert: true };

    const updatedUser = {
      $set: {
        name: user.name,
        email: user.email,
        usertype:user.usertype,
      },
    };

    const result = await userCollection.updateOne(
      filter,
      updatedUser,
      option
    );
    res.send(result);
  });

  // individual user update
  app.put("/indvuser/:id", async (req, res) => {
    const id = req.params.id;
    const user = req.body;
    console.log(id, user);

    const filter = { _id: new ObjectId(id) };
    const option = { upsert: true };

    const updatedUser = {
      $set: {
        name: user.name,
        phonenumber: user.phonenumber,
        address:user.address,
        image:user.image,
      },
    };

    const result = await userCollection.updateOne(
      filter,
      updatedUser,
      option
    );
    res.send(result);
  });
// user buy products total cost calculation
app.post("/userproduct", async (req, res) => {
  const categoryproduct = req.body;
  console.log(categoryproduct);
  const resultCategory = await userproductCollection.insertOne(categoryproduct);
  res.send(resultCategory);
});
app.get("/userproductoutput", async (req, res) => {
  const query = userproductCollection.find();
  const result = await query.toArray();
  console.log(result);
  res.send(result);
});
app.delete("/upd/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  
   const query = { _id: new ObjectId(id) };
   const result = await userproductCollection.deleteOne(query);
   res.send(result);
});
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch((error)=>{console.log(error)});

app.get("/",(req,res)=>{
    res.send("Bootcamp server is running");
});
app.listen(port,()=>{
    console.log(`Bootcamp server is running on port ${port}`);
})
// app.get("/",(req,res)=>{res.send("Bootcamp The Book Shop Server is Running");})
// app.get("/book_data",(req,res)=>{res.send(book_data);})
// app.listen(port,()=>{console.log(`Bootcamp The Book Shop Server is Running on port:${port}`)})
