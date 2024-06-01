
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog.jsx"
import { useNavigate} from "react-router-dom";
import { DropdownMenuShortcut} from "@/components/ui/dropdown-menu.jsx";
import {LogOut} from "lucide-react"
import {AUTH_URL} from "@/constants/urls.js";
import {useUser} from "@/context/index.jsx";

export function LogoutModal() {
    const navigate = useNavigate()
    const {user, logout} = useUser()


    const loggedOut = async () => {
        const response = await logout()
        if (response.status === 200) {
            navigate(AUTH_URL)
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="flex justify-evenly text-sm font-normal px-2 py-2 rounded cursor-pointer hover:bg-gray-100 hover:dark:bg-slate-800 items-center">
                    <LogOut strokeWidth={1} className="mr-2 h-4 w-4"/>
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Logout ?</AlertDialogTitle>
                    <AlertDialogDescription>
                        <span className="font-extrabold">{user?.fname}</span> Are you sure you want to log out ?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className='bg-red-400 text-white hover:bg-red-500' onClick={loggedOut}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
