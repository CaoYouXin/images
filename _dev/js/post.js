/**
 * Created by cls on 16/9/14.
 */
;(function () {

    document.querySelector('ul.post-drawer-l').addEventListener('click', function (e) {
        if (e.target.parentElement === this) {
            e.target.classList.toggle('active');
        }
    });

})();
