import React from "react";
import './Footer.css';

const Footer = () => {
    return (
        <div className="Footer">
            <div className="sb_footer section_padding">
                <div className="sb_footer-links">
                    <div className="sb_footer-links_div">
                        <h4>Компания</h4>
                        <a href="https://www.dns-shop.ru/about">
                            <p>О нас</p>
                        </a>
                        <a href="https://www.dns-shop.ru/about/partners">
                            <p>Партнерам</p>
                        </a>
                        <a href="https://www.dns-shop.ru/about/career">
                            <p>Вакансии</p>
                        </a>
                    </div>
                    <div className="sb_footer-links_div">
                        <h4>Покупателям</h4>
                        <a href="https://www.dns-shop.ru/help/useful-information/8145d90b-1c3a-44c4-84b9-bb3f54aa783a/">
                            <p>Как оформить заказ</p>
                        </a>
                        <a href="https://www.dns-shop.ru/help/useful-information/f112d810-a586-4c60-b651-8d328fe0e0e7/">
                            <p>Способы оплаты</p>
                        </a>
                        <a href="https://www.dns-shop.ru/credit/">
                            <p>Кредиты</p>
                        </a>
                    </div>
                    <div className="sb_footer-links_div">
                        <h4>Остальное</h4>
                        <a href="https://www.dns-shop.ru/help/legal-entities/">
                            <p>Юридическим лицам</p>
                        </a>
                        <a href="https://www.dns-shop.ru/help/check/">
                            <p>Проверка счета</p>
                        </a>
                        <a href="https://www.dns-shop.ru/help/legal-entities/#corporate-shops-list">
                            <p>Корпоративные отделы</p>
                        </a>
                    </div>
                    <div className="sb_footer-links_div">
                        <h4>Оставайтесь на связи</h4>
                        <h4>8-800-77-07-999 (c 03:00 до 22:00)</h4>
                        <a href="https://www.dns-shop.ru/shops/moscow/">
                            <p>Адреса магазинов в г. Москва</p>
                        </a>
                    </div>

                    <hr></hr>

                    <div className="sb_footer-below">
                        <div className="sb_footer-copyright">
                            <p>
                              © 2002–2024 Компания DNS. Администрация Сайта не несет ответственности за размещаемые Пользователями материалы (в т.ч. информацию и изображения), их содержание и качество.
                            </p>
                        </div>
                        <div className="sb_footer-below-links">
                            <a href="terms"><div><p></p></div></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
