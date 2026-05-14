export class RecipeCard extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title") || "Recipe";
    const time = this.getAttribute("time") || "N/A";
    const servings = this.getAttribute("servings") || "N/A";
    const image = this.getAttribute("image") || "assets/images/bg.png";

    this.innerHTML = `
            <div class="card">
                <div class="card-front">
                    <div class="card-image-container">
                        <img src="${image}" alt="${title}" class="card-image">
                        <div class="card-overlay">
                            <h3 class="card-title">${title}</h3>
                            <p class="card-meta">${time} | ${servings}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }
}
