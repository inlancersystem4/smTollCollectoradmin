import { defineStore } from 'pinia';

export const useProfileImgStore = defineStore('profileImg', {
  state: () => ({
    profilePic: localStorage.getItem('profile_img') || null,
  }),
  actions: {
    setProfilePic(profilePict) {
        this.profilePic = profilePict;
        localStorage.setItem('profile_img', profilePict);
      },
  },
});
