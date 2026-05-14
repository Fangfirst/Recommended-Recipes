import { recipes } from './data/recipes.js';
import { RecipeCard } from './components/RecipeCard.js';
import { SkeletonCard } from './components/SkeletonCard.js';

// Register custom elements
customElements.define('recipe-card', RecipeCard);
customElements.define('skeleton-card', SkeletonCard);

document.addEventListener('DOMContentLoaded', () => {
    const skeletonContainer = document.getElementById('skeleton-container');
    const recipeContainer = document.getElementById('recipe-container');
    const trackContainer = document.getElementById('track-container');

    for (let i = 0; i < 7; i++) {
        const skeleton = document.createElement('skeleton-card');
        skeletonContainer.appendChild(skeleton);
    }

    let isDown = false;
    let startX;
    let scrollLeft;

    trackContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        trackContainer.style.cursor = 'grabbing';
        startX = e.pageX - trackContainer.offsetLeft;
        scrollLeft = trackContainer.scrollLeft;
    });

    trackContainer.addEventListener('mouseleave', () => {
        isDown = false;
        trackContainer.style.cursor = 'grab';
    });

    trackContainer.addEventListener('mouseup', () => {
        isDown = false;
        trackContainer.style.cursor = 'grab';
    });

    trackContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - trackContainer.offsetLeft;
        const walk = (x - startX) * 2;
        trackContainer.scrollLeft = scrollLeft - walk;
    });

    trackContainer.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            trackContainer.scrollLeft += e.deltaY;
        }
    });

    trackContainer.style.cursor = 'grab';

    setTimeout(() => {
        skeletonContainer.classList.add('hidden');
        recipeContainer.classList.remove('hidden');

        recipes.forEach((recipe, index) => {
            const card = document.createElement('recipe-card');
            card.style.animationDelay = `${index * 0.15}s`;
            card.setAttribute('title', recipe.title);
            card.setAttribute('time', recipe.time);
            card.setAttribute('servings', recipe.servings);
            card.setAttribute('image', recipe.image);
            
            recipeContainer.appendChild(card);
        });
    }, 2000); // 2 seconds loading simulation
});
