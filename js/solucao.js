// ===== DADOS DOS ABRIGOS (simulados) =====
var abrigos = [
    { nome: "Igreja Nossa Senhora das Ilhas", tipo: "Igreja", regiao: "Ilhas", atualizado: "há 5 min", ocupacao: 118, capacidade: 120, sobra: "Roupas adultas usadas, Brinquedos.",
      precisa: [
        { item: "Água potável", urgencia: "alta", falta: 80, unidade: "fardos" },
        { item: "Kit de primeiros socorros", urgencia: "alta", falta: 8, unidade: "kits" },
        { item: "Fraldas infantis", urgencia: "media", falta: 20, unidade: "pacotes" } ] },
    { nome: "Escola Municipal do Porto", tipo: "Escola", regiao: "Porto Novo", atualizado: "há 50 min", ocupacao: 126, capacidade: 130, sobra: "Brinquedos.",
      precisa: [
        { item: "Leite em pó", urgencia: "alta", falta: 4, unidade: "latas" },
        { item: "Fraldas infantis", urgencia: "alta", falta: 30, unidade: "pacotes" },
        { item: "Cobertores", urgencia: "media", falta: 25, unidade: "unidades" } ] },
    { nome: "Ginásio Municipal Central", tipo: "Ginásio", regiao: "Centro", atualizado: "há 12 min", ocupacao: 284, capacidade: 300, sobra: "Roupas adultas usadas, Calçados.",
      precisa: [
        { item: "Água potável", urgencia: "alta", falta: 120, unidade: "fardos" },
        { item: "Colchões", urgencia: "alta", falta: 40, unidade: "unidades" },
        { item: "Produtos de limpeza", urgencia: "baixa", falta: 20, unidade: "kits" } ] },
    { nome: "Centro Comunitário Morro Alto", tipo: "Centro comunitário", regiao: "Morro Alto", atualizado: "há 2 h 20 min", antigo: true, ocupacao: 72, capacidade: 100, sobra: "Roupas adultas usadas.",
      precisa: [
        { item: "Alimentos não perecíveis", urgencia: "alta", falta: 30, unidade: "cestas" },
        { item: "Água potável", urgencia: "media", falta: 40, unidade: "fardos" } ] },
    { nome: "Centro Comunitário Esperança", tipo: "Centro comunitário", regiao: "Vila Esperança", atualizado: "há 35 min", ocupacao: 52, capacidade: 80, sobra: "Roupas adultas usadas, Calçados.",
      precisa: [
        { item: "Cobertores", urgencia: "media", falta: 30, unidade: "unidades" },
        { item: "Kit de primeiros socorros", urgencia: "baixa", falta: 5, unidade: "kits" } ] }
];

var peso = { alta: 3, media: 2, baixa: 1 };            // pontos por urgência
var nomeUrgencia = { alta: "alta", media: "média", baixa: "baixa" };
var doacoes = [];                                       // doações combinadas no modal
var abrigoEscolhido, itemEscolhido;                     // o que foi clicado em "Vou levar"

// ===== PONTUAÇÃO: urgência + região + lotação =====
function calcularPontos(abrigo, itemProcurado, regiao) {
    var pedido = null;
    for (var i = 0; i < abrigo.precisa.length; i++) {
        var p = abrigo.precisa[i];
        if (itemProcurado === "todos" && p.falta > 0 && (pedido === null || peso[p.urgencia] > peso[pedido.urgencia])) pedido = p;
        if (p.item === itemProcurado) pedido = p;
    }

    abrigo.aparece = pedido !== null;   // se não precisa do item, o abrigo não aparece
    abrigo.pontos = 0;
    abrigo.motivo = "o pedido já foi atendido";

    if (pedido !== null && pedido.falta > 0) {
        abrigo.pontos = peso[pedido.urgencia];
        abrigo.motivo = "urgência " + nomeUrgencia[pedido.urgencia] + " em " + pedido.item + " (+" + abrigo.pontos + ")";
    }
    if (abrigo.regiao === regiao) {
        abrigo.pontos += 2;
        abrigo.motivo += ", fica na sua região (+2)";
    }
    if (abrigo.ocupacao / abrigo.capacidade > 0.9) {
        abrigo.pontos += 1;
        abrigo.motivo += ", mais de 90% das vagas ocupadas (+1)";
    }
}

// ===== CARD DE UM ABRIGO =====
function montarCard(i, posicao, itemProcurado) {
    var a = abrigos[i];
    var pct = Math.round(a.ocupacao * 100 / a.capacidade);
    var cor = "livre";
    if (pct > 90) cor = "lotado";
    else if (pct >= 70) cor = "cheio";

    var html = '<li class="sol-cartao abrigo"><div class="abrigo-topo"><span class="abrigo-posicao">' + posicao + 'º</span>' +
        '<h4>' + a.nome + '</h4><span class="abrigo-pontos">' + a.pontos + ' pontos</span></div>' +
        '<p class="abrigo-info">' + a.tipo + ' · ' + a.regiao + ' · atualizado ' + a.atualizado + '</p>';
    if (a.antigo) html += '<p class="abrigo-antigo">Dados com mais de 2 horas: confirme com o abrigo antes de ir.</p>';
    html += '<p class="abrigo-ocupacao">Ocupação: ' + a.ocupacao + ' de ' + a.capacidade + ' vagas (' + pct + '%)</p>' +
        '<div class="barra"><span class="' + cor + '" style="width: ' + pct + '%"></span></div>' +
        '<p class="abrigo-motivo"><strong>Por que está nesta posição:</strong> ' + a.motivo + '.</p>' +
        '<p class="abrigo-precisa">Do que precisa:</p><ul class="necessidades">';

    for (var j = 0; j < a.precisa.length; j++) {
        var p = a.precisa[j];
        html += '<li class="necessidade' + (p.item === itemProcurado ? ' destaque' : '') + '">';
        if (p.falta === 0) {
            html += '<span class="selo selo-atendido">ATENDIDO</span><p class="texto"><strong>' + p.item + '</strong>: pedido atendido</p>';
        } else {
            html += '<span class="selo selo-' + p.urgencia + '">URGÊNCIA ' + nomeUrgencia[p.urgencia].toUpperCase() + '</span>' +
                '<p class="texto"><strong>' + p.item + '</strong>: faltam ' + p.falta + ' ' + p.unidade + '</p>' +
                '<button type="button" class="botao-laranja" onclick="abrirModal(' + i + ', ' + j + ')">Vou levar</button>';
        }
        if (p.combinado) html += '<p class="combinado">Você combinou levar ' + p.combinado + ' ' + p.unidade + '.</p>';
        html += '</li>';
    }
    return html + '</ul><p class="abrigo-sobra"><strong>Já tem de sobra:</strong> ' + a.sobra + '</p></li>';
}

// ===== LISTA ORDENADA  =====
function mostrarAbrigos() {
    var item = document.getElementById("filtro-item").value;
    var regiao = document.getElementById("filtro-regiao").value;
    var html = "";
    var posicao = 0;

    for (var i = 0; i < abrigos.length; i++) calcularPontos(abrigos[i], item, regiao);
    for (var pontos = 6; pontos >= 0; pontos--) {
        for (var i = 0; i < abrigos.length; i++) {
            if (abrigos[i].aparece && abrigos[i].pontos === pontos) {
                posicao++;
                html += montarCard(i, posicao, item);
            }
        }
    }
    document.getElementById("lista-abrigos").innerHTML = html;

    var resumo = "Mostrando " + posicao + " abrigos, do mais urgente para o menos urgente.";
    if (item !== "todos") resumo = posicao + " abrigo(s) precisam de " + item + ". O mais indicado aparece primeiro.";
    if (regiao !== "") resumo += " Abrigos em " + regiao + " ganham +2 pontos.";
    document.getElementById("resumo-resultado").textContent = resumo;
}

// Botão "Ver abrigos" do painel
function verAbrigos(item) {
    document.getElementById("filtro-item").value = item;
    mostrarAbrigos();
    document.getElementById("titulo-resultado").scrollIntoView({ behavior: "smooth" });
}

// ===== MODAL "VOU LEVAR" =====
var modal = document.getElementById("modal-doacao");

function abrirModal(i, j) {
    abrigoEscolhido = abrigos[i];
    itemEscolhido = abrigoEscolhido.precisa[j];
    document.getElementById("modal-local").textContent = abrigoEscolhido.nome;
    document.getElementById("modal-endereco").textContent = abrigoEscolhido.tipo + " · " + abrigoEscolhido.regiao;
    document.getElementById("modal-item").textContent = itemEscolhido.item + " (faltam " + itemEscolhido.falta + " " + itemEscolhido.unidade + ")";
    document.getElementById("doador-quantidade").max = itemEscolhido.falta;   // o HTML não deixa passar disso
    document.getElementById("doador-quantidade").value = 1;
    document.getElementById("form-doacao").hidden = false;
    document.getElementById("modal-sucesso").hidden = true;
    modal.showModal();
}

function fecharModal() {
    modal.close();
}

// Confirmar doação: salva, atualiza o abrigo e mostra a confirmação
document.getElementById("form-doacao").addEventListener("submit", function (evento) {
    evento.preventDefault();
    var nome = document.getElementById("doador-nome").value;
    var telefone = document.getElementById("doador-telefone").value;
    var email = document.getElementById("doador-email").value;
    var quantidade = Number(document.getElementById("doador-quantidade").value);

    doacoes.push({ nome: nome, telefone: telefone, email: email, local: abrigoEscolhido.nome, item: itemEscolhido.item, quantidade: quantidade + " " + itemEscolhido.unidade });
    itemEscolhido.falta -= quantidade;
    itemEscolhido.combinado = (itemEscolhido.combinado || 0) + quantidade;

    var lista = "";
    for (var i = 0; i < doacoes.length; i++) {
        lista += '<li><strong>' + doacoes[i].quantidade + ' de ' + doacoes[i].item + '</strong><span>Levar para: ' + doacoes[i].local + '</span><span>Doador: ' + doacoes[i].nome + '</span></li>';
    }
    document.getElementById("lista-doacoes").innerHTML = lista;
    mostrarAbrigos();

    document.getElementById("sucesso-titulo").textContent = "Obrigado, " + nome + "! Sua doação foi registrada.";
    document.getElementById("sucesso-dados").innerHTML = "<dt>Nome</dt><dd>" + nome + "</dd><dt>Telefone</dt><dd>" + telefone + "</dd>" +
        "<dt>E-mail</dt><dd>" + email + "</dd><dt>Local</dt><dd>" + abrigoEscolhido.nome + " (" + abrigoEscolhido.regiao + ")</dd>" +
        "<dt>Item</dt><dd>" + itemEscolhido.item + "</dd><dt>Quantidade</dt><dd>" + quantidade + " " + itemEscolhido.unidade + "</dd>";
    document.getElementById("form-doacao").hidden = true;
    document.getElementById("modal-sucesso").hidden = false;
});

// Formulário "Quero doar"
document.getElementById("form-filtro").addEventListener("submit", function (evento) {
    evento.preventDefault();
    mostrarAbrigos();
});

mostrarAbrigos();   
