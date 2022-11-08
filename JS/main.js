const keys = [
    [
        ['|','°'],
        ['1','!'],
        ['2','"'],
        ['3','#'],
        ['4','$'],
        ['5','%'],
        ['6','&'],
        ['7','/'],
        ['8','('],
        ['9',')'],
        ['0','='],
        ["'",'?'],
        ['¿','¡'],
    ],
    [
        ['q','Q'],
        ['w','W'],
        ['e','E'],
        ['r','R'],
        ['t','T'],
        ['y','Y'],
        ['u','U'],
        ['i','I'],
        ['o','O'],
        ['p','P'],
        ['`','^'],
        ['+','*'],
        ['DELETE', 'DELETE'],
        
    ],
    [
        ['MAYUS','MAYUS'],
        ['a','A'],
        ['s','S'],
        ['d','D'],
        ['f','F'],
        ['g','G'],
        ['h','H'],
        ['j','J'],
        ['k','K'],
        ['l','L'],
        ['ñ','Ñ'],
        ['{','['],
        ['}',']'],
    ],
    [
        ['SHIFT','SHIFT'],
        ['<','>'],
        ['z','Z'],
        ['x','X'],
        ['c','C'],
        ['v','V'],
        ['b','B'],
        ['n','N'],
        ['m','M'],
        [',',';'],
        ['.',':'],
        ['-','_'],
        ['SHIFT','SHIFT'],
    ],
    [
        ['SPACE','SPACE'],
    ],
];

let mayus = false;
let shift = false;
let current = null;

function renderKeyboard () {
    const keybordContainer = document.querySelector('#keyboard-container');
    let empty = `<div class="key-empty"></div>`;

    const layers = keys.map((layer) => {
        return layer.map(key => {
            if (key[0] === 'SHIFT') {
                return `<button class="key key-shift ${shift ? 'activated' : ''}"}>${key[0]}</button>`;
            }
            if(key[0] === 'MAYUS'){
                return `<button class="key key-mayus ${mayus ? 'activated' : ''}">${key[0]}</button>`;
            }
            if (key[0] === 'DELETE') {
                return `<button class="key key-delete">${key[0]}</button>`
            }
            if (key[0] === 'SPACE'){
                return `<button class="key key-space"></button>`;
            }

            return `<button class="key key-normal">
            ${shift? 
                key[1]
                 : mayus &&
                  key[0].toLowerCase().charCodeAt(0) >= 97 && //a
                  key[0].toLowerCase().charCodeAt(0) <= 122 //z
                  ? key[1] : key[0]}
            </button>
            `;
        });
    });

    layers[0].push(empty);
    layers[1].unshift(empty);
    
    const htmlLayers = layers.map(layer => {
        return layer.join('');
    });

    keybordContainer.innerHTML = '';

    htmlLayers.forEach(layer => {
        keybordContainer.innerHTML += `<div class="layer">${layer}</div>`
    });

    document.querySelectorAll('.key').forEach(key =>{
        key.addEventListener('click', e => {
            let copy = '';
            let aux = [];
            if (current) {
                if (key.textContent === 'SHIFT') {
                    shift = !shift;
                } else if (key.textContent === 'MAYUS') {
                    mayus = !mayus;
                } else if (key.textContent === '') {
                    current.value += ' ';
                }else if (key.textContent === 'DELETE') {

                    aux = current.value.split('');
                    aux = aux.splice(0, aux.length - 1);
                    current.value = aux.join('');

                    
                } else {
                    current.value += key.textContent.trim();
                    if (shift) {
                        shift = false;
                    }
                }
                renderKeyboard();
                current.focus();
            }
        });
    });
}
document.querySelectorAll('input').forEach((input) => {
    input.addEventListener('focusin', (e) => {
        current = e.target;
    });
});

renderKeyboard();
