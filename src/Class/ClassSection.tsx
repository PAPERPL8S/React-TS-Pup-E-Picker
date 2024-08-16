import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { TActiveTab } from "./ClassApp";

interface ClassSectionProps {
  activeTab: TActiveTab;
  setActiveTab: (tab: TActiveTab) => void;
  favoriteCount: number;
  unfavoriteCount: number;
  children?: ReactNode;
}

class ClassSection extends Component<ClassSectionProps> {
  handleTabClick = (tab: TActiveTab) => {
    this.props.setActiveTab(tab);
  };

  render() {
    const { activeTab, favoriteCount, unfavoriteCount, children } = this.props;

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
              onClick={() => this.handleTabClick("favorite")}>
              favorite ({favoriteCount})
            </div>
            <div
              className={`selector ${
                activeTab === "unfavorite" ? "active" : ""
              }`}
              onClick={() => this.handleTabClick("unfavorite")}>
              unfavorite ({unfavoriteCount})
            </div>
            <div
              className={`selector ${activeTab === "create" ? "active" : ""}`}
              onClick={() => this.handleTabClick("create")}>
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">{children}</div>
      </section>
    );
  }
}

export default ClassSection;
