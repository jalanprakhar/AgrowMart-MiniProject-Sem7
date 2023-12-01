const Product = require("../../models/product");
const Review = require("../../models/review");
async function addReview(req, res) {
  const { name, desc, rating, productId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).send("product not found");
    const newRating = (rating + product.rating * product.number_of_ratings) / (product.number_of_ratings + 1);
    const newNumberOfRatings = product.number_of_ratings + 1;

    const currentReview = new Review({
      name,
      desc,
      rating: rating,
      productId,
    });
    const rev = await currentReview.save();
    const updationAggregate = {
      $set: {
        rating: newRating,
        number_of_ratings: newNumberOfRatings,
      },
      $push: {
        reviews: rev._id,
      },
    };
    await Product.updateOne({ _id: productId }, updationAggregate);
    return res.status(201).send(rev);
  } catch (e) {
    res.status(409).send(e.message);
  }
}
module.exports = { addReview };
