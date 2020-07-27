const getdb=require('../util/database').getdb;
const mongodb=require('mongodb');

class Product{
  constructor(title,price,description,imageUrl,id){
    this.title=title;
    this.price=price;
    this.description=description;
    this.imageUrl=imageUrl;
    this._id=id?new mongodb.ObjectId(id):null;
  }
  save() {
    const db = getdb();
    let dbOp;
    if (this._id) {
      // Update the product
      dbOp = db
        .collection('products')
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection('products').insertOne(this);
    }
    return dbOp
      .then(result => {
        // console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }
  static fetchAll(){
    const db=getdb();
    return db.collection('products').find().
    toArray().then(products=>{
      console.log(products);
      return products;
    }).catch(err=>{
      console.log(err);
    });
  };
  static findById(prodId) {
    const db = getdb();
    return db
      .collection('products')
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then(product => {
        // console.log(product);
        return product;
      })
      .catch(err => {
        console.log(err);
      });
  };
  static deleteById(prodId){
    const db=getdb();
    return db.collection('products').deleteOne({_id:new mongodb.ObjectID(prodId)})
    .then(result=>{
      console.log("Product Deleted");
      (result);
    }).catch(err=>console.log(err));
  };
   
}
module.exports=Product;