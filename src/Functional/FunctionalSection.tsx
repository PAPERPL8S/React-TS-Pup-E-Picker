import { Link } from "react-router-dom";
import { TActiveTab } from "./FunctionalApp";

interface FunctionalSectionProps {
  activeTab: TActiveTab;
  setActiveTab: (tab: TActiveTab) => void;
  favoriteCount: number;
  unfavoriteCount: number;
  children?: React.ReactNode;
}

const FunctionalSection = ({
  children,
  activeTab,
  setActiveTab,
  favoriteCount,
  unfavoriteCount,
}: FunctionalSectionProps) => {
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
            onClick={() => setActiveTab("favorite")}>
            favorite ({favoriteCount})
          </div>
          <div
            className={`selector ${activeTab === "unfavorite" ? "active" : ""}`}
            onClick={() => setActiveTab("unfavorite")}>
            unfavorite ({unfavoriteCount})
          </div>
          <div
            className={`selector ${activeTab === "create" ? "active" : ""}`}
            onClick={() => setActiveTab("create")}>
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};

export default FunctionalSection;
