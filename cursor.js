//Adicione esse arquivo para modificar o cursor, nao esqueça de chamar tb o arquivo cursor.css junto

document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    document.body.appendChild(cursor);

    let trailQueue = [];
    const maxTrailSize = 10; // Número máximo de imagens da trilha
    const cursorSize = 40; // Tamanho do cursor e da trilha
    let isDrawing = false;

    function updateCursorPosition(event) {
        // Corrige a posição do cursor para não sair da tela, considerando o scroll da página
        const x = Math.min(Math.max(event.pageX - cursorSize / 2, 0), document.documentElement.scrollWidth - cursorSize);
        const y = Math.min(Math.max(event.pageY - cursorSize / 2, 0), document.documentElement.scrollHeight - cursorSize);

        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
    }

    function applyBoingEffect() {
        cursor.classList.add('cursor-boing');
        setTimeout(function() {
            cursor.classList.remove('cursor-boing');
        }, 100); // Tempo do efeito de boing (0.1 segundos)
    }

    function updateCursorImage(url) {
        cursor.style.backgroundImage = `url('${url}')`;
    }

    function handleMouseDown(event) {
        updateCursorImage('cursor2.png');
        applyBoingEffect();
        isDrawing = true;
    }

    function handleMouseUp() {
        updateCursorImage('cursor1.png');
        isDrawing = false;

        // Remove a trilha existente
        trailQueue.forEach(trail => trail.remove());
        trailQueue = [];
    }

    function handleMouseMove(event) {
        if (isDrawing) {
            // Corrige a posição da trilha para não sair da tela
            const x = Math.min(Math.max(event.pageX - cursorSize / 2, 0), document.documentElement.scrollWidth - cursorSize);
            const y = Math.min(Math.max(event.pageY - cursorSize / 2, 0), document.documentElement.scrollHeight - cursorSize);

            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.left = `${x}px`;
            trail.style.top = `${y}px`;
            document.body.appendChild(trail);

            trailQueue.push(trail);

            if (trailQueue.length > maxTrailSize) {
                const oldestTrail = trailQueue.shift();
                oldestTrail.remove();
            }
        }

        updateCursorPosition(event);
    }

    function handleFocus() {
        updateCursorImage('cursor2.png');
    }

    function handleBlur() {
        updateCursorImage('cursor1.png');
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('focusin', handleFocus);
    document.addEventListener('focusout', handleBlur);

    const interactiveElements = document.querySelectorAll('input[type="text"], textarea, button, a');
    interactiveElements.forEach(function(element) {
        element.addEventListener('mouseover', handleFocus);
        element.addEventListener('mouseout', handleBlur);
    });
});

document.addEventListener('mousemove', function(e) {
    const cursor = document.getElementById('custom-cursor');
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
});


/*

Atenção, essa função nao esta funcionando no restante dos botoes da pagina
verifique o restante do codigo em css para poder adicionar corretamente ao seu projeto

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', function() {
            const header = document.querySelector('header.menunav');
            const buttons = document.querySelectorAll('.nav-button');

            // Remove a classe 'expand' e 'rotate' se já estiverem adicionadas
            header.classList.remove('expand');
            buttons.forEach(btn => btn.classList.remove('rotate'));

            // Oculta todos os outros botões suavemente
            buttons.forEach(btn => {
                if (btn !== this) {
                    btn.classList.add('hidden');
                }
            });

            // Aplica a rotação 3D ao botão clicado
            this.classList.add('rotate');

            // Atualiza o cabeçalho para se ajustar ao botão clicado
            setTimeout(() => {
                header.classList.add('expand');
                header.style.width = `${this.offsetWidth}px`; // Ajusta a largura do cabeçalho para o tamanho do botão
            }, 0); // Pequeno atraso para garantir a aplicação das novas propriedades
        });
    });
});

*/
