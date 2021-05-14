const routesNames = {
  coustomer: ['Product', 'ProductAdd', 'ProductList', 'ProductEdit', 'Category', 'CategoryAdd', 'CategoryEdit'],
  admin: ['Product', 'ProductAdd', 'ProductList', 'Category', 'ProductEdit'],
};

// 用于过滤掉不属于该角色的路由，因为不同的
export default function getMenuRoutes(role, routes) {
  const allowRoutes = routes.filter((ele) => {
    const obj = ele;
    if (routesNames[role].includes(ele.name)) {
      obj.children = obj.children.filter((item) => routesNames[role].includes(item.name));
      return true;
    }
    return false;
  });
  return allowRoutes;
}
