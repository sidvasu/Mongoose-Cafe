// Adds a menu item
document.getElementById("addBtn").addEventListener("click", () => {

  // Reads form input
  const name = document.getElementById("nameInput").value;
  const ingredients = document.getElementById("ingredientsInput").value;
  const imageFile = document.getElementById("imageInput").files[0];

  if (!name || !ingredients || !imageFile) {
    alert("Please fill out all fields.");
    return;
  }

  // Sets card HTML content
  const card = document.createElement("div");
  card.classList.add("item-card");

  const imgSrc = URL.createObjectURL(imageFile);

  card.innerHTML = `
    <button class="delete-btn">🗑️</button>
    <img src="${imgSrc}" class="item-img">
    <h2>${name}</h2>
    <p class="ingredients-text">${ingredients}</p>
  `;

  // Adds card element to the grid
  document.getElementById("itemGrid").appendChild(card);

  // Resets form
  document.getElementById("nameInput").value = "";
  document.getElementById("ingredientsInput").value = "";
  document.getElementById("imageInput").value = "";
});

// Deletes a menu item
document.getElementById("itemGrid").addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const card = e.target.closest(".item-card");
    URL.revokeObjectURL(card.querySelector(".item-img").src);
    card.remove();
  }
});