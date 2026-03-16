import { User, Mail, Briefcase, LogOut } from 'lucide-react'

interface ProfileModalProps {
  onLogout: () => void
}

const ProfileModal = ({onLogout }: ProfileModalProps) => {
  return (
    <div className={[
      'absolute bottom-full left-0 right-0 mb-2',
      'bg-background border border-borderGrey rounded-xl',
      'shadow-lg z-50',
      'animate-in fade-in slide-in-from-bottom-2 duration-150',
    ].join(' ')}>
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-borderGrey">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-darkGrey">
          Profile
        </p>
      </div>

      <div className="flex flex-col items-center px-4 py-4 border-b border-borderGrey">
        <div className="w-14 h-14 flex items-center justify-center bg-darkPurple mb-3">
          <User size={26} className="text-corePurple" />
        </div>
        <p className="text-[14px] font-semibold text-text">Noel Malpal Jr.</p>
        <p className="text-[11px] text-darkGrey mt-0.5">Head Chef</p>
      </div>

      <div className="px-4 py-3 flex flex-col gap-2.5 border-b border-borderGrey">
        <div className="flex items-center gap-2.5">
          <Mail size={13} className="text-darkGrey shrink-0" />
          <span className="text-[12px] text-text truncate">chef@restaurant.com</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Briefcase size={13} className="text-darkGrey shrink-0" />
          <span className="text-[12px] text-text">Kitchen Intelligence V2</span>
        </div>
      </div>

      <div className="px-4 py-3">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-2 text-[13px] text-red-500 hover:bg-red-500/10 transition-colors duration-150"
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>

    </div>
  )
}

export default ProfileModal