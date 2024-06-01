import {createBrowserRouter} from "react-router-dom";
import GuestLayout from "@/layout/guest-layout.jsx";
import AuthLayout from "@/layout/auth-layout.jsx";
import AdminDashboardLayout from "@/layout/admin-dashboard-layout.jsx";
import {ADMIN_DASHBOARD_URL, AUTH_URL} from "@/constants/urls.js";
import {
  AboutPage,
  CreateStoryPage,
  EditProfilePage, EditStoryPage,
  HomePage, ManageStoriesPage, MyStoriesListPage,
  NotFoundPage,
  ProfilePage, ReadStoryPage,
  StoriesPage, TagsPage
} from "@/pages/index.jsx";
import SavedStoriesPage from "@/pages/saved-stories-page.jsx";


const router = createBrowserRouter(
  [
    {
      element: <GuestLayout/>,
      children: [
        {
          path: AUTH_URL,
          element: <AuthLayout/>
        },
        {
          index: true,
          path: '/',
          element: <HomePage/>
        },
        {
          path: '/about',
          element: <AboutPage/>
        }
      ]
    },
    {
      path: ADMIN_DASHBOARD_URL,
      element: <AdminDashboardLayout/>,
      children: [
        {
          index: true,
          element: <StoriesPage/>
        },
        {
          path: 'profile',
          element: <ProfilePage/>,
        },
        {
          path: 'profile/settings',
          element: <EditProfilePage/>
        },
        {
          path: 'story/create',
          element: <CreateStoryPage/>
        },
        {
          path: 'stories',
          element: <MyStoriesListPage/>
        },
        {
          path: 'tags',
          element: <TagsPage/>
        },
        {
          path: 'stories/manage-stories',
          element: <ManageStoriesPage/>
        },
        {
          path: 'stories/:id/read',
          element: <ReadStoryPage/>
        },
        {
          path: 'stories/:id/edit',
          element: <EditStoryPage/>
        },
        {
          path: 'stories/saved',
          element: <SavedStoriesPage/>
        }
      ]
    },
    {
      path: '*',
      element: <NotFoundPage/>
    }
  ],
)

export default {router}
