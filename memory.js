const tilesContainer = document.querySelector('.tiles');
const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];
const colorsList = [...colors, ...colors];
const tileCount = colorsList.length;


// game status
let revealCount = 0;
let currentTile = null;
let awaitingAfterMove = false;


function makeTiles(color) {
    const element = document.createElement('div');
    element.classList.add('tile');
    element.setAttribute('data-color', color);
    element.setAttribute('data-revealed', 'false');
    
    
    element.addEventListener('click', () => {
        const revealed = element.getAttribute('data-revealed');
        
        if (awaitingAfterMove || revealed === 'true' || element === currentTile) {
            return;
        };
    
        element.style.backgroundColor = color;
    

        if (!currentTile) {
            currentTile = element;
            return;
        }
        
        const colorToMatch = currentTile.getAttribute('data-color');
        
        if (colorToMatch === color) {
            currentTile.setAttribute('data-revealed', 'true');
            element.setAttribute('data-revealed', 'true');

            currentTile = null;
            awaitingAfterMove = false;
            revealCount += 2;

            if (revealCount === tileCount) {
                alert('You Win!');
            }
            return;
        }
        
        awaitingAfterMove = true;
        
        setTimeout(() => {
            element.style.backgroundColor = null;
            currentTile.style.backgroundColor = null;

            currentTile = null;
            awaitingAfterMove = false;
        }, 1000);
    
    });


    return element;
}




// make random tiles color
for (let i = 0; i < tileCount; i++) {
    const randomIndex = Math.floor(Math.random() * colorsList.length);
    const color = colorsList[randomIndex];
    const tile = makeTiles(color)

    colorsList.splice(randomIndex, 1);
    tilesContainer.appendChild(tile);
}