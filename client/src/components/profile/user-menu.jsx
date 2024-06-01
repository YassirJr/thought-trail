import {
    Settings,
    User,
    Bookmark,
    Library, MoonIcon, SunIcon
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx"

import {Avatar, AvatarImage} from "@/components/ui/avatar.jsx";
import {LogoutModal} from "@/components/auth/logout/logout.jsx";
import {useNavigate} from 'react-router-dom'
import {MY_STORIES_URL, PROFILE_URL, SAVED_STORIES_URL, SETTINGS_URL} from "@/constants/urls.js";
import {Switch} from "@/components/ui/switch.jsx";
import {useTheme, useUser} from "@/context/index.jsx";


export function UserMenu() {
    const {user} = useUser()
    const {theme, setTheme} = useTheme()
    const navigate = useNavigate();
    return (
        <DropdownMenu className="mx-5">
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarImage alt="User avatar" src={user?.photo || 'https://github.com/shadcn.png'}/>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mx-5">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => navigate(PROFILE_URL)}>
                        <User strokeWidth={1} className="mr-2 h-5 w-5"/>
                        {/*<Link to={PROFILE_URL} className="w-full">Profile</Link>*/}
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(SETTINGS_URL)}>
                        <Settings strokeWidth={1} className="mr-2 h-5 w-5"/>
                        <span>Settings</span>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={()=> navigate(MY_STORIES_URL)}>
                        <Library strokeWidth={1} className="mr-2 h-5 w-5"/>
                        <span>Stories</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(SAVED_STORIES_URL)}>
                        <Bookmark strokeWidth={1} className="mr-2 h-5 w-5"/>
                        <span>Library</span>
                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <div>
                    <div
                        className="flex justify-between text-sm font-normal px-2 py-2 rounded hover:bg-gray-100 cursor-pointer hover:dark:bg-slate-800 items-center">
                        <div className='flex justify-center items-center gap-2'>
                            {
                                theme === 'light' ? (
                                        <MoonIcon className="h-4 w-4" strokeWidth={1}/>
                                    ) :
                                    (
                                        <SunIcon className="h-4 w-4" strokeWidth={1}/>
                                    )
                            }
                            <span>Dark Mode</span>
                        </div>

                        <Switch
                            checked={theme === 'dark'}
                            onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        />
                    </div>
                </div>
                <LogoutModal/>


            </DropdownMenuContent>
        </DropdownMenu>
    )
}
