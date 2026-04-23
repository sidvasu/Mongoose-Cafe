// Loads items on start
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/api/items");
    if (!res.ok) throw new Error("Failed to load items");
    const allItems = await res.json();
    allItems.forEach(appendCard);
  } catch (err) {
    alert("Could not load menu items. Please try again later.");
    console.error(err);
  }
});

// Adds a card
function appendCard(item) {
  const card = document.createElement("div");
  card.classList.add("item-card");
  card.dataset.id = item._id;

  card.innerHTML = `
    <button class="delete-btn">🗑️</button>
    <img src="data:image/jpeg;base64,${item.imgBase64}" class="item-img">
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
  reader.onload = async function(e) {
    const imgBase64 = e.target.result.split(",")[1];

    // Sends POST request
    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, ingredients, imgBase64 })
      });
      
      if (!res.ok) throw new Error("Failed to add item");
      const item = await res.json();
      appendCard(item);
    } catch (err) {
      alert("Failed to add item. Please try again.");
      console.error(err);
    }
  };

  reader.readAsDataURL(imageFile);

  // Resets form
  document.getElementById("nameInput").value = "";
  document.getElementById("ingredientsInput").value = "";
  document.getElementById("imageInput").value = "";
});

// Deletes a menu item
document.getElementById("itemGrid").addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const card = e.target.closest(".item-card");
    await fetch(`/api/items/${card.dataset.id}`, { method: "DELETE" });
    card.remove();
  }
});