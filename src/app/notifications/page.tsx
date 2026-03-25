"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { BottomNav } from "@/components/BottomNav";
import { notifications as initialNotifications, type Notification } from "@/data/mock";
import {
  Tag,
  Trophy,
  Settings,
  Users,
  CheckCheck,
  X,
  Bell,
} from "lucide-react";

type FilterTab = "all" | "deal" | "achievement" | "social";

const filterTabs: { label: string; value: FilterTab }[] = [
  { label: "All", value: "all" },
  { label: "Deals", value: "deal" },
  { label: "Achievements", value: "achievement" },
  { label: "Social", value: "social" },
];

function getNotificationIcon(type: Notification["type"]) {
  switch (type) {
    case "deal":
      return { icon: Tag, color: "text-accent", bg: "bg-accent/20" };
    case "achievement":
      return { icon: Trophy, color: "text-yellow-400", bg: "bg-yellow-400/20" };
    case "system":
      return { icon: Settings, color: "text-primary-light", bg: "bg-primary/20" };
    case "social":
      return { icon: Users, color: "text-pink-400", bg: "bg-pink-400/20" };
  }
}

export default function NotificationsPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [notifs, setNotifs] = useState<Notification[]>(initialNotifications);

  const filteredNotifs =
    activeFilter === "all"
      ? notifs
      : notifs.filter((n) => n.type === activeFilter);

  const unreadCount = notifs.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const dismissNotification = (id: string) => {
    setNotifs((prev) => prev.filter((n) => n.id !== id));
  };

  const toggleRead = (id: string) => {
    setNotifs((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  return (
    <div className="min-h-screen bg-dark pb-20">
      <div className="px-4 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Logo size={32} />
            <div>
              <h1 className="text-xl font-bold">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-xs text-gray-400">
                  {unreadCount} unread
                </p>
              )}
            </div>
          </div>
          {unreadCount > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={markAllRead}
              className="flex items-center gap-1.5 text-xs text-accent font-medium px-3 py-1.5 rounded-xl glass"
            >
              <CheckCheck size={14} />
              Mark all read
            </motion.button>
          )}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.value;
            const tabCount =
              tab.value === "all"
                ? notifs.length
                : notifs.filter((n) => n.type === tab.value).length;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? "bg-primary text-white"
                    : "glass text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-dark-lighter text-gray-400"
                  }`}
                >
                  {tabCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Notifications list */}
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {filteredNotifs.map((notif, i) => {
              const { icon: NotifIcon, color, bg } = getNotificationIcon(notif.type);
              return (
                <motion.div
                  key={notif.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100, transition: { duration: 0.2 } }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => toggleRead(notif.id)}
                  className={`rounded-2xl p-4 flex items-start gap-3 cursor-pointer transition-colors ${
                    notif.read
                      ? "glass"
                      : "glass-strong border-primary/40"
                  }`}
                >
                  {/* Type icon */}
                  <div
                    className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}
                  >
                    <NotifIcon size={18} className={color} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className={`text-sm font-semibold ${
                          notif.read ? "text-gray-300" : "text-white"
                        }`}
                      >
                        {notif.title}
                      </h3>
                      {/* Unread dot */}
                      {!notif.read && (
                        <div className="w-2 h-2 rounded-full bg-accent shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p
                      className={`text-xs leading-relaxed mt-0.5 ${
                        notif.read ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      {notif.message}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-1.5">{notif.time}</p>
                  </div>

                  {/* Dismiss button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dismissNotification(notif.id);
                    }}
                    className="text-gray-500 hover:text-gray-300 transition-colors p-1 rounded-lg hover:bg-dark-lighter shrink-0"
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Empty state */}
          {filteredNotifs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Bell size={48} className="mx-auto mb-3 text-gray-600" />
              <p className="text-gray-400 font-medium">No notifications</p>
              <p className="text-sm text-gray-500 mt-1">
                {activeFilter === "all"
                  ? "You are all caught up!"
                  : `No ${activeFilter} notifications to show.`}
              </p>
            </motion.div>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
