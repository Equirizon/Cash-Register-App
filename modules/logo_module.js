const logoAnimation = () => {
    const injectLogoHTML = () => {
        if (!document.querySelector('header')) {
            console.warn('"<header>" not found: adding <header> in <body>');
            const header = document.createElement('header');
            document.body.insertAdjacentElement('afterbegin', header);
        }

        if (!document.querySelector('.my-logo')) {
            console.warn('class "my-logo" not found: adding <img>');
            const header = document.querySelector('header');
            const logoDiv = document.createElement('div');
            logoDiv.id = 'div-logo';
            logoDiv.innerHTML = 
            `
            <a href="https://github.com/Equirizon" target="_blank">
            <img src="assets/Folder Icon 1.5.png" alt="Icon" class="my-logo" />
            </a>
            `;
            header.insertAdjacentElement('afterbegin', logoDiv);
        } else {
            console.log('<a> <img> present');
            console.warn('make sure to include "assets/Folder Icon 1.5.png" in root directory');
        }
        
        const logo = document.querySelector('.my-logo');
        addHoverListeners(logo);
    };


    const injectStyles = () => {
        if (!document.getElementById('logo-style')) {
            const logo = document.createElement('style');
            logo.id = 'logo-style';
            logo.textContent = 
                `
                .my-logo {
                    display: block;
                    width: 8rem;
                    height: auto;
                    margin: auto;
                    transition: all 0.2s ease-out, filter 500ms cubic-bezier(0.4, 0, 1, 1);
                }
    
                .hover {
                    transform: scale(1.02);
                    animation: hue-rotate-my-logo 1s ease-out infinite alternate;
                }
                    .hover:active {
                    transform: scale(0.95);
                }
    
                a[href="https://github.com/Equirizon"] {
                    position: relative;
                    display: block;
                    width: min-content;
                    margin: auto;
                }
    
                @keyframes hue-rotate-my-logo {
                    0% {
                        filter: hue-rotate(0deg);
                    }
                    100% {
                        filter: hue-rotate(20deg);
                    }
                }
                `;

            document.head.appendChild(logo);
        }
    };
    
    const addHoverListeners = (logo) => {
        if (logo) {
            logo.addEventListener('mouseenter', () => {
                logo.classList.add('hover');
            });
            
            logo.addEventListener('mouseleave', () => {
                gradAnim(logo);
                logo.classList.remove('hover');
            });
        } else {
            console.error('logo does not exist');
        }
    };
    
    const gradAnim = (logo) => {
        const hover = document.querySelector('.hover');
        const computedStyle = window.getComputedStyle(hover);
        const hue = computedStyle.filter;
        logo.style.setProperty('filter', hue);
        
        setTimeout(() => {
            logo.style.setProperty('filter', 'hue-rotate(0deg)');
        }, 1000);
    };
    
    injectLogoHTML();
    injectStyles();
};

export { logoAnimation };

// const debounce = (fn, delay) => {
//     let timer;
//     return (...args) => {
//         clearTimeout(timer);
//         timer = setTimeout(() => fn(...args), delay);
//     };
// };