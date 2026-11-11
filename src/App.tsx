import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  CalendarCheck,
  Check,
  ChevronDown,
  CircleHelp,
  Copy,
  Download,
  Gift,
  Headphones,
  Home,
  IndianRupee,
  Info,
  LockKeyhole,
  Phone,
  Landmark,
  Link,
  LogOut,
  MessageCircle,
  MoreHorizontal,
  PartyPopper,
  Play,
  Plus,
  Send,
  Settings,
  Share2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  User,
  Users,
  Wallet,
  X,
  Zap,
} from 'lucide-react';
import heroImage from '@/assets/icons/image.png';
import homeSecondImage from '@/assets/icons/image copy.png';
import promoImage from '@/assets/icons/image copy 2.png';

type Page = 'home' | 'promo' | 'earn' | 'profile' | 'whatsapp' | 'daily';
type Toast = string | null;

const navItems: { id: Page; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'promo', label: 'Promo', icon: Gift },
  { id: 'earn', label: 'Earn', icon: Wallet },
  { id: 'profile', label: 'Profile', icon: User },
];

function App() {
  const [page, setPage] = useState<Page>('home');
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const [checkedIn, setCheckedIn] = useState(false);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2600);
  };

  const copyCode = async () => {
    await navigator.clipboard?.writeText('KVZGH323');
    notify('Invite code copied');
  };

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <section className="app-frame">
        {page === 'home' && (
          <HomePage
            checkedIn={checkedIn}
            onCheckIn={() => {
              setCheckedIn(true);
              notify('Daily reward added to your account');
            }}
            onNavigate={setPage}
            onNotify={notify}
          />
        )}
        {page === 'promo' && <PromoPage onCopy={copyCode} onNotify={notify} />}
        {page === 'earn' && <EarnPage onWithdraw={() => setShowWithdraw(true)} onNotify={notify} />}
        {page === 'profile' && <ProfilePage onNotify={notify} />}
        {page === 'whatsapp' && <WhatsAppPage onBack={() => setPage('home')} onNotify={notify} />}
        {page === 'daily' && <DailyCheckInPage onBack={() => setPage('home')} onNotify={notify} />}

        <button className="side-action side-support" onClick={() => setShowSupport(true)} aria-label="Open support">
          <Headphones size={19} /> <span>Support</span>
        </button>
        <button className="side-action side-app" onClick={() => notify('App download will be available soon')} aria-label="Download app">
          <Download size={18} /> <span>App</span>
        </button>

        <nav className="bottom-nav" aria-label="Main navigation">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button key={id} className={`nav-item ${page === id ? 'active' : ''}`} onClick={() => setPage(id)}>
              <Icon size={23} strokeWidth={page === id ? 3 : 2.4} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </section>

      {showWithdraw && <WithdrawModal onClose={() => setShowWithdraw(false)} onNotify={notify} />}
      {showSupport && <SupportModal onClose={() => setShowSupport(false)} onNotify={notify} />}
      {toast && <div className="toast"><Check size={16} /> {toast}</div>}
    </main>
  );
}

function TopBar({ onProfile, onLanguage }: { onProfile?: () => void; onLanguage?: () => void }) {
  return (
    <header className="topbar">
      <div className="brand-mark"><span className="brand-orb">O</span><strong>share</strong></div>
      <div className="top-actions">
        <button className="language-pill" onClick={onLanguage}>EN <span>हिं</span></button>
        <button className="balance-pill" onClick={onProfile}><IndianRupee size={15} /> 0.00</button>
      </div>
    </header>
  );
}

function SectionTitle({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return <div className="section-title"><h2><span className="title-dot" />{children}</h2>{action}</div>;
}

function HomePage({ checkedIn, onCheckIn, onNavigate, onNotify }: { checkedIn: boolean; onCheckIn: () => void; onNavigate: (page: Page) => void; onNotify: (message: string) => void }) {
  const [heroSlide, setHeroSlide] = useState(0);
  const heroSlides = [
    { image: heroImage, eyebrow: 'WELCOME TO OSHARE', title: <>Play smart.<br /><span>Earn more.</span></>, copy: 'Simple tasks, instant rewards and a community that grows together.', button: 'Explore rewards', action: () => onNavigate('earn') },
    { image: homeSecondImage, eyebrow: 'MORE WAYS TO EARN', title: <>Small tasks.<br /><span>Real rewards.</span></>, copy: 'Check in daily, invite friends and discover new campaigns.', button: 'Refer friends', action: () => onNavigate('promo') },
    { image: promoImage, eyebrow: 'INVITE & EARN', title: <>Grow together.<br /><span>Earn ₹100.</span></>, copy: 'Share your invite code and unlock your community bonus.', button: 'View invite code', action: () => onNavigate('promo') },
  ];
  const slide = heroSlides[heroSlide];

  return (
    <div className="page-content">
      <TopBar onProfile={() => onNavigate('profile')} onLanguage={() => onNotify('Language switched to Hindi')} />
      <div className="hero-card">
        <img src={slide.image} alt="Oshare rewards and tasks" />
        <div className="hero-overlay">
          <div><p className="eyebrow">{slide.eyebrow}</p><h1>{slide.title}</h1><p className="hero-copy">{slide.copy}</p></div>
          <button className="hero-button" onClick={slide.action}>{slide.button} <ArrowRight size={16} /></button>
        </div>
        <div className="hero-controls"><button onClick={() => setHeroSlide((heroSlide + heroSlides.length - 1) % heroSlides.length)} aria-label="Previous banner"><ArrowLeft size={16} /></button><div>{heroSlides.map((_, index) => <button key={index} className={index === heroSlide ? 'selected' : ''} onClick={() => setHeroSlide(index)} aria-label={`Show banner ${index + 1}`} />)}</div><button onClick={() => setHeroSlide((heroSlide + 1) % heroSlides.length)} aria-label="Next banner"><ArrowRight size={16} /></button></div>
      </div>
      <div className="announcement"><Bell size={16} /><span>Oshare is trusted by players across India. Complete tasks and earn real rewards.</span><Sparkles size={16} /></div>

      <SectionTitle action={<button className="text-button" onClick={() => onNavigate('earn')}>View all <ArrowRight size={15} /></button>}>Tasks</SectionTitle>
      <div className="task-list">
        <TaskCard icon={<CalendarCheck />} title="Daily Check-in" description="Login reward up to ₹10" meta="Login every day to claim" actionLabel={checkedIn ? 'Claimed' : 'Check in'} onClick={() => onNavigate('daily')} completed={checkedIn} onDetail={() => onNotify('Daily check-in gives up to ₹10 every day')} />
        <TaskCard icon={<MessageCircle />} title="SMS Task" description="Estimated Revenue ₹1,000" meta="Send messages and earn" actionLabel="Coming soon" muted onDetail={() => onNotify('SMS task is coming soon')} />
        <TaskCard icon={<MessageCircle className="whatsapp-icon" />} title="WhatsApp / Global Task" description="Estimated Revenue ₹2,000" meta="Revenue per message ₹2" actionLabel="Start task" onClick={() => onNavigate('whatsapp')} onDetail={() => onNotify('Earn ₹2 per verified message')} green />
      </div>

      <SectionTitle>Getting started</SectionTitle>
      <div className="quick-grid">
        <QuickAction icon={<CircleHelp />} label="Help Center" onClick={() => onNotify('Help Center opened')} />
        <QuickAction icon={<Users />} label="Agent Guide" onClick={() => onNotify('Agent guide opened')} />
        <QuickAction icon={<Smartphone />} label="App Download" onClick={() => onNotify('App download will be available soon')} />
        <QuickAction icon={<Gift />} label="Mystery Bonus Guide" onClick={() => onNotify('Mystery Bonus Guide opened')} />
        <QuickAction icon={<Sparkles />} label="VIP Club" onClick={() => onNotify('VIP Club is coming soon')} />
        <QuickAction icon={<Target />} label="Daily Events" onClick={() => onNotify('Daily events are coming soon')} />
      </div>
      <div className="safety-note"><ShieldCheck size={19} /><p><strong>Official Oshare access hub</strong><br />Bookmark this page to always reach the real site. Never trust unknown links.</p></div>
      <p className="responsible-note"><Info size={15} /> Only for users aged 18 and above. Play responsibly.</p>
    </div>
  );
}

function TaskCard({ icon, title, description, meta, actionLabel, onClick, onDetail, muted, green, completed }: { icon: React.ReactNode; title: string; description: string; meta: string; actionLabel: string; onClick?: () => void; onDetail: () => void; muted?: boolean; green?: boolean; completed?: boolean }) {
  return <article className="task-card"><div className={`task-icon ${green ? 'green' : ''}`}>{icon}</div><div className="task-info"><h3>{title}</h3><p>{description}</p><span>{meta}</span></div><div className="task-side"><button className={`task-button ${muted ? 'muted' : ''} ${green ? 'green' : ''} ${completed ? 'done' : ''}`} onClick={onClick} disabled={muted}>{completed ? <Check size={16} /> : null}{actionLabel}</button><button className="detail-button" onClick={onDetail}>Detail <ChevronDown size={14} /></button></div></article>;
}

function QuickAction({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return <button className="quick-action" onClick={onClick}><span>{icon}</span>{label}<ArrowRight size={15} /></button>;
}

function PromoPage({ onCopy, onNotify }: { onCopy: () => void; onNotify: (message: string) => void }) {
  return <div className="page-content inner-page"><PageHeading title="Refer & Earn" subtitle="Grow your circle, grow your rewards" icon={<Share2 />} /><div className="invite-hero"><div><p className="eyebrow">YOUR COMMUNITY REWARD</p><h1>Invite friends,<br />earn together</h1><p>Bonus is paid when your friend's first withdrawal is approved.</p></div><strong>₹100.00</strong></div><div className="stats-row"><Stat value="0" label="Invited" /><Stat value="0" label="Active" /><Stat value="₹0.00" label="Earned" /></div><section className="white-panel code-panel"><div className="panel-label">YOUR INVITE CODE</div><div className="code-row"><strong>KVZGH323</strong><button className="orange-button" onClick={onCopy}><Copy size={16} /> Copy</button></div><div className="link-row">osharee.com/register?ref=KVZGH323 <Link size={17} /></div><div className="share-row"><ShareOption icon={<MessageCircle />} label="WhatsApp" color="whatsapp" onClick={() => onNotify('WhatsApp share opened')} /><ShareOption icon={<Send />} label="Telegram" color="telegram" onClick={() => onNotify('Telegram share opened')} /><ShareOption icon={<span className="fb">f</span>} label="Facebook" color="facebook" onClick={() => onNotify('Facebook share opened')} /><ShareOption icon={<MoreHorizontal />} label="More" color="more" onClick={() => onNotify('More share options opened')} /></div></section><section className="white-panel steps-panel"><h2>How it works</h2>{['Share your code', 'They register & check in', 'They withdraw once', 'You earn the bonus'].map((step, index) => <div className="step" key={step}><span>{index + 1}</span><div><h3>{step}</h3><p>{['Send your invite code or link to friends on WhatsApp, Telegram or anywhere.', 'Your friend signs up with your code and completes their first daily check-in.', 'The bonus is unlocked when their first withdrawal is approved — not before.', '₹100.00 is credited to your wallet automatically. Paid once, on their first withdrawal only.'][index]}</p></div></div>)}</section></div>;
}

function Stat({ value, label }: { value: string; label: string }) { return <div className="stat"><strong>{value}</strong><span>{label}</span></div>; }
function ShareOption({ icon, label, color, onClick }: { icon: React.ReactNode; label: string; color: string; onClick: () => void }) { return <button className="share-option" onClick={onClick}><span className={`share-icon ${color}`}>{icon}</span><small>{label}</small></button>; }

function EarnPage({ onWithdraw, onNotify }: { onWithdraw: () => void; onNotify: (message: string) => void }) {
  return <div className="page-content inner-page"><PageHeading title="Earn & Withdraw" subtitle="Your rewards, always within reach" icon={<Wallet />} /><div className="wallet-card"><div><p>AVAILABLE BALANCE</p><h1>₹0.00</h1><span>Keep completing tasks to grow your wallet.</span></div><div className="wallet-orb"><IndianRupee /></div></div><div className="earn-actions"><button className="primary-action" onClick={onWithdraw}><Landmark size={20} /> Withdraw balance <ArrowRight size={17} /></button><button className="secondary-action" onClick={() => onNotify('Transaction records are empty')}><CalendarCheck size={20} /> Transaction history</button></div><SectionTitle>Ways to earn</SectionTitle><div className="earn-list"><EarnRow icon={<CalendarCheck />} title="Daily Check-in" detail="Check in every day" reward="Up to ₹10" onClick={() => onNotify('Daily check-in is on the Home tab')} /><EarnRow icon={<Users />} title="Refer a friend" detail="Invite your community" reward="₹100 bonus" onClick={() => onNotify('Open Promo to invite friends')} /><EarnRow icon={<PartyPopper />} title="Daily events" detail="Watch for new campaigns" reward="Coming soon" onClick={() => onNotify('New events are coming soon')} /></div></div>;
}
function EarnRow({ icon, title, detail, reward, onClick }: { icon: React.ReactNode; title: string; detail: string; reward: string; onClick: () => void }) { return <button className="earn-row" onClick={onClick}><span className="earn-icon">{icon}</span><span className="earn-copy"><strong>{title}</strong><small>{detail}</small></span><span className="reward">{reward}</span><ArrowRight size={17} /></button>; }

function DailyCheckInPage({ onBack, onNotify }: { onBack: () => void; onNotify: (message: string) => void }) {
  const rewards = [1, 2, 3, 4, 5, 7, 15];
  const [checkedIn, setCheckedIn] = useState(false);

  const claimReward = () => {
    if (checkedIn) {
      onNotify('Today’s reward is already claimed');
      return;
    }
    setCheckedIn(true);
    onNotify('₹1.00 reward added to your account');
  };

  return <div className="page-content inner-page daily-page"><div className="daily-topbar"><button className="back-button" onClick={onBack}><ArrowLeft size={20} /></button><h1>Daily Check-in</h1><span className="daily-balance"><IndianRupee size={14} />0</span></div><section className="checkin-card"><h2>{checkedIn ? 'Today’s reward is claimed' : "Check in to claim today's reward"}</h2><p>Day 1 of 7 · Login every day to earn up to ₹15.00</p><button className={`claim-button ${checkedIn ? 'claimed' : ''}`} onClick={claimReward}>{checkedIn ? <Check size={18} /> : <Gift size={18} />} {checkedIn ? 'Claimed today' : 'Check in · ₹1.00'}</button></section><SectionTitle action={<strong className="total-reward">Total ₹37.00</strong>}>7-Day Rewards</SectionTitle><section className="reward-grid">{rewards.map((reward, index) => <button key={reward} className={`reward-day ${index === 0 ? 'today' : ''} ${index === 6 ? 'last-day' : ''}`} onClick={() => onNotify(index === 0 ? (checkedIn ? 'Day 1 already claimed' : 'Claim today’s reward above') : `Day ${index + 1} unlocks after your daily streak`)}><span>{index === 0 ? 'Today' : ''}</span><strong>DAY {index + 1}</strong><i className="coin">₹</i><b>₹{reward}</b></button>)}</section><div className="checkin-stats"><Stat value="0" label="Total check-ins" /><Stat value="0" label="Best streak" /><Stat value={checkedIn ? '₹1.00' : '₹0.00'} label="Total earned" /></div><SectionTitle>Rules</SectionTitle><section className="rules-card">{['You can check in once per day. The day resets at 12:00 AM (India time).', 'Reward grows each day of your streak, from Day 1 to Day 7.', 'Missing a day resets your streak back to Day 1.', 'After Day 7 the cycle starts again from Day 1.', "Reward amounts follow the platform's current check-in rules and may change."].map((rule) => <p key={rule}><span />{rule}</p>)}</section><SectionTitle>Recent Check-ins</SectionTitle><div className="recent-card">{checkedIn ? <><Check size={17} /> Today · ₹1.00 claimed successfully</> : 'No check-ins yet. Claim your first reward today!'}</div><p className="responsible-note">Only for users aged 18 and above. Play responsibly.</p><p className="copyright-note">© 2026 Oshare. All rights reserved.</p></div>;
}

function WhatsAppPage({ onBack, onNotify }: { onBack: () => void; onNotify: (message: string) => void }) {
  const [phone, setPhone] = useState('');
  const [linked, setLinked] = useState(false);

  const requestCode = () => {
    if (!phone.trim()) {
      onNotify('Enter your WhatsApp number first');
      return;
    }
    onNotify('One-time code sent to your number');
    setLinked(true);
  };

  return <div className="page-content inner-page whatsapp-page"><div className="whatsapp-heading"><button className="back-button" onClick={onBack}><ArrowLeft size={20} /></button><div><h1>WhatsApp / Global Task</h1><p>Earn ₹2 for every verified message</p></div></div><section className="whatsapp-intro"><p>Link your own WhatsApp. We give you a one-time code to type on your phone — nothing is paid until the link is live. Every number earns its own ₹100.00 every 24 hours, counted from when that number was linked.</p><div className="phone-form"><button className="country-code">+91 <ChevronDown size={15} /></button><input value={phone} onChange={(event) => setPhone(event.target.value)} type="tel" placeholder="Enter number" aria-label="WhatsApp number" /><button className="get-code" onClick={requestCode}>Get code</button></div><div className="link-status"><div><span>LINK IS {linked ? 'LIVE' : 'OFF'}</span><strong>{linked ? 'Number linked' : 'Get code'}</strong></div>{linked ? <span className="live-badge"><Check size={14} /> Live</span> : <span className="locked-badge"><LockKeyhole size={14} /> Locked</span>}</div></section><SectionTitle>Available Tasks</SectionTitle><section className="available-tasks"><AvailableTask icon={<MessageCircle />} title="Link WhatsApp — ₹100 every 24 hours" detail="+ ₹100 / 24h · 5 joined" onJoin={() => onNotify(linked ? 'WhatsApp linking task joined' : 'Get your code to join')} /><AvailableTask icon={<Users />} title="Invite 3 friends this week" detail="+ ₹75 referral bonus · 4 joined" onJoin={() => onNotify('Referral task joined')} /><AvailableTask icon={<User />} title="Complete your Oshare profile" detail="+ ₹10 admin reward · 4 joined" onJoin={() => onNotify('Profile task joined')} /></section><div className="whatsapp-note"><ShieldCheck size={17} /> Your number stays private and can be unlinked from your profile.</div></div>;
}

function AvailableTask({ icon, title, detail, onJoin }: { icon: React.ReactNode; title: string; detail: string; onJoin: () => void }) {
  return <div className="available-task"><span className="available-icon">{icon}</span><div><strong>{title}</strong><small>{detail}</small></div><button onClick={onJoin}>Join</button></div>;
}

function ProfilePage({ onNotify }: { onNotify: (message: string) => void }) {
  const profileItems = [{ icon: <Settings />, label: 'Account settings' }, { icon: <Bell />, label: 'Notifications' }, { icon: <CircleHelp />, label: 'Help & support' }, { icon: <ShieldCheck />, label: 'Terms and safety' }];
  return <div className="page-content inner-page"><PageHeading title="My Profile" subtitle="Manage your account and preferences" icon={<User />} /><section className="profile-card"><div className="avatar"><User size={34} /></div><div><h1>Oshare Player</h1><p>Member since November 2026</p><span className="verified"><Check size={13} /> Verified account</span></div><button className="edit-button" onClick={() => onNotify('Profile editing will be available soon')}><Settings size={17} /></button></section><div className="profile-balance"><div><span>Total earned</span><strong>₹0.00</strong></div><div><span>Completed tasks</span><strong>0</strong></div><div><span>Referrals</span><strong>0</strong></div></div><section className="settings-list">{profileItems.map(({ icon, label }) => <button key={label} onClick={() => onNotify(`${label} opened`)}><span className="setting-icon">{icon}</span><span>{label}</span><ArrowRight size={17} /></button>)}<button className="logout-row" onClick={() => onNotify('You are already safely signed in')}><span className="setting-icon"><LogOut /></span><span>Log out</span><ArrowRight size={17} /></button></section><div className="profile-footer"><Sparkles size={16} /> Oshare version 1.0.0</div></div>;
}

function PageHeading({ title, subtitle, icon }: { title: string; subtitle: string; icon: React.ReactNode }) { return <div className="page-heading"><div className="heading-icon">{icon}</div><div><h1>{title}</h1><p>{subtitle}</p></div></div>; }

function WithdrawModal({ onClose, onNotify }: { onClose: () => void; onNotify: (message: string) => void }) {
  const [method, setMethod] = useState<'upi' | 'bank'>('upi');
  return <div className="modal-backdrop" onClick={onClose}><div className="modal-card" onClick={(event) => event.stopPropagation()}><div className="modal-heading"><div><p>WITHDRAWABLE BALANCE</p><h2>₹0.00</h2><span>Minimum withdrawal ₹200.00</span></div><button onClick={onClose}><X /></button></div><div className="modal-body"><h3>Withdraw to</h3><p>Add your UPI ID or bank account once — after that, withdrawing takes two taps.</p><div className="method-tabs"><button className={method === 'upi' ? 'selected' : ''} onClick={() => setMethod('upi')}><Wallet size={18} /> UPI</button><button className={method === 'bank' ? 'selected' : ''} onClick={() => setMethod('bank')}><Landmark size={18} /> Bank</button></div><input aria-label="Payout details" placeholder={method === 'upi' ? 'name@okhdfcbank' : 'Account number'} /><button className="save-button" onClick={() => { onNotify('Payout method saved'); onClose(); }}>Save payout method</button></div></div></div>;
}
function SupportModal({ onClose, onNotify }: { onClose: () => void; onNotify: (message: string) => void }) { return <div className="modal-backdrop" onClick={onClose}><div className="support-modal" onClick={(event) => event.stopPropagation()}><button className="close-button" onClick={onClose}><X /></button><div className="support-icon"><Headphones /></div><h2>How can we help?</h2><p>Our support team is here for questions about tasks, rewards and withdrawals.</p><button className="save-button" onClick={() => { onNotify('Support request started'); onClose(); }}>Start a support chat</button></div></div>; }

export default App;
