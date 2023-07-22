// Changing the drop down icon
$(document).ready(function() {
    $('.exp-toggle').click(function (e) {
        e.preventDefault();
        var $icon = $(this).find('i');
        $icon.toggleClass('fas fa-chevron-down fas fa-chevron-up');
        $(this).closest('.hgroup').find('.edu-hidden-content').slideToggle();
    });
});


// ***************************************************************************************
// Animating research description text, clickable expansion
// ***************************************************************************************

// getting necessary HTML elements
const icon = document.getElementById('research-desc-click');
const textTitle = document.getElementById('focus-text');
const textBody = document.getElementById('research-desc-body');
// get the transition property from textTitle
const transition = window.getComputedStyle(textTitle).getPropertyValue('transition');

// titles to cycle through in animation
const titles = [
    'Title 1',
    'Fancy Title 2',
    'The Fanciest of Titles 3',
    'Somehow Even Fanciester of Titles 3',
];

// descriptions to cycle through in animation
const texts = [
    'This is what I do for 2.',
    ' Futher, I also do this for 3.',
    ' Finally, I do this for 4.',
];

// the subject of the text being unrolled
let focus = titles[0];
// controls what section of text we're on
let index = 0;
// don't want button clickable while animating 
let isAnimating = false;
// need to define outside scope for animation
let requestId;
// time (in milliseconds) for the title to fade out or in, as defined in style.css
// NOTE: make sure this matches the appropriate value in style.css
let fadeTime = 300;



// Add CSS class to make icon passively glow and increase font size
icon.classList.add('passive-glow');
textBody.style.height = '30px';

icon.addEventListener('click', () => {
    // turn off link until we're done animating
    icon.href = 'javascript:void(0)';
    icon.classList.remove('passive-glow-nogrow');

    if (!isAnimating) {
        // title texts to loop through.
        focus = focus === titles[0] ? titles[1] :
            focus = focus === titles[1] ? titles[2] :
                focus = focus === titles[2] ? titles[3] :
                    titles[0];
        
        textTitle.style.opacity = '0';
        setTimeout(() => {
            textTitle.innerHTML = focus;
            textTitle.style.opacity = '1';
        }, fadeTime);
        // only want to start animating body text after the title has faded back in.
        setTimeout(() => {
            cancelAnimationFrame(requestId); // Cancel animation frame when icon is clicked again
            animateText();
        }, fadeTime * 2);
        // Remove CSS class to stop passive glow and reset font size
        textBody.style.height = '';
        icon.classList.remove('passive-glow');
    }

    isAnimating = true;
});

function animateText() {
    if (index < texts.length) {
        const currentText = texts[index];
        const currentTextLength = currentText.length;
        let i = 0;

        // for certain indexes, we want to insert a line break at the beginning.
        if (index === 3 || index === 4) {
            icon.insertAdjacentHTML('beforebegin', '<br><br>');
        }
        const updateText = () => {
            if (i < currentTextLength) {
                icon.insertAdjacentHTML('beforebegin', currentText.charAt(i));
                i++;
                requestId = requestAnimationFrame(updateText);
            } else {
                // if not final time, turn on link again when done animating, if not the final time
                if (index < texts.length) {
                    icon.href = '#';
                    icon.classList.add('passive-glow-nogrow');
                    isAnimating = false;
                }
                // if final time, fade out and remove icon NOTE: make sure delay matches style.css
                else {
                    icon.style.opacity = '0';
                    setTimeout(() => {
                        icon.remove();
                    }, 600);
                }
            }
        };
        index++;
        requestId = requestAnimationFrame(updateText);
    }
}