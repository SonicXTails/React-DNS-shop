import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import ProductCard from '../../Components/ProductCard/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [setItems] = useState([]); 
  const [setTotalPrice] = useState(0); 

  const addToCart = (product) => {
    setItems(prevItems => [...prevItems, product]);
    setTotalPrice(prevPrice => prevPrice + product.price);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Имя обязательно';
    if (!email) newErrors.email = 'Email обязателен';
    if (!message) newErrors.message = 'Сообщение обязательно';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
  
    axios.post('http://localhost:3003/home', { name, email, message })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Failed to send message.', error);
      });
  };

  const fetchProducts = () => {
    axios.get('http://localhost:3001/media')
      .then(res => {
        const randomProducts = res.data.sort(() => 0.5 - Math.random()).slice(0, 10); // Getting 10 random products
        setProducts(randomProducts);
      })
      .catch(err => console.log(err));
  };

  const handleFavoriteChange = (id, isFavorite) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, isFavorite } : product
      )
    );
  };

  return (
    <div className="home-container">
      <h2 className="product-heading">Товары дня</h2>
      <div className="product-cards-container">
        {products.map(product => (
          <ProductCard key={product.id} data={product} onFavoriteChange={handleFavoriteChange} onAddToCart={addToCart} />
        ))}
      </div>

      <div className="intro">
        <h1>DNS – один из лидеров рынка по продаже цифровой и бытовой техники в России</h1>
        <p>Наша цель изменить жизнь людей, сделав простым доступ к огромному количеству качественных и недорогих товаров, предоставляя лучший сервис.</p>
      </div>
      <div className="history">
        <h2>Наша история</h2>
        <div className="history-carousel">
          <div className="history-item">
            <strong>1998 г.</strong>
            <p>Открытие 1 магазина в г. Владивосток</p>
          </div>
          <div className="history-item">
            <strong>2006 г.</strong>
            <p>Запуск собственного производства</p>
          </div>
          <div className="history-item">
            <strong>2007 г.</strong>
            <p>Выход на рынок Дальнего востока и Восточной Сибири</p>
          </div>
          <div className="history-item">
            <strong>2009 г.</strong>
            <p>Экспансия на рынок РФ</p>
          </div>
          <div className="history-item">
            <strong>2011 г.</strong>
            <p>Запуск интернет-дискаунтера “DNS Технопоинт”</p>
          </div>
          <div className="history-item">
            <strong>2014 г.</strong>
            <p>Открытие магазинов в Крыму и Санкт-Петербурге</p>
          </div>
          <div className="history-item">
            <strong>2016 г.</strong>
            <p>Открытие магазина в Калининграде</p>
          </div>
          <div className="history-item">
            <strong>2019 г.</strong>
            <p>Открытие сети продуктовых магазинов “Квартет Вкусов”</p>
          </div>
          <div className="history-item">
            <strong>2020 г.</strong>
            <p>Крупнейший в России продавец бытовой техники и электроники</p>
          </div>
          <div className="history-item">
            <strong>2021 г.</strong>
            <p>Выход на рынок Казахстана</p>
          </div>
        </div>
      </div>
      <div className="today-section">
        <h2>DNS сегодня</h2>
        <br></br>
        <div className="statistics-container">
          <div className="statistic-item">
            <strong>2689</strong>
            <p>Магазинов по всей России</p>
          </div>
          <div className="statistic-item">
            <strong>38059</strong>
            <p>Сотрудников в штате</p>
          </div>
          <div className="statistic-item">
            <strong>1221</strong>
            <p>Городов с магазинами DNS</p>
          </div>
        </div>
      </div>
      <div className="cards-container">
        <div className="clients">
          <div className="card">
            <h2>Для клиентов</h2>
            <p>Наши клиенты – в центре всего, что мы делаем,</p>
            <p>Доверие - главное. Мы строим долгосрочные отношения,</p>
            <p>Во всём, чем занимаемся, стремимся быть экспертами</p>
          </div>
        </div>
        <div className="partners">
          <div className="card">
            <h2>Для партнёров</h2>
            <p>Прозрачность - основа совместного бизнеса,</p>
            <p>Работаем, соблюдая этику бизнеса,</p>
            <p>Уважаем другие мнения и интересы,</p>
            <p>Выполняем обязательства и берем ответственность за свои решения,</p>
          </div>
        </div>
        <div className="employees">
          <div className="card">
            <h2>Для сотрудников</h2>
            <p>DNS - территория личной и коллективной самореализации,</p>
            <p>Мы - одна команда,</p>
            <p>Уважаем мнение и интересы людей,</p>
            <p>Ценим свободу, смелость и ответственность.</p>
          </div>
        </div>
      </div>

      <div className="feedback-form">
        <h2>Форма обратной связи</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-group">Имя:</label>
            <input 
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="form-group-input"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="message">Сообщение:</label>
            <textarea
              id="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            ></textarea>
            {errors.message && <span className="error">{errors.message}</span>}
          </div>
          <button type="submit">Отправить</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
