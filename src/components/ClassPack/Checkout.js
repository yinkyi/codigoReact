import useHttp from "../../hooks/use-http";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { checkPromoCode,sendOrder } from "../../lib/api";

const Checkout = () =>{
    const {sendRequest,data:promoData,error,status} =useHttp(checkPromoCode);
    const {sendRequest:orderSendRequest,data:orderData,error:orderError,status:orderStatus} =useHttp(sendOrder);
    const token = useSelector(state=>state.auth.token);
    const history = useHistory();
    const selected_pack = useSelector(state=>state.classpack.selected_pack);
    const [subtotal, setSubtotal] = useState(0);
    const [GST, setGST] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const promoRefInput = useRef('');
    const [done, setDone] = useState(0);
    const [orderFinish, setOrderFinish] = useState(0);

    if(!selected_pack){
         history.replace('/class-packs');
    }
    const orderClickHandler = (event) =>{
        event.preventDefault();
        setOrderFinish(0);
        orderSendRequest({
            "pack_id":selected_pack.pack_id,
            "discount_amount":discount,
            apiToken:token
        })
    }
    const promoCheckHandler = (event)=>{
        setDone(0);
        event.preventDefault();
        let promoCode = promoRefInput.current.value;
        if(promoCode !== ""){
            sendRequest({
                apiToken:token,
                pack_id:selected_pack.pack_id,
                promo_code:promoCode
            })
        }else{
            calInitialAmount();
            setDone(1);
        }
        
        return true;
    }
   

    const calInitialAmount=()=>{
        const subtotal_amount = selected_pack.pack_price;
        const GST_amount = (selected_pack.pack_price * 7 / 100);
        const grandTotal_amount = subtotal_amount + GST_amount;        
        setSubtotal(subtotal_amount.toFixed(2));
        setGrandTotal(grandTotal_amount.toFixed(2));
        setGST(GST_amount.toFixed(2));
        setDiscount(0);
    }
 
    useEffect(()=>{
        calInitialAmount();
    },[]);
    let promo_error = '';
    if(error){
        promo_error = <p className="text-red-500">Promo code does not match!</p>
    }
    if(status==="completed" && promoData && done===0){
        const discounted_price = selected_pack.pack_price * promoData.discount / 100;
        const subtotal_amount = selected_pack.pack_price - discounted_price;
        const GST_amount = selected_pack.pack_price * 7 / 100;
        const grandTotal_amount = subtotal_amount + GST_amount;
        setDiscount(discounted_price.toFixed(2));
        setSubtotal(subtotal_amount.toFixed(2));
        setGrandTotal(grandTotal_amount.toFixed(2));
        setGST(GST_amount.toFixed(2));
        setDone(1);
    }else if(status==="completed" && !promoData && done===0) {
        calInitialAmount();
        setDone(1);
    }
    if(orderStatus==="completed" && orderFinish === 0){
        setOrderFinish(1);        
    }
    let header_text = orderFinish? <p>Thank You! <br/>You have successfully purchase a class pack!</p>:`Class Pack Purchase Review`;
    return (       
        <div className="my-2">
        <header className="px-2">        
            <h4 className="text-gray-500 px-2 py-2 uppercase">{header_text}</h4>
        </header>
        <div className="py-2 mx-2">
            <div className="w-full mx-2 bg-white shadow-lg rounded-lg">
                <div className="md:flex ">
                    <div className="w-full p-4 px-2 py-5">
                        <div className="flex flex-row">
                            <h2 className="text-1xl font-semibold">You have selected:</h2>
                        </div>    
                        <div className="grid grid-cols-2 gap-2">
                             <div className="flex rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm">
                                <div className="border-4 border-slate-100 border-double
                                        bg-cyan-600 flex items-center justify-center text-indigo-100 rounded-full w-10 h-10 ">
                                         {selected_pack.total_credit === 1 ? 'S' :(selected_pack.total_credit === 0 ? 'U' : selected_pack.total_credit) }
                                 </div>
                                 <div className="flex-1 py-auto px-2  font-bold text-xs">
                                    <span className="text-cyan-500">{selected_pack.pack_name}</span>
                                    <p className="text-neutral-300">{selected_pack.newbie_note}</p>
                                  </div>
                            </div> 
                             <div className="relative rounded h-10 w-full focus:outline-none focus:border-green-200  mt-2 text-sm m-auto">
                                <div className="absolute right-0 font-bold text-lg">${selected_pack.pack_price}</div>
                             </div>
                        </div>
                        {!orderFinish && 
                            <div className="grid md:grid-cols-2 md:gap-2 mt-2">
                                <div className="form-control">
                                    <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                                        <input type="text" className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border h-10 border-grey-light rounded rounded-r-none px-3 relative" placeholder="Promo Code"  ref={promoRefInput}/>
                                        <div className="flex -mr-px">
                                            <button type="button" onClick={promoCheckHandler} className="bg-cyan-500 text-white text-sm px-6">Apply</button>
                                        </div>	
                                    </div>	
                                    {promo_error}
                                </div>
                            </div> 
                        }
                        
                        <hr className="my-4"/>
                        <div className="grid grid-cols-2 gap-2">
                             <div className="flex rounded h-6 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm">                                
                                    <span className="text-neutral-500 text-xs">SubTotal</span>
                            </div> 
                             <div className="relative rounded h-6 w-full focus:outline-none focus:border-green-200  mt-2 text-sm m-auto">
                                <div className="absolute right-0 font-bold text-lg">${subtotal}</div>
                             </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                             <div className="flex rounded h-6 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm">                                
                                    <span className="text-neutral-500 text-xs">GST</span>
                            </div> 
                             <div className="relative rounded h-6 w-full focus:outline-none focus:border-green-200  mt-2 text-sm m-auto">
                                <div className="absolute right-0 font-bold text-lg">${GST}</div>
                             </div>
                        </div>
       
                        {discount > 0 &&
                             <div className="grid grid-cols-2 gap-2">
                             <div className="flex rounded h-6 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm">                                
                                    <span className="text-neutral-500 text-xs font-bold">Discount</span>
                            </div> 
                             <div className="relative rounded h-6 w-full focus:outline-none focus:border-green-200  mt-2 text-sm m-auto">
                                <div className="absolute right-0 font-bold text-lg">${discount}</div>
                             </div>
                        </div>
                        }
                       
                        <div className="grid grid-cols-2 gap-2">
                             <div className="flex rounded h-6 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm">                                
                                    <span className="text-neutral-500 text-xs">Grand Total</span>
                            </div> 
                             <div className="relative rounded h-6 w-full focus:outline-none focus:border-green-200  mt-2 text-sm m-auto">
                                <div className="absolute right-0 font-bold text-lg">${grandTotal}</div>
                             </div>
                        </div>
                    </div>
                   
                </div>                
            </div>            
        </div>
        <footer className="px-4 mb-10">
            <p className="text-xs ">Please read all <span className="text-cyan-500">Term & Condition</span> before purchasing your YM class or Class Pack.</p>
            <div className="grid grid-cols-2 gap-2">
                    <div>
                        <Link to="/class-packs">
                            <button className="hover:bg-gray-400 hover:text-white text-cyan-500 text-sm  py-2 rounded inline-flex items-center">
                            <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                            <span className="mx-2">BACK</span>
                            </button>
                        </Link>
                    </div> 
                 <div className="relative w-full  my-2 text-sm m-auto">
                     {!orderFinish && <button type="button" onClick={orderClickHandler} className="absolute right-0 bg-cyan-500 hover:bg-cyan-700 text-white text-sm py-2 px-7 rounded-full">
                      PAY NOW
                    </button>}
                     
                 </div>
            </div>
        </footer>
        </div>
    
    )
}

export default Checkout;