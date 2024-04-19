import { defineStore } from 'pinia';

export const useMobileMenuStore = defineStore({
  id: 'mobile-menu-store',
  state: () => {
    return {
      isOpen: false
    };
  },
  actions: {
    toggleMobileMenu() {
      this.isOpen = !this.isOpen;
    },
    closeMobileMenu() {
      this.isOpen = false;
    }
  }
});
