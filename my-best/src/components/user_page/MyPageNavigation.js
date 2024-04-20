import { NavLink, useRouteLoaderData } from "react-router-dom";

function MyPageNavigation(){
    const user = useRouteLoaderData('root');
    let user_id;
    let token;
    //let user_name;
    if(user) {
        token = user.token;
        user_id = user.user_id;
        //user_name = user.user_name
    }

    return (
        <header>
            <h1>My Page</h1>
            <nav>
                <ul>
                    <li>
                        <NavLink
                            to={token ? `/mypage/${user_id}`: '../auth?mode=login'}
                        >
                            ♥ Likes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={token ? `/mypage/${user_id}/uploads`: '../auth?mode=login'}
                            >
                            My Uploads
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={token ? `/mypage/${user_id}/edit`: '../auth?mode=login'}
                            >
                            Edit Profile
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default MyPageNavigation;