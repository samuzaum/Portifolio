document.getElementById('menu-toggle').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
});

// Seleciona o elemento com o ID 'email'
const emailElement = document.getElementById('email');

// Define o texto original
const originalText = 'samuelouvera@gmail.com';

// Define o texto quando o mouse está sobre o elemento
const hoverText = 'Clique para copiar';

// Define o texto quando o texto é copiado
const copiedText = 'Texto copiado';

// Adiciona o evento para quando o mouse está sobre o elemento
emailElement.addEventListener('mouseover', function() {
    emailElement.textContent = hoverText;
});

// Adiciona o evento para quando o mouse sai do elemento
emailElement.addEventListener('mouseout', function() {
    emailElement.textContent = originalText;
});

// Adiciona o evento para quando o elemento é clicado
emailElement.addEventListener('click', function() {
    // Copia o texto para a área de transferência
    navigator.clipboard.writeText(originalText)
        .then(() => {
            emailElement.textContent = copiedText;
            // Opcional: Voltar ao texto original após 1 segundo
            setTimeout(() => {
                emailElement.textContent = originalText;
            }, 1000);
        })
        .catch(err => {
            console.error('Erro ao copiar o texto: ', err);
        });
});
