import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import {useSelector} from "react-redux";

export default function Home() {
   const {user} = useSelector((state) => ({...state}));

   return (
      <div>
         <Header/>
         <LeftHome user={user}/>
      </div>
   )
}
