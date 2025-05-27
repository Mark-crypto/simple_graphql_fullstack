import { useState } from "react";
import "./App.css";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      age
      isMarried
    }
  }
`;
const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      name
      age
      isMarried
    }
  }
`;
const CREATE_USER = gql`
  mutation GetUserById($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      name
    }
  }
`;
function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const {
    data: getAllUsers,
    error: usersError,
    loading: usersLoading,
  } = useQuery(GET_USERS);
  const {
    data: getSingleUser,
    error: userError,
    loading: userLoading,
  } = useQuery(GET_USER_BY_ID, { variables: { id: "2" } });

  const [createUser] = useMutation(CREATE_USER);

  const handleCreateUser = () => {
    console.log({ name, age });
    createUser({ variables: { name, age: parseInt(age), isMarried: false } });
  };
  if (userLoading || usersLoading) return <p>Loading...</p>;
  if (userError || usersError) return <p>Error: {error.message}</p>;
  return (
    <>
      <form>
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name..."
          value={name}
        />
        <input
          type="number"
          name="age"
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age.."
          value={age}
        />
        <button type="button" onClick={handleCreateUser}>
          Submit
        </button>
      </form>
      <h1>Apollo client Users</h1>
      <div>
        {getAllUsers.getUsers.map((user) => {
          return (
            <div key={user.id}>
              <h4>Name: {user.name}</h4>
              <h4>Age: {user.age}</h4>
              <h4>Is this user married? {user.isMarried ? "yes" : "no"}</h4>
            </div>
          );
        })}

        <div>
          <h1>Chosen user</h1>
          <h4>Name: {getSingleUser.getUserById.name}</h4>
          <h4>Age: {getSingleUser.getUserById.age}</h4>
          <h4>
            Is this user married?{" "}
            {getSingleUser.getUserById.isMarried ? "yes" : "no"}
          </h4>
        </div>
      </div>
    </>
  );
}

export default App;
