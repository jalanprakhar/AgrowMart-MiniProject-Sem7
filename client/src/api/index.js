import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:8000/v1" });
export const api = {
  login: (email, password) => API.post("/auth/login", { email, password }),
  signup: (email, password,name,role,phone_number) => API.post("/auth/signup", { email, password,name,role,phone_number }),
  addReview:(name, desc, rating, productId)=>API.post("/review",{name, desc, rating, productId}),
  addProduct:(name, category, total_quantity, quantity_type, img_url, price, farmer_id, desc)=>API.post("/product",{name, category, total_quantity, quantity_type, img_url, price,farmer_id, desc}),
  getAllProducts:()=>API.get("/product"),
  getSingleProduct:(params)=>API.get("/product/id",{params}),
  getProductsByFarmerID:(params)=>API.get("/product/farmer",{params}),
  getLatestProduct:()=>API.get("/product/latest"),
  updateProduct:(product)=>API.put("/product",product),
  deleteProduct:(id)=>API.delete("/product",{id}),
  addOrder:(orderObject, totalAmount, farmerId, shopperId)=>API.post("/order",{orderObject, totalAmount, farmerId, shopperId}),
  markOrderCompleted:(orderId)=>API.put("/product",{orderId}),
  getAllOrders:()=>API.get("/product"),
  getAllOrdersByShopper:(shopperId)=>API.get(`/product/shopperId=${shopperId}`),
  getAllOrdersByShopper:(farmerId)=>API.get(`/product/farmerId=${farmerId}`)


}