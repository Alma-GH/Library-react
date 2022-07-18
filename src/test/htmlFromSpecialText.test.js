import {htmlFromSpecialText} from "../tools/utils/func.js";



console.log(htmlFromSpecialText(
  `/
/(big) Большой текст / /(small) Маленький текст/
/(header) Заголовок(в центре) /
/(red) красный текст/ /(blue) синий текст/ ... /(#30D5C8) бирюзовый текст/

/(bold) Жирный шрифт[b]/ /(italic) Курсив[i]/ /(inserted) Подчеркнутый текст[ins]/

/(header) /(big) /(blue)  some options ///`
))