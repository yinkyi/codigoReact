import { Link,useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { packSliceActions } from "../../store/pack-slice";
const ClassPackList = (props) => {
    const dispatch = useDispatch();
    const history =useHistory();
    const beforeCheckouPageHandler = (event,pack_id) =>{
        event.preventDefault();
        dispatch(packSliceActions.setClassPackbyId(pack_id));
        history.push('/checkout');
    }
  return (
    <div className="mt-8 grid lg:grid-cols-3 gap-3">
        {props.classpacks.map((classpack) => (
                <div className="card relative" key={classpack.pack_id}>
                    {classpack.tag_name && <span className="inline-flex items-center justify-center mx-4 my-2 px-6 py-1 text-xs font-bold leading-none text-indigo-100 bg-gray-900 uppercase rounded">{classpack.tag_name}</span>}
                    <div className ="absolute w-11  overflow-hidden inline-block  right-0 top-0 ">
                        <img src="images/ym1.png" alt="matton" className="h-16 -rotate-45 transform origin-top-left object-cover"/>
                                            
                    </div>                        
                                        
                    <div className="text-center">
                        <span className="font-bold text-cyan-500 text-sm">{classpack.pack_name}</span>
                        <div className="border-4 m-auto border-slate-100 border-double
                                bg-cyan-600 flex items-center justify-center text-indigo-100 rounded-full w-12 h-12 ">
                        {classpack.total_credit === 1 ? 'S' :(classpack.total_credit === 0 ? 'U' : classpack.total_credit) }
                         </div>
                    </div> 
                                        
                    <div className="m-auto hover:border-2 hover:cursor-pointer  mx-4 my-2 items-center justify-center">
                        <Link to="/checkout" onClick={(e)=>beforeCheckouPageHandler(e,classpack.pack_id)}>
                            <div className="text-center px-10">
                            <p className="text-slate-700 text-sm ">{classpack.pack_description}<br/>{classpack.newbie_note}</p>
                            </div>
                                                
                            <div className="text-center my-4">
                                <span className="font-bold">${classpack.pack_price}</span>
                                <span className="block  text-gray-500 text-xs">${classpack.estimate_price} per class!</span>
                            </div>
                        </Link>
                        
                    </div>
                </div>
          ))}        
    </div>
  );
};

export default ClassPackList;
