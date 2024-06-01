import React, {useContext} from 'react';
import UserContext, {UserStateContext} from "@/context/user-provider.jsx";
import ThemeContext, {ThemeProviderContext} from "@/context/theme-provider.jsx";
import StoryContext, {StoryStateContext} from "@/context/story-provider.jsx";
import TagContext, {TagStateContext} from "@/context/tag-provider.jsx";
import NotificationContext, {NotificationStateContext} from "@/context/notification-provider.jsx";
import FollowUpContext, {FollowUpStateContext} from "@/context/follow-ups-provider.jsx";


function ContextProvider({children}) {
    return (
        <UserContext>
            <StoryContext>
                <FollowUpContext>
                    <NotificationContext>
                        <TagContext>
                            <ThemeContext defaultTheme="dark" storageKey="vite-ui-theme">
                                {children}
                            </ThemeContext>
                        </TagContext>
                    </NotificationContext>
                </FollowUpContext>
            </StoryContext>
        </UserContext>
    );
}

export const useFollowUp = () => useContext(FollowUpStateContext)
export const useNotification = () => useContext(NotificationStateContext)
export const useStory = () => useContext(StoryStateContext)
export const useTag = () => useContext(TagStateContext)
export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
export const useUser = () => useContext(UserStateContext)



export default React.memo(ContextProvider);
