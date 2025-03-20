const buttonAnimation = (button, gradFrom, gradTo, color) => {
    console.assert(button, '"button" argument is missing/incorrect');

    const injectStyles = () => {
        if (!document.getElementById('button-animation-styles')) {
            const style = document.createElement('style');
            style.id = 'button-animation-styles';
            style.textContent = `
                .button-shine-anim {
                background: linear-gradient(150deg, ${gradFrom} 0%, ${gradFrom} 35%, ${gradTo} 50%, ${gradFrom} 65%);
                background-size: 300% 300%;
                background-position: 100% 100%;
                color: ${color};
                border: none;
                border-radius: 4px;
                width: 8rem;
                margin: 0.5rem;
                padding: 0.65rem 2rem;
                cursor: pointer;
                font-family: var(--font-family);
                transition: all 0.15s ease;
                }
                .button-shine-anim:hover {
                transform: scale(1.05);
                }
                .button-shine-anim:active {
                transform: scale(1);
                }

                .active-shine-anim {
                background: linear-gradient(150deg, ${gradFrom} 0%, ${gradFrom} 35%, ${gradTo} 50%, ${gradFrom} 65%);
                background-size: 300% 300%;
                animation: gradient-animation 400ms ease-in reverse forwards;
                }

                @keyframes gradient-animation {
                0% {
                    background-position: 0% 0%;
                }
                100% {
                    background-position: 100% 100%;
                }
                }
            `;
            document.head.appendChild(style);
        }
    };

    injectStyles();

    const addClass = (button) => {
        button.classList.add('button-shine-anim');
    };

    addClass(button);

    const addAnimation = (btn) => {
        btn.addEventListener('mousedown', () => {
            btn.classList.add('active-shine-anim');
            setTimeout(() => {
                btn.classList.remove('active-shine-anim');
            }, 400);
        });
    };

    if (NodeList.prototype.isPrototypeOf(button)) {
        console.log('button style module: used query selector all');
        button.forEach(addAnimation);
    } else {
        console.log('button style module: used get by id/query selector');
        addAnimation(button);
    }
};

export { buttonAnimation };