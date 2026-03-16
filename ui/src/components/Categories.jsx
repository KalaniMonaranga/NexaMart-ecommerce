import React from "react";

const categories = [
  {
    name: "Grocery",
    img: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=1000&auto=format&fit=crop&q=60"
  },
  {
    name: "Hampers",
    img: "https://plus.unsplash.com/premium_photo-1663928246639-86813155169f?w=1000&auto=format&fit=crop&q=60"
  },
  {
    name: "Food",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1000&auto=format&fit=crop&q=60"
  },
  {
    name: "Stationaries",
    img: "https://images.unsplash.com/photo-1568871391149-449702439177?w=1000&auto=format&fit=crop&q=60"
  },
  {
    name: "Home & Lifestyle",
    img: "https://images.unsplash.com/photo-1556185781-a47769abb7ee?w=1000&auto=format&fit=crop&q=60"
  }
];

const Categories = () => {
  return (
    <section className=" bg-light pt-5">
     <div className="container text-center mt-5 p-4"> 
        <div className="d-flex justify-content-center flex-wrap gap-4">
          {categories.map((item, index) => (
            <div key={index} className="category-card text-center mx-2 my-3">
              <div className="category-circle overflow-hidden shadow">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-100 h-100 object-cover"
                />
              </div>
              <div className="category-label mt-2">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;