const queryHelloWorld = {
  query: `query sayHello($name: String) {
    hello(name: $name)
  }`,
  variables: { name: "world" },
};

const getAllUsers = {
  query: `query getAllusers{ 
    getUsers{
      name
      lastName
      firebaseID
      email
      status
      birthday
      role
      telephone
      fullAddress
      country
      city
      gender
      profileImg
    }
  hello
}`,
    variables: { name: "world" },
};

export default { queryHelloWorld, getAllUsers };
