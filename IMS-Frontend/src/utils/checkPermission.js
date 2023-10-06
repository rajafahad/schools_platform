// const createCheckPermission = () => {
//   const checkPermission = (modulePrefix, permission) => {
//     const storedPermissions = localStorage.getItem('permissions');

//     if (storedPermissions) {
//       const permissions = JSON.parse(storedPermissions);

//       const matchedPermission = permissions.find(
//         (permissionObj) =>
//           permissionObj.moduleType.prefix === modulePrefix && permissionObj[permission]
//       );

//       return matchedPermission ? true : false;
//     }

//     return false;
//   };

//   return checkPermission;
// };

// export default createCheckPermission;


const checkPermission = (modulePrefix, permission) => {
  const storedPermissions = localStorage.getItem('permissions');

  if (storedPermissions) {
    const permissions = JSON.parse(storedPermissions);

    const matchedPermission = permissions.find(
      (permissionObj) =>
        permissionObj.moduleType.prefix === modulePrefix && permissionObj[permission]
    );

    return matchedPermission ? true : false;
  }

  return false;
};

export default checkPermission;