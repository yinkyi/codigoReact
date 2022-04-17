import { Link } from 'react-router-dom';
import React from 'react';
const SideBar = (props) => {  
    console.log("Sidebar");
  const burgerClickHandler = ()=>{
    const menu = document.querySelector("#menu");
    if(menu.classList.contains('hidden')){
      menu.classList.remove('hidden');
    }else{
        menu.classList.add('hidden')
    }

  }
  return (
    <div className="md:col-span-1  col-span-2 md:flex md:justify-end">
        <nav className="text-right">
            <div className="flex justify-between items-center">
                <h1 className="font-bold uppercase p-4 text-mammoth">
                    <Link to='/' className="text-green-500 hover:text-gray-700">Yoga Movement</Link>
                </h1>
                <div className="px-4 cursor-pointer md:hidden" id="burger" onClick={burgerClickHandler}>
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </div>
            </div>
            <ul className="text-s mt-6 hidden md:block" id="menu">
                <li className="text-gray-700 font-bold py-1">
                    <Link to='/' className="px-4 flex justify-end border-r-4 border-primary">
                        <span>Home</span>
                        <svg className="h-6 w-6 ml-2" xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </Link>
                </li>
                <li className="py-1">
                    <Link to='/about-us' className="px-4 flex justify-end border-r-4 border-white">
                        <span>About</span>
                        <svg className="h-6 w-6 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </Link>
                </li>
                {props.isAuth && <li className="py-1">
                    <Link to='/class-packs' className="px-4 flex justify-end border-r-4 border-white">
                        <span>Class Packs</span>
                        <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </Link>
                </li>  }     
                          
            </ul>
        </nav>
    </div>
  );
};

export default React.memo(SideBar);
