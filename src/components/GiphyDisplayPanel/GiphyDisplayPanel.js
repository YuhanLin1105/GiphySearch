import React from "react";
const GiphyDisplayPanel = ({ giphyList }) => {
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="giphyDisplay-page__panel">
        {giphyList.map((el) => (
          <div className="giphyDisplay-page__imgs-parent" key={el.id}>
            <img
              className="giphyDisplay-page__imgs"
              src={el.images.fixed_height.url}
              alt="####"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
export default GiphyDisplayPanel;
