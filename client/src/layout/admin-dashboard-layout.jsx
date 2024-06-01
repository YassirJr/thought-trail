import React, {useEffect, useState} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import Navbar from "@/components/navbar/navbar.jsx";
import {AUTH_URL} from '@/constants/urls';
import {userApi} from "@/services/api/user-api.js";
import {useFollowUp, useNotification, useStory, useTag, useUser} from "@/context/index.jsx";



function AdminDashboardLayout() {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const {setUser, user, setAllUsers, setAuthenticated} = useUser()
  const {getMyStories, getAllStories, setMyStories, setAllStories , setSavedStories , getSavedStories} = useStory()
  const {getMyNotifications, setMyNotifications} = useNotification()
  const {getTags, setTags} = useTag()
  const {getMyFollowers, getMyFollowings, setMyFollowers, setMyFollowings} = useFollowUp()

  const getAuthenticatedUser = async () => {
    try {
      const response = await userApi.me()
      setUser(response.data.user)
      setAuthenticated(true)
    } catch (err) {
      if (err?.response?.status === 401) {
        navigate(AUTH_URL)
      }
    }
    setIsLoading(false)
  }

  const _getAllUsers = async () => {
    const response = await userApi.findAll()
    if (response.status === 200 && response.data.success) {
      setAllUsers(response.data.data)
    }
  }

  const _getMyStories = async () => {
    const response = await getMyStories()
    if (response.status === 200 && response.data.success) {
      setMyStories(response.data.data)
    }
  }
  const _getAllStories = async () => {
    const response = await getAllStories()
    if (response.status === 200 && response.data.success) {
      console.log(response.data.data)
      setAllStories(response.data.data)
    }
  }

  const _getMyNotifications = async () => {
    const response = await getMyNotifications()
    if (response.status === 200 && response.data.success) {
      setMyNotifications(response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
    }
  }

  const _getTags = async () => {
    const response = await getTags()
    if (response.status === 200 && response.data.success) {
      setTags(response.data.data)
    }
  }

  const _getMyFollowers = async () => {
    const response = await getMyFollowers()
    if (response.status === 200 && response.data.success) {
      setMyFollowers(response.data.data)
    }
  }

  const _getMyFollowings = async () => {
    const response = await getMyFollowings()
    if (response.status === 200 && response.data.success) {
      setMyFollowings(response.data.data)
    }
  }

  const _getSavedStories = async () => {
    const response = await getSavedStories()
    if (response.status === 200 && response.data.success) {
      setSavedStories(response.data.data)
    }
  }

  const initializeDashboard = async () => {
    try {
      await getAuthenticatedUser();
      if (user) {
        await Promise.all([
          _getAllUsers(),
          _getMyStories(),
          _getAllStories(),
          _getMyNotifications(),
          _getTags(),
          _getMyFollowers(),
          _getMyFollowings(),
          _getSavedStories()
        ]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializeDashboard()
  }, [])

  ;

  if (isLoading) {
    return <></>
  }
  return (
    <>
      <Navbar/>
      <main className="flex flex-col min-h-screen top-20 relative">
        <Outlet/>
      </main>
    </>
  );
}

export default (AdminDashboardLayout);
