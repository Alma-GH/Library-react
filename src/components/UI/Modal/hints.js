import clsHint from "../../../style/UI/Modal/Hint.module.scss";

export const hints = [
  {body:"Здесь вы можете переключаться между страницами приложения", style: [clsHint.hint, clsHint.hint1].join(" ")},
  {body:"Кнопки для смены темы, настроек пользователя, выхода из аккаунта", style: [clsHint.hint, clsHint.hint2].join(" ")},
  {body:"Здесь находится фильтр для поиска, сделайте изменения для более точного запроса", style: [clsHint.hint, clsHint.hint3].join(" ")},
  {body:"Ввод названия для поиска, упорядочивание элементов на странице, пагинация", style: [clsHint.hint, clsHint.hint4].join(" ")},
  {body:
      <>
        Делайте изменеия в своей библиотеке под себя.
        <br/>Нажмите на 'карандаш' чтобы появилась возможность открыть меню
        <br/>(ЛКМ - перетащить, ПКМ - открыть меню)
      </>,
    style: [clsHint.hint, clsHint.hint5].join(" ")},
  {body:"На этой странице вы можете создавать списки для своих книг", style: [clsHint.hint, clsHint.hint6].join(" ")},
]