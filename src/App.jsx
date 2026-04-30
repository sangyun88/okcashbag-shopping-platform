import './index.css';
import { usePlatformStore } from './store/platformStore';
import StatusBar from './components/ui/StatusBar';
import TopAppBar from './components/ui/TopAppBar';
import BottomNav from './components/ui/BottomNav';
import ScreenHome from './screens/ScreenHome';
import ScreenGroupBuyDetail from './screens/ScreenGroupBuyDetail';
import ScreenSellerStore from './screens/ScreenSellerStore';
import ScreenCalendar from './screens/ScreenCalendar';
import ScreenSell from './screens/ScreenSell';
import ScreenWishlist from './screens/ScreenWishlist';
import ScreenMy from './screens/ScreenMy';

const TITLES = {
  detail:   '공구 상세',
  seller:   '셀러 스토어',
  calendar: '공구 캘린더',
  sell:     '셀러 대시보드',
  wishlist: '찜 목록',
  my:       '마이페이지',
};

const OVERLAY_SCREENS = ['detail', 'seller', 'calendar', 'sell', 'wishlist', 'my'];

export default function App() {
  const { screen, goBack } = usePlatformStore();

  const isOverlay = OVERLAY_SCREENS.includes(screen);
  const isShopping = screen === 'shopping';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <StatusBar />
      <TopAppBar
        title={TITLES[screen] || null}
        onBack={isOverlay ? goBack : undefined}
        mode={isShopping ? 'shopping' : 'default'}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        {isShopping                  && <ScreenHome />}
        {screen === 'detail'         && <ScreenGroupBuyDetail />}
        {screen === 'seller'         && <ScreenSellerStore />}
        {screen === 'calendar'       && <ScreenCalendar />}
        {screen === 'sell'           && <ScreenSell />}
        {screen === 'wishlist'       && <ScreenWishlist />}
        {screen === 'my'             && <ScreenMy />}

        {/* 미구현 탭 플레이스홀더 */}
        {(screen === 'earn' || screen === 'use' || screen === 'home' || screen === 'menu') && (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 40 }}>{screen === 'earn' ? '🪙' : screen === 'use' ? '🛒' : screen === 'home' ? '🏠' : '☰'}</span>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#222' }}>{screen === 'earn' ? '적립' : screen === 'use' ? '사용' : screen === 'home' ? '홈' : '메뉴'}</p>
            <p style={{ fontSize: 13, color: '#717171' }}>준비 중입니다</p>
          </div>
        )}
      </div>

      {!isOverlay && <BottomNav />}
    </div>
  );
}
