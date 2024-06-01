import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs.jsx"
import {Link} from 'react-router-dom'
import {PROFILE_URL, STORY_CREATE_URL} from "@/constants/urls.js";
import AccountSettings from "@/components/settings/account-settings.jsx";
import PublishingSettings from "@/components/settings/publishing-settings.jsx";
import SecurityAndAppsSettings from "@/components/security/security-and-apps-settings.jsx";

export default function EditProfile() {
    return (
        <div className="container mx-10 flex justify-center gap-16">
            <div className="ls w-2/3  my-20">
                <h1 className="text-4xl mb-12 font-sans font-bold">
                    Settings
                </h1>
                <Tabs defaultValue="account" >
                    <TabsList className="bg-transparent m-0 p-0" >
                        <TabsTrigger value="account" className='me-10 font-light' >Account</TabsTrigger>
                        <TabsTrigger value="publishing" className='me-10 font-light'>Publishing</TabsTrigger>
                        <TabsTrigger value="security" className='me-10 font-light'>Security And Apps</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <AccountSettings/>
                    </TabsContent>
                    <TabsContent value="publishing">
                        <PublishingSettings/>
                    </TabsContent>
                    <TabsContent value="security">
                        <SecurityAndAppsSettings/>
                    </TabsContent>
                </Tabs>
            </div>
            <div className='w-1/3 h-screen border-s'>
                <div className="h-full w-full p-10 flex flex-col">
                    <p className="font-bold text-xl mb-8">Suggested help articles</p>
                    <Link to={PROFILE_URL} className='text-gray-500 font-extralight text-sm hover:underline'>your profile page</Link>
                    <Link to={STORY_CREATE_URL} className='text-gray-500 font-extralight text-sm hover:underline'>writing and publishing a story</Link>
                </div>
            </div>
        </div>
    )
}
