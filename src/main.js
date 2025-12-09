// js/main.js

// --- COMPONENTE DO SEMÁFORO ---
AFRAME.registerComponent('semaforo-control', {
  init: function () {
    const red = this.el.querySelector('#red');
    const yellow = this.el.querySelector('#yellow');
    const green = this.el.querySelector('#green');

    let state = 0; // 0=vermelho, 1=amarelo, 2=verde

    const updateLights = () => {
      red.setAttribute('color', state === 0 ? '#FF0000' : '#300');
      yellow.setAttribute('color', state === 1 ? '#FFFF00' : '#330');
      green.setAttribute('color', state === 2 ? '#00FF00' : '#030');
    };

    updateLights();

    this.el.addEventListener('click', () => {
      state = (state + 1) % 3;
      updateLights();
      console.log("Semaforo clicado! Novo estado: " + state);
    });

    this.el.addEventListener('mouseenter', () => {
      this.el.querySelector('a-box').setAttribute('color', '#555');
    });
    this.el.addEventListener('mouseleave', () => {
      this.el.querySelector('a-box').setAttribute('color', '#333');
    });
  }
});

// --- COMPONENTE DO HUMANO PALITO ---
AFRAME.registerComponent('humano-palito', {
  schema: {
    corCamisa: {type: 'color', default: 'blue'},
    corCalca: {type: 'color', default: 'black'}
  },

  init: function () {
    this.el.innerHTML = `
      <a-sphere position="0 1.7 0" radius="0.2" color="#ffccaa"></a-sphere>
      <a-box position="0 1.3 0" depth="0.3" height="0.6" width="0.5" color="${this.data.corCamisa}"></a-box>
      <a-cylinder position="-0.15 0.5 0" radius="0.08" height="1" color="${this.data.corCalca}"></a-cylinder>
      <a-cylinder position="0.15 0.5 0" radius="0.08" height="1" color="${this.data.corCalca}"></a-cylinder>
    `;
  }
});

// --- LÓGICA DE CRIAÇÃO DA CENA (FILAS) ---
window.addEventListener('load', function () {

  function criarFila(idDoContainer, cor, quantidade) {
    const grupo = document.querySelector(idDoContainer);
    if (!grupo) return; 

    const espacoEntreEles = 3.5; 
    const alturaPulo = 0.5;      
    const velocidadePulo = 500; 

    for (let i = 0; i < quantidade; i++) {
      const pessoa = document.createElement('a-entity');
      pessoa.setAttribute('humano-palito', 'corCamisa: ' + cor);

      const localX = i * espacoEntreEles;
      
      pessoa.setAttribute('position', {x: localX, y: 0, z: 0});
      pessoa.setAttribute('scale', '1 1 1'); 

      const atraso = (i % 2 === 0) ? 0 : velocidadePulo;

      pessoa.setAttribute('animation', {
        property: 'position',
        dir: 'alternate',
        dur: velocidadePulo,
        loop: true,
        easing: 'easeInOutQuad',
        delay: atraso,
        to: `${localX} ${alturaPulo} 0` 
      });

      grupo.appendChild(pessoa);
    }
  }

  // Criar as filas
  criarFila('#fila-roxo', 'purple', 19);
  criarFila('#fila-verde', 'green', 19);
});