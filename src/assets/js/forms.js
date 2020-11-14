document.addEventListener('DOMContentLoaded', function() {
    var contactForm = document.querySelector('#contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            if ($(contactForm).parsley().isValid()) {
                event.preventDefault();
                document.body.classList.add('contact-form-success');
                contactForm.reset();
                setTimeout(function() {
                    document.body.classList.remove('contact-form-success');
                }, 4000);
            }
        })
    }

    var buyForm = document.querySelector('#buy-form');
    if (buyForm) {
        buyForm.addEventListener('submit', function(event) {
            if ($(buyForm).parsley().isValid()) {
                event.preventDefault();
                document.body.classList.add('buy-form-success');
                buyForm.reset();
                setTimeout(function() {
                    document.body.classList.remove('buy-form-success');
                }, 4000);
            }
        })
    }

})