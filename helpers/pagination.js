function paginate(items, currentPage = 1, limit = 4) {
  const totalPage = Math.ceil(items.length / limit);
  const start = (currentPage - 1) * limit;
  const end = currentPage * limit;
  const paginationItems = items.slice(start, end);

  return {
    paginationItems,
    totalPage,
    currentPage,
  };
}

module.exports = paginate;
