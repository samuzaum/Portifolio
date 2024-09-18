const toggleButton = document.getElementById('theme-toggle');
const githubBtn = document.getElementById('github-btn');
const emailPara = document.getElementById('email');
const body = document.body;

// Verifica se o usuário já selecionou o modo escuro anteriormente
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    githubBtn.classList.replace('btn-outline-dark', 'btn-outline-light');
    emailPara.classList.replace('btn-outline-dark', 'btn-outline-light');
}

// Alterna entre Light e Dark Mode
toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        githubBtn.classList.replace('btn-outline-dark', 'btn-outline-light');
        emailPara.classList.replace('btn-outline-dark', 'btn-outline-light');
        localStorage.setItem('theme', 'dark');
    } else {
        githubBtn.classList.replace('btn-outline-light', 'btn-outline-dark');
        emailPara.classList.replace('btn-outline-light', 'btn-outline-dark');
        localStorage.setItem('theme', 'light');
    }
});
