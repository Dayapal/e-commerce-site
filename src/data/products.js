const categories = [
  "Clothing-Innerwear",
  "Clothing-Outerwear",
  "Electronics",
  "Footwear",
  "Accessories",
  "Home-Appliances",
  "Beauty",
  "Sports",
  "Books",
  "Furniture"
];

const productNames = {
  "Clothing-Innerwear": ["Men Vest", "Women Innerwear", "Cotton Brief", "Sports Bra"],
  "Clothing-Outerwear": ["Casual Shirt", "Denim Jacket", "Hoodie", "T-Shirt"],
  "Electronics": ["Wireless Earbuds", "Smart Watch", "Bluetooth Speaker", "Power Bank"],
  "Footwear": ["Running Shoes", "Casual Sandals", "Sneakers", "Formal Shoes"],
  "Accessories": ["Leather Wallet", "Sunglasses", "Belt", "Backpack"],
  "Home-Appliances": ["Mixer Grinder", "Electric Kettle", "Iron", "Table Fan"],
  "Beauty": ["Face Wash", "Moisturizer", "Hair Oil", "Perfume"],
  "Sports": ["Cricket Bat", "Football", "Gym Gloves", "Skipping Rope"],
  "Books": ["Self Help Book", "Novel", "Programming Book", "Notebook"],
  "Furniture": ["Office Chair", "Study Table", "Sofa Cushion", "Bookshelf"]
};

const products = [];

for (let i = 1; i <= 120; i++) {
  const category = categories[i % categories.length];
  const nameList = productNames[category];
  const name = nameList[i % nameList.length];

 products.push({
  id: i,
  name,
  category,
  price: Math.floor(Math.random() * 3000) + 299,
image: `https://picsum.photos/seed/${i}/400/400`,
  description: `High quality ${name.toLowerCase()} for daily use`
});

}

export default products;
