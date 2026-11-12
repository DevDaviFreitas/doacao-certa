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