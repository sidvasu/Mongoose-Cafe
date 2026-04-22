// Mock data (for testing)
const mockItems = [
  {
    name: "Test Boba",
    ingredients: ["Milk tea", "Tapioca pearls"],
    image: "https://via.placeholder.com/60"
  },
  {
    name: "Test Donut",
    ingredients: ["Flour", "Sugar", "Glaze"],
    image: "https://via.placeholder.com/60"
  }
];

// Render mock items on page load
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("itemGrid");

  mockItems.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("item-card");

    card.innerHTML = `
      <button class="delete-btn">🗑️</button>
      <img src="${item.image}" class="item-img">
      <h2>${item.name}</h2>
      <p class="ingredients-text">${item.ingredients.join(", ")}</p>
    `;

    card.querySelector(".delete-btn").addEventListener("click", () => {
      card.remove();
    });

    grid.appendChild(card);
  });
});
// End of mock data (for testing)

document.getElementById("addBtn").addEventListener("click", () => {
  const name = document.getElementById("nameInput").value;
  const ingredients = document.getElementById("ingredientsInput").value;
  const imageFile = document.getElementById("imageInput").files[0];

  if (!name || !ingredients || !imageFile) {
    alert("Please fill out all fields.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const imgSrc = e.target.result;

    const card = document.createElement("div");
    card.classList.add("item-card");

    card.innerHTML = `
      <button class="delete-btn">🗑️</button>
      <img src="${imgSrc}" class="item-img">
      <h2>${name}</h2>
      <p class="ingredients-text">${ingredients}</p>
    `;

    card.querySelector(".delete-btn").addEventListener("click", () => {
      card.remove();
    });

    document.getElementById("itemGrid").appendChild(card);
  };

  reader.readAsDataURL(imageFile);

  document.getElementById("nameInput").value = "";
  document.getElementById("ingredientsInput").value = "";
  document.getElementById("imageInput").value = "";
});
