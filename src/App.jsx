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
};

const NO_BOTTOM_NAV = ['detail', 'seller'];

export default function App() {
  const { screen, goBack } = usePlatformStore();

  const needBack = ['detail', 'seller'].includes(screen);
  const title    = TITLES[screen] || null;
  const showBottom = !NO_BOTTOM_NAV.includes(screen);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <StatusBar />
      <TopAppBar
        title={title}
        onBack={needBack ? goBack : undefined}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        {screen === 'home'     && <ScreenHome />}
        {screen === 'detail'   && <ScreenGroupBuyDetail />}
        {screen === 'seller'   && <ScreenSellerStore />}
        {screen === 'calendar' && <ScreenCalendar />}
        {screen === 'sell'     && <ScreenSell />}
        {screen === 'wishlist' && <ScreenWishlist />}
        {screen === 'my'       && <ScreenMy />}
      </div>

      {showBottom && <BottomNav />}
    </div>
  );
}
