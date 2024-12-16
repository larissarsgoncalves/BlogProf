let currentUser = null;
let currentUserLogin = null; // Adicionar variável para login do usuário
const authorizedUsers = ["202310230320037", "202310230320005", "202310230320024", "202310230320027", "202310230320026", "202310230320014", "202310230320029", "202310230320020", "202310230320035", "202310230320022", "202310230320007", "202310230320011", "202310230320013", "202310230320015", "202310230320036", "202310230320025", "202310230320028", "202310230320042", "202310230320019", "202410230320033", "202310230320003", "202310230320008", "202310230320017", "202310230320006", "3371815"];
const pageOwner = "3371815"; // Nome do criador da página

// Carregar posts do LocalStorage quando a página carrega
document.addEventListener("DOMContentLoaded", loadPosts);

function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = ''; // Limpar conteúdo atual
    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.textContent = `${post.nickname}: ${post.text}`;

        // Adicionar botão de deletar apenas se o usuário logado for o criador da página
        if (currentUserLogin === pageOwner) {
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Deletar';
            deleteButton.onclick = () => deletePost(index);
            postElement.appendChild(deleteButton);
        }

        postsContainer.appendChild(postElement);
    });
}

function addPost() {
    const newPost = document.getElementById('newPost').value;
    if (newPost && currentUser && authorizedUsers.includes(currentUserLogin)) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push({ nickname: currentUser, text: newPost });
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPosts(); // Atualizar a lista de posts
        document.getElementById('newPost').value = ''; // Limpar textarea
    } else {
        alert('Você não tem permissão para postar.');
    }
}

function login() {
    const usernameInput = document.getElementById('username');
    const nicknameInput = document.getElementById('nickname');
    const username = usernameInput.value;
    const nickname = nicknameInput.value;

    if (username && nickname) {
        currentUserLogin = username; // Usar o login como currentUserLogin
        currentUser = nickname; // Usar o apelido como currentUser
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('postsSection').style.display = 'block';
        loadPosts();

        // Verificar se o usuário está autorizado a postar
        if (!authorizedUsers.includes(currentUserLogin)) {
            document.getElementById('newPost').style.display = 'none';
            document.querySelector('button[onclick="addPost()"]').style.display = 'none';
        }
    } else {
        alert('Por favor, digite seu login e apelido.');
    }
}

function deletePost(index) {
    if (currentUserLogin === pageOwner) { // Verificar se o usuário logado é o criador da página
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.splice(index, 1); // Remover o post do array
        localStorage.setItem('posts', JSON.stringify(posts)); // Atualizar o localStorage
        loadPosts(); // Recarregar os posts
    } else {
        alert('Apenas o criador da página pode deletar posts.');
    }
}

function clearAllPosts() {
    if (currentUserLogin === pageOwner) { // Verificar se o usuário logado é o criador da página
        localStorage.removeItem('posts'); // Remover todos os posts do localStorage
        loadPosts(); // Recarregar os posts para refletir a mudança
    } else {
        alert('Apenas o criador da página pode apagar todas as postagens.');
    }
}
