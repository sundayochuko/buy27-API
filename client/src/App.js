import React, { useState } from 'react';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Action
import { addToCart } from './redux/actions/cartAction';

const App = () => {
    const [qty, setQty] = useState(1);

    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <div>
                    <Navbar />
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route
                            path="/shop"
                            exact
                            render={(props) => (
                                <Shop
                                    {...props}
                                    qty={qty}
                                    addToCart={addToCart}
                                />
                            )}
                        />
                        <Route
                            path="/shop/:id"
                            render={(props) => (
                                <ProductDetail
                                    {...props}
                                    qty={qty}
                                    setQty={setQty}
                                    addToCart={addToCart}
                                />
                            )}
                        />
                        <Route path="/about" component={About} />
                        <Route path="/contactUs" component={ContactUs} />
                        <Route path="/cart" component={Cart} />
                    </Switch>
                    <Footer className="fixed" />
                </div>
            </div>
        </Router>
    );
};

export default App;
