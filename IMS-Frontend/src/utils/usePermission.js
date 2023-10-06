import { useEffect, useState } from 'react';

const usePermission = (modulePrefix, permission) => {
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const storedPermissions = localStorage.getItem('permissions');

    if (storedPermissions) {
      const permissions = JSON.parse(storedPermissions);

      const matchedPermission = permissions.find(
        (permissionObj) =>
          permissionObj.moduleType.prefix === modulePrefix && permissionObj[permission]
      );

      setIsAllowed(!!matchedPermission);
    }
  }, [modulePrefix, permission]);

  return isAllowed;
};

export default usePermission;





// import React from 'react';
// import usePermission from './usePermission';

// const App = () => {
//   const isViewAllowed = usePermission('viewonly', 'isView');
//   const isAddAllowed = usePermission('viewonly', 'isAdd');

//   // Render UI based on permissions

//   return (
//     <div>
//       {isViewAllowed ? <button>View Item</button> : null}
//       {isAddAllowed ? <button>Add Item</button> : null}
//       {/* Your other UI components */}
//     </div>
//   );
// };

// export default App;