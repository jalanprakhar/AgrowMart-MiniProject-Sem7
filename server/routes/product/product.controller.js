const product = require("../../models/product");
const Product = require("../../models/product");

async function createProduct(req, res) {
  const {
    name,
    category,
    total_quantity,
    quantity_type,
    img_url,
    price,
    farmer_id,
    desc,
  } = req.body;
  const prod = new Product({
    name,
    category,
    total_quantity,
    quantity_type,
    img_url,
    price,
    farmer_id,
    desc,
    date: new Date(Date.now()),
  });

  try {
    const newProd = await prod.save();
    return res.status(201).send(newProd);
  } catch (err) {
    res.status(400).send(err);
  }
}

async function getAllProducts(req, res) {
  try {
    const prods = await Product.find({}).sort({ category: 1 });
    res.status(200).send(prods);
  } catch (err) {
    res.status(400).send(err);
  }
}

async function getProduct(req, res) {
  try {
    const prod = await Product.findOne({ _id: req.params.id });
    if (!prod) {
      return res.status(404).send({ error: "Item not found" });
    }
    res.status(200).send(prod);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}
async function getProductByFarmerId(req, res) {
  const { id } = req.params;
  try {
    const prods = await Product.find({ farmer_id: id });
    if (!prods || prods.length === 0) {
      return res.status(404).send({ error: "No Items found!" });
    }
    res.status(200).send(prods);
  } catch (err) {
    res.status(400).send(err);
  }
}

async function getLatest(req, res) {
  try {
    const prods = await Product.find({
      date: {
        $gte: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000),
      },
    }).sort({ date: -1 });
    if (!prods) {
      return res.status(404).send({ error: "Item not found" });
    }
    res.status(200).send(prods);
  } catch (err) {
    res.status(400).send(err);
  }
}

async function updateProduct(req, res) {
  try {
    const {name,category,img_url,price,_id,quantity_type,farmer_id,rating,number_of_ratings,desc,reviews,total_quantity}=req.body;
    const updation={
      $set:{
        name:name,category:category,price:price,quantity_type:quantity_type,desc:desc,total_quantity:total_quantity
      }
    }
    const product=await Product.updateOne({_id},updation)
    res.status(200).json(product);
  } catch (err) {
res.status(400).json(err);
  }
}

async function deleteProduct(req, res) {
  try {
    const deletedItem = await Product.findOneAndDelete({ _id: req.params.id });
    
    if (!deletedItem) {
      return res.status(404).send({ error: "Item not found" });
    }
    res.send(deletedItem);
  } catch (err) {
    res.status(400).send(err);
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductByFarmerId,
  getLatest,
};
