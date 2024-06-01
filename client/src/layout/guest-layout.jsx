import {Outlet} from "react-router-dom";

function GuestLayout() {
    return (
        <main>
            <Outlet/>
        </main>
    );
}

export default GuestLayout;