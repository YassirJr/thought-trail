import {Button} from "@/components/ui/button.jsx"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog.jsx"
import {Input} from "@/components/ui/input.jsx"
import {Label} from "@/components/ui/label.jsx"
import {Avatar, AvatarImage} from "@/components/ui/avatar.jsx";
import {useState} from "react";
import {userApi} from "@/services/api/user-api.js";
import {toast} from "sonner";
import {PROFILE_URL} from "@/constants/urls.js";
import {useNavigate} from "react-router-dom";
import {Terminal} from 'lucide-react'

export function AccountSettingEditModal({field, fieldAsLabel, user}) {
    const navigate = useNavigate()
    const [data, setData] = useState({});
    const [error, setError] = useState('')
    const handleSubmit = async () => {
        const formData = new FormData()
        for (const key in data) {
            formData.append(key, data[key])
        }
        await userApi.updateProfile(formData)
            .then(res => {
                if (res.status === 200) {
                    toast(res?.data.message + "✅", {
                        description: new Date().toDateString(),
                    })
                    navigate(PROFILE_URL)
                }
            }).catch(({response}) => {
                response?.data?.errors?.map(_ => {
                    toast(_, {
                        description: new Date().toDateString(),
                        icon: <Terminal/>
                    })
                })
            })
    }
    const handleChange = (e) => {
        const {name, value, files} = e.target
        if (name === 'photo') {
            setData({...data, [name]: files[0]})
        } else setData({...data, [name]: value})
    }
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    {/*<Button variant="outline">Edit</Button>*/}
                    {
                        field === "photo" ? (
                            <div
                                className="flex justify-between text-sm items-center cursor-pointer text-gray-800 font-medium dark:text-gray-400">
                                <p>{fieldAsLabel}</p>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage alt="User avatar"
                                                 src={user[field] || 'https://github.com/shadcn.png'}/>
                                </Avatar>
                            </div>
                        ) : (
                            <div
                                className="flex justify-between text-sm items-center cursor-pointer text-gray-800 font-medium dark:text-gray-400">
                                <p>{fieldAsLabel}</p>
                                <p>{user[field]}</p>
                            </div>
                        )
                    }

                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit {fieldAsLabel}</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-2">
                            <Label htmlFor="name" className="text-right">
                                {fieldAsLabel}
                            </Label>
                            {
                                field === "photo" ? (
                                    <Input
                                        name={field}
                                        type="file"
                                        className="col-span-3"
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <Input
                                        name={field}
                                        defaultValue={user[field]}
                                        className="col-span-3"
                                        onChange={handleChange}
                                    />
                                )
                            }
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSubmit} className="bg-[#129F5E] dark:text-white hover:bg-[#129F7A]">Save
                            changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
