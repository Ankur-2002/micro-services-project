const elements = document.querySelectorAll('.box');
console.log(elements);
var currentActive = document.querySelector('.active');
elements.forEach((element) => {
    element.addEventListener('click', (element) => {
        if (element.target.getAttribute('class') === 'box active') {
            return;
        }
        if (
            currentActive.getBoundingClientRect().left <
            element.target.getBoundingClientRect().left
        ) {
            const clickOrder = +element.target.getAttribute('aria-label');
            if (clickOrder % 2 === 0) {
                const nextOrderElement = document.querySelector(
                    `[aria-label="${clickOrder + 1}"]`
                );
                nextOrderElement.setAttribute('aria-label', clickOrder);
                element.target.setAttribute('aria-label', clickOrder + 1);
                element.target.style.order = clickOrder + 1;
                nextOrderElement.style.order = clickOrder;
                element.target.style.backgroundColor = 'blue';
                element.target.style.height = 'calc(300px + 1rem)';
            } else {
                element.target.style.backgroundColor = 'blue';
                element.target.style.height = 'calc(300px + 1rem)';
            }
            console.log('Active element is on left side');
        } else {
            console.log('Active element is on right side');
            const clickOrder = +element.target.getAttribute('aria-label');
            if (clickOrder % 2 !== 0) {
                element.target.style.backgroundColor = 'blue';
                element.target.style.height = 'calc(300px + 1rem)';
            } else {
                const previousOrderElement = document.querySelector(
                    `[aria-label="${clickOrder - 1}"]`
                );
                previousOrderElement.setAttribute('aria-label', clickOrder);
                element.target.setAttribute('aria-label', clickOrder - 1);
                element.target.style.order = clickOrder - 1;
                previousOrderElement.style.order = clickOrder;
                element.target.style.backgroundColor = 'blue';
                element.target.style.height = 'calc(300px + 1rem)';
            }
        }
        currentActive.style.backgroundColor = 'red';
        currentActive.style.height = '150px';
        currentActive.setAttribute('class', 'box'); // remove active class from previous element
        element.target.setAttribute('class', 'box active'); // add active class to current element
        currentActive = element.target; // set current element as active element
    });
});
