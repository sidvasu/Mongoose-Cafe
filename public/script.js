// Adds a card
function appendCard(item) {
  const card = document.createElement("div");
  card.classList.add("item-card");
  card.dataset.id = item._id;

  card.innerHTML = `
    <button class="delete-btn">🗑️</button>
    <img src="${item.imgSrc}" class="item-img">
    <h2>${item.name}</h2>
    <p class="ingredients-text">${item.ingredients}</p>
  `;

  document.getElementById("itemGrid").appendChild(card);
}

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

  const reader = new FileReader();
  reader.onload = function(e) {
    const imgSrc = e.target.result;
    const item = { name, ingredients, imgSrc };
    appendCard(item);
  }

  reader.readAsDataURL(imageFile);

  // Resets form
  document.getElementById("nameInput").value = "";
  document.getElementById("ingredientsInput").value = "";
  document.getElementById("imageInput").value = "";
});

// Deletes a menu item
document.getElementById("itemGrid").addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const card = e.target.closest(".item-card");
    card.remove();
  }
});