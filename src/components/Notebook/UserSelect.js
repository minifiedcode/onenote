export default function UserSelect({ users, updateUser }) {
  return (
    <span>
      <label htmlFor="users">Select a user: </label>
      <select name="users" id="users" onChange={updateUser}>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.displayName} ({user.mail})
          </option>
        ))}
      </select>
    </span>
  );
}
