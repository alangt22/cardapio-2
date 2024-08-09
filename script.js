document.addEventListener('DOMContentLoaded', function() {
    var itens = [
        {
            id: 0,
            nome: 'Hambúrguer Simples',
            descricao: 'Pão, carne, queijo, alface e tomate.',
            preco: 10.50,
            imagem: './assets/hamb-1.png'
        },
        {
            id: 1,
            nome: 'Hambúrguer Duplo',
            descricao: 'Dois hambúrgueres, queijo cheddar, bacon e molho especial.',
            preco: 15.75,
            imagem: './assets/hamb-2.png'
        },
        {
            id: 2,
            nome: 'Hambúrguer Vegano',
            descricao: 'Pão integral, hambúrguer de grão de bico, cogumelos, alface e tomate.',
            preco: 12.00,
            imagem: './assets/hamb-3.png'
        },
        {
            id: 3,
            nome: 'Hambúrguer BBQ',
            descricao: 'Pão brioche, hambúrguer de costela, queijo prato, cebola caramelizada e molho barbecue.',
            preco: 17.25,
            imagem: './assets/hamb-4.png'
        },
        {
            id: 4,
            nome: 'Hambúrguer Clássico',
            descricao: 'Pão brioche, hambúrguer de carne bovina, queijo cheddar, alface, tomate e maionese especial.',
            preco: 15.50,
            imagem: './assets/hamb-5.png'
        },
        {
            id: 5,
            nome: 'Hambúrguer Vegetariano',
            descricao: 'Pão integral, hambúrguer de cogumelos, queijo muçarela, rúcula, tomate seco e maionese de ervas.',
            preco: 16.00,
            imagem: './assets/hamb-6.png'
        },
        {
            id: 6,
            nome: 'Hambúrguer Frango Grelhado',
            descricao: 'Pão de centeio, filé de frango grelhado, queijo prato, cebola roxa, alface e molho tártaro.',
            preco: 14.75,
            imagem: './assets/hamb-7.png'
        },
        {
            id: 7,
            nome: 'Hambúrguer BBQ 2',
            descricao: 'Pão brioche, hambúrguer de costela, queijo prato, cebola caramelizada e molho barbecue.',
            preco: 17.25,
            imagem: './assets/hamb-8.png'
        },
        {
            id: 8,
            nome: 'Coca Cola',
            descricao: 'Coca Cola Original',
            preco: 9.00,
            imagem: './assets/refri-1.png'
        },
        {
            id: 9,
            nome: 'Guarana Antartica',
            descricao: 'Guarana Original',
            preco: 5.00,
            imagem: './assets/refri-2.png'
        }
    ];

    var enviarPedidoButton = document.getElementById('enviarPedido');
    var addressInput = document.getElementById('endereco');
    var addressWarn = document.getElementById('endereco-aviso');
    var detalhesButtons = document.querySelectorAll('.mostrarDetalhes');
    var detalhesDiv = document.getElementById('detalhes-div');
    var fecharDetalhesButton = document.getElementById('fecharDetalhes');
    var adicionarAoCarrinhoButton = document.getElementById('adicionarAoCarrinho');
    var carrinhoDiv = document.getElementById('carrinho');
    var itensCarrinhoList = document.getElementById('itensCarrinho');
    var fecharCarrinhoButton = document.getElementById('fecharCarrinho');
    var limparCarrinhoButton = document.getElementById('limparCarrinho');
    var visualizarCarrinhoButton = document.getElementById('visualizarCarrinho');
    var contadorItens = document.getElementById('contadorItens');
    var totalCarrinho = document.getElementById('totalCarrinho');
    var semCebolaCheckbox = document.getElementById('cebola');
    var semCarneCheckbox = document.getElementById('carne');
    var semMolhoCheckbox = document.getElementById('molho');

    var itensNoCarrinho = [];

    function mostrarDetalhes(index) {
        var item = itens[index];
        document.getElementById('detalhes-imagem').src = item.imagem;
        document.getElementById('itemNome').textContent = item.nome;
        document.getElementById('itemDescricao').textContent = item.descricao;
        document.getElementById('itemPreco').textContent = 'Preço: R$ ' + item.preco.toFixed(2);

        if (item.nome === 'Coca Cola' || item.nome === 'Guarana Antartica') {
            semCebolaCheckbox.style.display = 'none';
            semCarneCheckbox.style.display = 'none';
            semMolhoCheckbox.style.display = 'none';
        } else {
            semCebolaCheckbox.style.display = 'block';
            semCarneCheckbox.style.display = 'block';
            semMolhoCheckbox.style.display = 'block';        }

        detalhesDiv.classList.remove('hidden');

        // Limpa o estado dos checkboxes
        document.getElementById('semCebolaCheckbox').checked = false;
        document.getElementById('carneCheckbox').checked = false;
        document.getElementById('molhoCheckbox').checked = false;

        detalhesDiv.classList.remove('hidden');
    }

    detalhesButtons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            mostrarDetalhes(index);
            adicionarAoCarrinhoButton.setAttribute('data-index', index);
        });
    });

    fecharDetalhesButton.addEventListener('click', function() {
        detalhesDiv.classList.add('hidden');
    });

    adicionarAoCarrinhoButton.addEventListener('click', function() {
        var index = parseInt(adicionarAoCarrinhoButton.getAttribute('data-index'));
        var item = itens[index];


        var semCebola = document.getElementById('semCebolaCheckbox').checked;
        var carneAdicional = document.getElementById('carneCheckbox').checked;
        var molhoAdicional = document.getElementById('molhoCheckbox').checked;

        var textoSemCebola = semCebola ? 'Sem cebola' : '';
        var textoCarneAdicional = carneAdicional ? 'Carne adicional' : '';
        var textoMolhoAdicional = molhoAdicional ? 'Molho adicional' : '';

        var precoTotal = item.preco;
        if (carneAdicional) precoTotal += 3.00;
        if (molhoAdicional) precoTotal += 1.50;

        itensNoCarrinho.push({
            ...item,
            precoTotal: precoTotal,
            textoSemCebola: textoSemCebola,
            textoCarneAdicional: textoCarneAdicional,
            textoMolhoAdicional: textoMolhoAdicional
        });

        var li = document.createElement('li');
        li.innerHTML = `
            <div class="flex items-center mb-4">
                <img src="${item.imagem}" alt="${item.nome}" class="w-16 h-16">
                <div class="ml-2">
                    <span>${item.nome}</span>
                    <div class="ml-2 text-sm text-gray-500">
                        ${textoSemCebola ? `<span>${textoSemCebola}</span>` : ''}
                        ${textoCarneAdicional ? `- ${textoCarneAdicional}` : ''}
                        ${textoMolhoAdicional ? `- ${textoMolhoAdicional}` : ''}
                    </div>
                </div>
                <span class="ml-auto font-bold">R$ ${precoTotal.toFixed(2)}</span>
                <button class="removerItem ml-2 w-10 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                    X
                </button>
            </div>
        `;
        itensCarrinhoList.appendChild(li);

        calcularTotalCarrinho();
        detalhesDiv.classList.add('hidden');
        atualizarContadorItens();

        Toastify({
            text: "Item adicionado ao carrinho!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "#ef4444"
        }).showToast();
    });

    
    function calcularTotalCarrinho() {
        var total = itensNoCarrinho.reduce(function(acc, item) {
            return acc + item.precoTotal;
        }, 0);
        totalCarrinho.textContent = `Total: R$ ${total.toFixed(2)}`;
    }

   
    function atualizarContadorItens() {
        contadorItens.textContent = itensNoCarrinho.length;
        contadorItens.classList.remove('hidden');
    }

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('removerItem')) {
            var index = Array.from(event.target.parentElement.parentElement.children).indexOf(event.target.parentElement);
            itensNoCarrinho.splice(index, 1);
            event.target.parentElement.remove();
            calcularTotalCarrinho();
            atualizarContadorItens();
        }
    });

    visualizarCarrinhoButton.addEventListener('click', function() {
        carrinhoDiv.classList.remove('hidden');
    });

    fecharCarrinhoButton.addEventListener('click', function() {
        carrinhoDiv.classList.add('hidden');
    });

    limparCarrinhoButton.addEventListener('click', function() {
        itensNoCarrinho = [];
        itensCarrinhoList.innerHTML = '';
        totalCarrinho.textContent = 'Total: R$ 0.00';
        contadorItens.textContent = '0';
        contadorItens.classList.add('hidden');
    });

    const limparCarrinho = () => {
        itensNoCarrinho = [];
        itensCarrinhoList.innerHTML = '';
        totalCarrinho.textContent = 'Total: R$ 0.00';
        contadorItens.textContent = '0';
        contadorItens.classList.add('hidden');
        addressInput.value = "";
    }

    enviarPedidoButton.addEventListener('click', function() {
        // Verifica se o restaurante está aberto
        if (!checkRestaurantOpen()) {
            Toastify({
                text: "Ops! O restaurante está fechado neste momento.",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "left",
                backgroundColor: "#ef4444"
            }).showToast();
            return;
        }

        if (addressInput.value.trim() === '') {
            addressWarn.classList.remove('hidden');
            addressInput.classList.add('border-red-500');
            return;
        }

        var mensagem = 'Olá! Gostaria de fazer um pedido com os seguintes itens:\n\n';
        itensNoCarrinho.forEach(function(item) {
            mensagem += `${item.nome} - R$ ${item.precoTotal.toFixed(2)}`;
            if (item.textoSemCebola) mensagem += ` - ${item.textoSemCebola}`;
            if (item.textoCarneAdicional) mensagem += ` - ${item.textoCarneAdicional}`;
            if (item.textoMolhoAdicional) mensagem += ` - ${item.textoMolhoAdicional}`;
            mensagem += '\n';
        });
        mensagem += `\nTotal: ${totalCarrinho.textContent}`;
        mensagem += `\nEndereço: ${addressInput.value}`;

        var phone = "11940094503";
        var message = encodeURIComponent(mensagem);
        window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
        itensCarrinhoList.innerHTML = '';
        limparCarrinho();

        
        
    });


    addressInput.addEventListener('input', function() {
        if (addressInput.value.trim() !== '') {
            addressWarn.classList.add('hidden');
            addressInput.classList.remove('border-red-500');
        }
    });


    function checkRestaurantOpen() {
        var now = new Date();
        var hours = now.getHours();
        return hours >= 1 && hours < 24; // 
    }

    var spanItem = document.getElementById("text-span");
    if (checkRestaurantOpen()) {
        spanItem.classList.remove("bg-red-500");
        spanItem.classList.add("bg-green-600");
    } else {
        spanItem.classList.remove("bg-green-600");
        spanItem.classList.add("bg-red-500");
    }
});
