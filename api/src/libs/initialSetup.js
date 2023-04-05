const Role = require("../models/Roles");

const createRole = async () => {
  try {
    const roles = ["user", "apa", "admin"];

    // Asegurarse de que todos los roles existan en la colección
    const promises = roles.map((role) =>
      Role.findOneAndUpdate({ name: role }, { name: role }, { upsert: true })
    );
    await Promise.all(promises);

    const count = await Role.countDocuments();
    if (count > 0) return; // Si ya hay roles, no se hace nada

    const rolesToCreate = roles.filter((role) => role !== "user");

    const createPromises = rolesToCreate.map((role) =>
      Role.create({ name: role })
    );
    const createdRoles = await Promise.all(createPromises);

    console.log(createdRoles);
  } catch (error) {
    console.log(error);
  }
};

// const createRole = async () => {
//   try {
//     const roles = ["user", "apa", "admin"];

//     // Asegurarse de que todos los roles existan en la colección
//     const promises = roles.map((role) =>
//       Role.findOne({ name: role }).then(foundRole => {
//         if (!foundRole) {
//           return Role.create({ name: role })
//         }
//       })
//     );
//     await Promise.all(promises);

//     const rolesToCreate = roles.filter((role) => role !== "user");

//     const createPromises = rolesToCreate.map((role) =>
//       Role.create({ name: role })
//     );
//     const createdRoles = await Promise.all(createPromises);

//     console.log(createdRoles);
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports = createRole;
