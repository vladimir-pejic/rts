import Login from '../src/components/auth/Login';
import PlayerProfile from "../src/components/player/PlayerProfile";

const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/player',
        component: PlayerProfile
    }
];

export default routes;