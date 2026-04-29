import { create } from 'zustand';
import { GROUP_BUYS, MY_WISHLIST, MY_JOINS } from '../data/mockData';

export const usePlatformStore = create((set, get) => ({
  // Navigation
  screen: 'home',   // home | detail | seller | calendar | sell | my
  prevScreen: null,
  selectedId: null, // groupBuy id
  selectedSellerId: null,

  setScreen: (screen, id = null, sellerId = null) =>
    set(s => ({ prevScreen: s.screen, screen, selectedId: id, selectedSellerId: sellerId })),
  goBack: () =>
    set(s => ({ screen: s.prevScreen || 'home', prevScreen: null })),

  // Data
  groupBuys: GROUP_BUYS,
  wishlist: MY_WISHLIST,
  myJoins: MY_JOINS,

  // Category filter
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

  // Join a group buy (mock)
  joinGroupBuy: (id) =>
    set(s => ({
      groupBuys: s.groupBuys.map(gb =>
        gb.id === id ? { ...gb, current: gb.current + 1 } : gb
      ),
      myJoins: [...s.myJoins, { groupBuyId: id, qty: 1, orderedAt: '방금', status: '결제완료' }],
    })),

  // Seller dashboard: create (mock)
  createGroupBuy: (data) =>
    set(s => ({
      groupBuys: [{ ...data, id: Date.now(), current: 0, status: 'active' }, ...s.groupBuys],
    })),

  // Points (mock)
  myPoints: 3200,
}));
