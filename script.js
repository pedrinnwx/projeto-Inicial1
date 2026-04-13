const gameInfo = {
    titulo: "No Núcleo de Elarion"
};

let idadeUsuario = null;
let temaEscuro = false;

window.addEventListener('load', function () {
    verificarIdade();
    inicializarSite();
});

function verificarIdade() {
    const idadeStr = prompt('Bem-vindo ao No Núcleo de Elarion! Qual é sua idade?');

    if (idadeStr === null) {
        // Usuário cancelou o prompt
        idadeUsuario = null;
    } else {
        idadeUsuario = parseInt(idadeStr);

        if (isNaN(idadeUsuario)) {
            alert('Por favor, digite um número válido!');
            verificarIdade(); // Pedir novamente
            return;
        }

        // Verificação if/else para acesso
        if (idadeUsuario >= 18) {
            alert('✓ Acesso liberado');
            removerBlur();
        } else {
            alert('✗ Acesso negado - Conteúdo restrito para maiores de 18 anos');
            aplicarBlur();
        }

        // Atualizar mensagem na página de jogo
        atualizarMensagemAcesso();
    }
}

function atualizarMensagemAcesso() {
    const acessoInfo = document.getElementById('acesso-info');

    if (acessoInfo) {
        if (idadeUsuario >= 18) {
            acessoInfo.textContent = '✓ Acesso Liberado - Aproveite o jogo!';
            acessoInfo.classList.add('liberado');
            acessoInfo.classList.remove('negado');
        } else {
            acessoInfo.textContent = '✗ Acesso Restrito - Conteúdo para maiores de 18 anos';
            acessoInfo.classList.add('negado');
            acessoInfo.classList.remove('liberado');
        }
    }
}

// ===== APLICAR/REMOVER BLUR =====
function aplicarBlur() {
    const conteudoBlur = document.getElementById('conteudo-blur');
    if (conteudoBlur) {
        conteudoBlur.classList.add('blur-effect');
    }
}

function removerBlur() {
    const conteudoBlur = document.getElementById('conteudo-blur');
    if (conteudoBlur) {
        conteudoBlur.classList.remove('blur-effect');
    }
}

// ===== INICIALIZAR SITE =====
function inicializarSite() {
    // Configurar botão de tema
    configurarBotaoTema();

    // Verificar se é ano de lançamento
    verificarLancamento();

    // Restaurar tema salvo
    restaurarTema();

    // Configurar botão de jogar
    configurarBotaoJogar();
}


// ===== VERIFICAR ANO DE LANÇAMENTO =====
function verificarLancamento() {
    const anoAtual = new Date().getFullYear();

    if (anoAtual === gameInfo.anoLancamento) {
        alert('🎉 Embarque nesta jornada épica! Seja bem-vindo ao No Núcleo de Elarion!');
    }
}

// ===== EXIBIR SAUDAÇÃO PERSONALIZADA =====
function exibirSaudacao() {
    const nomeInput = document.getElementById('nome');
    const mensagemDiv = document.getElementById('mensagem-saudacao');

    if (!nomeInput || !mensagemDiv) return;

    const nome = nomeInput.value.trim();

    if (nome === '') {
        alert('Por favor, digite seu nome!');
        return;
    }

    const mensagem = `Bem-vindo, ${nome}! Prepare-se para salvar a Terra! 🚀`;
    mensagemDiv.textContent = mensagem;
    mensagemDiv.classList.add('show');
}

// ===== BOTÃO TEMA CLARO/ESCURO =====
function configurarBotaoTema() {
    const botaoTema = document.querySelectorAll('#theme-btn');

    botaoTema.forEach(btn => {
        btn.addEventListener('click', alternaTema);
    });
}

function alternaTema() {
    const botoes = document.querySelectorAll('#theme-btn');
    temaEscuro = !temaEscuro;

    if (temaEscuro) {
        document.body.classList.add('modo-escuro');
        botoes.forEach(btn => btn.textContent = '☀️ Tema Claro');
    } else {
        document.body.classList.remove('modo-escuro');
        botoes.forEach(btn => btn.textContent = '🌙 Tema Escuro');
    }

    // Salvar preferência
    localStorage.setItem('tema-escuro', temaEscuro);
}

// ===== RESTAURAR TEMA SALVO =====
function restaurarTema() {
    const temaSalvo = localStorage.getItem('tema-escuro');

    if (temaSalvo === 'true') {
        temaEscuro = true;
        document.body.classList.add('modo-escuro');
        const botoes = document.querySelectorAll('#theme-btn');
        botoes.forEach(btn => btn.textContent = '☀️ Tema Claro');
    }
}

// ===== CARREGAR JOGO =====
function configurarBotaoJogar() {
    const btnJogar = document.getElementById('btn-jogar');
    if (btnJogar) {
        btnJogar.addEventListener('click', function () {
            const espacoJogo = document.getElementById('espaco-jogo');
            if (espacoJogo && idadeUsuario >= 18) {
                // Remove o padding interno para o iframe ocupar todo o espaço
                espacoJogo.style.padding = '0';
                espacoJogo.style.display = 'block';
                espacoJogo.innerHTML = '<iframe src="Jogo/No Núcleo de Elarion/index.html" width="100%" height="100%" style="border:none; border-radius:12px; min-height: 400px;" allowfullscreen="true" scrolling="no"></iframe>';
            } else if (idadeUsuario < 18) {
                alert('Você não tem idade suficiente para jogar.');
            }
        });
    }
}

// ===== PERMITIR ENTER NO INPUT DE NOME =====
document.addEventListener('DOMContentLoaded', function () {
    const nomeInput = document.getElementById('nome');

    if (nomeInput) {
        nomeInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                exibirSaudacao();
            }
        });
    }
});

// ===== CONSOLE LOG PARA DEBUG =====
console.log('=== INFORMAÇÕES DO JOGO ===');
console.log('Título:', gameInfo.titulo);
console.log('Ano de Lançamento:', gameInfo.anoLancamento);
console.log('Pontuação Máxima:', gameInfo.pontuacaoMaxima);
console.log('Idade do Usuário:', idadeUsuario);
console.log('==========================');