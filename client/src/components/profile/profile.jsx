import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs.jsx"
import ProfileStoryCard from "@/components/profile/profile-story-card.jsx";
import ProfileStoryRead from "@/components/profile/profile-story-read.jsx";
import {getUserFullName} from "@/utils/index.js";
import UserCardInfo from "@/components/profile/user-card-info.jsx";
import ProfileStoriesList from "@/components/profile/profile-stories-list.jsx";
import {useUser} from "@/context/index.jsx";


export default function Profile() {
    const {user} = useUser()

    return (
        <div className="container mx-10 flex justify-center gap-16">
            <div className="ls w-2/3 my-20">
                <h1 className="text-4xl mb-12 font-semibold dark:text-gray-300 underline">
                    {getUserFullName(user)},
                </h1>
                <Tabs defaultValue="home">
                    <TabsList className="bg-transparent m-0 p-0">
                        <TabsTrigger value="home" className='me-10 font-light'>Home</TabsTrigger>
                        <TabsTrigger value="lists" className='me-10 font-light'>Readings List</TabsTrigger>
                        <TabsTrigger value="about" className='me-10 font-light'>About</TabsTrigger>
                    </TabsList>
                    <TabsContent value="home">
                        <ProfileStoriesList/>
                    </TabsContent>
                    <TabsContent value="lists">
                        <ProfileStoryRead/>
                    </TabsContent>
                    <TabsContent value="about">
                        <ProfileStoryCard/>
                        <ProfileStoryCard/>
                    </TabsContent>
                </Tabs>
            </div>
            <UserCardInfo/>
        </div>
    )
}
