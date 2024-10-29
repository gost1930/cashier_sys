import { motion } from 'framer-motion';
import shopping_bag from '../assets/images/shopping-bag.png';
import shopping_cart from '../assets/images/shopping-cart.png';
import circled from '../assets/images/circled.png';
import user from '../assets/images/user.png';
import printer from '../assets/images/printer.png';
import sinOut from '../assets/images/log-out.png';
import { Link } from 'react-router-dom';


const Home = () => {
    const btn = [
        { id: 1, title: "مبيعات", img: shopping_cart, angle: 270 , to:"/sale"},
        { id: 2, title: "مشتريات", img: shopping_bag, angle: 330 , to:"/purchase"},
        { id: 3, title: "أصناف", img: circled, angle: 150 , to:"/subgroup"},        
        { id: 4, title: "الحسابات", img: user, angle: 210 , to:"/account"},          
        { id: 5, title: "التقارير", img: printer, angle: 30 , to:"/report"},       
        { id: 6, title: "خروج", img: sinOut, angle: 90 , to:"/login"},          
    ];

    const radius = 250; 

    return (
        <section className='flex items-center justify-center w-full h-screen'>
            <div className='w-[600px] h-[600px]  rounded-full relative flex items-center justify-center'>
                
                <motion.h1
                    className="absolute top-[45%]  text-3xl font-bold text-black"
                    initial={{ opacity: 0, scale: 0.5, y: -50 }} 
                    animate={{ opacity: 1, scale: 1, y: 0 }} 
                    transition={{ duration: 1 }}
                >
                    مرحبا بك فريد
                </motion.h1>

                {btn.map(({ id, title, img, angle, to }, index) => {
                    
                    const x = radius * Math.cos((angle * Math.PI) / 180); 
                    const y = radius * Math.sin((angle * Math.PI) / 180); 

                    return (
                        <motion.div
                            key={id}
                            className={`w-1/4 h-1/4 flex items-center shadow-md hover:shadow-xl justify-center rounded-full absolute`}
                            initial={{ 
                                opacity: 0, 
                                scale: 0.5, 
                                x: 0, 
                                y: 0 
                            }} 
                            animate={{ 
                                opacity: 1, 
                                scale: 1, 
                                x: x, 
                                y: y 
                            }} 
                            transition={{ 
                                duration: 1, 
                                ease: 'easeOut', 
                                delay: index * 0.2 
                            }}
                        >
                            <Link to={to} className='w-full h-full flex flex-col items-center justify-center'>
                                <img src={img} className='w-12 h-12' />
                                <h1 className='text-xl'>{title}</h1>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default Home;