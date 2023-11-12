import React,{useState} from "react";
import User from "./User";
import { getUsers, useUsersDispatch, useUsersState } from "./UsersContext";

function Users(){
    const state = useUsersState();
    const dispatch = useUsersDispatch();
    
    const [userId, setUserId] = useState(null);
    const {loading, data:users, error} = state.users;
    const fetchUsers = async () =>{
        getUsers(dispatch);
    };

    if(loading) return <div>로딩중..</div>;
    if(error) return <div>에러가 발생했습니다.</div>;
    if(!users) return <button onClick={fetchUsers}>불러오기</button>;

  return(
    <>
        <ul>
        {
            users.map(user=>(
            <li key={user.id} onClick={() => setUserId(user.id)}>
                {user.username} ({user.name})
            </li>
            ))
        }
        </ul>
        <button onClick={fetchUsers}>다시불러오기</button>
        {userId && <User id={userId} />}
    </>
  )
}

export default Users;