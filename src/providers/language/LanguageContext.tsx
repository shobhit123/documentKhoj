import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";

interface LanguageContextType {
  language: "en" | "hi";
  toggleLanguage: () => void;
  isToggleOn: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<"en" | "hi">(
    (localStorage.getItem("language") as "en" | "hi") || "en"
  );
  const [isToggleOn, setIsToggleOn] = useState(false)

  useEffect(() => {
    // document.body.setAttribute("data-theme", language);
    localStorage.setItem("language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "hi" : "en")); //dynamic language change
    setIsToggleOn(!isToggleOn);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, isToggleOn }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
