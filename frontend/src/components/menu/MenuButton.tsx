import React from 'react';

interface MenuButtonProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  disabled?: boolean;
  authRequired?: boolean;
  variant?: 'default' | 'admin';
}

export const MenuButton: React.FC<MenuButtonProps> = ({
  icon,
  title,
  description,
  onClick,
  disabled,
  authRequired,
  variant = 'default'
}) => {
  const baseStyles = "w-full max-w-md mx-auto p-6 rounded-xl text-left transition-all";
  const variantStyles = {
    default: disabled
      ? 'bg-white/50 cursor-not-allowed'
      : 'bg-white/80 hover:bg-white hover:shadow-md',
    admin: 'bg-rose-50/80 hover:bg-rose-50 hover:shadow-md border-2 border-rose-200'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full shrink-0 ${
          variant === 'admin' 
            ? 'bg-rose-100 text-rose-500' 
            : 'bg-rose-50 text-rose-400'
        }`}>
          {icon}
        </div>
        <div>
          <h3 className="font-serif italic text-xl mb-1">{title}</h3>
          <p className="text-gray-600 text-sm italic">{description}</p>
          {authRequired && disabled && (
            <p className="text-rose-400 text-xs mt-1 italic">Login required</p>
          )}
        </div>
      </div>
    </button>
  );
};