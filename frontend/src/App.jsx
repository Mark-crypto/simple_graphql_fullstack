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
function App() {
  const { data, error, loading } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <h1>Apollo client Users</h1>
      <div>
        {data.getUsers.map((user) => {
          return (
            <div key={user.id}>
              <h4>Name: {user.name}</h4>
              <h4>Age: {user.age}</h4>
              <h4>Is this user married? {user.isMarried ? "yes" : "no"}</h4>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
