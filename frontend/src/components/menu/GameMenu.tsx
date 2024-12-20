import React from "react";
import { useNavigate } from "react-router-dom";
import { Crown, Users, Trophy, BarChart2, Shield } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { AuthButtons } from "../auth/AuthButtons";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MenuButton } from "./MenuButton";
import { useTranslation } from "react-i18next";

const GameMenu: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { t } = useTranslation();

  // Update the admin button onClick handler
  const handleAdminClick = () => {
    navigate("/admin/auth");
  };

  return (
    <div className="min-h-screen bg-rose-50/30 p-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Header */}
        <div className="flex justify-between items-center mb-16">
          <div className="flex-1 flex justify-start">
            <LanguageSwitcher />
          </div>
          <div className="flex items-center gap-3">
            <Crown className="w-12 h-12 text-rose-400" />
            <h1 className="font-serif italic text-5xl text-rose-400">
              Memória
            </h1>
          </div>
          <div className="flex-1 flex justify-end">
            <AuthButtons />
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid gap-6 mb-12">
          <MenuButton
            icon={<Crown className="w-6 h-6" />}
            title={t("menu.singleplayer")}
            description={t("menu.singleplayerDesc")}
            onClick={() => navigate("/singleplayer")}
          />

          <MenuButton
            icon={<Users className="w-6 h-6" />}
            title={t("menu.multiplayer")}
            description={t("menu.multiplayerDesc")}
            onClick={() => navigate("/multiplayer")}
            disabled={!isAuthenticated}
            authRequired
          />

          <MenuButton
            icon={<BarChart2 className="w-6 h-6" />}
            title={t("menu.stats")}
            description={t("menu.statsDesc")}
            onClick={() => navigate("/stats")}
            disabled={!isAuthenticated}
            authRequired
          />

          <MenuButton
            icon={<Trophy className="w-6 h-6" />}
            title={t("menu.leaderboard")}
            description={t("menu.leaderboardDesc")}
            onClick={() => navigate("/leaderboard")}
          />

          <MenuButton
            icon={<Shield className="w-6 h-6" />}
            title={t("menu.admin")}
            description={t("menu.adminDesc")}
            onClick={handleAdminClick}
            variant="admin"
          />
        </div>

        <div className="flex justify-center">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default GameMenu;
