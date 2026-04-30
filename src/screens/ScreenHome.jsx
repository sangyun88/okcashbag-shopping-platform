import { T } from '../tokens';
import { usePlatformStore } from '../store/platformStore';
import ShoppingNavBar from '../components/ui/ShoppingNavBar';
import ScreenTabRecommend from './tabs/ScreenTabRecommend';
import ScreenTabGroupBuy from './tabs/ScreenTabGroupBuy';
import ScreenTabTodayDeal from './tabs/ScreenTabTodayDeal';
import ScreenTabECoupon from './tabs/ScreenTabECoupon';
import ScreenTabMovie from './tabs/ScreenTabMovie';

export default function ScreenHome() {
  const { activeTab, setActiveTab } = usePlatformStore();

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: T.gray50 }}>
      <ShoppingNavBar active={activeTab} onTab={setActiveTab} />
      {activeTab === 'recommend' && <ScreenTabRecommend />}
      {activeTab === 'groupbuy'  && <ScreenTabGroupBuy />}
      {activeTab === 'todaydeal' && <ScreenTabTodayDeal />}
      {activeTab === 'ecoupon'   && <ScreenTabECoupon />}
      {activeTab === 'movie'     && <ScreenTabMovie />}
    </div>
  );
}
