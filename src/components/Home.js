import React from 'react';
import '../style/home.css';
import HomeProduct from './HomeProduct';
import {Helmet} from "react-helmet";

function Home() {
    return (
        <div className="home">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Amazon- Online Shopping</title>
            </Helmet>
            <div className="homeContainer">
                <div className="maskImage">
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/HeroDec-20/Dec_AuCC_Seasonal_1X._CB414979991_.jpg" alt="homepage" className="imageContainer"/>
                </div>
                <div className="ProductLine">
                    <HomeProduct image="https://images-na.ssl-images-amazon.com/images/I/71dGb%2B7qhQL._SL1500_.jpg" title="Samsung 24inch Curved monitor with AMD Freesync, 144hz refresh rate and Full HD resolution (1920x1080 pixels) with HDMI cable" price="13,999" rating={5}/>
                    <HomeProduct image="https://images-na.ssl-images-amazon.com/images/I/81pzsRpE5GL._SL1500_.jpg" title="Redmi Note 9 Pro (Aurora Blue, 4GB RAM, 64GB Storage) - Latest 8nm Snapdragon 720G & Alexa Hands-Free | Upto 6 Months No Cost EMI" price="12,999" rating={4}/>
                </div>
                <div className="ProductLine">
                    <HomeProduct image="https://images-na.ssl-images-amazon.com/images/I/A1A2yQlAXCL._SL1500_.jpg" title="ASUS TUF Gaming A15 Laptop 15.6'' FHD 144Hz Ryzen 9 4900H, GTX 1660Ti 6GB Graphics (16GB RAM/1TB HDD + 256GB NVMe SSD/Windows 10/Bonfire Black/2.30 Kg), FA506IU-HN233T" price="96,990" rating={4}/>
                    <HomeProduct image="https://images-na.ssl-images-amazon.com/images/I/81Wg%2By7rXoL._SL1500_.jpg" title="Amazon Brand - Solimo 10 Metre 100 LED Copper String Light for Decoration, Battery Powered, Warm White" price="699" rating={3}/>
                    <HomeProduct image="https://images-na.ssl-images-amazon.com/images/I/81ER8Nueb3L._SL1500_.jpg" title="BMB Technology Inverter Welding Machine Arc-200 Amps. With All Accessories - Yellow/Orange" price="4,499" rating={4}/>               
                </div>
                <div className="ProductLine">
                    <div className="ProductLine2">
                        <HomeProduct image="https://images-na.ssl-images-amazon.com/images/I/71lgvsT9SqL._SL1500_.jpg" title="Lenovo ThinkVision 34 inch VA Panel, Ultrawide Curved Monitor, 3440X1440 WQHD Resolution I Height Adjustment and Pivot I USB-C, USB 3.1, HDMI 2.0, DisplayPort 1.2, Headphone/mic Combo connectivity I" price="59,000" rating={5}/>
                    </div>
                    <div className="ProductLine1">
                        <HomeProduct image="https://images-na.ssl-images-amazon.com/images/I/71ynIMjwgwL._SL1500_.jpg" title="JBL T460BT Extra Bass Wireless On-Ear Headphones with 11 Hours Playtime & Mic (Black)" price="2,599" rating={4}/>
                    </div>
                </div>
                <div className="ProductLine">
                    <HomeProduct image="https://images-na.ssl-images-amazon.com/images/I/71S9dis6PRL._SL1500_.jpg" title="LG Ultragear 86.6 cm (34-inch) G-Sync Compatible Curved Ultrawide, 1ms, 144Hz, HDR 10, IPS Gaming Monitor with Height Adjust Stand, HDMI x 2, Display Port - 34GL750-B (Black)" price="34,999" rating={5}/>
                </div>
            </div>
        </div>
    )
}

export default Home;
