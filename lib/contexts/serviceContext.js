"use client";
import { createContext, useContext, useState } from "react";

export const NotificationContext = createContext();

export function useNotification() {
  return useContext(NotificationContext);
}

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const showLoading = (text = "") => {
    setLoadingText(text);
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
    setLoadingText("");
  };

  return (
    <NotificationContext.Provider
      value={{ showNotification, loading, showLoading, hideLoading }}
    >
      {children}

      {loading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-[2px] transition-all duration-300">
          <div className="flex flex-col items-center gap-3 px-6 py-5 bg-white/95 rounded-2xl border border-[#e8e5de] shadow-lg">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full border-[3px] border-[#e8e5de]"></div>{" "}
              <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#1a1916] animate-spin"></div>
            </div>
            {loadingText && (
              <p className="text-xs font-medium text-[#1a1916]/70">
                {loadingText}
              </p>
            )}
          </div>
        </div>
      )}

      {notification && (
        <div
          className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl border shadow-sm transition-all duration-300 ${
            notification.type === "error"
              ? "bg-red-50 border-red-200 text-red-700"
              : notification.type === "warning"
                ? "bg-amber-50 border-amber-200 text-amber-700"
                : "bg-white border-[#e8e5de] text-[#1a1916]"
          }`}
        >
          <p className="text-xs font-medium whitespace-nowrap">
            {notification.message}
          </p>
        </div>
      )}
    </NotificationContext.Provider>
  );
};
