import React, { useEffect, useState } from 'react';
import './firsthome.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import img1 from '../images/QCSlogo.JPG';
import img2 from '../images/cream1.png';
import img3 from '../images/Caffemochaoriginal.jpg';
import img4 from '../images/caramelmacchiatooriginal.jpg';
import img5 from '../images/creamycoffee.jpg';
import img6 from '../images/vanillahazelnutlatteoriginal.jpg';
import img7 from '../images/shawarma-removebg-preview.png';
import img8 from '../images/burger-removebg-preview.png';
import img9 from '../images/frappuandcappu-removebg-preview.png';
import img10 from '../images/adult-barista-beverage-cafe-373639.jpg';
import img11 from '../images/author.png';
import img12 from '../images/someonedrinkingcoffee.jpg';



function Firsthome() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Handle registration
    const handleRegister = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/register', { name, email, password })
            .then(result => {
                console.log(result);
                navigate('/home');
            })
            .catch(err => console.log(err));
    };

    // Handle login
    const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { email, password })
        .then(result => {
            console.log(result);
            if (result.data === 'Success') {
                // Assuming the API returns user data including the name
                localStorage.setItem('username', result.data.username); // Save username in localStorage
                navigate('/home'); // Navigate to the home page
            }
        })
        .catch(err => console.log(err));
};

    useEffect(() => {
        const wrapper = document.querySelector('.wrapper');
        const loginLink = document.querySelector('.login-link');
        const registerLink = document.querySelector('.register-link');
        const btnPopup = document.querySelector('.login-popup');
        const iconClose = document.querySelector('.icon-close');
        const body = document.querySelector('body');

        // Create backdrop for blurring the background
        const backdrop = document.createElement('div');
        backdrop.classList.add('backdrop');
        document.body.appendChild(backdrop);

        registerLink.addEventListener('click', () => {
            wrapper.classList.add('active');
        });

        loginLink.addEventListener('click', () => {
            wrapper.classList.remove('active');
        });

        btnPopup.addEventListener('click', () => {
            wrapper.classList.add('active-popup');
            backdrop.classList.add('active-backdrop');
            body.classList.add('popup-active');
        });

        iconClose.addEventListener('click', () => {
            wrapper.classList.remove('active-popup');
            backdrop.classList.remove('active-backdrop');
            body.classList.remove('popup-active');
        });

        // Cleanup on component unmount
        return () => {
            registerLink.removeEventListener('click', () => {
                wrapper.classList.add('active');
            });
            loginLink.removeEventListener('click', () => {
                wrapper.classList.remove('active');
            });
            btnPopup.removeEventListener('click', () => {
                wrapper.classList.add('active-popup');
            });
            iconClose.removeEventListener('click', () => {
                wrapper.classList.remove('active-popup');
            });
            document.body.removeChild(backdrop);
        };
    }, []);

    return (
        <div>
            <header>
                <div className="container-fluid p-0">
                    <nav className="navbar navbar-expand-lg">
                        <a className="navbar-brand" href="#">
                            <img src={img1} alt="QCS Logo"  style={{ width:"10%" }}/> QCS
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
                                    <a className="nav-link" href="#">Menu <span className="sr-only">(current)</span></a>
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
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Contact</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link login-popup" href="#">Login</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

                {/* Wrapper for the Popup */}
                <div className="wrapper">
                    <span className="icon-close">
                        <ion-icon name="close"></ion-icon>
                    </span>

                    {/* Login Form */}
                    <div className="form-box login">
                        <h2>Login</h2>
                        <form onSubmit={handleLogin}>
                            <div className="input-box">
                                <span className="icon">
                                    <ion-icon name="mail"></ion-icon>
                                </span>
                                <input
                                    type="email"
                                    autoComplete="off"
                                    name="email"
                                    className="form-control rounde-0"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label>Email</label>
                            </div>
                            <div className="input-box">
                                <span className="icon">
                                    <ion-icon name="lock-closed"></ion-icon>
                                </span>
                                <input
                                    type="password"
                                    autoComplete="off"
                                    name="password"
                                    className="form-control"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label>Password</label>
                            </div>
                            <div className="remember-forgot">
                                <label><input type="checkbox" /> Remember me</label>
                                <a href="#">Forgot Password</a>
                            </div>
                            <button type="submit" className="betn">Login</button>
                            <div className="login-register">
                                <p>Don't have an account? <a href="#" className="register-link">Register</a></p>
                            </div>
                        </form>
                    </div>

                    {/* Register Form */}
                    <div className="form-box register">
                        <h2>Register</h2>
                        <form onSubmit={handleRegister}>
                            <div className="input-box">
                                <span className="icon">
                                    <ion-icon name="person"></ion-icon>
                                </span>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    name="name"
                                    className="form-control rounde-0"
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="input-box">
                                <span className="icon">
                                    <ion-icon name="mail"></ion-icon>
                                </span>
                                <input
                                    type="email"
                                    autoComplete="off"
                                    name="email"
                                    className="form-control rounde-0"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label>Email</label>
                            </div>
                            <div className="input-box">
                                <span className="icon">
                                    <ion-icon name="lock-closed"></ion-icon>
                                </span>
                                <input
                                    type="password"
                                    autoComplete="off"
                                    name="password"
                                    className="form-control rounde-0"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label>Password</label>
                            </div>
                            <div className="remember-forgot">
                                <label><input type="checkbox" /> I agree to terms and conditions</label>
                            </div>
                            <button type="submit" className="betn">Register</button>
                            <div className="login-register">
                                <p>Already have an account? <a href="#" className="login-link">Login</a></p>
                            </div>
                        </form>
                    </div>
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

      <main>
        <section className="section-1">
          <div className="container text-center">
            <h1 className="text-dark">Our Sensational Coffees</h1>
            <p className="text-secondary">"You can't buy happiness <br />but you can buy coffees that's pretty close"</p>
          </div>
          <div className="team row">
            <div className="col-md-4 col-12 text-center">
              <div className="card mr-2 d-inline-block shadow-lg">
                <div className="card-img-top">
                  <img src={img3} alt="Caffe Mocha" className="img-fluid" />
                </div>
                <div className="card-body">
                  <h3 className="card-title">Caffe Mocha</h3>
                  <p className="card-text"></p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              {/* Carousel started */}
              <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active text-center">
                    {/* Card 2 */}
                    <div className="card mr-2 d-inline-block shadow-lg">
                      <div className="card-img-top">
                        <img src={img4} alt="Caramel Macchiato" className="img-fluid" />
                      </div>
                      <div className="card-body">
                        <h3 className="card-title">Caramel Macchiato</h3>
                        <p className="card-text"></p>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item text-center">
                    {/* Card 3 */}
                    <div className="card mr-2 d-inline-block shadow-lg">
                      <div className="card-img-top">
                        <img src={img5} alt="Creamy Coffee" className="img-fluid" />
                      </div>
                      <div className="card-body">
                        <h3 className="card-title">Creamy Coffee</h3>
                        <p className="card-text"></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12 text-center">
              <div className="card mr-2 d-inline-block shadow-lg">
                <div className="card-img-top">
                  <img src={img6} alt="Vanilla Hazelnut Latte" className="img-fluid good" />
                </div>
                <div className="card-body">
                  <h3 className="card-title">Vanilla Hazelnut Latte</h3>
                  <p className="card-text"></p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="section-3">
          <div className="container text-center">
            <div className="row">
              <div className="col-md-6 first col-sm-12">
                <h2 className="summer">Summer Menu</h2>
                <h2 className="coldb">"COLD BREW"</h2>
                <h5 id="pcoffee">--COFFEE--</h5>
                <h5 id="pcappuccino">--CAPPUCCINO--</h5>
                <h5 id="pfrapuccino">--FRAPUCCINO--</h5>
                <p>Super smooth % now deliciously <span>creamy</span> too</p>
                <button>Check Now</button>
              </div>
              <div className="col-md-6 col-sm-12 second">
                <img src={img9} alt="Summer Menu Drinks" className="img-fluid" />
              </div>
            </div>
          </div>
        </section>

        <section className="section-4">
          <div className="container text-center">
            <h2 className="hot">HOT</h2>
            <h2 className="burger">BURGER & ROLL</h2>
            <h2 className="cool"><span>COOL</span> PRICE</h2>
            <div className="row">
              <div className="col-md-6 shawarma h-20">
                <img src={img7} alt="Shawarma" />
              </div>
              <div className="col-md-6 burger h-20">
                <img src={img8} alt="Burger" />
              </div>
            </div>
          </div>
        </section>

        <section className="section-5 container-fluid">
          <div className="cover" style={{backgroundImage: `url(${img12})`}}>
            <div className="content text-center">
              <h3>--Testimonial--</h3>
              <p>The best way to start your morning is knowing you have <br />another cup of coffee to enjoy</p>
              <h5>- Imam Muhyl</h5>
            </div>
          </div>
        </section>

        <section className="section-6">
          <h3 className="text-center"><b>--Opportunity--</b></h3>
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="pray">
                  <img src={img10} alt="Barista" />
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="panel">
                  <p>To be more than an employee,<br />To be a Partner,<br />Explore our platform,<br />be part of the Qosim's Family</p>
                  <button>Join us today</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-7">
          <div className="team row">
            <div className="col-md-6 col-sm-12 foldy text-center">
              <img src={img11} alt="Qosim Ibrahim" className="img-fluid" />
              <h3 className="card-title">Qosim Ibrahim</h3>
              <p className="first-text text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus dignissimos quasi laudantium assumenda suscipit sunt expedita voluptate dolor fugit cum tempore similique, aspernatur rerum, autem est, iure error earum non?
              </p>
              <a href="#" className="text-secondary text-decoration-none">Go Somewhere</a>
              <p className="text-black-50">CEO at QCS</p>
            </div>
            <div className="col-md-6 col-sm-12">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.843697343551!2d3.388483014751081!3d6.541413324769685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8d1215e0de15%3A0x5e9b257d6b0e5e57!2sAdemolu%20St%2C%20Somolu%2C%20Lagos!5e0!3m2!1sen!2sng!4v1580145503794!5m2!1sen!2sng" 
                width="500" 
                height="500" 
                frameBorder="0" 
                style={{ border: 0 }} 
                allowFullScreen 
              />
            </div>
          </div>
        </section>
      </main>

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

export default Firsthome;
