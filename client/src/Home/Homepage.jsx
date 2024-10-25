import React from 'react';
import './homepage.css';
import { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import imgq1 from '../images/QCSlogo.JPG';
import img1 from '../images/beverage.jpg';
import img2 from '../images/cream1.png';
import img3 from '../images/Caffemochaoriginal.jpg';
import img4 from '../images/caramelmacchiatooriginal.jpg';
import img5 from '../images/creamycoffee.jpg';
import img6 from '../images/vanillahazelnutlatteoriginal.jpg';
import img7 from '../images/shawarma-removebg-preview.png';
import img8 from '../images/burger-removebg-preview.png';
import img9 from '../images/frappuandcappu-removebg-preview.png';


const orders = [
  { id: 0, image: img1, title: 'Beverage', price: 20 },
  { id: 1, image: img2, title: 'Cream', price: 20 },
  { id: 2, image: img3, title: 'Caffe mocha', price: 20 },
  { id: 3, image: img4, title: 'Caramel Macchiato', price: 20 },
  { id: 4, image: img5, title: 'Creamy Coffee', price: 20 },
  { id: 5, image: img6, title: 'Vanilla Hazelnut Latte', price: 20 },
  { id: 6, image: img7, title: 'Shawarma', price: 20 },
  { id: 7, image: img8, title: 'Burger', price: 20 },
  { id: 8, image: img9, title: 'Frappu and Cappu', price: 20 },
];

const Homepage = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const ordersRef = useRef(null);

  const addToCart = (index) => {
    const selectedOrder = orders[index];
    const existingOrderIndex = cart.findIndex(item => item.id === selectedOrder.id);

    if (existingOrderIndex !== -1) {
      // If the product is already in the cart, increase the quantity
      const newCart = [...cart];
      newCart[existingOrderIndex].quantity += 1; // Increase quantity
      setCart(newCart);
    } else {
      // Add new product to cart with quantity 1
      setCart([...cart, { ...selectedOrder, quantity: 1 }]);
    }
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleLogin = (name) => {
    setUser(name); // Set the user name when they log in
    setUsername('');
  };
  
  const handleLogout = () => {
    setUser(null); // Clear user state
    window.location.href = '/#'; // Navigate to firsthome page
  };
  

  const totalPrice = cart.reduce((acc, order) => acc + order.price * order.quantity, 0);
    

  const handleCheckout = () => {
    // Redirect to payment platform (placeholder URL)
    window.location.href = 'https://your-payment-platform.com';
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.length > 0) {
      const filtered = orders.filter(order =>
        order.title.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders([]);
    }
  };

  const handleSearchClick = () => {
    if (ordersRef.current) {
      ordersRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelect = (title) => {
    setSearchTerm(title);       // Set the selected title as the search term
    setFilteredOrders([]);       // Clear the autocomplete suggestions
  };
  

  return (
    <div>
        <header>
            <div className="container-fluid p-0">
                <nav className="navbar navbar-expand-lg">
                    <a className="navbar-brand" href="#">
                        <img src={imgq1} alt="QCS Logo"  style={{ width:"10%" }}/> QCS
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fa fa-align-right text-light"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="#Menu">Menu <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">WC</a>
                            </li>
                            <li className="nav-item dropdown">
                                <div className="dropdown">
                                    <a href="#" className="nav-link">Event</a>
                                    <div className="dropdown-content">
                                        <a href="#">Today's Event</a>
                                        <a href="#">Tomorrow's Event</a>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item"><span className='nav-link'>Welcome, {user}!</span>                            
                            </li>
                            <li className="nav-item">
                                <a onClick={handleLogout} className="nav-link login-popup" href='#'>Logout</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
    <div className="container text-center">
      <div className="row">
        <div className="col-md-4 col-sm-12 pitword pistachio">
          <h1>new<br />pistachio<br />bon bon<br />cream</h1>
        </div>
        <div className="col-md-4 col-sm-12 h-20 pitmage">
          <img src={img2} alt="Cream" />
        </div>
        <div className="col-md-4 col-sm-12 pitword cheesecake">
          <h1>cheesecake<br />milkshake<br />frappucino<br />cream</h1>
        </div>
      </div>
    </div>
  </header>
    
    {/* My Cart code */}
    <div className="cartheader">
        <p className="orderlist" id='Menu'>Select Order</p>
        <div className='search' style={{ display:'flex', flex:'space-between'}} >
          <input type="text" placeholder='Search' className='searchinput' value={searchTerm} onChange={handleSearch} style={{ marginRight:'2%'}}/>
          <button className='searchbtn' onClick={handleSearchClick}>Search</button>
          </div>
          {/* Autocomplete Suggestions */}
        {filteredOrders.length > 0 && (
          <div className="autocomplete">
            {filteredOrders.map((order) => (
              <div key={order.id} className="autocomplete-item" onClick={() => handleSelect(order.title)}>
                {order.title}
              </div>
            ))}
          </div>
        )}
        <div className="cart">
          {/* <i className="fa-solid fa-cart-shopping"></i> */}
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"/>
                </svg>
          <p id="count">{cart.length}</p>
        </div>
      </div>

      {/* Main Container */}
      <div className="ctainer" ref={ordersRef}>
        <div id="rooti">
          {orders.map((order, index) => (
            <div className="boxi" key={order.id}>
              <div className="img-boxi">
                <img className="images" src={order.image} alt={order.title} />
              </div>
              <div className="bottomi">
                <p>{order.title}</p>
                <h2>$ {order.price}.00</h2>
                <button onClick={() => addToCart(index)}>Add to cart</button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar (Cart) */}
        <div className="sidebarr">
          <div className="headi">
            <p>My Cart</p>
          </div>
          <div id="cartItemi">
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              cart.map((item, index) => (
                <div className="cart-itemi" key={index}>
                  <div className="row-imgi">
                    <img className="rowimgi" src={item.image} alt={item.title} />
                  </div>
                  <p style={{ fontSize: '12px' }}>{item.title}</p>
                  <h2 style={{ fontSize: '15px' }}>$ {item.price}.00</h2>
                  <p>Quantity: {item.quantity}</p> {/* Display quantity */}
                  <i className="fa-solid fa-trash" onClick={() => removeFromCart(index)}></i>
                </div>
              ))
            )}
          </div>
          <div className="footi">
            <h3>Total</h3>
            <h2 id="total">$ {totalPrice}.00</h2>
            {cart.length > 0 && (
              <button className="checkout-button" onClick={handleCheckout}>
                Checkout
              </button>
            )}
          </div>
        </div>
      </div>



  <footer>
    <div className="container-fluid p-0">
      <div className="row text-left">
        <div className="col-md-5 col-sm-12">
          <h1 className="text-light">About Us</h1>
          <p className="text-muted">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex odio delectus nihil neque atque soluta deserunt quisquam fuga quasi eos cupiditate animi exercitationem perferendis pariatur esse, est cumque. Ipsum, deserunt.
          </p>
          <p className="pt-4 text-muted">
            Copyright (c) 2024 All right reserved | This template is made with by <span>Daily Tuition</span>
          </p>
        </div>
        <div className="col-md-5">
          <h4 className="text-light">Newsletter</h4>
          <p className="text-muted">Stay Updated</p>
          <form className="form-inline" action="">
            <div className="input-group pr-5">
              <input type="text" className="form-control bg-dark text-white" placeholder="Email" />
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-2 col-sm-12">
          <h4 className="text-light">Follow Us</h4>
          <p className="text-muted">Let us be Social</p>
          <div className="column">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-youtube"></i>
          </div>
        </div>
      </div>
    </div>
  </footer>
</div>
);
}

export default Homepage;
