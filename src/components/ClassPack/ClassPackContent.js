import { useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { getClassPacks } from "../../lib/api";
import ClassPackList from "./ClassPackList";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { packSliceActions } from "../../store/pack-slice";
const ClassPackContent = () => {
  const dispatch = useDispatch();
  const token = useSelector(state=>state.auth.token);
    const {sendRequest,data:classPackData,error,status} = useHttp(getClassPacks);
    useEffect(()=>{
        sendRequest({
          apiToken:token
        });
    },[])
    let packs;
      if(status === "pending"){
        packs =   <div className='text-center'>
        <LoadingSpinner></LoadingSpinner>
      </div>; 
      }
      if(status==="completed" && (classPackData && classPackData.length>0)){
        dispatch(packSliceActions.setClassPack(classPackData));
        packs = <ClassPackList classpacks={classPackData}></ClassPackList>
      }else if(status==="completed" && (!classPackData && classPackData.length === 0 )) {
        packs = <p>No class pack yet!!</p>;
      }
    return (
        <section>
            <header>
                <h4 className="text-gray-500 text-2xl font-semibold">BUY A CLASS PACK</h4>
            </header>
              <div>
                  <h4 className="font-bold mt-12 pb-2 border-b border-gray-200">Class Packs</h4>
                   {packs}
                  
              </div>
        </section>
    );
  };
  
  export default ClassPackContent;
  