import { useFetch } from "../../../hooks/useFetch";
import { useEffect, useState } from "react";
import { UserDashboard } from "../../../types";

export default function UsersDashboard() {
  const { fetcher } = useFetch();
  const [usersCount, setUsersCount] = useState<number>(0);
  const [suscribeCount, setSuscribeCount] = useState<number>(0);
  const [users, setUsers] = useState<Array<UserDashboard>>([]);
  const [offset, setOffset] = useState<number>(0);
  const [searchTimeout, setSearchTimeout] = useState<number | null>(null);
  const limit : number = 10;

  useEffect(() => {
    async function fetchData() {
      let data: { count: number } = await fetcher("/user/count", "GET");
      setUsersCount(data.count);
      data = await fetcher("/user/count/suscribe", "GET");
      setSuscribeCount(data.count);
      await fetchFirstUsers();
    }

    fetchData();
  }, []);

  async function fetchFirstUsers() {
    const usersData = await fetcher(`/user/dashboard?limit=${limit}&offset=${0}`, "GET");
    setUsers(usersData);
    setOffset(0 + limit);
  }
  
  async function fetchMoreUsers() {
    const moreUsers = await fetcher(`/user/dashboard?limit=${limit}&offset=${offset}`, "GET");
    setOffset(offset + limit);
    setUsers([...users, ...moreUsers]);
  }

  async function deleteUser(user: UserDashboard) {
    try {
      await fetcher(`/user/${user.id}`, "DELETE");
    } catch (error) {
        if((error as Error).message == "Failed to execute 'json' on 'Response': Unexpected end of JSON input"){
        setUsers(users.filter(u => u.id !== user.id));
        setUsersCount(usersCount - 1);
      }else{
        console.error("Error deleting article:", error);
      }
    }
  }

  async function searchUsers(event : React.SyntheticEvent<HTMLInputElement>) {
    const searchQuery = (event.target as HTMLInputElement).value;

    if(searchTimeout) clearTimeout(searchTimeout);

    if(searchQuery === "") return fetchFirstUsers();

    const newTimeout = setTimeout(async () => {
      const data = await fetcher(`/user/dashboard/search?query=${searchQuery}`, "GET");
      setUsers(data);
    }, 500);

    setSearchTimeout(newTimeout);
  }

  return (
    <article>
      <section className="flex justify-between">
        <h2 className="text-2xl font-semibold">Users</h2>
      </section>
      <section className="flex justify-around py-4">
        <span>
          <p className="text-gray-500 italic">Quantity</p>
          <p className="text-2xl">{usersCount}</p>
        </span>
        <span>
          <p className="text-gray-500 italic">Suscribe</p>
          <p className="text-2xl">{suscribeCount}</p>
        </span>
      </section>
      <section className="w-full py-1 flex">
        <span className="bg-white rounded-3xl rounded-r-none hover:cursor-pointer px-3 text-center flex items-center border-2 border-primary-light border-r-0">
          🔎
        </span>
        <input
          type="search"
          name="search"
          className="w-full rounded-3xl p-2 rounded-l-none border-2 border-primary-light border-l-0 focus:outline-none"
          placeholder="Search for an user"
          autoComplete="off"
          onChange={searchUsers}
        />
      </section>
      <section className="border-2 border-primary-light rounded-3xl h-96 overflow-auto px-4 py-4">
        {users.length ? (
          users.map((user) => (
            <article className="w-full justify-between mb-3" key={user.id}>
              <strong className="font-semibold">
                {user.username}
              </strong>
              <div className="flex gap-2">
                <p>🗨 {user.comments}</p>
                <button className="px-1" onClick={() => deleteUser(user)}>
                🗑️
                </button>
              </div>
            </article>
          ))
        ) : (
          <p>There's no users</p>
        )}
        {
            (users.length < usersCount && !searchTimeout) ?
            <button className="text-secondary-dark underline w-full" onClick={fetchMoreUsers}>
                Show more
            </button>
            :
            null
        }
      </section>
    </article>
  );
}