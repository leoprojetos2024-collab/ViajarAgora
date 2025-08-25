// Aguarda o DOM ser completamente carregado para executar o script
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona os elementos do DOM com os quais vamos interagir
    const searchForm = document.getElementById('search-form');
    const flightsList = document.getElementById('flights-list');

    // Adiciona um 'escutador' para o evento de submissão do formulário
    searchForm.addEventListener('submit', (event) => {
        // Previne o comportamento padrão do formulário (que é recarregar a página)
        event.preventDefault();

        // Pega os valores dos campos de origem e destino
        const origin = document.getElementById('origin').value;
        const destination = document.getElementById('destination').value;

        // Limpa a lista de voos anterior e mostra uma mensagem de "carregando"
        flightsList.innerHTML = '<p>Buscando os melhores voos...</p>';

        // Simula uma chamada de API com um atraso de 1.5 segundos para parecer real
        setTimeout(() => {
            // Dados de voos falsos (mock data) para demonstração.
            // Em um projeto real, você faria uma requisição a uma API aqui.
            const mockFlights = [
                { airline: 'Azul', from: origin, to: destination, departure: '08:30', arrival: '10:45', price: 750.00 },
                { airline: 'GOL', from: origin, to: destination, departure: '09:15', arrival: '11:30', price: 820.50 },
                { airline: 'LATAM', from: origin, to: destination, departure: '11:00', arrival: '13:15', price: 790.90 },
                { airline: 'Azul', from: origin, to: destination, departure: '14:45', arrival: '17:00', price: 699.00 }
            ];

            displayFlights(mockFlights);
        }, 1500);
    });

    /**
     * Função para exibir os voos na página
     * @param {Array} flights - Um array de objetos de voo
     */
    function displayFlights(flights) {
        // Limpa a mensagem de "buscando..."
        flightsList.innerHTML = '';

        if (flights.length === 0) {
            flightsList.innerHTML = '<p>Nenhum voo encontrado para esta rota.</p>';
            return;
        }

        // Itera sobre cada voo e cria o HTML para exibi-lo
        flights.forEach(flight => {
            const flightItem = document.createElement('div');
            flightItem.classList.add('flight-item');
            const formattedPrice = flight.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            flightItem.innerHTML = `
                <div><strong>${flight.airline}</strong>: ${flight.from} → ${flight.to} (${flight.departure} - ${flight.arrival})</div>
                <div class="flight-price">${formattedPrice}</div>
            `;
            flightsList.appendChild(flightItem);
        });
    }

    // Funcionalidade do Carrossel
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(${(i - index) * 100}%)`;
        });
    }

    window.moveSlide = function(n) {
        currentSlide = (currentSlide + n + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // Exibe o primeiro slide inicialmente
    showSlide(currentSlide);
});