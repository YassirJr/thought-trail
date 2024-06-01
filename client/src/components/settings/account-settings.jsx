import React from 'react';
import {Separator} from "@/components/ui/separator.jsx";
import {AccountSettingEditModal} from "@/components/settings/account-setting-edit-modal.jsx";
import {useUser} from "@/context/index.jsx";

function AccountSettings() {
    const {user} = useUser()
    return (
        <div className="my-10 font-extralight flex flex-col gap-4">

            <AccountSettingEditModal fieldAsLabel="First name" field="fname" user={user}/>
            <AccountSettingEditModal fieldAsLabel="Last name" field="lname" user={user}/>
            <AccountSettingEditModal fieldAsLabel="Email" field="email" user={user}/>
            <AccountSettingEditModal fieldAsLabel="Profile photo" field="photo" user={user}/>
            <Separator/>
            <div className="my-6 flex flex-col gap-5 ">

            <div className="rounded bg-gray-100 p-5 dark:hover:bg-slate-800 transition-all dark:bg-slate-900 cursor-pointer">
                <p className="text-red-500 underline">Deactivate account</p>
                <p className="text-sm">Deactivating will suspend your account until you sign back in .</p>
            </div>
            <div className="rounded bg-gray-100 p-5 dark:hover:bg-slate-800 transition-all dark:bg-slate-900 cursor-pointer">
                <p className="text-red-500 underline">Delete account</p>
                <p className="text-sm">Permanently delete your account and all of your content .</p>
            </div>
            </div>
        </div>
    );
}

export default AccountSettings;
