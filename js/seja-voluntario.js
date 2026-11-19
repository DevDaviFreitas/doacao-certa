        var tamanhoFonte = 100; // tamanho da fonte em %

        // Muda o tamanho da fonte da página inteira
        function mudarFonte(valor) {
            tamanhoFonte = tamanhoFonte + valor;
            if (tamanhoFonte < 80) tamanhoFonte = 80;
            if (tamanhoFonte > 140) tamanhoFonte = 140;
            document.documentElement.style.fontSize = tamanhoFonte + "%";
        }

        // Troca entre tema claro e escuro
        function mudarTema(tema) {
            document.documentElement.setAttribute("data-tema", tema);
            document.getElementById("tema-claro").classList.toggle("ativo", tema === "claro");
            document.getElementById("tema-escuro").classList.toggle("ativo", tema === "escuro");
        }

        document.getElementById("diminuir-fonte").addEventListener("click", function () { mudarFonte(-10); });
        document.getElementById("aumentar-fonte").addEventListener("click", function () { mudarFonte(10); });
        document.getElementById("tema-claro").addEventListener("click", function () { mudarTema("claro"); });
        document.getElementById("tema-escuro").addEventListener("click", function () { mudarTema("escuro"); });

// ===== CADASTRO DE VOLUNTÁRIO =====
// Este arquivo também é usado em outras páginas.
// Por isso, só cadastramos o evento se o formulário existir na página.
var formVoluntario = document.getElementById("form-voluntario");

if (formVoluntario !== null) {
    formVoluntario.addEventListener("submit", function (evento) {
        evento.preventDefault(); // não recarrega a página

        // Os campos com "required" o próprio HTML já confere.
        // As caixas de "Como você pode ajudar?" a gente confere aqui.
        var caixas = document.getElementsByName("ajuda");
        var ajudas = "";

        for (var i = 0; i < caixas.length; i++) {
            if (caixas[i].checked) {
                if (ajudas !== "") {
                    ajudas = ajudas + ", ";
                }
                ajudas = ajudas + caixas[i].value;
            }
        }

        if (ajudas === "") {
            document.getElementById("erro-ajuda").textContent = "Escolha pelo menos uma forma de ajuda.";
            return; // para aqui e não mostra a confirmação
        }
        document.getElementById("erro-ajuda").textContent = "";

        // Pega os dados digitados
        var nome = document.getElementById("nome").value;
        var email = document.getElementById("email").value;
        var telefone = document.getElementById("telefone").value;
        var regiao = document.getElementById("regiao").value;
        var horario = document.getElementById("horario").value;
        var observacoes = document.getElementById("observacoes").value;

        // Monta a caixa de confirmação
        var html = "<h3>Obrigado, " + nome + "! Cadastro recebido.</h3>";
        html += "<p>Sua ajuda foi computada. Confira os seus dados:</p>";
        html += "<dl>";
        html += "<dt>Nome</dt><dd>" + nome + "</dd>";
        html += "<dt>E-mail</dt><dd>" + email + "</dd>";
        html += "<dt>Telefone</dt><dd>" + telefone + "</dd>";
        html += "<dt>Região</dt><dd>" + regiao + "</dd>";
        html += "<dt>Como vai ajudar</dt><dd>" + ajudas + "</dd>";
        html += "<dt>Quando</dt><dd>" + horario + "</dd>";
        if (observacoes !== "") {
            html += "<dt>Observações</dt><dd>" + observacoes + "</dd>";
        }
        html += "</dl>";
        html += "<p>Quando um abrigo precisar dessa ajuda, avisaremos você pelo telefone informado.</p>";
        html += "<small>Simulação: nenhum dado foi enviado ou guardado.</small>";

        var caixaSucesso = document.getElementById("cadastro-sucesso");
        caixaSucesso.innerHTML = html;
        caixaSucesso.hidden = false;
        caixaSucesso.scrollIntoView({ behavior: "smooth" });

        formVoluntario.reset(); // limpa o formulário
    });
}