module.exports = (products, keyword) => {
  if (!keyword) return products;

  const keywordLower = keyword.toLowerCase();

  return products.filter(
    (item) => item.title && item.title.toLowerCase().includes(keywordLower)
  );
};
