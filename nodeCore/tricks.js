function deepClone () {
  /* No more custom cloning */
  const user = {
    name: "Lachlan Morris",
    address: { street: "Original Road", city: "Placeshire" },
  };

  const clonedUser = structuredClone(user);
  clonedUser.address.street = "New Road";
  console.log(user.address === clonedUser.address);
}
