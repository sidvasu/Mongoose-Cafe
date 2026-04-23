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
