import {axiosInstance} from "@/http/axios.js";

export const storyApi = {

  index: async () =>
    await axiosInstance.get('/stories'),

  getAll: async () =>
    await axiosInstance.get('/stories/all'),

  store: async (payload) =>
    await axiosInstance.post('/stories', payload),

  update: async (id, payload) =>
    await axiosInstance.put('/stories/' + id, payload),

  destroy: async (id) =>
    await axiosInstance.delete('/stories/' + id),

  getSavedStories: async () =>
    await axiosInstance.get('stories/saved'),

  saveStory: async (payload) =>
    await axiosInstance.post('stories/save' , payload),

  deleteSaveStory: async (id) =>
    await axiosInstance.delete('stories/saved/' + id),

  addLike : async (payload) =>
    await axiosInstance.post('stories/add-like', payload),

  removeLike : async (id) =>
    await axiosInstance.delete('stories/remove-like/'+id)

}
