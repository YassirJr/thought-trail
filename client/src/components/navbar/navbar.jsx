import React, {useState} from 'react';
import {SearchIcon, FilePenLineIcon} from "lucide-react";
import {Link} from "react-router-dom";
import logo from "../../assets/logo.png"
import {UserMenu} from "@/components/profile/user-menu.jsx";
import {useNavigate} from 'react-router-dom'
import {HOME_URL, STORY_CREATE_URL} from "@/constants/urls.js";
import {useLocation} from 'react-router-dom'
import NotificationsSheet from "@/components/notifications/notifications-sheet.jsx";
import AutoComplete from "@/components/ui/autocomplete.jsx";
import {useStory} from "@/context/index.jsx";
import {Button} from "@/components/ui/button.jsx";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate();
    const {allStories} = useStory()
    const {pathname} = useLocation()

    return (
        <nav className="flex items-center justify-between px-6 border-b fixed right-0 left-0 top-0
        backdrop-blur-lg z-50">
            <div className="flex items-center space-x-4">
                <img src={logo} alt="app_logo" width={75} className="cursor-pointer"
                     onClick={() => navigate(HOME_URL)}/>

                <div className="relative w-64" onClick={() => setIsOpen(!isOpen)}>
                    <Button
                        className="py-2 border flex justify-between hover:bg-gray-100 items-center rounded-full w-full bg-gray-200 text-black dark:bg-slate-900 dark:text-gray-300"
                    >
                      <span>
                        Search stories
                      </span>
                      <span className='border bg-gray-300 dark:bg-slate-950 py-1 px-2 rounded-full'>
                        ⌘ + K
                      </span>
                    </Button>
                </div>
                <AutoComplete
                    options={allStories}
                    isOpen={isOpen}
                    setOpen={(is) => setIsOpen(is)}
                />
            </div>
            <div className="flex items-center space-x-6">
                {
                    pathname !== STORY_CREATE_URL && (
                        <Link className="flex items-center space-x-1" to={STORY_CREATE_URL}>
                            <FilePenLineIcon className="h-6 w-6 text-gray-400" strokeWidth={0.75}/>
                            <span>Write</span>
                        </Link>
                    )
                }
                <NotificationsSheet/>
                <UserMenu/>
            </div>
        </nav>
    );
}

export default Navbar;
