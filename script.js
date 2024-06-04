document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário de recarregar a página
    const query = document.getElementById('query').value; // Obtém o valor do campo de texto
    searchMovies(query); // Chama a função searchMovies passando o termo de busca
});

function searchMovies(query) {
    const resultsDiv = document.getElementById('results'); // Obtém a div onde os resultados serão exibidos
    resultsDiv.innerHTML = ''; // Limpa os resultados anteriores

    // Fazer uma solicitação AJAX para o script PHP no Netlify
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://wtv123.netlify.app/search.php?query=${encodeURIComponent(query)}`, true);
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
            const data = JSON.parse(xhr.responseText);
            displayResults(data);
        } else {
            console.error('Erro ao buscar resultados:', xhr.statusText);
            resultsDiv.innerHTML = '<p>Erro ao buscar resultados. Por favor, tente novamente mais tarde.</p>';
        }
    };
    xhr.onerror = function() {
        console.error('Erro ao buscar resultados.');
        resultsDiv.innerHTML = '<p>Erro ao buscar resultados. Por favor, tente novamente mais tarde.</p>';
    };
    xhr.send();
}

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    data.forEach(siteResult => {
        const siteResultsDiv = document.createElement('div');
        siteResultsDiv.innerHTML = `<h3>Resultado da busca em ${siteResult.site}:</h3>`;
        if (siteResult.links.length > 0) {
            const linksList = document.createElement('ul');
            siteResult.links.forEach(link => {
                const listItem = document.createElement('li');
                const anchor = document.createElement('a');
                anchor.href = link;
                anchor.textContent = link;
                listItem.appendChild(anchor);
                linksList.appendChild(listItem);
            });
            siteResultsDiv.appendChild(linksList);
        } else {
            siteResultsDiv.innerHTML += '<p>Nenhum resultado encontrado.</p>';
        }
        resultsDiv.appendChild(siteResultsDiv);
    });
}
