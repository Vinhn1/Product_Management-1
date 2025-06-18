/**
 * Helper function để lọc sản phẩm đã xóa mềm
 * @param {Object} query - Query object từ request
 * @returns {Object} - Filter object cho MongoDB
 */
const filterDeleted = (query = {}) => {
  const filter = {};
  
  // Chỉ lấy sản phẩm chưa bị xóa mềm
  filter.delete = { $ne: true };
  
  // Nếu có filter theo trạng thái
  if (query.status && query.status !== 'all') {
    filter.status = query.status;
  }
  
  // Nếu có tìm kiếm theo keyword
  if (query.keyword) {
    filter.$or = [
      { title: { $regex: query.keyword, $options: 'i' } },
      { description: { $regex: query.keyword, $options: 'i' } }
    ];
  }
  
  return filter;
};

module.exports = filterDeleted; 