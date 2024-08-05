import React from "react";
import { Link } from "react-router-dom";
import { FunctionalSectionProps } from "../types";

const FunctionalSection: React.FC<FunctionalSectionProps> = ({
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
        <Link to={"/class"} className="btn">
          Change to Class
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

export default FunctionalSection;
