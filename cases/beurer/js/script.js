/********************************************************/
/*                                                      */
/*  jquery.CarouselLifeExample.js                       */
/* ������ "�������� �� LifeExample.ru" ��� jQuery       */
/*  �����: ������ ����                                  */
/*              2012�.                                  */
/*                                                      */
/* ��� ������������ ������� ���������� ����������       */
/* ��������� � ������� � ���� ������������� ������:     */
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
/* ����� ���� ����� ������� ��������� ��� ������������� */
/* �������                                              */
/* $('.container').Carousel({                           */
/*  visible: 3,  //���������� ������������ ������� 3    */
/*  rotateBy: 1, //������������ �� 1                    */
/*  speed: 1000, //�������� 1 �������                   */
/*  btnNext: null, // ������ ������ �� ���������        */
/*  btnPrev: null, // ������ ����� �� ���������         */
/*  auto: true, // ���� ��������� ��������              */
/*  margin: 10, // ������ ����� ���������               */
/*  position: "h",// ������������ �� �����������        */
/*  dirAutoSlide: false //����������� ��������          */
/*  });                                                 */
/*  ��� ������������ ��������� �� ���������             */
/*  $('.container').Carousel();                         */
/*                                                      */
/********************************************************/
(function($) {
    $.fn.Carousel = function(options) {
        // ��������� �� ���������
        var settings = {
            visible: 3, //���������� ������������ ������� 3
            rotateBy: 1, //������������ �� 1
            speed: 1000, //�������� 1 �������
            btnNext: null, // ������ ������ �� ���������
            btnPrev: null, // ������ ����� �� ���������
            auto: true, // ���� ��������� ��������
            position: "h", // ������������ �� �����������
            dirAutoSlide: false //����������� �������� � ����� ��� �������������
        };

        return this.each(function() {
            if (options) {
                $.extend(settings, options); //������������� ���������������� ���������
            }

            // ���������� ����������
            var $this = $(this); //������������ ������� (���� � ������� ��������� ��������)                     
            var $carousel = $this.children(':first'); // �������� �������� ������� (UL) �.�. ���� ��������
            var itemWidth = $carousel.children().outerWidth() + settings.margin; // ��������� ������ ��������
            var itemHeight = $carousel.children().outerHeight() + settings.margin; // ��������� ������ ��������                  
            var itemsTotal = $carousel.children().length; // �������� ����� ���������� ��������� � ��������
            var running = false; //������������� �������
            var intID = null; //�������� ��������
            //size - ������ ��� ���������� �����, ������� �� ���������� ��������
            var size = itemWidth;
            if (settings.position == "v") size = itemHeight;
            //���� �������� ������������ ��
            if (settings.position == "v")
                $this.css({
                    'position': 'relative', // ���������� ��� ����������� ����������� � ��6(7)
                    'overflow': 'hidden', // ������ ���, ��� �� ������� � ���������
                    'height': settings.visible * size + 'px', // ����� ���������� ������ ������ ������ ���� ������� ���������
                    'width': itemWidth - settings.margin //������ ���������� ����� ������ ��������
                });
            else
                $this.css({
                    'position': 'relative', // ���������� ��� ����������� ����������� � ��6(7)
                    'overflow': 'hidden', // ������ ���, ��� �� ������� � ���������
                    'width': settings.visible * size + 'px', // ������ ���������� ������ ������ ������ ���� ������� ���������
                    'height': itemHeight - settings.margin
                });
            //��������� ���������� ����� �� ������� ��������
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
            // � ����������� �� ����������, ����������� ����� ��� ������ ��������
            if (settings.position == "v")
                $carousel.css({
                    'position': 'relative', // ��������� ����� �� ���
                    'height': 9999 + 'px', // ����������� ���� ��������
                    'left': 0,
                    'top': 0
                });
            else
                $carousel.css({
                    'position': 'relative', // ��������� ����� �� ���
                    'width': 9999 + 'px', // ����������� ���� ��������
                    'top': 0,
                    'left': 0
                });
            //��������� �������� � ���������� dir [true-������; false-�����]
            function slide(dir) {
                var direction = !dir ? -1 : 1; // ������������� �������� �����������
                var Indent = 0; // �������� (��� ul)
                if (!running) {
                    // ���� �������� ��������� (��� ��� �� ��������)
                    running = true; // ������ ������, ��� �������� � ��������
                    if (intID) { // ���� ������� ��������
                        window.clearInterval(intID); // ������� ��������                                        
                    }
                    if (!dir) { // ���� �� ������ � ���������� �������� (��� �� ���������)
                        /*
                         * ��������� ����� ���������� �������� ��������
                         * ����� �������� ���������, ������� ������
                         * � ��������� rotateBy (�� ��������� ����� ���� �������)
                         */
                        $carousel.children(':last').after($carousel.children().slice(0, settings.rotateBy).clone(true));
                    } else { // ���� ������ � ����������� ��������
                        /*
                         * ��������� ����� ������ ��������� ��������
                         * ����� �������� ���������, ������� ������
                         * � ��������� rotateBy (�� ��������� ����� ���� �������)
                         */
                        $carousel.children(':first').before($carousel.children().slice(itemsTotal - settings.rotateBy, itemsTotal).clone(true));
                        /*
                         * �������� �������� (<ul>)  �� ������/������  ��������,
                         * ���������� �� ���������� ���������, ��������
                         * � ��������� rotateBy (�� ��������� ����� ���� �������)
                         */
                        if (settings.position == "v")
                            $carousel.css('top', -size * settings.rotateBy + 'px');
                        else $carousel.css('left', -size * settings.rotateBy + 'px');
                    }

                    /*
                     * �����������  ��������
                     * ������� ��������  + ������/������  ������ �������� * ���������� ������������� ��������� * �� ����������� ����������� (1 ��� -1)
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
                    // ��������� ��������
                    $carousel.animate(animate_data, {
                        queue: false,
                        duration: settings.speed,
                        complete: function() {
                            // ����� �������� ���������
                            if (!dir) { // ���� �� ������ � ���������� �������� (��� �� ���������)
                                // ������� ������� ������ ���������, ������� ������ � rotateBy
                                $carousel.children().slice(0, settings.rotateBy).remove();
                                // ������������� ����� � ����
                                if (settings.position == "v")
                                    $carousel.css('top', 0);
                                else $carousel.css('left', 0);
                            } else { // ���� ������ � ����������� ��������
                                // ������� ������� ��������� ���������, ������� ������ � rotateBy
                                $carousel.children().slice(itemsTotal, itemsTotal + settings.rotateBy).remove();
                            }
                            if (settings.auto) { // ���� �������� ������ ������������� �������������
                                // ��������� ����� ������� ����� �������� ������� (auto)
                                intID = window.setInterval(function() {
                                    slide(settings.dirAutoSlide);
                                }, settings.auto);
                            }
                            running = false; // ��������, ��� �������� ���������
                        }
                    });
                }
                return false; // ���������� false ��� ����, ����� �� ���� �������� �� ������
            }
            // ��������� ���������� �� ������� click ��� ������ "������"
            $(settings.btnNext).click(function() {
                return slide(false);
            });
            // ��������� ���������� �� ������� click ��� ������ "�����"
            $(settings.btnPrev).click(function() {
                return slide(true);
            });

            if (settings.auto) { // ���� �������� ������ ������������� �������������
                // ��������� ����� ������� ����� ��������� ��������
                intID = window.setInterval(function() {
                    slide(settings.dirAutoSlide);
                }, settings.auto);
            }
        });
    };
})(jQuery);

/*
 * ������� ������� ���� ������
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
        '������',
        '�������',
        '�����',
        '������',
        '���',
        '����',
        '����',
        '�������',
        '��������',
        '�������',
        '������',
        '�������'
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
        visible: 5, //���������� ������������ ������� 3   
        rotateBy: 1, //������������ �� 1                  
        speed: 500, //�������� 1 �������                    
        btnNext: '.totop', // ������ ������ �� ���������     
        btnPrev: '.tobottom', // ������ ����� �� ���������           
        auto: false, // ���� ��������� ��������             
        margin: 18, // ������ ����� ���������               
        position: "v", // ������������ �� �����������       
        dirAutoSlide: true //����������� ��������           
    });

    // ����� �������
    $('input[name="phone"]').mask("+7(999)999-99-99");
    $('input[name="date"]').mask("99.99.9999");
    $('input[name="time"]').mask("99:99");

    // ��������� ������������  ���� ����� �����  
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


    // ����������� �������� �����    
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

    // �������� �����������
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
        modal.find('h4').text('������ � 1 ����');
        modal.find('.price').text('����: 118 999 ���.');
        modal.find('.form4_sbmt').text('���� �������� ������!');
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
        modal.find('h4').text('������ � ������');
        modal.find('.price').text('����: 6 273�. � �����');
        modal.find('.form4_sbmt').text('���� �������� ������!');
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
        modal.find('h4').text('������������');
        modal.find('.form4_sbmt').text('��������� ������');
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


        modal.find('h4').text('�������� ������');
        modal.find('.form4_sbmt').text('��������');
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
            errors.push('�� ������� ���.');
        }
        if (!phone.match(regPhone)) {
            errors.push('������� ������ �� �����.');
        }

        if (errors.length) {
            modal.css('height', '200px').css('width', '600px');
            textModal = '<p class="text_errors">������ ������� �� �����! �������� �������� ������:</p>';
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
            // textModal = '<p class="text_order_done">���� ������ ����������! �� ������� � ���� � ��������� �����.</p>';
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
            errors.push('�� ������� ���.');
        }
        if (!phone.match(regPhone)) {
            errors.push('������� ������ �� �����.');
        }
        if (!date.match(regDate)) {
            errors.push('���� ������� �� �����.');
        }
        if (!time.match(regTime)) {
            errors.push('����� ������� �� �����.');
        }

        if (errors.length) {
            modal.css('height', '200px').css('width', '600px');
            textModal = '<p class="text_errors">������ ������� �� �����! �������� �������� ������:</p>';
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
            //textModal = '<p class="text_order_done">���� ������ ����������! �� ������� � ���� � ��������� �����.</p>';
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
            errors.push('�� ������� ���.');
        }
        if (!phone.match(regPhone)) {
            errors.push('������� ������ �� �����.');
        }

        if (errors.length) {
            // modal.css('height' , '+=200px');
            textModal = '<p class="text_errors">������ ������� �� �����! �������� �������� ������:</p>';
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
            //textModal = '<p class="text_order_done">���� ������ ����������! �� ������� � ���� � ��������� �����.</p>';
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
            errors.push('�� ������� ���.');
        }
        if (!phone.match(regPhone)) {
            errors.push('������� ������ �� �����.');
        }
        if (!date.match(regDate)) {
            errors.push('���� ������� �� �����.');
        }
        if (!time.match(regTime)) {
            errors.push('����� ������� �� �����.');
        }

        if (errors.length) {
            // modal.css('height' , '+=200px');
            textModal = '<p class="text_errors">������ ������� �� �����! �������� �������� ������:</p>';
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
            //textModal = '<p class="text_order_done">���� ������ ����������! �� ������� � ���� � ��������� �����.</p>';
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

    // �������� �����������
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

    // ���������� �����
    $('.color_box').on('click', '.button_color', function(event) {
        $(this).parent('.color_box').find('.button_color').removeClass('active');
        goodsColor = $(this).data('color');

        $(this).addClass('active');
    });



    //$('.saledate').text(getSaleDate([8,23]));

    // ������� ������ �� ������
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

    // ���������
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