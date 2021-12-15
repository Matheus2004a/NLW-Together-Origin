const navigation = document.querySelector('#header nav')
const toggle = document.querySelectorAll('nav .toggle')
const bodyPage = document.querySelector("body")
const iconeTrocaTema = document.querySelector('#header i')

// Ao clicar no ícone de tema, a cor de fundo da página muda pra preto
iconeTrocaTema.addEventListener("click", () => {
    bodyPage.classList.toggle('trocaCorFundo')
})

// Abre o menu mobile quando clicar no ícone de menu e fecha quando clicar no ícone "X" 
for (const iconeMenu of toggle) {
    iconeMenu.addEventListener("click", () => {
        navigation.classList.toggle('show')
    })
}

const itensMenus = document.querySelectorAll('nav ul li a')

// Ao clicar em cada item do menu, o menu é removido
for (const links of itensMenus) {
    links.addEventListener("click", () => {
        navigation.classList.remove('show')
    })
}

// Slide swiper da seção de Depoimentos
const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1, // Permite ver um slide por vez
    pagination: {
        el: '.swiper-pagination'
    },
    mousewheel: true, // Navegação entre os slides com o scroll do mouse
    keyboard: true, // Navegação entre os slides com as setas do teclado
    breakpoints: { // Pontos de quebra quando estiver no dispositivo com largura 767 ou maior
        767: {
            slidesPerView: 2, // Permite ver 2 slides por vez
            setWrapperSize: true // Wrapper cobre todo o conteúdo do slide
        }
    }
});

// Scroll Reveal mostra os elementos da página quando ocorrer o scroll dela
const scrollReveal = ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 700,
    reset: true
})

/* O objeto scrollReveal terá uma função que fará com que cada elemento da página aparece em um intervalo de 100 milisegundos */
scrollReveal.reveal(
    `#home .text, #home .image, 
    #about .text, #about .image,
    #services .title, #services p, #services .cards,
    #depoimentos .title, #depoimentos .rows-cards,
    #contact .text, #contact .links,
    .brand, .social`,
    { interval: 100 }
)

// Botão para voltar ao topo da página
const btnVoltarTopo = document.querySelector(".voltar-topo")
window.addEventListener("scroll", () => {
    mostraBtnTopo()
    menusAtivosSeções()
})

// Botão de voltar ao topo da página aparece e some de acordo com a altura do scroll da página
function mostraBtnTopo() {
    window.scrollY >= 960 ? btnVoltarTopo.classList.add("show") : btnVoltarTopo.classList.remove("show")
}

// Menu ativo de acordo com a seção selecionada
const sections = document.querySelectorAll("main section[id]")
// Menus ativos
function menusAtivosSeções(){
    // Checando em qual seção o usuário está no momento
    const checarMenus = window.pageYOffset + (window.innerHeight / 8) * 4

    for(const section of sections){
        const secaoTopo = section.offsetTop // Pega o topo da seção
        const secaoAltura = section.offsetHeight // Pega a altura da seção
        const secaoId = section.getAttribute("id") // Pega o atributo (id) da seção

        const pontoDeInicio = checarMenus >= secaoTopo
        const pontoDeTermino = checarMenus <= secaoTopo + secaoAltura

        // Se estiver entre o topo e a altura da seção o menu fica ativo
        if (pontoDeInicio && pontoDeTermino) {
            document.querySelector("nav ul li a[href*=" + secaoId + "]").classList.add("active")
        }
        // O restante das seções que não estiverem no limite não terá o menu ativo
        else{
            document.querySelector("nav ul li a[href*=" + secaoId + "]").classList.remove("active")
        }
    }
}