import React, { useContext, useState } from 'react';
import { CartContext } from '../../Components/CartContext/CartContext'; 
import axios from 'axios';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';
import './Basket.css';

const SERVICE_ID = 'service_dujzt2h';
const TEMPLATE_ID = 'your_template_id';
const USER_ID = 'a7z2naKT9hXPNP6h7H2iM';

const SITE_KEY = '6LfntfUpAAAAAEUiD8VT4umZToBd1PMVJttYRO5L';

const Basket = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    paymentMethod: 'При получении',
  });

  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.cartQuantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaValue) {
      alert('Пожалуйста, подтвердите, что вы не робот.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3002/orders', {
        ...formData,
        cartItems,
        totalPrice,
      });

      if (response.status === 200) {
        const emailParams = {
          from_name: formData.name,
          to_name: 'isip_m.yu.chistotin@mpt.ru',
          message: `Ваш заказ успешно оформлен.
ФИО: ${formData.name}
Адрес: ${formData.address}
Способ оплаты: ${formData.paymentMethod}
Сумма заказа: ${totalPrice} руб.
Состав заказа: ${cartItems.map(item => `${item.name} - ${item.price} руб. x ${item.cartQuantity}`).join(', ')}`
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, emailParams, USER_ID)
          .then((response) => {
            console.log('Email successfully sent!', response.status, response.text);
          })
          .catch((error) => {
            console.error('Failed to send email.', error);
          });

        clearCart();

        alert('Заказ успешно оформлен! Вам на почту пришёл чек.');
      } else {
        alert('Ошибка при оформлении заказа. Попробуйте еще раз.');
      }
    } catch (error) {
      alert('Ошибка при оформлении заказа. Попробуйте еще раз.');
    }
  };

  return (
    <motion.div 
      className="basket-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }} 
    >
      <h1>Корзина</h1>
      <form onSubmit={handleSubmit}>
        <div className="product-cards">
          {cartItems.map(item => (
            <div key={item.id} className="product-card">
              <div className="product-info">
                <h3>{item.name}</h3>
                <img src={item.url} alt={item.name} className="product-image" />
                <br></br>
                <p className="price">Цена: {item.price} руб.</p>
                <p className='count'>Количество: {item.cartQuantity}</p>
                <motion.button 
                  className="delete" 
                  type="button" 
                  onClick={() => removeFromCart(item.id)}
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.9 }}
                >
                  Удалить
                </motion.button>
              </div>
            </div>
          ))}
        </div>
        <div className="total-price"><h1>Итоговая стоимость: {totalPrice} руб.</h1></div>
  
        <div className="basket-form-container">  
          <h2>Оформление заказа</h2>
          <div>
            <label>ФИО:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Адрес:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Способ оплаты:</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              required
              className="payment-method-select"
            >
              <option value="При получении">При получении</option>
              <option value="Картой">Картой</option>
            </select>
          </div>

          <ReCAPTCHA
            className="recaptcha"
            sitekey={SITE_KEY}
            onChange={handleRecaptchaChange}
          />

          <motion.button 
            className="buy-button" 
            type="submit"
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }} 
          >
            Оформить заказ
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default Basket;
