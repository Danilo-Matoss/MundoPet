const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name })
        }
        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }
        leitor.readAsDataURL(arquivo)
    })
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome");

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (erro) {
            console.error("Erro na leitura do arquivo")
        }
    }
})

const inputCategorias = document.getElementById("categoria");
const listaTags = document.getElementById("lista-tags");



listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-categoria")) {
        const categoriaQueQueremosRemover = evento.target.parentElement;
        listaTags.removeChild(categoriaQueQueremosRemover);
    }
})

const categoriasDisponiveis = ["Gato laranja", "Gato preto", "Gato branco", "Gato siamês", "Persa", "Ragdoll"];

async function verificaCategoriasDisponiveis(categoriaTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(categoriasDisponiveis.includes(categoriaTexto));

        }, 1000)
    })
}

inputCategorias.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const categoriatexto  = inputCategorias.value.trim();
        if (categoriatexto !== "") {
            try{
                const categoriaExiste = await verificaCategoriasDisponiveis(categoriatexto);
                if (categoriaExiste) {
                    const categorianova = document.createElement("li");
                    categorianova.innerHTML = `<p>${categoriatexto}</p> <img src="./img/close.svg" class= remove-categoria>`
                    listaTags.appendChild(categorianova);
                    inputCategorias.value = "";

                } else{
                    alert("Categoria não foi encontrada.")
                }
            } catch (error) {
                console.error("Erro ao verificar a existência da categoria");
                alert("Erro ao verificar a existência da categoria. Verifique o console")
            }
        }   
    }
})

const botaoPublicar = document.querySelector(".botao-publicar");

async function publicarProjeto ( nomeDaFoto,descricaoDaFoto, categoriaFoto) {
  return new Promise ((resolve,reject) =>{
    setTimeout(()=>{
        const deuCerto = Math.random() > 0.5;

        if(deuCerto) {
            resolve("Foto publicada com sucesso!")
        }else{
            reject("Erro ao publicar a foto.")
        }
    },2000)
  })  
}

botaoPublicar.addEventListener("click", async (evento) => {
    evento.preventDefault();

    const nomeDaFoto = document.getElementById("nome").value;
    const descricaoDaFoto = document.getElementById("descricao").value;
    const categoriaFoto = Array.from(listaTags.querySelectorAll("p")).map((tag)=> tag.textContent);

    try {
        const resultado = await publicarProjeto(nomeDaFoto, descricaoDaFoto, categoriaFoto);
        console.log(resultado);
        alert("Deu tudo certo!");

    }catch {
        console.log("Deu errado",error)
        alert("Deu tudo errado!");

    }
})

const botaoDescartar = document.querySelector(".botao-descartar");

botaoDescartar.addEventListener("click", (evento) =>{
    evento.preventDefault();

    const formulario = document.querySelector("form");
    formulario.reset();

    imagemPrincipal.src = "./img/Gato laranja.png";
    nomeDaImagem.textContent = "image_projeto.png";

    listaTags.innerHTML = "";
}) 