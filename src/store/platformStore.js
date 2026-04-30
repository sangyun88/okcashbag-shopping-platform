import { create } from 'zustand';
import { GROUP_BUYS, MY_WISHLIST, MY_JOINS } from '../data/mockData';

export const usePlatformStore = create((set, get) => ({
  // Navigation
  screen: 'shopping',
  prevScreen: null,
  selectedId: null,
  selectedSellerId: null,

  setScreen: (screen, id = null, sellerId = null) =>
    set(s => ({ prevScreen: s.screen, screen, selectedId: id, selectedSellerId: sellerId })),
  goBack: () =>
    set(s => ({ screen: s.prevScreen || 'shopping', prevScreen: null })),

  // Shopping tab
  activeTab: 'recommend',
  setActiveTab: (tab) => set({ activeTab: tab }),

  // Data
  groupBuys: GROUP_BUYS,
  wishlist: MY_WISHLIST,
  myJoins: MY_JOINS,

  // Category filter (공동구매 탭용)
  activeCategory: 'all',
  setCategory: (cat) => set({ activeCategory: cat }),

  // Sort
  sortKey: 'hot',
  setSortKey: (k) => set({ sortKey: k }),

  // Wishlist
  toggleWishlist: (id) =>
    set(s => ({
      wishlist: s.wishlist.includes(id)
        ? s.wishlist.filter(x => x !== id)
        : [...s.wishlist, id],
    })),

  joinGroupBuy: (id) =>
    set(s => ({
      groupBuys: s.groupBuys.map(gb =>
        gb.id === id ? { ...gb, current: gb.current + 1 } : gb
      ),
      myJoins: [...s.myJoins, { groupBuyId: id, qty: 1, orderedAt: '방금', status: '결제완료' }],
    })),

  createGroupBuy: (data) =>
    set(s => ({
      groupBuys: [{ ...data, id: Date.now(), current: 0, status: 'active' }, ...s.groupBuys],
    })),

  myPoints: 3200,
}));
