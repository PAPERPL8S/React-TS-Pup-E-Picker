import React from "react";
import { Link } from "react-router-dom";

interface ClassSectionProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  favoriteCount: number;
  unfavoriteCount: number;
}

const ClassSection: React.FC<ClassSectionProps> = ({
  children,
  activeTab,
  setActiveTab,
  favoriteCount,
  unfavoriteCount,
}) => {
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/functional"} className="btn">
          Change to Functional
        </Link>
        <div className="selectors">
          <div
            className={`selector ${activeTab === "favorite" ? "active" : ""}`}
            onClick={() => handleTabClick("favorite")}>
            favorite ({favoriteCount})
          </div>
          <div
            className={`selector ${activeTab === "unfavorite" ? "active" : ""}`}
            onClick={() => handleTabClick("unfavorite")}>
            unfavorite ({unfavoriteCount})
          </div>
          <div
            className={`selector ${activeTab === "create" ? "active" : ""}`}
            onClick={() => handleTabClick("create")}>
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};

export default ClassSection;
