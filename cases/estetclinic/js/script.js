/********************************************************/
/*                                                      */
/*  jquery.CarouselLifeExample.js                       */
/* Плагин "Карусель от LifeExample.ru" для jQuery       */
/*  Автор: Авдеев Марк                                  */
/*              2012г.                                  */
/*                                                      */
/* Для ипользования плагина необходимо определить       */
/* контейнер и вложить в него маркерованный список:     */
/*                                                      */
/*  <div class="container">                             */
/*                <ul class="carousel">                 */
/*                        <li>1</li>                    */
/*                        <li>2</li>                    */
/*                        <li>3</li>                    */
/*                        <li>4</li>                    */
/*                        <li>5</li>                    */
/*                        <li>6</li>                    */
/*                </ul>                                 */
/*    </div>                                            */
/* После чего можно указать параметры для использования */
/* плагина                                              */
/* $('.container').Carousel({                           */
/*  visible: 3,  //количество отображаемых позиций 3    */
/*  rotateBy: 1, //прокручивать по 1                    */
/*  speed: 1000, //скорость 1 секунда                   */
/*  btnNext: null, // кнопка вперед не назначена        */
/*  btnPrev: null, // кнопка назад не назначена         */
/*  auto: true, // авто прокрутка включена              */
/*  margin: 10, // отступ между позициями               */
/*  position: "h",// расположение по горизонтали        */
/*  dirAutoSlide: false //направление движения          */
/*  });                                                 */
/*  Или использовать параметры по умолчанию             */
/*  $('.container').Carousel();                         */
/*                                                      */
/********************************************************/
(function($) {
    $.fn.Carousel = function(options) {
        // Настройки по умолчанию
        var settings = {
            visible: 3, //количество отображаемых позиций 3
            rotateBy: 1, //прокручивать по 1
            speed: 1000, //скорость 1 секунда
            btnNext: null, // кнопка вперед не назначена
            btnPrev: null, // кнопка назад не назначена
            auto: true, // авто прокрутка включена
            position: "h", // расположение по горизонтали
            dirAutoSlide: false //направление движения в перед для автопрокрутки
        };

        return this.each(function() {
            if (options) {
                $.extend(settings, options); //устанавливаем пользовательские настройки
            }

            // определяем переменные
            var $this = $(this); //родительский элемент (Блок в котором находится карусель)                     
            var $carousel = $this.children(':first'); // получаем дочерний элемент (UL) т.е. саму карусель
            var itemWidth = $carousel.children().outerWidth() + settings.margin; // вычисляем ширину элемента
            var itemHeight = $carousel.children().outerHeight() + settings.margin; // вычисляем высоту элемента                  
            var itemsTotal = $carousel.children().length; // получаем общее количество элементов в каруселе
            var running = false; //останавливаем процесс
            var intID = null; //отчищаем интервал
            //size - размер для вычисления длины, зависит от ориентации карусели
            var size = itemWidth;
            if (settings.position == "v") size = itemHeight;
            //Если карусель вертикальная то
            if (settings.position == "v")
                $this.css({
                    'position': 'relative', // необходимо для нормального отображения в ИЕ6(7)
                    'overflow': 'hidden', // прячем все, что не влезает в контейнер
                    'height': settings.visible * size + 'px', // ДЛИНУ контейнера ставим равной ширине всех видимых элементов
                    'width': itemWidth - settings.margin //Ширина контейнера равна ширине элемента
                });
            else
                $this.css({
                    'position': 'relative', // необходимо для нормального отображения в ИЕ6(7)
                    'overflow': 'hidden', // прячем все, что не влезает в контейнер
                    'width': settings.visible * size + 'px', // ширину контейнера ставим равной ширине всех видимых элементов
                    'height': itemHeight - settings.margin
                });
            //вычисляем расстояние отупа от каждого элемента
            if (settings.position == "v")
                $carousel.children('li').css({
                    'margin-top': settings.margin / 2 + 'px',
                    'margin-bottom': settings.margin / 2 + 'px',
                    'float': 'left',
                    'background': '#E2E2E2',
                    'font': '20px Calibry italic',
                    'color': 'green',

                });
            else
                $carousel.children('li').css({
                    'margin-left': settings.margin / 2 + 'px',
                    'margin-right': settings.margin / 2 + 'px',
                });
            // в зависимости от ориентации, увеличиваем длину или ширину карусели
            if (settings.position == "v")
                $carousel.css({
                    'position': 'relative', // разрешаем сдвиг по оси
                    'height': 9999 + 'px', // увеличиваем лену карусели
                    'left': 0,
                    'top': 0
                });
            else
                $carousel.css({
                    'position': 'relative', // разрешаем сдвиг по оси
                    'width': 9999 + 'px', // увеличиваем лену карусели
                    'top': 0,
                    'left': 0
                });
            //прокрутка карусели в наравлении dir [true-вперед; false-назад]
            function slide(dir) {
                var direction = !dir ? -1 : 1; // устанавливаем заданное направление
                var Indent = 0; // смещение (для ul)
                if (!running) {
                    // если анимация завершена (или еще не запущена)
                    running = true; // ставим флажок, что анимация в процессе
                    if (intID) { // если запущен интервал
                        window.clearInterval(intID); // очищаем интервал                                        
                    }
                    if (!dir) { // если мы мотаем к следующему элементу (так по умолчанию)
                        /*
                         * вставляем после последнего элемента карусели
                         * клоны стольких элементов, сколько задано
                         * в параметре rotateBy (по умолчанию задан один элемент)
                         */
                        $carousel.children(':last').after($carousel.children().slice(0, settings.rotateBy).clone(true));
                    } else { // если мотаем к предыдущему элементу
                        /*
                         * вставляем перед первым элементом карусели
                         * клоны стольких элементов, сколько задано
                         * в параметре rotateBy (по умолчанию задан один элемент)
                         */
                        $carousel.children(':first').before($carousel.children().slice(itemsTotal - settings.rotateBy, itemsTotal).clone(true));
                        /*
                         * сдвигаем карусель (<ul>)  на ширину/высоту  элемента,
                         * умноженную на количество элементов, заданных
                         * в параметре rotateBy (по умолчанию задан один элемент)
                         */
                        if (settings.position == "v")
                            $carousel.css('top', -size * settings.rotateBy + 'px');
                        else $carousel.css('left', -size * settings.rotateBy + 'px');
                    }

                    /*
                     * расчитываем  смещение
                     * текущее значение  + ширина/высота  одного элемента * количество проматываемых элементов * на направление перемещения (1 или -1)
                     */
                    if (settings.position == "v")
                        Indent = parseInt($carousel.css('top')) + (size * settings.rotateBy * direction);
                    else
                        Indent = parseInt($carousel.css('left')) + (size * settings.rotateBy * direction);

                    if (settings.position == "v")
                        var animate_data = {
                            'top': Indent
                        };
                    else
                        var animate_data = {
                            'left': Indent
                        };
                    // запускаем анимацию
                    $carousel.animate(animate_data, {
                        queue: false,
                        duration: settings.speed,
                        complete: function() {
                            // когда анимация закончена
                            if (!dir) { // если мы мотаем к следующему элементу (так по умолчанию)
                                // удаляем столько первых элементов, сколько задано в rotateBy
                                $carousel.children().slice(0, settings.rotateBy).remove();
                                // устанавливаем сдвиг в ноль
                                if (settings.position == "v")
                                    $carousel.css('top', 0);
                                else $carousel.css('left', 0);
                            } else { // если мотаем к предыдущему элементу
                                // удаляем столько последних элементов, сколько задано в rotateBy
                                $carousel.children().slice(itemsTotal, itemsTotal + settings.rotateBy).remove();
                            }
                            if (settings.auto) { // если карусель должна проматываться автоматически
                                // запускаем вызов функции через интервал времени (auto)
                                intID = window.setInterval(function() {
                                    slide(settings.dirAutoSlide);
                                }, settings.auto);
                            }
                            running = false; // отмечаем, что анимация завершена
                        }
                    });
                }
                return false; // возвращаем false для того, чтобы не было перехода по ссылке
            }
            // назначаем обработчик на событие click для кнопки "вперед"
            $(settings.btnNext).click(function() {
                return slide(false);
            });
            // назначаем обработчик на событие click для кнопки "Назад"
            $(settings.btnPrev).click(function() {
                return slide(true);
            });

            if (settings.auto) { // если карусель должна проматываться автоматически
                // запускаем вызов функции через временной интервал
                intID = window.setInterval(function() {
                    slide(settings.dirAutoSlide);
                }, settings.auto);
            }
        });
    };
})(jQuery);

/*
 * Функция расчета даты скидки
 * 
 */
function getSaleDate(days) {

    var now = new Date(),
        myDate = now.getDate(),
        myMonth = now.getMonth(),
        output = '';

    //  myMonth = 11;
    //  myDate = 28;   

    var myMonths = Array(
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Октября',
        'Ноября',
        'Декабря'
    );

    if (myDate < 15 && myDate > 0) {
        output = days[1] + ' ' + myMonths[myMonth];
    } else if (myDate < 32 && myDate > 14) {
        myMonth++;
        if (myMonth == 12) {
            myMonth = 0;
        }
        output = days[0] + ' ' + myMonths[myMonth];
    }


    return output;
}


/*-------------------------------------------------------------------------------------------------------------------------*/
$(document).ready(function($) {
    var scrolling = true,
        goodsColor = 'gray';

    $('.wrapper').Carousel({
        visible: 5, //количество отображаемых позиций 3   
        rotateBy: 1, //прокручивать по 1                  
        speed: 500, //скорость 1 секунда                    
        btnNext: '.totop', // кнопка вперед не назначена     
        btnPrev: '.tobottom', // кнопка назад не назначена           
        auto: false, // авто прокрутка включена             
        margin: 18, // отступ между позициями               
        position: "v", // расположение по горизонтали       
        dirAutoSlide: true //направление движения           
    });

    // маски импутов
    $('input[name="phone"]').mask("+7(999)999-99-99");
    $('input[name="date"]').mask("99.99.9999");
    $('input[name="time"]').mask("99:99");

    // обработка плейсхолдера  поля ввода имени  
    $('input[name="name"]').on('focus', function() {
        $(this).data('placeholder', $(this).attr('placeholder'));
        $(this).attr('placeholder', '');
    });
    $('input[name="name"]').on('blur', function() {
        $(this).attr('placeholder', $(this).data('placeholder'));
    });

    lightbox.option({
        'fadeDuration': 150,
        'wrapAround': true,
        'showImageNumberLabel': false,
    });


    // постепенная загрузка фонов    
    $('.lazy').lazy({
        enableThrottle: true,
        scrollDirection: 'vertical',
        effect: 'fadeIn',
        effectTime: 400,
        visibleOnly: true,
        onError: function(element) {
            console.log('error loading ' + element.data('src'));
        }
    });

    // открытие модальников
    $('.button.pull-left').click(function(event) {
        event.preventDefault();
        $('.overlay').fadeIn(400,
            function() {
                $('.modal1')
                    .css('display', 'flex')
                    .animate({
                        opacity: 1
                    }, 200);
            });
    });

    $('.button_buy, .btn_order32').click(function(event) {
        event.preventDefault();
        var modal = $('.modal2');
        modal.find('h4').text('Купить в 1 клик');
        modal.find('.price').text('Цена: 118 999 руб.');
        modal.find('.form4_sbmt').text('хочу получить кресло!');
        modal.find('.form4_sbmt').data('type', 'fastorder');
        modal.find('.pre').show();
        modal.find('.alert').empty();
        $('.overlay').fadeIn(400,
            function() {
                modal.css('display', 'flex').animate({
                    opacity: 1
                }, 200);
            });
    });
    $('.credit_block').click(function(event) {
        event.preventDefault();
        var modal = $('.modal2');
        modal.find('h4').text('Купить в кредит');
        modal.find('.price').text('Цена: 6 273р. в месяц');
        modal.find('.form4_sbmt').text('хочу получить кресло!');
        modal.find('.form4_sbmt').data('type', 'fastorder');
        modal.find('.pre').show();
        modal.find('.alert').empty();
        $('.overlay').fadeIn(400,
            function() {
                modal.css('display', 'flex').animate({
                    opacity: 1
                }, 200);
            });
    });
    $('.button_consult, .back_call_btn').click(function(event) {
        event.preventDefault();
        var modal = $('.modal2');
        modal.find('h4').text('Консультация');
        modal.find('.form4_sbmt').text('Отправить заявку');
        modal.find('.form4_sbmt').data('type', 'consult');
        modal.find('.pre').hide();
        modal.find('.alert').empty();
        $('.overlay').fadeIn(400,
            function() {
                modal.css('display', 'flex').animate({
                    opacity: 1
                }, 200);
            });
    });
    $('.back_call_btn, .callback').click(function(event) {
        event.preventDefault();
        var modal = $('.modal2'),
            errors = new Array(),
            name = $(this).parent('form').find('input[name="name"]').val(),
            phone = $(this).parent('form').find('input[name="phone"]').val();


        modal.find('h4').text('обратный звонок');
        modal.find('.form4_sbmt').text('Заказать');
        modal.find('.pre').hide();
        $('.overlay').fadeIn(400, function() {
            modal.css('display', 'flex').animate({
                opacity: 1
            }, 200);
        });
    });

    $('.form1_sbmt, .form2_sbmt, .form3_sbmt, .form11_sbmt, .form12_sbmt').click(function(event) {
        event.preventDefault();
        var modal = $('.modal3'),
            ordertype = $(this).data('type'),
            errors = new Array(),
            name = $(this).parent('form').find('input[name="name"]').val(),
            phone = $(this).parent('form').find('input[name="phone"]').val();
        var regPhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i;


        if (name.length < 2) {
            errors.push('Не указано имя.');
        }
        if (!phone.match(regPhone)) {
            errors.push('телефон введен не верно.');
        }

        if (errors.length) {
            modal.css('height', '200px').css('width', '600px');
            textModal = '<p class="text_errors">Данные указаны не верно! Исправте следущие ошибки:</p>';
            textModal += '<ul class="list_errors">';
            errors.forEach(function(item, i, errors) {
                textModal += '<li>' + item + '</li>';
            });
            textModal += '</ul>';
            modal.find('.content').empty().append(textModal);
        } else {


            $.ajax({
                type: "POST",
                async: false,
                url: "ajax.php?method=setorder",
                data: {
                    'type': ordertype,
                    'name': name,
                    'phone': phone,
                    'color': goodsColor
                },
                success: function(msg) {
                    textModal = '<p class="text_order_done">' + msg + '</p>';

                }
            });

            $.ajax({
                type: "POST",
                async: false,
                url: "/ajax/request.php",
                data: {
                    'type': ordertype,
                    'name': name,
                    'phone': phone,
                    'color': goodsColor
                },
                success: function(msg) {
                    textModal = '<p class="text_order_done">' + msg + '</p>';

                }
            });



            modal.css('height', '150px').css('width', '600px');
            // textModal = '<p class="text_order_done">Ваша заявка отправлена! Мы свяжемя с вами в ближайшее время.</p>';
            modal.find('.content').empty().append(textModal);
        }

        $('.overlay').fadeIn(400,
            function() {
                modal.css('display', 'flex').animate({
                    opacity: 1
                }, 200);
            });
    });
    $('.form3_sbmt').click(function(event) {
        event.preventDefault();
        var modal = $('.modal3'),
            ordertype = $(this).data('type'),
            errors = new Array(),
            name = $(this).parent('form').find('input[name="name"]').val(),
            phone = $(this).parent('form').find('input[name="phone"]').val(),
            date = $(this).parent('form').find('input[name="date"]').val(),
            time = $(this).parent('form').find('input[name="time"]').val();

        var regPhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i,
            regDate = /([0-2]\d|3[01])\.(0\d|1[012])\.(\d{4})/i,
            regTime = /^(([0,1][0-9])|(2[0-3])):[0-5][0-9]$/i;


        if (name.length < 2) {
            errors.push('Не указано имя.');
        }
        if (!phone.match(regPhone)) {
            errors.push('телефон введен не верно.');
        }
        if (!date.match(regDate)) {
            errors.push('Дата указана не верно.');
        }
        if (!time.match(regTime)) {
            errors.push('Время указано не верно.');
        }

        if (errors.length) {
            modal.css('height', '200px').css('width', '600px');
            textModal = '<p class="text_errors">Данные указаны не верно! Исправте следущие ошибки:</p>';
            textModal += '<ul class="list_errors">';
            errors.forEach(function(item, i, errors) {
                textModal += '<li>' + item + '</li>';
            });
            textModal += '</ul>';
            modal.find('.content').empty().append(textModal);
        } else {


            $.ajax({
                type: "POST",
                async: false,
                url: "ajax.php?method=setorder",
                data: {
                    'type': ordertype,
                    'name': name,
                    'phone': phone,
                    'date': date,
                    'time': time,
                    'color': goodsColor
                },
                success: function(msg) {
                    textModal = '<p class="text_order_done">' + msg + '</p>';

                }
            });
            $.ajax({
                type: "POST",
                async: false,
                url: "/ajax/request.php",
                data: {
                    'type': ordertype,
                    'name': name,
                    'phone': phone,
                    'date': date,
                    'time': time,
                    'color': goodsColor
                },
                success: function(msg) {
                    textModal = '<p class="text_order_done">' + msg + '</p>';
                }
            });


            modal.css('height', '150px').css('width', '600px');
            //textModal = '<p class="text_order_done">Ваша заявка отправлена! Мы свяжемя с вами в ближайшее время.</p>';
            modal.find('.content').empty().append(textModal);
        }

        $('.overlay').fadeIn(400,
            function() {
                modal.css('display', 'flex').animate({
                    opacity: 1
                }, 200);
            });
    });

    $('.form4_sbmt').click(function(event) {
        event.preventDefault();
        var modal = $('.modal2'),
            ordertype = $(this).data('type'),
            errors = new Array(),
            form = $(this).parent('form'),
            name = form.find('input[name="name"]').val(),
            phone = form.find('input[name="phone"]').val();

        var regPhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i,
            regDate = /([0-2]\d|3[01])\.(0\d|1[012])\.(\d{4})/i,
            regTime = /^(([0,1][0-9])|(2[0-3])):[0-5][0-9]$/i;


        if (name.length < 2) {
            errors.push('Не указано имя.');
        }
        if (!phone.match(regPhone)) {
            errors.push('телефон введен не верно.');
        }

        if (errors.length) {
            // modal.css('height' , '+=200px');
            textModal = '<p class="text_errors">Данные указаны не верно! Исправте следущие ошибки:</p>';
            textModal += '<ul class="list_errors">';
            errors.forEach(function(item, i, errors) {
                textModal += '<li>' + item + '</li>';
            });
            textModal += '</ul>';
            modal.find('.alert').empty().append(textModal);
        } else {
            $.ajax({
                type: "POST",
                async: false,
                url: "ajax.php?method=setorder",
                data: {
                    'type': ordertype,
                    'name': name,
                    'phone': phone,
                    'date': '',
                    'time': '',
                    'color': goodsColor
                },
                success: function(msg) {
                    textModal = '<p class="text_order_done">' + msg + '</p>';

                }
            });

            $.ajax({
                type: "POST",
                async: false,
                url: "/ajax/request.php",
                data: {
                    'type': ordertype,
                    'name': name,
                    'phone': phone,
                    'date': '',
                    'time': '',
                    'color': goodsColor
                },
                success: function(msg) {
                    textModal = '<p class="text_order_done">' + msg + '</p>';

                }
            });

            // modal.css('height' , '=+150px');
            //textModal = '<p class="text_order_done">Ваша заявка отправлена! Мы свяжемя с вами в ближайшее время.</p>';
            modal.find('.alert').empty().append(textModal);
            modal.find('.form4_sbmt').remove();
            modal.find('.color').remove();
            modal.find('input').remove();
        }

        $('.overlay').fadeIn(400,
            function() {
                modal.css('display', 'flex').animate({
                    opacity: 1
                }, 200);
            });
    });

    $('.form6_sbmt').click(function(event) {
        event.preventDefault();
        var modal = $('.modal1'),
            errors = new Array(),
            ordertype = $(this).data('type'),
            form = $(this).parent('form'),
            name = form.find('input[name="name"]').val(),
            phone = form.find('input[name="phone"]').val(),
            date = $(this).parent('form').find('input[name="date"]').val(),
            time = $(this).parent('form').find('input[name="time"]').val();

        var regPhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i,
            regDate = /([0-2]\d|3[01])\.(0\d|1[012])\.(\d{4})/i,
            regTime = /^(([0,1][0-9])|(2[0-3])):[0-5][0-9]$/i;


        if (name.length < 2) {
            errors.push('Не указано имя.');
        }
        if (!phone.match(regPhone)) {
            errors.push('телефон введен не верно.');
        }
        if (!date.match(regDate)) {
            errors.push('Дата указана не верно.');
        }
        if (!time.match(regTime)) {
            errors.push('Время указано не верно.');
        }

        if (errors.length) {
            // modal.css('height' , '+=200px');
            textModal = '<p class="text_errors">Данные указаны не верно! Исправте следущие ошибки:</p>';
            textModal += '<ul class="list_errors">';
            errors.forEach(function(item, i, errors) {
                textModal += '<li>' + item + '</li>';
            });
            textModal += '</ul>';
            modal.find('.alert').empty().append(textModal);
        } else {

            $.ajax({
                type: "POST",
                async: false,
                url: "ajax.php?method=setorder",
                data: {
                    'type': ordertype,
                    'name': name,
                    'phone': phone,
                    'date': date,
                    'time': time,
                    'color': goodsColor
                },
                success: function(msg) {
                    textModal = '<p class="text_order_done">' + msg + '</p>';

                }
            });

            $.ajax({
                type: "POST",
                async: false,
                url: "/ajax/request.php",
                data: {
                    'type': ordertype,
                    'name': name,
                    'phone': phone,
                    'date': date,
                    'time': time,
                    'color': goodsColor
                },
                success: function(msg) {
                    textModal = '<p class="text_order_done">' + msg + '</p>';

                }
            });
            // modal.css('height' , '=+150px');
            //textModal = '<p class="text_order_done">Ваша заявка отправлена! Мы свяжемя с вами в ближайшее время.</p>';
            modal.find('.alert').empty().append(textModal);
            modal.find('.form6_sbmt').remove();
            modal.find('input').remove();
        }

        $('.overlay').fadeIn(400,
            function() {
                modal.css('display', 'flex').animate({
                    opacity: 1
                }, 200);
            });
    });

    // закрытие модальников
    $('.modal_close, .overlay, .modal_close_button').click(function() {
        $('.modal1')
            .animate({
                    opacity: 0
                }, 200,
                function() {
                    $(this).css('display', 'none');
                    $('.overlay').fadeOut(400);
                }
            );
        $('.modal2')
            .animate({
                    opacity: 0
                }, 200,
                function() {
                    $(this).css('display', 'none');
                    $('.overlay').fadeOut(400);
                }
            );
        $('.modal3')
            .animate({
                    opacity: 0
                }, 200,
                function() {
                    $(this).css('display', 'none');
                    $('.overlay').fadeOut(400);
                }
            );

    });

    // переключие цвета
    $('.color_box').on('click', '.button_color', function(event) {
        $(this).parent('.color_box').find('.button_color').removeClass('active');
        goodsColor = $(this).data('color');

        $(this).addClass('active');
    });



    //$('.saledate').text(getSaleDate([8,23]));

    // плавный скролл по якорям
    $('.lp_links').click(function() {
        if (scrolling == true) {
            scrolling = false;
            var elementClick = $(this).attr("href");
            var destination = $(elementClick).offset().top;
            $("html:not(:animated),body:not(:animated)").animate({
                scrollTop: destination - 130
            }, 1000);
            setTimeout(function() {
                scrolling = true;
            }, 1000);
            $('.lp_links').removeClass('active');
            $(this).addClass('active');
        };

        return false;
    });

    // Скроллинг
    $(document).on('scroll', function() {
        if (scrolling == true) {
            $('.lp_block').each(function() {
                var windowTop = $(window).scrollTop(),
                    divTop = $(this).offset().top,
                    lpAnchor = $(this).attr('id');

                if (windowTop > divTop - 135) {
                    $('.lp_links').removeClass('active');
                    $('[href="#' + lpAnchor + '"]').addClass('active');
                } else {
                    // $('.lp_links').removeClass('active');
                }
            });
        }
    });

    // 
    $('.show_room_btn').on('click', function() {
        $('[href="#showroom"]').trigger('click');
    });

});