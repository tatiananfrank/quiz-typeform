<?php
    $user_name = $_POST['user_name_input'];
    $problem = $_POST['problem'];
    $user_phone = $_POST['user_phone_input'];

    //тестовая ссылка
    //https://docs.google.com/forms/d/e/1FAIpQLScH3z9EtXj3HI745jWOIln1za3ft0NTI9-CO4dYAeXFsmU0Xw/formResponse?usp=pp_url&entry.373755400=name&entry.230686231=problem&entry.1456375919=phone

    // формируем запись в таблицу google (изменить)
    $url = "https://docs.google.com/forms/d/e/1FAIpQLScH3z9EtXj3HI745jWOIln1za3ft0NTI9-CO4dYAeXFsmU0Xw/formResponse";

    // массив данных (изменить entry, draft и fbzx)
    $post_data = array (
        "entry.373755400" => $user_name,
        "entry.230686231" => $problem,
        "entry.1456375919" => $user_phone
    );

    //dd($post_data);

    // Далее не трогать
    // с помощью CURL заносим данные в таблицу google
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    // указываем, что у нас POST запрос
    curl_setopt($ch, CURLOPT_POST, 1);
    // добавляем переменные
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
    //curl_setopt($curl,CURLOPT_POSTFIELDS,"entry.590706116=$user_data&entry.2069394411=$score_time&entry.1785670040=$right_answ&entry.337545197=$open_questions&submit=SUBMIT");
    //заполняем таблицу google
    $output = curl_exec($ch);
    curl_close($ch);
?>