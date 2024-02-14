function splitLetters(className) {
    const elements = document.getElementsByClassName(className);

    for(var i = 0; i < elements.length; i++) {
        const text = elements[i].innerText.split("");
        const element = elements[i];

        element.innerText = "";
    
        for(var j = 0; j < text.length; j++) {
            const span = document.createElement("span");
            span.className = "bounce-letter";
            span.innerText = text[j];
            element.appendChild(span);

            anime({
                targets: ".bounce-letter",
                translateY: [-100, 0],
                duration: 1000,
                easing: "easeOutBounce",
                delay: anime.stagger(100),
            });
        }
    }
}

splitLetters("bounce");