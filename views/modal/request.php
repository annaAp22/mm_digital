<div class="pop_up-req pop_up-req1">
    <div class="close">
        <span>Закрыть</span>
        <i></i>
    </div>
    <div class="title">Подать заявку</div>
    <div class="tit_pre">Введите личную информацию и вскоре мы свяжемся с Вами</div>
    <form action="/ajax/index.php" class="form-ajax" method="post">
        <input type="text" name="name" placeholder="Имя" class="uv_name" required>
        <input type="text" name="phone" placeholder="Телефон" class="uv_tel" required>
        <input type="hidden" name="action" value="send">
        <input type="text" name="check" value="">
        <input type="hidden" name="time" value="">
        <button class="form_re_1">Отправить</button>
    </form>
</div>