import React from 'react';
import {Separator} from "@/components/ui/separator.jsx";

function AccountSettings() {
    return (
        <div className="my-5 font-extralight flex flex-col gap-4">
            <div className="my-6 flex flex-col gap-5 rounded dark:bg-slate-900 p-5">
                <div className="cursor-pointer dark:hover:bg-slate-800 transition-all p-3 rounded">
                    <p className="text-red-500 text-base">Sign out of all other sessions</p>
                    <p className="text-sm dark:text-gray-400 text-gray-600">Sign out of sessions in other browsers or on other computers</p>
                </div>
                <Separator/>
                <div className="cursor-pointer dark:hover:bg-slate-800 transition-all p-3 rounded">
                    <p className="text-base dark:text-gray-200 text-gray-600">Download your information</p>
                    <p className="text-sm dark:text-gray-400 text-gray-600">Download a copy of the information you've shared on Medium to a .json
                        file</p>
                </div>
            </div>
        </div>
    );
}

export default AccountSettings;
