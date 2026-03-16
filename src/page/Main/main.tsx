'use client'
import { useState } from "react"
import Sidebar from "../../component/SideBar/main";
import Conversation from "../../component/Conversation/main";
import Dashboard from "../../component/Dashboard/main";
import Knowledge from "../../component/Knowledge/main";
import Compliance from "../../component/Compliance/main";
import { X } from "lucide-react";


interface MainProps {
  onLogout: () => void
}


const Main: React.FC<MainProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('conversation');
  const [activeChatId, setActiveChatId] = useState('chat-1');
  const [showBanner, setShowBanner] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'conversation': return <Conversation activeChatId={activeChatId} />;
      case 'dashboard': return <Dashboard />;
      case 'knowledge': return <Knowledge />;
      case 'safety': return <Compliance />;
      default: return <Conversation activeChatId={activeChatId} />;
    }
  };
  return (
    <div className="grid grid-cols-[20%_80%] h-screen overflow-hidden">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onLogout={onLogout}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        {showBanner && (
          <div className="flex items-center justify-between p-3 text-sm bg-corePurple">
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 text-xs font-bold tracking-wider text-white" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                ACTION REQUIRED
              </span>
              <span className="text-white font-medium">Upcoming HACCP Inspection in 48 hours. Review safety logs.</span>
            </div>
            <button onClick={() => setShowBanner(false)} className="text-white/70 hover:text-white p-1">
              <X size={16} />
            </button>
          </div>
        )}
        <main className="flex-1 overflow-hidden relative">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default Main