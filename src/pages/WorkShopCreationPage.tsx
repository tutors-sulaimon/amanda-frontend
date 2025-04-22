import placeholderimage from "../assets/Image-Placeholder-Dark.png";

const WorkShopCreationPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        border: "1px solid black",
      }}
    >
      <form
        action=""
        style={{
          border: "1px solid yellow",
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          height: "100vh",
          overflow: "scroll",
        }}
      >
        <div>
          <figure>
            <img
              src={placeholderimage}
              alt="work-shop-image"
              style={{ width: "450px", height: "300px" }}
            />
          </figure>
        </div>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input type="text" name="description" />
        </div>
        <div>
          <h2>Details</h2>
          <div>
            <label htmlFor="duration">Duration</label>
            <input type="text" name="duration" />
          </div>
          <div>
            <label htmlFor="age">Age</label>
            <input type="text" name="age" />
          </div>
          <div>
            <label htmlFor="price">Pricing</label>
            <input type="text" name="price" />
          </div>
        </div>
        <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <aside>
            <figure>
              <img
                src={placeholderimage}
                alt="work-shop-image"
                style={{ width: "200px", height: "200px" }}
              />
            </figure>
            <figure>
              <img
                src={placeholderimage}
                alt="work-shop-image"
                style={{ width: "200px", height: "200px" }}
              />
            </figure>
          </aside>
          <div>
            <h1>Submit Your Request</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis
              laboriosam, molestias, fugit saepe magnam tempore reiciendis
              aspernatur in quam ea ducimus illum officiis molestiae sit.
            </p>
            <form action=""></form>
          </div>
        </section>
      </form>
    </div>
  );
};

export default WorkShopCreationPage;
